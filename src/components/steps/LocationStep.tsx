import React, { useState } from "react";
import { MapPin, AlertCircle } from "lucide-react";
import { Map } from "../Map";
import { supabase } from "../../lib/supabase";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

export const LocationStep: React.FC<{
  onComplete: (location: Location | null) => void;
}> = ({ onComplete }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelect = async (lat: number, lng: number) => {
    try {
      setError(null);
      // Use OpenStreetMap's Nominatim service for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      if (data.display_name) {
        setLocation({
          lat,
          lng,
          address: data.display_name,
        });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setError(
        "Failed to get address for selected location. Please try again."
      );
    }
  };

  const handleConfirmLocation = async () => {
    if (!location) return;

    setSaving(true);
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Please sign in to continue");
        return;
      }

      // Get the user's IP address
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const userIpAddress = ipData.ip;

      // Check if the user already has a profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (profileError || !profileData) {
        // Create a new profile if it doesn't exist
        const { error: createProfileError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            full_name: user.email, // or any default name
            phone_number: null, // or any default value
          });

        if (createProfileError) {
          throw createProfileError;
        }
      }

      const { error: saveError } = await supabase.from("help_requests").insert({
        user_id: user.id,
        location: JSON.stringify({
          lat: location.lat,
          lng: location.lng,
          address: location.address,
        }),
        ip_address: userIpAddress, // Save the user's IP address
        status: "pending",
      });

      if (saveError) throw saveError;

      onComplete(location);
    } catch (error) {
      console.error("Error saving location:", error);
      setError("Failed to save location. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSkipLocation = () => {
    onComplete(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <h3 className="text-xl font-semibold flex items-center">
          <MapPin className="mr-2" /> Select Your Location
        </h3>
        <p className="text-gray-600">
          Click on the map to mark your current location
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      <Map onLocationSelect={handleLocationSelect} />

      {location && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <p className="font-medium">Selected Location:</p>
          <p className="text-gray-600">{location.address}</p>
          <button
            onClick={handleConfirmLocation}
            disabled={saving}
            className={`mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 
              ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {saving ? "Saving..." : "Confirm Location"}
          </button>
        </div>
      )}

      <button
        onClick={handleSkipLocation}
        className="mt-4 bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
      >
        Skip Location
      </button>
    </div>
  );
};

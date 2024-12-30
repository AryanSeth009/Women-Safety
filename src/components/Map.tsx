import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet';
import { AlertCircle } from 'lucide-react';

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

function LocationMarker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<LatLng | null>(null);
  
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    }
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon} />
  );
}

export const Map: React.FC<MapProps> = ({ onLocationSelect }) => {
  const [error, setError] = useState<string | null>(null);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // India center

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setError("Could not get your location. Please select manually.");
        }
      );
    }
  }, []);

  if (error) {
    return (
      <div className="w-full h-[400px] rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="text-center p-4">
          <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-2" />
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      className="w-full h-[400px] rounded-lg shadow-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};
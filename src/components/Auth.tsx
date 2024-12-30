import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { UserCircle, Mail, Lock, Loader } from 'lucide-react';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) throw error;
      setError('Check your email for the confirmation link.');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <UserCircle className="w-16 h-16 text-orange-500 mx-auto" />
        <h2 className="text-2xl font-bold mt-2">Sign In to Continue</h2>
        <p className="text-gray-600">Access emergency services securely</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader className="w-5 h-5 mx-auto animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-white text-orange-500 border border-orange-500 py-2 px-4 rounded-md hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};
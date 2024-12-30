import React from 'react';
import { Shield, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-2xl font-bold text-gray-900">Women's Safety Helpline</span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-orange-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">Emergency</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">Resources</a>
            <a href="#" className="text-gray-700 hover:text-orange-500">Contact</a>
            
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Sign Out
              </button>
            )}
          </nav>
          
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
            Emergency Help
          </button>
        </div>
      </div>
    </header>
  );
};
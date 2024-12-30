import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { EmergencyProcess } from './components/EmergencyProcess';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Safety Is Our Priority
          </h1>
          <p className="text-xl text-gray-600">
            {user ? 'Follow the steps below to get immediate assistance' : 'Sign in to access emergency services'}
          </p>
        </div>
        
        {user ? <EmergencyProcess /> : <Auth />}
      </main>
    </div>
  );
}

export default App;
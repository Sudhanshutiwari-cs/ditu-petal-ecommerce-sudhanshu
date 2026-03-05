'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function RolePage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    checkUserAndRedirect();
  }, []);

  const checkUserAndRedirect = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/login');
      return;
    }

    // Fetch user role from database
    const { data: userData, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      // If user exists in auth but not in users table, redirect to home
      router.push('/');
      return;
    }

    // Set the user role for the loading message
    setUserRole(userData.role);

    // Redirect based on role
    if (userData.role === 'admin') {
      // Admin redirects to /admin
      router.push('/admin');
    } else {
      // All other users (brand, influencer, etc.) stay on localhost:3000
      // and go to the home page
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">
          {userRole === 'admin' 
            ? 'Redirecting to admin panel...' 
            : 'Logging you in...'}
        </h2>
        <p className="text-gray-500 mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import RecordForm from '@/components/RecordForm';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase';

export default function AddRecord() {
  const [user, setUser] = useState<any>(undefined);
  const router = useRouter();

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error getting session:', error);
        setUser(null);
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Check if user is null after the auth state has been checked
    if (user === null) {
      router.push('/auth');
    }
  }, [user, router]);

  if (user === undefined || user === null) {
    return (
      <Layout title="Loading...">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Add Record">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Glucose Reading</h1>
        <RecordForm />
      </div>
    </Layout>
  );
}

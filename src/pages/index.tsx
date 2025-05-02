import ThemeLayout from '@/components/ThemeLayout';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';

export default function Home() {
  const [user, setUser] = useState<any>(null);

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

  return (
    <ThemeLayout title="Home">
      <div className="max-w-4xl mx-auto">
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Track Your Diabetes Journey</h1>
          <p className="text-xl text-gray-600 mb-8">
            Monitor your blood sugar levels, track your diet, and gain insights for better health management.
          </p>

          {user ? (
            <Link href="/dashboard" className="btn-primary text-lg px-8 py-3">
              Go to Dashboard
            </Link>
          ) : (
            <Link href="/auth" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
          )}
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Data Entry</h3>
              <p className="text-gray-600">
                Record your blood sugar levels and meals up to 3 times a day with our simple form.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Long-term Storage</h3>
              <p className="text-gray-600">
                Store and access your health data for up to 5 years to track long-term progress.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-primary-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Insightful Analytics</h3>
              <p className="text-gray-600">
                View trends and averages with visual charts to better understand your health patterns.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-4">
                <h3 className="text-2xl font-semibold mb-2">1. Record Your Readings</h3>
                <p className="text-gray-600">
                  Enter your blood sugar levels after meals, along with what you ate. Track up to 3 readings per day.
                </p>
              </div>
              <div className="md:w-1/2 p-4 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-500">Form Screenshot</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-4 order-2 md:order-1 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-500">Dashboard Screenshot</p>
              </div>
              <div className="md:w-1/2 p-4 order-1 md:order-2">
                <h3 className="text-2xl font-semibold mb-2">2. View Your Dashboard</h3>
                <p className="text-gray-600">
                  See your recent readings, weekly averages, and trends at a glance on your personalized dashboard.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-4">
                <h3 className="text-2xl font-semibold mb-2">3. Generate Reports</h3>
                <p className="text-gray-600">
                  Export your data as CSV or PDF to share with your healthcare provider during check-ups.
                </p>
              </div>
              <div className="md:w-1/2 p-4 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-500">Reports Screenshot</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ThemeLayout>
  );
}

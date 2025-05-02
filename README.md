# Diabetes Tracker Web App

A comprehensive web application for tracking and monitoring diabetes metrics over time.

## Features

- **User Data Entry**: Record blood sugar levels, meal times, and food consumed
- **Long-term Storage**: Store and access up to 5 years of health data
- **Analytics**: View weekly, monthly, and yearly averages with visual charts
- **User Authentication**: Secure login system to keep your health data private
- **Data Export**: Download your records as CSV for sharing with healthcare providers

## Tech Stack

- **Frontend**: Next.js with React and TypeScript
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Charts**: Chart.js with react-chartjs-2

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account (free tier available)

### Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd diabetes-tracker
   ```

2. Install dependencies:
   ```
   npm install
   npm install @supabase/supabase-js
   # or
   yarn install
   yarn add @supabase/supabase-js
   ```

3. Create a Supabase project:
   - Sign up at [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key

4. Set up environment variables:
   - Create a `.env.local` file in the project root
   - Add the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```


5. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Register a new account or sign in
2. Use the dashboard to view your glucose trends
3. Add new glucose readings after meals
4. View your history and reports
5. Export your data for doctor visits

## Troubleshooting

### Module not found: Can't resolve '@supabase/auth-helpers-react'

If you encounter this error, it means the Supabase auth helpers packages are missing. The application has been updated to use the latest Supabase client directly instead of the auth helpers. To fix this issue:

1. Make sure you have installed the Supabase client:
   ```
   npm install @supabase/supabase-js
   # or
   yarn add @supabase/supabase-js
   ```

2. If you still encounter issues, you can install the auth helpers packages:
   ```
   npm install @supabase/auth-helpers-nextjs @supabase/auth-helpers-react
   # or
   yarn add @supabase/auth-helpers-nextjs @supabase/auth-helpers-react
   ```

### Other Issues

If you encounter any other issues:

1. Make sure you have set up your `.env.local` file correctly with your Supabase credentials
2. Check that you have created the necessary tables in your Supabase database
3. Ensure you have installed all the required dependencies

## License

[MIT](LICENSE)

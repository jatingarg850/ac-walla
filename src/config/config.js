const config = {
  apiBaseUrl: import.meta.env.PROD 
    ? 'https://server-alpha-eight-87.vercel.app/api'  // Production URL
    : 'http://localhost:5000/api',        // Development URL
  corsOrigins: [
    'https://ac-walla-one.vercel.app',
    'https://ac-ehn4lhn1c-coddyios-projects.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ]
};

export default config; 
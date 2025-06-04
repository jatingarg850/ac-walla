const config = {
  apiBaseUrl: import.meta.env.PROD 
    ? 'https://ac-walla-y9wo.vercel.app/api'  // Production URL
    : 'http://localhost:5000/api'         // Development URL
};

export default config; 
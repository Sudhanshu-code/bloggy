const envConfig = {
  apiKey: String(import.meta.env.VITE_apiKey),
  authDomain: String(import.meta.env.VITE_authDomain),
  projectId: String(import.meta.env.VITE_projectId),
  storageBucket: String(import.meta.env.VITE_storageBucket),
  messagingSenderId: String(import.meta.env.VITE_messagingSenderId),
  appId: String(import.meta.env.VITE_appId),

  rteApiKey: String(import.meta.env.VITE_tiny_apikey),
};

export default envConfig;

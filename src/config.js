export const apiAuth = process.env.REACT_APP_AUTH;
export const membershipApi = process.env.REACT_APP_MEMBERSHIP;
export const paymentApi = process.env.REACT_APP_PAYMENT;
const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_PRIVATE_KEY_ID,
  REACT_APP_PRIVATE_KEY,
  REACT_APP_MEASUREMENT_ID,
  REACT_APP_CLIENT_EMAIL,
} = process.env;

export const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
  privateKey: REACT_APP_PRIVATE_KEY.replace(/\\n/gm, "\n"),
  clientEmail: REACT_APP_CLIENT_EMAIL,
  privateKeyId: REACT_APP_PRIVATE_KEY_ID,
};

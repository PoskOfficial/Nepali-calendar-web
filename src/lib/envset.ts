import "dotenv/config";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  DETA_SPACE_APP_HOSTNAME,
  CUSTOM_DOMAIN,
} = process.env;

const GOOGLE_CALLBACK_URL = CUSTOM_DOMAIN
  ? `https://${CUSTOM_DOMAIN}/api/auth/google/callback`
  : DETA_SPACE_APP_HOSTNAME === "localhost:4201"
  ? `http://localhost:4200/api/auth/google/callback`
  : `https://${DETA_SPACE_APP_HOSTNAME}/api/auth/google/callback`;
// const GOOGLE_CALLBACK_URL = `http://localhost:4200/api/auth/google/callback`;

export {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  CUSTOM_DOMAIN,
};

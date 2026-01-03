import "dotenv/config";

const assertAuthTokenKey = () => {
  const KEY = process.env.AUTH_TOKEN_PRIVATE_KEY;

  if (!KEY) {
    throw new Error("Failed to retrive auth token private key.");
  }

  return KEY;
};

export default assertAuthTokenKey;

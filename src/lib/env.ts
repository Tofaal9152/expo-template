export const env = {
  BACKEND_URL:
    (process.env.EXPO_PUBLIC_BACKEND_URL as string) || "http://localhost:3000",

  isDevelopment: process.env.NODE_ENV === "development",
};

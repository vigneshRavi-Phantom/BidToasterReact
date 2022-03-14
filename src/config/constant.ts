require('dotenv').config();
const L_SITE_URL = "http://localhost:3000";
export const L_API_URL = "http://localhost:8080/graphql";
const P_SITE_URL = "http://bidtoaster.com";
export const P_API_URL = "http://23.101.24.189/graphql";
export const SITE_URL = process.env.NODE_ENV === "production" ? P_SITE_URL : L_SITE_URL;
export const API_URL = process.env.NODE_ENV === "production" ? P_API_URL : P_API_URL;
export const JWTToken = (process.env.REACT_APP_JWTToken || "");
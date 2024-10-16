// apiCaller.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { EAPITypes } from "../constants/type";
import { jwtDecode } from "jwt-decode";

interface APICallerProps {
  method: EAPITypes;
  url: string;
  payload?: any;
  // headers: Record<string, string>;
  token?: string | null; // Optional Bearer token
}

const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

// Common API calling function using Axios
const apiCaller = async <T = any>({
  method,
  url,
  payload = null,
  token, // Optional Bearer token
}: // headers = {},
APICallerProps): Promise<T> => {
  try {
    if (token && isExpireToken(token)) throw "Token is Expire or not available";
    // Set up config object
    const config: AxiosRequestConfig = {
      method,
      url,
      headers: {
        // ...headers,
        ...HEADERS,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    // Add the data if method is not GET
    if (payload && method !== EAPITypes.GET) {
      config.data = payload;
    }

    // Perform the API call using Axios
    const response: AxiosResponse<T> = await axios(config);

    // Return response in a standardized format
    return response.data;
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error);
  }
};

const isExpireToken = (token?: string) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp && decodedToken.exp < currentTime) {
    return true;
  }
  return false;
};

export default apiCaller;

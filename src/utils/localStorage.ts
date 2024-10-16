import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKENS_KEY, EXPIRE_TIME } from "../constants/keys";
import { UserAuth } from "../constants/type";

export const getLocalStorage = (key: string) => {
  if (!key) throw new Error("Key is invalid!");
  const value = localStorage.getItem(key);
  return value;
};

export const setLocalStorage = (key: string, value: any) => {
  if (!key || !value) throw new Error("Key is invalid!");
  localStorage.setItem(key, value);
};

export const setLoginStorage = (token?: string | null) => {
  if (!token) throw new Error("token is invalid!");
  const decodedToken = jwtDecode<UserAuth>(token);
  const currentTime = Date.now() / 1000;
  if (!decodedToken.exp || decodedToken.exp < currentTime) {
    throw new Error("Token is expired!");
  }

  setLocalStorage(EXPIRE_TIME, decodedToken.exp);
  setLocalStorage(ACCESS_TOKENS_KEY, token);
  return decodedToken;
};

export const removeLocalStorage = (key: string) => {
  if (!key) throw new Error("Key is invalid!");
  localStorage.removeItem(key);
};

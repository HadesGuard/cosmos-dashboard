import { BASE_URL, ENDPOINT_APIS } from "../constants/urls";
import apiCaller from "../utils/apiCaller";
import { EAPITypes } from "../constants/type";

export const sendOTP = async (email: string) => {
  const url = BASE_URL + ENDPOINT_APIS.SEND_OTP;
  const payload = {
    email,
  };

  return await apiCaller({ method: EAPITypes.POST, url, payload });
};

export const verifyOTP = async (email: string, otp: string) => {
  const url = BASE_URL + ENDPOINT_APIS.VERIFY_OTP;
  const payload = {
    email,
    otp,
  };
  return await apiCaller({ method: EAPITypes.POST, url, payload });
};

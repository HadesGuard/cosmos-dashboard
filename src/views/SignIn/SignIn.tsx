import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { validate as validateEmail } from "email-validator";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

import ArrowLeft from "../../assets/ArrowLeft";
import { TOAST_PROPS } from "../../constants/toast";
import { useAuth } from "../../components/AuthContext";

import "./signin.scss";

const validateOTP = (otp: string) => {
  const numberOTP = Number(otp);
  if (otp?.length === 6 && numberOTP) return true;
  return false;
};

const countTime = 60;

export default function SignIn() {
  const [count, setCount] = useState(countTime); // Initial countdown value
  const [isActive, setIsActive] = useState(false); // Controls countdown activity

  const [isClickedSignIn, setIsClickedSignIn] = useState(false);
  const [isReceiveCode, setIsReceiveCode] = useState(false);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [otpCode, setOtpCode] = useState("");
  const [isValidOTP, setIsValidOTP] = useState(false);

  const navigate = useNavigate();
  const startCountdown = () => {
    setCount(countTime);
    setIsActive(true);
  };

  const auth = useAuth();

  const handleClickSendMail = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!isActive) {
        const isEmailValid = validateEmail(email);
        if (!isEmailValid) {
          throw new Error("Invalid Email!");
        }

        await auth.getOTP(email);
        setIsReceiveCode(true);
        startCountdown();
        toast.success("OTP sent to your email", TOAST_PROPS);
      }
    } catch (error) {
      toast.error("Invalid Email!", TOAST_PROPS);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setIsValidEmail(validateEmail(newEmail));
    setEmail(newEmail);
  };

  const handleClickValidateCode = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const isOTPValid = validateOTP(otpCode);
      if (!isOTPValid) {
        throw new Error("Invalid OTP Code!");
      }
      await auth.verifyOTPProvider(email, otpCode);
      setIsReceiveCode(true);
      toast.success("OTP Verify Successfully!", TOAST_PROPS);
      navigate("/");
    } catch (error) {
      toast.error("Invalid OTP Code!", TOAST_PROPS);
    }
  };

  const handleOTPChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newOtp = e.target.value;
    setIsValidOTP(validateOTP(newOtp));
    setOtpCode(newOtp);
  };

  useEffect(() => {
    let timer: number;
    if (isActive && count > 0) {
      timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else if (count === 0) {
      setIsActive(false); // Stop the countdown when it reaches 0
    }

    return () => clearTimeout(timer); // Cleanup timeout on unmount or when count changes
  }, [isActive, count]);

  const positionBack = isReceiveCode ? "16em" : "9em";

  return (
    <div className="sign-in-val" style={{ position: "relative" }}>
      {isClickedSignIn && (
        <div
          style={{ position: "absolute", top: "-12em", left: 0, width: 600 }}
        >
          <h1 style={{ textAlign: "center" }}>Delegator Dashboard Login</h1>
        </div>
      )}
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <input className="c-checkbox" type="checkbox" id="checkbox" readOnly />
        <div className="c-formContainer">
          <form
            className={isClickedSignIn ? "clicked-sign c-form" : "c-form"}
            onSubmit={handleClickSendMail}
          >
            <input
              className={
                isValidEmail ? "valid-email c-form__input" : "c-form__input"
              }
              placeholder="E-mail"
              type="email"
              onChange={handleEmailChange}
              value={email}
              disabled={isActive}
            />
            <label
              className={
                isActive
                  ? "c-form__buttonLabel disable-btn"
                  : "c-form__buttonLabel"
              }
              htmlFor="checkbox1"
              onClick={handleClickSendMail}
            >
              <button className="c-form__button" type="submit">
                {isActive ? `${count}s` : "Get OTP"}
              </button>
            </label>
            <label
              className="c-form__toggle"
              htmlFor="checkbox"
              data-title="Sign In"
              onClick={() => setIsClickedSignIn(true)}
            ></label>
          </form>
        </div>
      </div>
      <div style={{ position: "absolute", top: "9em", left: 0 }}>
        <input
          className="c-checkbox-1"
          type="checkbox"
          id="checkbox1"
          checked={isReceiveCode}
          readOnly
        />
        <div className="c-formContainer-1">
          <form className="c-form-1" onSubmit={handleClickValidateCode}>
            <input
              className={
                isValidOTP ? "valid-otp c-form__input-1" : "c-form__input-1"
              }
              value={otpCode}
              onChange={handleOTPChange}
              placeholder="OTP Code"
              type="string"
            />
            <label
              className="c-form__buttonLabel-1"
              htmlFor="checkbox1"
              onClick={handleClickValidateCode}
            >
              <button className="c-form__button-1" type="button">
                Verify
              </button>
            </label>
          </form>
        </div>
      </div>
      {isClickedSignIn && (
        <div style={{ position: "absolute", top: positionBack, left: 0 }}>
          <Tooltip title="Back To Home Page" arrow>
            <ArrowLeft
              onClick={() => navigate("/")}
              className="arrow-left-back"
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}

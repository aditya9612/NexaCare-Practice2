import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import "../../styles/LoginPage.css";

type Step = "phone" | "otp" | "success";

const MOCK_OTP = "1234";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendTimer((t) => {
          if (t <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resendTimer]);

  const isValidPhone = (p: string) => /^[6-9]\d{9}$/.test(p);

  const handleSendOTP = async () => {
    if (!isValidPhone(phone)) {
      setError("Enter valid 10-digit number");
      return;
    }

    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    setLoading(false);
    setStep("otp");
    setResendTimer(30);

    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;

    const next = [...otp];
    next[i] = val;
    setOtp(next);
    setError("");

    if (val && i < 3) otpRefs.current[i + 1]?.focus();
  };

  const handleVerifyOTP = async () => {
    const entered = otp.join("");

    if (entered !== MOCK_OTP) {
      setError("Wrong OTP (Hint: 1234)");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    setLoading(false);
    setStep("success");
  };

  return (
    <div className="wrapper">
      <div className="card">
        <h2>Login</h2>

        {step === "phone" && (
          <>
            <input
              className="input"
              value={phone}
              maxLength={10}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
              placeholder="Enter phone"
            />

            {error && <p className="error">{error}</p>}

            <button className="btn" onClick={handleSendOTP}>
              {loading ? "Loading..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <div className="otpRow">
              {otp.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el;
                  }}
                  value={d}
                  maxLength={1}
                  className="otpBox"
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                />
              ))}
            </div>

            {error && <p className="error">{error}</p>}

            <button className="btn" onClick={handleVerifyOTP}>
              Verify OTP
            </button>
          </>
        )}

        {step === "success" && <h3>Login Success 🎉</h3>}
      </div>
    </div>
  );
}
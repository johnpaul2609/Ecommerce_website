
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaKey,
  FaArrowLeft,
} from "react-icons/fa";

function ForgotPassword({ setShowForgotPassword }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);
  const [otpVerified, setOtpVerified] =
    useState(false);

  const sendOtp = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/forgot-password?email=${email}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.message === "OTP Sent") {
        setOtpSent(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/verify-otp?email=${email}&otp=${otp}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.message === "OTP Verified") {
        setOtpVerified(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetPassword = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/reset-password?email=${email}&new_password=${newPassword}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      alert(data.message);

      if (
        data.message === "Password Updated"
      ) {
        setShowForgotPassword(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-950">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              JP
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              Reset Password
            </h1>

            <p className="text-slate-300 mt-2">
              Secure your account with OTP
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-slate-200 mb-2 text-sm">
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" />

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  w-full
                  pl-12
                  pr-4
                  py-4
                  rounded-xl
                  bg-white/10
                  border
                  border-white/20
                  text-white
                  placeholder-slate-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                "
              />
            </div>
          </div>

          {!otpSent ? (
            <button
              onClick={sendOtp}
              className="
                w-full
                py-4
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                via-blue-600
                to-indigo-600
                text-white
                font-semibold
                shadow-lg
                hover:scale-[1.02]
                transition-all
              "
            >
              Send OTP
            </button>
          ) : (
            <>
              {/* OTP */}
              <div className="mt-4 mb-4">
                <div className="relative">
                  <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" />

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value)
                    }
                    className="
                      w-full
                      pl-12
                      pr-4
                      py-4
                      rounded-xl
                      bg-white/10
                      border
                      border-white/20
                      text-white
                      placeholder-slate-400
                      focus:outline-none
                      focus:ring-2
                      focus:ring-cyan-400
                    "
                  />
                </div>
              </div>

              {!otpVerified ? (
                <button
                  onClick={verifyOtp}
                  className="
                    w-full
                    py-4
                    rounded-xl
                    bg-green-500
                    text-white
                    font-semibold
                    hover:bg-green-600
                    transition-all
                  "
                >
                  Verify OTP
                </button>
              ) : (
                <>
                  {/* New Password */}
                  <div className="mt-4 mb-4">
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" />

                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          pl-12
                          pr-4
                          py-4
                          rounded-xl
                          bg-white/10
                          border
                          border-white/20
                          text-white
                          placeholder-slate-400
                          focus:outline-none
                          focus:ring-2
                          focus:ring-cyan-400
                        "
                      />
                    </div>
                  </div>

                  <button
                    onClick={resetPassword}
                    className="
                      w-full
                      py-4
                      rounded-xl
                      bg-purple-600
                      text-white
                      font-semibold
                      hover:bg-purple-700
                      transition-all
                    "
                  >
                    Reset Password
                  </button>
                </>
              )}
            </>
          )}

          {/* Back Button */}
          <button
            onClick={() =>
              setShowForgotPassword(false)
            }
            className="
              w-full
              mt-4
              py-3
              rounded-xl
              border
              border-cyan-400
              text-cyan-400
              hover:bg-cyan-500
              hover:text-white
              transition-all
              duration-300
              font-semibold
              flex
              justify-center
              items-center
              gap-2
            "
          >
            <FaArrowLeft />
            Back To Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;

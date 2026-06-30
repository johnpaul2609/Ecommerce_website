import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login({
  email,
  setEmail,
  password,
  setPassword,
  loginUser,
  setShowRegister,
  setShowForgotPassword,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 bg-gradient-to-br from-blue-950 via-indigo-950 to-cyan-950">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="absolute top-40 right-20 w-60 h-60 bg-indigo-500 rounded-full blur-3xl opacity-10 animate-bounce"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              JP
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              JP Shopping
            </h1>

            <p className="text-slate-300 mt-2">
              Login to continue shopping
            </p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-slate-200 mb-2 text-sm">
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" />

              <input
                type="email"
                name="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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

          {/* Password */}
          <div className="mb-5">
            <label className="block text-slate-200 mb-2 text-sm">
              Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-300" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="
                  w-full
                  pl-12
                  pr-12
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

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-cyan-300
                "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 text-slate-300 text-sm">
              <input
                type="checkbox"
                className="accent-cyan-500"
              />
              Remember Me
            </label>

            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-blue-500 mt-3"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={loginUser}
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
              duration-300
            "
          >
            Sign In
          </button>

          {/* Register */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-center text-slate-300">
              New User?
            </p>

            <button
              type="button"
              onClick={() => setShowRegister(true)}
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
              "
            >
              Create Account
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-slate-400 border-t border-white/10 pt-4">
            © 2026 JP Electronics. All Rights Reserved.
          </div>

        </div>
      </div>

    </div>
  );
}

export default Login;
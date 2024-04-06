
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  async function handleFormSubmit(e) {
    e.preventDefault();
    const loadingToastId = toast.loading("Sending Reset Link...");

    try {
      await dispatch(forgotPassword({ email }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      toast.dismiss(loadingToastId);
    }

    setEmail("");
    // navigate("/");
  }
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-base-200 p-8 rounded-lg shadow-2xl w-96">
        <h1 className="text-center font-serif text-2xl font-bold mb-6">
          Forgot Password
        </h1>
        <p className="mb-6">
          Enter your registered email, we will send you a verification link on
          your registered email from which you can reset your password.
        </p>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="usernameOrEmail" className="text-sm font-medium">
              Email Address
            </label>
            <input
              required
              type="text"
              name="email"
              id="email"
              placeholder="Enter your registered email"
              className="bg-base-200 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Get Verification Link
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

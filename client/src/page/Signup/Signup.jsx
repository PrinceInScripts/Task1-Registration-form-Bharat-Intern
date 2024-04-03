import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { createAccount } from '../../redux/slice/authSlice';


function Signup() {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);

  const [signupDetails, setSignupDetials] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setSignupDetials({
      ...signupDetails,
      [name]: value,
    });
  };

  async function onHandleSubmit(e) {
    e.preventDefault();

    console.log(signupDetails);

    if (!signupDetails.fullName) {
      toast.error("fullName is required");
      return;
    }

    if (!signupDetails.email) {
      toast.error("email is required");
      return;
    }

    if (!signupDetails.password) {
      toast.error("password is required");
      return;
    }

    if (!signupDetails.confirmPassword) {
      toast.error("confirmPassword is required");
      return;
    }
   

    const loadingToastId = toast.loading("Signing up...");

    try {
      const response = await dispatch(createAccount(signupDetails));
      console.log(response);
      if (response?.payload?.data?.success) {
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      toast.dismiss(loadingToastId);
      setSignupDetials({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }

  function toogleShowPassword() {
    setShowPassword(!showPassword);
  }
  function toogleShowConfPassword() {
    setShowConfPassword(!showConfPassword);
  }

  return (
    <div className="w-96 mx-4 lg:mx-auto mt-10">
    <form onSubmit={onHandleSubmit}>
      <div className="mb-4">
        <label className="input input-bordered flex items-center gap-2">
          <FaUser />
          <input
            type="text"
            name="fullName"
            className="grow"
            placeholder="fullName"
            value={signupDetails.fullName}
            onChange={onChangeInput}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="input input-bordered flex items-center gap-2">
          <MdEmail />
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
            value={signupDetails.email}
            onChange={onChangeInput}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="input input-bordered flex items-center gap-2">
          <FaKey />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="grow "
            placeholder="Password"
            value={signupDetails.password}
            onChange={onChangeInput}
          />
          {showPassword ? (
            <FaEyeSlash
              className="cursor-pointer"
              onClick={toogleShowPassword}
            />
          ) : (
            <FaEye className="cursor-pointer" onClick={toogleShowPassword} />
          )}
        </label>
      </div>
      <div className="mb-4">
        <label className="input input-bordered flex items-center gap-2">
          <FaKey />
          <input
            type={showConfPassword ? "text" : "password"}
            name="confirmPassword"
            className="grow"
            placeholder="Confirm Password"
            value={signupDetails.confirmPassword}
            onChange={onChangeInput}
          />
          {showPassword ? (
            <FaEyeSlash
              className="cursor-pointer"
              onClick={toogleShowConfPassword}
            />
          ) : (
            <FaEye
              className="cursor-pointer"
              onClick={toogleShowConfPassword}
            />
          )}
        </label>
      </div>
      <div className="mt-6">
        <button type="submit" className="btn btn-primary w-full">
          Sign Up
        </button>
      </div>
    </form>
    <div className="flex justify-center mt-4">
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-serif font-semibold">
          <a className="link link-primary">login</a>
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Signup

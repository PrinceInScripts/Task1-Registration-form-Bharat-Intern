import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
    {isLoggedIn ? (
      
      <div className="hero min-h-screen flex flex-col justify-center items-center relative">
        <div className="hero-content flex flex-col w-full lg:w-2/5 text-center text-white relative">
          <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
          <p className="mb-8 font-sans font-semibold">
            Welcome back to our platform! Explore your personalized dashboard and make the most out of our services.
          </p>
          <Link to="/me" className="btn btn-primary">Go to Profile</Link>
        </div>
      </div>
    ) : (
      // Content to display before user is logged in
      <div className="hero min-h-screen flex flex-col justify-center items-center relative">
        <div className="hero-content flex flex-col w-full lg:w-2/5 text-center text-white relative">
          <h1 className="text-5xl font-bold mb-6">Hello there</h1>
          <p className="mb-8 font-sans font-semibold">
            Welcome to our Full-Stack Authentication System! We are your premier destination for secure and efficient
            authentication solutions. With our expertise and dedication, we're here to safeguard your data and provide
            a seamless user experience.
          </p>
          <div className="flex gap-4">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default Home

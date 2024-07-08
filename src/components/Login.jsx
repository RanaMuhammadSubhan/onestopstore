import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      Swal.fire({
        title: "Successfully login",
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! ",
        footer: '<a href="#">Enter Valid Credential!</a>',
      });
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("result", decoded);
    const userInfo = {
      name: decoded.name,
      email: decoded.email,
      age: decoded.age,
      gender: decoded.gender,
      profilePicture: decoded.picture,
      token: response.credential,
    };
    Cookies.set("token", response.credential, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    navigate("/profile");
  };

  const handleGoogleLoginError = (error) => {
    console.error("Google Login Failed:", error);
  };

  const handleFacebookLogin = () => {
    window.location.href = `${API_URL}/auth/facebook/callback`;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-black p-8 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl mb-4 text-center">Log in to Onestop</h2>
        <button
          className="bg-blue-500 text-black w-full py-2 mb-4 rounded"
          onClick={handleFacebookLogin}
        >
          Sign in with Facebook
        </button>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
        <div className="text-center my-2">or</div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-500 w-full py-2 rounded">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#" className="text-blue-400">
            Forgot Password?
          </a>
        </div>
        <div className="text-center mt-4">
          <a href="#" className="text-blue-400">
            Don’t have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

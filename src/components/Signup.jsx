import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = "http://localhost:5000/api/users";

const Signup = () => {
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      age: "",
      gender: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      name: Yup.string().required("Required"),
      age: Yup.number().required("Required"),
      gender: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        let profilePictureUrl = "";
        if (profilePictureFile) {
          const formData = new FormData();
          formData.append("file", profilePictureFile);
          formData.append("upload_preset", "onestopstore"); // replace with your Cloudinary upload preset

          const cloudinaryResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/dzofj8fob/image/upload", // replace with your Cloudinary cloud name
            formData
          );
          profilePictureUrl = cloudinaryResponse.data.secure_url;
        }

        const response = await axios.post(`${API_URL}/register`, {
          ...values,
          profilePicture: profilePictureUrl,
        });

        console.log("Registration successful:", response.data);
        Swal.fire({
          title: "Successfully Registered",
          text: "User is Redirecting to Homepage ...",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      } catch (error) {
        console.error("Error during registration:", error);
        Swal.fire({
          title: "Registration Failed",
          text: error.response ? error.response.data.message : error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePictureFile(file);
  };
  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:5000/auth/facebook/callback";
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
          {formik.touched.age && formik.errors.age ? (
            <div className="text-red-500 text-sm">{formik.errors.age}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-sm">{formik.errors.gender}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            onChange={handleFileChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Sign Up
        </button>
      </form>
      <button
        className="bg-blue-500 text-white w-96 p-2 mb-4 rounded-md"
        onClick={handleFacebookLogin}
      >
        Sign up with Facebook
      </button>
    </div>
  );
};

export default Signup;

import RegisterStyle from "../styles/register.module.css";
import { useFormik } from "formik";
import validationSchema from "../schemas/registerSchema";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      streetAddress: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => saveToDb(),
  });
  console.log(formik.errors);

  const saveToDb = async () => {
    setUserExists(false);
    if (formik.isValid) {
      try {
        const checkIfUserExists = await supabase.from("users").select("*");

        console.log(checkIfUserExists);

        checkIfUserExists.data.forEach((item) => {
          if (item.email === formik.values.email) {
            setUserExists(true);
            return;
          }
        });

        const { data, error } = await supabase.from("users").insert({
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          country: formik.values.country,
          city: formik.values.city,
          streetAddress: formik.values.streetAddress,
          username: formik.values.username,
          password: formik.values.password,
          email: formik.values.email,
          mobileNumber: formik.values.mobileNumber,
        });

        if (error) {
          console.error(
            "Error inserting user data into the database:",
            error.message
          );
        } else {
          // Data was inserted successfully
          navigate("/");
          console.log("Success");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    } else {
      console.log("Please complete the fields properly");
    }
  };
  return (
    <>
      <div>
        <h1>Create an user account</h1>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        action="#"
        className={`w-3/4 px-4 flex flex-col sm:my-20 mx-auto my-10`}
      >
        {/* ----------------------- */}
        <div>
          {/* First Name*/}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className={`outline-none py-2 pr-4 block w-full border-b-2 ${
                formik.errors.firstName ? "border-red-400" : " border-gray-300"
              }`}
              type="text"
              placeholder="Ionel"
              name="firstName"
            />
            {/* here the error message it displayed, the error from the yup validation */}
            {formik.touched.firstName && formik.errors.firstName ? (
              <p>{formik.errors.firstName}</p>
            ) : null}
          </div>

          {/* Last Name*/}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className={`outline-none py-2 pr-4 block w-full border-b-2 ${
                formik.errors.lastName ? "border-red-400" : " border-gray-300"
              }`}
              type="text"
              placeholder="Ionescu"
              name="lastName"
            />
            {/* here the error message it displayed, the error from the yup validation */}
            {formik.touched.lastName && formik.errors.lastName ? (
              <p>{formik.errors.lastName}</p>
            ) : null}
          </div>

          {/* country */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              className={`outline-none py-2 pr-4 block w-full border-b-2 ${
                formik.errors.country ? "border-red-400" : " border-gray-300"
              }`}
              type="text"
              placeholder="Romania"
              name="country"
            />
            {/* here the error message it displayed, the error from the yup validation */}
            {formik.touched.country && formik.errors.country ? (
              <p>{formik.errors.country}</p>
            ) : null}
          </div>

          {/* city*/}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className={`outline-none py-2 pr-4 block w-full border-b-2 ${
                formik.errors.city ? "border-red-400" : " border-gray-300"
              }`}
              type="text"
              placeholder="Cluj"
              name="city"
            />
            {/* here the error message it displayed, the error from the yup validation */}
            {formik.touched.city && formik.errors.city ? (
              <p>{formik.errors.city}</p>
            ) : null}
          </div>

          {/* Street Address*/}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.streetAddress}
              className={`outline-none py-2 pr-4 block w-full border-b-2 ${
                formik.errors.streetAddress
                  ? "border-red-400"
                  : " border-gray-300"
              }`}
              type="text"
              placeholder="str. Trandafirilor"
              name="streetAddress"
            />
            {/* here the error message it displayed, the error from the yup validation */}
            {formik.touched.streetAddress && formik.errors.streetAddress ? (
              <p>{formik.errors.streetAddress}</p>
            ) : null}
          </div>
        </div>
        {/* ------------------------- */}

        <div>
          {/* USERNAME */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`outline-none py-2 pr-4 block w-full border-b-2 ${
                formik.errors.username ? "border-red-400" : " border-gray-300"
              }`}
              type="text"
              placeholder="@nick321"
              name="username"
            />
            {/* here the error message it displayed, the error from the yup validation */}
            {formik.touched.username && formik.errors.username ? (
              <p>{formik.errors.username}</p>
            ) : null}
          </div>
          {/* EMAIL */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              className={`outline-none py-2 pr-4 block w-full border-b-2 ${
                formik.errors.email ? "border-red-400" : " border-gray-300"
              }`}
              type="email"
              placeholder="email@email.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
          </div>
          {/* PASSWORD */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
              placeholder="Password"
              className={`outline-none py-2 pr-4 block w-full border-b-2 ${
                formik.errors.password ? "border-red-400" : " border-gray-300"
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <p>{formik.errors.password}</p>
            ) : null}
          </div>
          {/* CONFIRM PASSWORD */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              name="confirmPassword"
              className={`outline-none py-2 pr-4 block w-full border-b-2 ${
                formik.errors.confirmPassword
                  ? "border-red-400"
                  : " border-gray-300"
              }`}
              type="password"
              placeholder="Confirm Password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p>{formik.errors.confirmPassword}</p>
            ) : null}
          </div>
          {/* NUMBER */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              value={formik.values.mobileNumber}
              name="mobileNumber"
              className={`outline-none py-2 pr-4 block w-full border-b-2 ${
                formik.errors.mobileNumber
                  ? "border-red-400"
                  : " border-gray-300"
              }`}
              type="number"
              placeholder="Enter Mobile Number"
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
              <p>{formik.errors.mobileNumber}</p>
            ) : null}
          </div>
          <div>
            {userExists && (
              <p className="text-red-500">
                {" "}
                This email address already exists{" "}
              </p>
            )}
          </div>
          <div className="p-3 pt-4">
            <button
              type="submit"
              className={`w-full text-black py-2 pr-4 ${RegisterStyle.button}`}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Register;

import validationSchema from "../schemas/loginSchema";
import supabase from "../config/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import bcrypt, { hash } from "bcryptjs";

function Login() {
  const [userIsLogged, setUserIsLogged] = useState(false);
  const [passwordWrong, setPasswordWrong] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: () => {
      checkIfCredentialsAreCorrect();
    },
  });

  const checkIfCredentialsAreCorrect = async () => {
    if (formik.isValid) {
      try {
        const { data, error } = await supabase.from("users").select();
        const userFound = await data.find((user) => {
          return user.email === formik.values.email;
        });

        //checks for bycript match
        const passwordMatch = await bcrypt.compare(
          formik.values.password,
          userFound.password
        );

        if (userFound && passwordMatch) {
          localStorage.setItem("userId", userFound.id);
          navigate(`/home`, { replace: true });
        } else {
          setPasswordWrong(true);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="w-4/5 max-w-xs m-auto mt-32">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label for="email">Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className={`outline-none py-2 pr-4 block w-full border-b-2 ${
              formik.errors.email ? "border-red-400" : " border-gray-300"
            }`}
            type="text"
            placeholder="Please enter your email"
            name="email"
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p>{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`outline-none py-2 pr-4 block w-full border-b-2 ${
              formik.errors.password ? "border-red-400" : " border-gray-300"
            } ${passwordWrong ? "border-red-400" : ""}`}
            id="password"
            type="password"
            placeholder="******************"
          />
          {formik.touched.password && formik.errors.password ? (
            <p>{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={checkIfCredentialsAreCorrect}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!formik.values.email || !formik.values.password}
          >
            Sign In
          </button>
          <Link
            to="/register"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

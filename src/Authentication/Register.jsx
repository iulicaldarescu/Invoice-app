import "../styles/Register.css";
import { useFormik } from "formik";
import supabase from "../config/supabaseClient";
import * as Yup from "yup";

function Register() {
  // Validation schema of YUP
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    mobileNumber: Yup.string().required("Mobile Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Check if passwords match
      if (values.password !== values.confirmPassword) {
        formik.setFieldError("confirmPassword", "Passwords do not match");
        return;
      }

      // Handle form submission for valid data
      console.log("Form data submitted:", values);
      // Save to the database or perform other actions
      await saveToDb();
    },
  });

  const saveToDb = async () => {
    try {
      const { error } = await supabase.from("users").insert({
        username: formik.values.username,
        email: formik.values.email,
        password: formik.values.password,
        confirmPassword: formik.values.confirmPassword,
        mobileNumber: formik.values.mobileNumber,
      });
      if (formik.values.password === formik.values.confirmPassword) {
        console.log("KHGGHLJJGJKHGSFUJHGHSJHKDFGSJDKFGHKSTGDFHGSDFJSHDFHSDG");
        return;
      }

      if (error) {
        console.error("Error saving to the database:", error);
      } else {
        console.log("Data saved to the database successfully");
        // Perform other actions if needed
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="test">
      <div className="container flex justify-center items-center h-screen mx-auto">
        <form onSubmit={formik.handleSubmit} action="#" className="w-40 p-4">
          {/* USERNAME */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="outline-none py-2 pr-4 block w-full"
              type="text"
              placeholder="Username"
              name="username"
              required
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="error-message">{formik.errors.username}</div>
            ) : null}
          </div>
          {/* EMAIL */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              className="outline-none py-2 pr-4 block w-full"
              type="email"
              placeholder="Enter Email Id"
              required
            />
          </div>
          {/* PASSWORD */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
              placeholder="Password"
              className="outline-none py-2 pr-4 block w-full"
              required
            />
          </div>
          {/* CONFIRM PASSWORD */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              name="confirmPassword"
              className="outline-none py-2 pr-4 block w-full"
              type="password"
              placeholder="Confirm Password"
              required
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error-message">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          {/* NUMBER */}
          <div className="p-3">
            <input
              onChange={formik.handleChange}
              value={formik.values.mobileNumber}
              name="mobileNumber"
              className="outline-none py-2 pr-4 block w-full"
              type="number"
              placeholder="Enter Mobile Number"
              required
            />
          </div>
          <div className="p-3 pt-4">
            <button onClick={saveToDb} className="w-full text-white py-2 pr-4">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

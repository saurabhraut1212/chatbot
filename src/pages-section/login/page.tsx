"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setServerError(null);

    const response = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (response?.error) {
      setServerError(response.error);
      toast.error(response.error);
    } else if (response?.ok) {
      toast.success("Login successful!");
              setTimeout(() => {
              router.push("/");
              }, 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 px-8 py-10 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to Your Account</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <Field
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <Field
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
          </div>

          {serverError && <p className="text-red-600 text-sm text-center">{serverError}</p>}

          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
          >
            Login
          </button>

          {/* Optional Google Sign In */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => signIn("google")}
              className="text-sm text-blue-600 hover:underline"
            >
              Sign in with Google
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-3">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              Register
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;

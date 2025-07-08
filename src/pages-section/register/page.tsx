    "use client";

    import React, { useState } from "react";
    import { Formik, Form, Field, ErrorMessage } from "formik";
    import * as Yup from "yup";
    import Link from "next/link";
    import { AuthFormValues } from "@/types/next-auth";
    import { registerUser } from "@/services/authService"; 
    import { useRouter } from "next/navigation";
    import { toast } from "react-hot-toast";

    const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });

    const Register = () => {
        const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = async (values: AuthFormValues) => {
    setServerError(null);
    try {
        const response = await registerUser(values);
        console.log("Registration response:", response);

        if (!response || !response.user) {
        toast.error("Registration failed. Please try again.");
        setServerError("Registration failed. Please try again.");
        return;
        }

        toast.success(response.message || "Registration successful!");
        setTimeout(() => {
        router.push("/login");
        }, 2000);

    } catch (error) {
        if (error instanceof Error) {
        toast.error(error.message);
        setServerError(error.message);
        } else {
        const message = "An unexpected error occurred";
        toast.error(message);
        setServerError(message);
        }
    }
    };

    return (
        <div className="max-w-md mx-auto mt-24 px-8 py-10 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

        <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
        >
            <Form className="space-y-5">
            <div>
                <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                Name
                </label>
                <Field
                name="name"
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
                <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
                </label>
                <Field
                type="email"
                name="email"
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
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                className="w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {serverError && <p className="text-red-600 text-sm text-center">{serverError}</p>}

            <button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"
            >
                Register
            </button>

            <p className="text-center text-sm text-gray-600 mt-3">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Login
                </Link>
            </p>
            </Form>
        </Formik>
        </div>
    );
    };

    export default Register;

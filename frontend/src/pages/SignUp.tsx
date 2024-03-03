import { useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { getAccessToken, removeAccessToken, setAccessToken, useAuth } from "../api/auth";
import { SIGN_UP_MUTATION } from "../api/schema/mutation/signUp";

export function SignUp() {
    const navigate = useNavigate();
    const { user: fetchedUser, loading: authLoading } = useAuth();

    const [execSignUp] = useMutation(SIGN_UP_MUTATION, {
        fetchPolicy: 'no-cache'
    });

    useEffect(() => {
        if (getAccessToken()) {
            if (!authLoading) {
                if (fetchedUser == null) {
                    removeAccessToken();
                } else {
                    navigate('/dashboard');
                }
            }
        }
    }, [fetchedUser, authLoading])


    const signUp = async (values: any, { setSubmitting }: any) => {
        execSignUp({
            variables: {
                ...values
            },
            onCompleted(data) {
                setAccessToken(data.signUp.access_token);
                toast.success('Successfully signed up, redirecting...')
                setSubmitting(false);
                return navigate('/dashboard')
            },
            onError(error) {
                console.log(error)
                error.graphQLErrors.map(({ message }) => {
                    toast.error(message, { duration: 6000 });
                });
                setSubmitting(false);
            },
        })
    };

    const validationSchema = Yup.object().shape({
        username: Yup
            .string()
            .required('Username is required')
            .min(5, 'Username must be at least 5 characters')
            .max(50, 'Username must not exceed 50 characters'),
        email: Yup
            .string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup
            .string()
            .required('Password is required')
            .min(5, 'Password must be at least 5 characters')
            .max(50, 'Password must not exceed 50 characters'),
        confirmPassword: Yup
            .string()
            .required('Please retype your password.')
            .oneOf([Yup.ref('password')], 'Passwords do not match.')
    });

    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="bg-slate-800 p-12 md:p-6 md:rounded-lg shadow-md w-full h-full md:h-fit md:max-w-md border-blue-500 md:border-t-2">
                <h2 className="text-2xl font-semibold text-white mb-6">Sign Up</h2>
                <Formik
                    initialValues={{ username: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={signUp}
                >
                    {({ isSubmitting }) => (
                        <Form className="relative">
                            <div className="mb-4">
                                <label
                                    className="block text-white text-sm font-semibold mb-2"
                                    htmlFor="username">
                                    Username
                                </label>

                                <Field
                                    type="username"
                                    name="username"
                                    className="w-full px-3 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:bg-gray-600 transition duration-200"
                                    placeholder="Your username"
                                />

                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-white text-sm font-semibold mb-2"
                                    htmlFor="email">
                                    Email
                                </label>

                                <Field
                                    type="email"
                                    name="email"
                                    className="w-full px-3 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:bg-gray-600 transition duration-200"
                                    placeholder="Your email address"
                                />

                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-white text-sm font-semibold mb-2"
                                    htmlFor="password">
                                    Password
                                </label>

                                <Field type="password"
                                    name="password"
                                    className="w-full px-3 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:bg-gray-600 transition duration-200"
                                    placeholder="Your password"
                                />

                                <ErrorMessage name="password"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-white text-sm font-semibold mb-2"
                                    htmlFor="confirmPassword">
                                    Confirm Password
                                </label>

                                <Field type="password"
                                    name="confirmPassword"
                                    className="w-full px-3 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:bg-gray-600 transition duration-200"
                                    placeholder="Confirm password"
                                />

                                <ErrorMessage name="confirmPassword"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <button className={`w-full ${isSubmitting ? 'bg-gray-500' : 'bg-blue-500'} text-white font-semibold py-2 px-4 rounded-md ${!isSubmitting && 'hover:bg-blue-600'} focus:outline-none focus:bg-blue-600 transition duration-200`}
                                type="submit"
                                disabled={isSubmitting}>
                                Sign Up
                            </button>

                            <div className="mt-5 text-center">
                                <Link to="/sign-in"
                                    className="text-gray-300 font-normal text-md hover:text-blue-500 duration-300">
                                    Already have an account? Sign in!
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
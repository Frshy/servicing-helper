import { useLazyQuery } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { getAccessToken, removeAccessToken, setAccessToken, useAuth, userLoading } from "../api/auth";
import { SIGN_IN_QUERY } from "../api/schema/query/signIn";

export function SignIn() {
    const navigate = useNavigate();
    const { user: fetchedUser, loading: authLoading } = useAuth();

    const [execSignIn] = useLazyQuery(SIGN_IN_QUERY, {
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

    const signIn = async (values: any, { setSubmitting }: any) => {
        execSignIn({
            variables: {
                ...values
            },
            onCompleted(data) {
                setAccessToken(data.signIn.access_token);
                toast.success('Successfully signed in, redirecting...')
                setSubmitting(false);
                navigate('/dashboard')
            },
            onError(error) {
                error.graphQLErrors.map(({ message }) => {
                    toast.error(message, { duration: 6000 });
                });
                setSubmitting(false);
            },
        })
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup
            .string()
            .required('Password is required')
            .min(5, 'Password must be at least 5 characters')
            .max(50, 'Password must not exceed 50 characters'),
    });

    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="bg-gray-800 p-12 md:p-6 md:rounded-lg shadow-md w-full h-full md:h-fit md:max-w-md border-blue-600 md:border-t-2">
                <h2 className="text-2xl font-semibold text-white mb-6">Sign In</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={signIn}
                >
                    {({ isSubmitting }) => (
                        <Form className="relative">
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

                            <div className="mb-6">
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

                            <button className={`w-full ${isSubmitting ? 'bg-gray-500' : 'bg-blue-600'} text-white font-semibold py-2 px-4 rounded-md ${!isSubmitting && 'hover:bg-blue-700'} focus:outline-none focus:bg-blue-700 transition duration-200`}
                                type="submit"
                                disabled={isSubmitting}>
                                Sign In
                            </button>
                            <div className="mt-5 text-center">

                                <Link to="/sign-up"
                                    className="text-gray-300 font-normal text-md hover:text-blue-600 duration-300">
                                    Do not have an account? Sign up!
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
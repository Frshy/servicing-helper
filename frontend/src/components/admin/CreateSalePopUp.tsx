import { useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import { CREATE_SALE_MUTATION } from "../../api/schema/mutation/createSale";
import { UserModel } from "../../api/types";
import { allUsers, refetchSalesSignal, refetchUsersSignal } from "../../pages/Admin";
import PopUp from "../PopUp";
import SelectField from "../SelectField";

const validationSchema = Yup.object().shape({
    service: Yup
        .string()
        .required('Service is required'),
    price: Yup
        .number()
        .required('Price is required'),
    orderedBy: Yup
        .number()
        .required('Ordered by is required')
});

export default function CreateSalePopup({ setCreatingSale }: any) {
    const [execCreateSale] = useMutation(CREATE_SALE_MUTATION, {
        fetchPolicy: 'no-cache'
    });

    const createSale = (values: any) => {
        execCreateSale({
            variables: {
                orderedBy: parseInt(values.orderedBy),
                ...values
            },
            onCompleted() {
                toast.success('Successfully created sale!');

                setCreatingSale(false);
                refetchSalesSignal.value();
                refetchUsersSignal.value();
            },
            onError(error) {
                error.graphQLErrors.map(({ message }) => {
                    toast.error(message, { duration: 6000 });
                });

                refetchSalesSignal.value();
                refetchUsersSignal.value();
            },
        })
    }

    const usersItems = (allUsers.value as UserModel[]).map((user: UserModel) => {
        return {
            value: parseInt(user.id),
            label: `${user.id}. ${user.username}`
        }
    });

    return (
        <PopUp className="bg-gray-900 py-2 px-2 w-fit max-w-full h-fit">
            <div className="absolute right-2 top-auto" onClick={() => setCreatingSale(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hover:text-red-600 duration-300 cursor-pointer w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>

            <h2 className="text-lg text-center mt-2">Sale Creation</h2>

            <hr className="w-10/12 flex mx-auto my-4" />

            <Formik
                initialValues={{
                    service: '',
                    price: '',
                    orderedBy: '',
                }}
                onSubmit={createSale}
                enableReinitialize
                validationSchema={validationSchema}
            >
                <Form>
                    <ul className="text-md font-light px-4 md:px-14">
                        <li className="flex items-center my-1">
                            <div>Service: </div>

                            <Field
                                type="text"
                                name="service"
                                className="w-[250px] ml-2 px-3 py-1 rounded-md bg-slate-800 text-sm text-white focus:outline-none focus:bg-gray-700 transition duration-200"
                            />

                            <ErrorMessage
                                name="service"
                                component="div"
                                className="ml-2 text-red-500 text-sm"
                            />
                        </li>
                        <li className="flex items-center my-1">
                            <div>Price: </div>
                            <Field
                                type="number"
                                name="price"
                                className="ml-2 mr-1 w-[80px] px-3 py-1 rounded-md bg-slate-800 text-sm text-white focus:outline-none focus:bg-gray-700 transition duration-200"
                            />
                            <div>$</div>

                            <ErrorMessage
                                name="price"
                                component="div"
                                className="text-red-500 text-sm ml-2"
                            />
                        </li>
                        <li className="flex items-center my-1">
                            <div>Ordered by: </div>

                            <Field className='ml-2' component={SelectField} name="orderedBy" options={usersItems} />

                            <ErrorMessage
                                name="orderedBy"
                                component="div"
                                className="ml-2 text-red-500 text-sm"
                            />
                        </li>
                    </ul>

                    <div className="my-4"></div>

                    <div className="m-2 text-center">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 duration-300 h-fit rounded-md px-10 py-2 mr-2"
                            type="submit">
                            Create
                        </button>
                    </div>
                </Form>
            </Formik>
        </PopUp>
    )
}
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { DELETE_USER_MUTATION } from "../../api/schema/mutation/deleteUser";
import { UserModel } from "../../api/types";
import { refetchSalesSignal, refetchUsersSignal } from "../../pages/Admin";
import { formatDate } from "../../util/DateUtil";
import PopUp from "../PopUp";

interface PropsInt {
    user: UserModel | any,
    setUserToManage: any,
}

export default function UserManagementPopUp({ user, setUserToManage }: PropsInt) {
    const [execDeleteUser] = useMutation(DELETE_USER_MUTATION, {
        fetchPolicy: 'no-cache'
    });

    const deleteUser = () => {
        execDeleteUser({
            variables: {
                id: parseInt(user.id),
            },
            onCompleted(data) {
                toast.success('Successfully deleted user!');

                setUserToManage(null);
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

    return (
        <PopUp className="bg-gray-900 py-2 px-2 w-full sm:w-fit max-w-full h-fit">
            <div className="absolute right-2 top-auto" onClick={() => setUserToManage(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hover:text-red-600 duration-300 cursor-pointer w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>

            <h2 className="text-lg text-center mt-2">User Management</h2>

            <hr className="w-10/12 flex mx-auto my-4" />

            <ul className="text-md font-light px-4 md:px-14">
                <li>ID: <span className="font-normal">{user?.id}</span></li>
                <li>Username: <span className="font-normal">{user?.username}</span></li>
                <li>Email: <span className="font-normal">{user?.email}</span></li>
                <li>Role: <span className="font-normal">{user?.admin ? 'Admin' : 'User'}</span></li>
                <li>Updated At: <span className="font-normal">{formatDate(user?.updatedAt)}</span></li>
                <li>Ordered At: <span className="font-normal">{formatDate(user?.createdAt)}</span></li>
            </ul>

            <div className="my-4"></div>

            <div className="m-2 text-center">
                <button className="bg-red-700 hover:bg-red-800 duration-300 h-fit rounded-md px-10 py-2"
                    onClick={deleteUser}
                    type="button">
                    Delete</button>
            </div>
        </PopUp>
    )
}
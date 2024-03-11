import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserModel } from "../../api/types";
import { allUsers } from "../../pages/Admin";
import { formatDate } from "../../util/DateUtil";
import UserManagementPopUp from "./UserManagementPopUp";

export default function UsersList() {
    const { id: highlightedUserId } = useParams();
    const [search, setSearch] = useState('');
    const [fromLatest, setFromLatest] = useState<boolean>(false);
    const [userToManage, setUserToManage] = useState<UserModel | undefined>(undefined);

    const toggleFromLatest = () => {
        setFromLatest(!fromLatest);
    }

    let users = Array.from(allUsers.value as UserModel[]);
    if (fromLatest) {
        users.reverse();
    }

    //search bar spaghetti code
    users = users.filter((user: UserModel) => {
        return search.toLocaleLowerCase() === ''
            ? user :
            user.id.toLocaleLowerCase().includes(search) ||
            (user.username.toString() + '$').toLocaleLowerCase().includes(search) ||
            user.email.toLocaleLowerCase().includes(search) ||
            formatDate(user.createdAt).toLocaleLowerCase().includes(search)
    });

    if (highlightedUserId) {
        const indexOfSale = users.findIndex(user => user.id == highlightedUserId);
        if (indexOfSale !== -1) {
            const sale = users.splice(indexOfSale, 1)[0];
            users.unshift(sale);
        }
    }

    const usersElements = users
        .map((user: UserModel) => {
            const element = (
                <tr key={user.id}>
                    <td className="px-6 py-4 text-sm whitespace-nowrap font-medium text-gray-200">
                        {user.id}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-200">
                        {user.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                        {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                        {user.admin ? <div className="text-red-600">Admin</div> : 'User'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                        {user?.sales?.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                        {formatDate(user?.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                        <button className="text-blue-600 hover:text-blue-700 duration-300" onClick={() => { setUserToManage(user) }}>Manage</button>
                    </td>
                </tr >
            )
            return element
        })

    return (
        <div className="h-full max-h-full w-full mt-4 xl:mt-0">
            <div className="flex items-center mb-2">
                <div className="drop-shadow-xl text-2xl mr-3">
                    Users
                </div>

                <input
                    type="text"
                    className="w-[500px] px-3 py-2 rounded-md bg-slate-700 text-sm text-white focus:outline-none focus:bg-gray-600 transition duration-200"
                    placeholder="🔎 Search for users"
                    onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="bg-gray-800 w-full h-full rounded-md shadow-lg overflow-hidden overflow-y-auto overflow-x-auto">
                {users?.length ? (
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Username
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    E-Mail
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Orders
                                </th>
                                <th scope="col"
                                    className="flex items-center px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-800 duration-300"
                                    onClick={toggleFromLatest}>

                                    <div className="mr-1">Ordered At</div>

                                    {fromLatest ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                        </svg>

                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                        </svg>
                                    )}

                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Management
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700 font-light">
                            {usersElements}
                        </tbody>
                    </table>
                ) : (
                    <div className="px-7 py-5">
                        {search !== '' ? 'No results' : 'There are no users (should not be displayed)'}
                    </div>
                )}

            </div>

            {userToManage && <UserManagementPopUp user={userToManage} setUserToManage={setUserToManage} />}
        </div>
    )
}
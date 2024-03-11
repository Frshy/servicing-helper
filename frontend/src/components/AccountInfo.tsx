import { user } from "../api/auth";
import { formatDate } from "../util/DateUtil";

export default function AccountInfo() {
    return (
        <div>
            <div className="drop-shadow-xl text-2xl mb-1">Account info</div>
            <div className="bg-gray-800 h-fit w-full rounded-md shadow-lg px-7 py-5 font-light">
                <div className="text-2xl">
                    Hello
                    <span className="text-blue-500"> {user.value?.username}</span>
                    !
                </div>
                <div className="text-lg">
                    You have ordered
                    <span className="text-blue-500"> {user.value?.sales.length == 0 ? 'no' : user.value?.sales.length} </span>
                    {user.value?.sales.length == 1 ? 'service' : 'services'}.
                </div>
                <div className="text-lg">
                    You have created account at:
                    <span className="text-blue-500"> {formatDate(user.value?.createdAt)}</span>
                </div>
                <div className="text-lg">
                    Role:
                    <span className="text-blue-500"> {user.value?.admin ? 'Admin' : 'Customer'}</span>
                </div>
            </div>
        </div>
    )
}
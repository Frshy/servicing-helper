import AccountInfo from "../../components/dashboard/AccountInfo"
import DashboardChats from "../../components/dashboard/DashboardChats"
import UserOrders from "../../components/dashboard/UserOrders"

export default function DashboardOverview() {
    return (
        <>
            <div className="h-fit xl:h-full w-full flex flex-col">
                <AccountInfo />

                <div className="my-2"></div>

                <DashboardChats />
            </div>

            <div className="mx-6"></div>

            <UserOrders />

        </>
    )
}
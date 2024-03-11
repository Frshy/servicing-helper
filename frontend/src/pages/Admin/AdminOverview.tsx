import AccountInfo from "../../components/AccountInfo"
import ChatsSummary from "../../components/ChatsSummary"
import LatestSales from "../../components/admin/LatestSales"

export default function AdminOverview() {
    return (
        <>
            <div className="h-fit xl:h-full w-full flex flex-col">
                <AccountInfo />

                <div className="my-2"></div>

                <ChatsSummary />
            </div>

            <div className="mx-6"></div>

            <LatestSales />

        </>
    )
}
import { Link } from "react-router-dom";
import { user } from "../../api/auth"
import { SaleModel } from "../../api/types"
import { allSales } from "../../pages/Admin"
import { formatDate } from "../../util/DateUtil"
import PopUp from "../PopUp";

export default function LatestSales() {
    const latestSales = (allSales.value as SaleModel[])
        .map((sale: SaleModel) => {
            const element = (
                //todo: use Link element instead of onclick function
                <tr key={sale.id}
                    onClick={() => { window.location.href = `/admin/sales/${sale.id}` }}
                    className="cursor-pointer hover:bg-gray-700 duration-300">
                    <td className="px-6 py-4 text-sm whitespace-nowrap font-medium text-gray-200">
                        <Link className="text-blue-600 hover:text-blue-700 duration-300" to={`/admin/users/${sale?.user?.id ? sale.user.id : ''}`}>{sale?.user?.username ? sale.user.username : 'Deleted'}</Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-200">
                        {sale.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                        {sale.price}$
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                        {formatDate(sale?.createdAt)}
                    </td>
                </tr>
            )
            return element
        }).reverse().slice(0, 15);

    return (
        <div className="h-fit xl:h-full max-h-[500px] xl:max-h-full w-full mt-4 xl:mt-0">
            <div className="drop-shadow-xl text-2xl mb-1">Latest sales</div>
            <div className="bg-gray-800 w-full h-fit xl:h-full rounded-md shadow-lg overflow-hidden overflow-y-auto overflow-x-auto">
                {latestSales.length ? (
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Ordered By
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Service
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Ordered At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700 font-light">
                            {latestSales}
                        </tbody>
                    </table>
                ) : (
                    <div className="px-7 py-5">There are no orders.</div>
                )}
                
            </div>
        </div>
    )
}
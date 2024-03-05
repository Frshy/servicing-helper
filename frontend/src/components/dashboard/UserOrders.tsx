import { Link } from "react-router-dom"
import { user } from "../../api/auth"
import { SaleModel } from "../../api/types"
import { formatDate } from "../../util/DateUtil"

export default function UserOrders() {
    const orders = user.value?.sales.map((sale: SaleModel) => {
        const element = (
            <tr key={sale.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-200">
                    {sale.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    {sale.price}$
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    {formatDate(sale?.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    {sale.document ? (
                        <a className="text-blue-600 hover:text-blue-700 duration-300" href="{sale.document?.documentUrl}">Open</a>
                    ) :
                        'Not generated'
                    }
                </td>
            </tr>
        )
        return element
    })

    return (
        <div className="h-fit xl:h-full max-h-[600px] xl:max-h-full w-full mt-4 xl:mt-0">

            <div className="drop-shadow-xl text-2xl mb-1">Your orders</div>
            <div className="bg-gray-800 w-full h-fit xl:h-full rounded-md shadow-lg overflow-hidden overflow-y-auto overflow-x-auto">
                {user.value?.sales.length ? (
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
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
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Document
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700 font-light">
                            {orders}
                        </tbody>
                    </table>
                ) : (
                    <div className="px-7 py-5">You do not have any orderds yet, <Link className="text-blue-600 hover:text-blue-700 duration-300" to="/dashboard/chat">chat with admins</Link> to order any service.</div>
                )}

            </div>
        </div>
    )
}
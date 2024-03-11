import { Link, useParams } from "react-router-dom";
import { user } from "../../api/auth";
import { DocumentModel, SaleModel } from "../../api/types";
import { allSales, refetchSalesSignal, refetchUsersSignal } from "../../pages/Admin";
import { formatDate } from "../../util/DateUtil";
import LatestSales from "./LatestSales";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DOCUMENT_MUTATION } from "../../api/schema/mutation/createDocument";
import toast from "react-hot-toast";
import PopUp from "../PopUp";
import SaleManagementPopUp from "./SaleManagementPopUp";
import DocumentManagementPopUp from "./DocumentManagementPopUp";
import CreateSalePopup from "./CreateSalePopUp";

export default function SalesList() {
    const { id: highlightedSaleId } = useParams();
    const [search, setSearch] = useState('');
    const [fromLatest, setFromLatest] = useState<boolean>(false);
    const [documentsBeingGenerated, setDocumentsBeingGenerated] = useState<number[]>([]);
    const [saleToManage, setSaleToManage] = useState<SaleModel | undefined>(undefined);
    const [documentToManage, setDocumentToManage] = useState<DocumentModel | undefined>(undefined);
    const [creatingSale, setCreatingSale] = useState<boolean>(false);

    const [execCreateDocument] = useMutation(CREATE_DOCUMENT_MUTATION, {
        fetchPolicy: 'no-cache'
    });

    const toggleFromLatest = () => {
        setFromLatest(!fromLatest);
    }

    const createDocument = (saleId: number): void => {
        const documentBeingGenerated = documentsBeingGenerated.includes(saleId);
        if (documentBeingGenerated) {
            return;
        }

        toast('Generating the document, this may take a while...', {
            icon: '⏳',
            duration: 6000
        });

        setDocumentsBeingGenerated(
            prev => [
                ...prev,
                saleId
            ]);

        execCreateDocument({
            variables: {
                saleId
            },
            onCompleted(data) {
                toast.success('Successfully generated document and sent it in email!');

                setDocumentsBeingGenerated(
                    prev => prev.filter(a => a !== saleId)
                );

                refetchSalesSignal.value();
            },
            onError(error) {
                error.graphQLErrors.map(({ message }) => {
                    toast.error(message, { duration: 6000 });
                });

                setDocumentsBeingGenerated(
                    prev => prev.filter(a => a !== saleId)
                );

                refetchSalesSignal.value();
            },
        })
    }

    let sales = Array.from(allSales.value as SaleModel[]);
    if (fromLatest) {
        sales.reverse();
    }

    //search bar spaghetti code
    sales = sales.filter((sale: SaleModel) => {
        return search.toLocaleLowerCase() === ''
            ? sale :
            sale.id.toLocaleLowerCase().includes(search) ||
            (sale.price.toString() + '$').toLocaleLowerCase().includes(search) ||
            sale.service.toLocaleLowerCase().includes(search) ||
            sale.user.username.toLocaleLowerCase().includes(search) ||
            formatDate(sale.createdAt).toLocaleLowerCase().includes(search)
    });

    if (highlightedSaleId) {
        const indexOfSale = sales.findIndex(sale => sale.id == highlightedSaleId);
        if (indexOfSale !== -1) {
            const sale = sales.splice(indexOfSale, 1)[0];
            sales.unshift(sale);
        }
    }

    const salesElements = sales
        .map((sale: SaleModel) => {
            const documentBeingGenerated = documentsBeingGenerated.includes(parseInt(sale.id));

            const element = (
                <tr key={sale.id}>
                    <td className="px-6 py-4 text-sm whitespace-nowrap font-medium text-gray-200">
                        {sale.id}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-200">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200"
                    >
                        {sale.document ? (
                            <div
                                className="text-blue-600 hover:text-blue-700 duration-300 cursor-pointer"
                                onClick={() => setDocumentToManage(sale?.document)}>
                                Manage
                            </div>
                        ) : (
                            <div className={`cursor-pointer ${documentBeingGenerated ? 'text-gray-500' : 'text-green-600 hover:text-green-700'} duration-300`}
                                onClick={() => { createDocument(parseInt(sale.id)) }}>
                                {documentBeingGenerated ? 'Generating...' : 'Generate'}
                            </div>
                        )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                        <button className="text-blue-600 hover:text-blue-700 duration-300" onClick={() => { setSaleToManage(sale) }}>Manage</button>
                    </td>
                </tr >
            )
            return element
        })


    return (
        <div className="h-full max-h-full w-full mt-4 xl:mt-0">
            <div className="flex items-center mb-2">
                <div className="drop-shadow-xl text-2xl mr-3">
                    Sales
                </div>

                <input
                    type="text"
                    className="w-[500px] px-3 py-2 rounded-md bg-slate-700 text-sm text-white focus:outline-none focus:bg-gray-600 transition duration-200"
                    placeholder="🔎 Search for sales"
                    onChange={e => setSearch(e.target.value)} />

                <div className="ml-3 bg-blue-500 w-fit h-fit px-6 py-2 rounded-md cursor-pointer hover:bg-blue-600 duration-300"
                    onClick={() => setCreatingSale(true)}>Add Sale</div>
            </div>

            <div className="bg-gray-800 w-full h-full rounded-md shadow-lg overflow-hidden overflow-y-auto overflow-x-auto">
                {sales.length ? (
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    ID
                                </th>
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
                                    Document
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Management
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700 font-light">
                            {salesElements}
                        </tbody>
                    </table>
                ) : (
                    <div className="px-7 py-5">
                        {search !== '' ? 'No results': 'There are no sales.'}
                    </div>
                )}

            </div>

            {saleToManage && <SaleManagementPopUp sale={saleToManage} setSaleToManage={setSaleToManage} />}
            {documentToManage && <DocumentManagementPopUp documentToManage={documentToManage} setDocumentToManage={setDocumentToManage} />}
            {creatingSale && <CreateSalePopup setCreatingSale={setCreatingSale} />}
        </div>
    )
}
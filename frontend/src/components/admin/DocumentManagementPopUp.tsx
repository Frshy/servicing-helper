import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { DELETE_DOCUMENT_MUTATION } from "../../api/schema/mutation/deleteDocument";
import { DocumentModel, EmailEventModel } from "../../api/types";
import { refetchSalesSignal, refetchUsersSignal } from "../../pages/Admin";
import { formatDate } from "../../util/DateUtil";
import PopUp from "../PopUp";

interface PropsInt {
    documentToManage: DocumentModel | any,
    setDocumentToManage: any,
}

export default function DocumentManagementPopUp({ documentToManage, setDocumentToManage }: PropsInt) {
    const [execDeleteDocument] = useMutation(DELETE_DOCUMENT_MUTATION, {
        fetchPolicy: 'no-cache'
    });

    const deleteDocument = () => {
        execDeleteDocument({
            variables: {
                id: parseInt(documentToManage.id)
            },
            onCompleted() {
                toast.success('Successfully deleted document!');
                toast("Keep in mind email with sale info is still in user's inbox!", {
                    icon: '📧',
                    duration: 8000
                });

                setDocumentToManage(null);
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

    const emailOpenings = (documentToManage as DocumentModel).email.EmailEvent.map((event: EmailEventModel) => {
        const element = (
            //todo: use Link element instead of onclick function
            <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    {formatDate(event.createdAt)}
                </td>
            </tr>
        )
        return element
    }).reverse()

    return (
        <PopUp className="bg-gray-900 py-2 px-2 w-[410px] max-w-full h-fit max-h-fit">
            <div className="absolute right-2 top-auto" onClick={() => setDocumentToManage(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hover:text-red-600 duration-300 cursor-pointer w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>

            <h2 className="text-lg text-center mt-2">Document Management</h2>

            <hr className="w-10/12 flex mx-auto my-4" />

            <div className="overflow-hidden overflow-y-auto overflow-x-auto max-h-[500px]">

                {emailOpenings.length ? (
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Email Openings (Does not always work)
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700 font-light">
                            {emailOpenings}
                        </tbody>
                    </table>
                ) : (
                    <div className="px-7 py-5 text-center text-md">Email hasn't been opened by the user yet.</div>
                )}
            </div>

            <div className="m-4 text-center">
                <button className="bg-red-700 hover:bg-red-800 duration-300 h-fit rounded-md px-10 py-2"
                    onClick={deleteDocument}
                    type="button">
                    Delete
                </button>
            </div>
        </PopUp>
    )
}
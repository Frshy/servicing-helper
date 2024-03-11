import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { user, userLoading } from "../../api/auth";
import PanelLogo from "../../components/PanelLogo";
import SideNav from "../../components/SideNav";
import AdminNavElements from "../../components/admin/AdminNavElements";
import NotFound404 from "../NotFound404";
import AdminOverview from "./AdminOverview";
import { ApolloError, useQuery } from "@apollo/client";
import { GET_ALL_SALES_QUERY } from "../../api/schema/query/getAllSales";
import { signal } from "@preact/signals-react";
import { SaleModel, UserModel } from "../../api/types";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import Sales from "./Sales";
import { FIND_ALL_USERS_QUERY } from "../../api/schema/query/findAllUsers";
import Users from "./Users";

export const allSales = signal<SaleModel[] | undefined>(undefined);
export const allUsers = signal<UserModel[] | undefined>(undefined);
export const refetchSalesSignal = signal<any>(undefined);
export const refetchUsersSignal = signal<any>(undefined);

export default function AdminPanel() {
    const { loading: getAllSalesLoading, error: getAllSalesError, data: GetAllSalesData, refetch: refetchSales } = useQuery(GET_ALL_SALES_QUERY);
    const { loading: findAllUsersLoading, error: findAllUsersError, data: FindAllUsersData, refetch: refetchUsers } = useQuery(FIND_ALL_USERS_QUERY);
    refetchSalesSignal.value = refetchSales;
    refetchUsersSignal.value = refetchUsers;

    const navigate = useNavigate();

    //effect from signals makes some problem here, on first dashboard launch after redirecting user.value is null (probably some way to fix it but already tired with client auth for now)
    useEffect(() => {
        if (!user.value && !userLoading.value) {
            navigate('/sign-in');
        }
    }, [user.value, userLoading.value]);


    if (userLoading.value) {
        return <NotFound404 />
    }

    if (!user.value?.admin) {
        return <NotFound404 />
    }

    if (getAllSalesLoading || findAllUsersLoading) {
        return <Loader />
    }

    //trash fetching code ;/
    if (getAllSalesError) {
        getAllSalesError.graphQLErrors.map(({ message }) => {
            toast.error(`Failed fetching sales: ${message}`, { duration: 6000 });
        });
    } else {
        allSales.value = GetAllSalesData.getAllSales;
    }

    if (findAllUsersError) {
        findAllUsersError.graphQLErrors.map(({ message }) => {
            toast.error(`Failed fetching sales: ${message}`, { duration: 6000 });
        });
    } else {
        allUsers.value = FindAllUsersData.findAllUsers;
    }

    return (
        // container
        <div className="flex w-full h-full w-full bg-gray-900">

            {/* left side */}
            <SideNav>
                <PanelLogo />
                <AdminNavElements />
            </SideNav>

            {/* right side */}
            <div className="w-full h-full bg-gray-900 text-white px-3 xl:px-12 p-12 pb-20 overflow-hidden overflow-y-auto overflow-x-auto flex flex-col xl:flex-row">
                <Routes>
                    <Route path="/" element={<AdminOverview />} />
                    <Route path="/sales/" element={<Sales />} />
                    <Route path="/sales/:id" element={<Sales />} />
                    <Route path="/users/" element={<Users />} />
                    <Route path="/users/:id" element={<Users />} />
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
            </div>

        </div >
    );
}
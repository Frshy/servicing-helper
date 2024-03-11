import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { user, userLoading } from "../../api/auth";
import Loader from "../../components/Loader";
import PanelLogo from "../../components/PanelLogo";
import DashboardNavElements from "../../components/dashboard/DashboardNavElements";
import DashboardOverview from "./DashboardOverview";
import SideNav from "../../components/SideNav";
import NotFound404 from "../NotFound404";

export function Dashboard() {
    const navigate = useNavigate();

    //effect from signals makes some problem here, on first dashboard launch after redirecting user.value is null (probably some way to fix it but already tired with client auth for now)
    useEffect(() => {
        if (!user.value && !userLoading.value) {
            navigate('/sign-in');
        }
    }, [user.value, userLoading.value]);


    if (userLoading.value) {
        return <Loader />
    }

    return (
        // container
        <div className="flex w-full h-full w-full bg-gray-900">

            {/* left side */}
            <SideNav>
                <PanelLogo />
                <DashboardNavElements />
            </SideNav>

            {/* right side */}
            <div className="w-full h-full bg-gray-900 text-white px-3 lg:px-12 p-12 pb-20 overflow-hidden overflow-y-auto overflow-x-auto flex flex-col xl:flex-row">
                <Routes>
                    <Route path="/" element={<DashboardOverview />} />
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
            </div>

        </div >
    );
};
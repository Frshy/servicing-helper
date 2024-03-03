import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { user, userLoading } from "../api/auth";

export function Dashboard() {
    const navigate = useNavigate();

    //effect from signals makes some problem here, on first dashboard launch after redirecting user.value is null (probably some way to fix it but already tired with client auth for now)
    useEffect(() => {
        if (!user.value && !userLoading.value) {
            navigate('/sign-in');
        }
    }, [user.value, userLoading.value]);


    if (userLoading.value ) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader"></div>
            </div>
        )
    }

    if (!user.value) {
        return null;
    }

    return (
        <div>
            <h1>Welcome, {(user.value as any).username}!</h1>
        </div>
    );

};
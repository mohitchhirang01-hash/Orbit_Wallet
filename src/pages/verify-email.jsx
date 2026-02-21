import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function VerifyEmail() {
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    // The 'useAuth' hook and 'verifyEmail' function do not exist in the Vite project yet.
    // This is a placeholder that simulates the verification process.
    // const { verifyEmail, isLoading } = useAuth();

    useEffect(() => {
        if (token) {
            (async () => {
                setIsLoading(true);
                // Simulate an API call:
                // const success = await verifyEmail(token);

                // Placeholder simulation (Change to true/false to test states):
                const mockSuccess = true;

                // Simulate network delay
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSuccess(mockSuccess);
                setIsLoading(false);

                // Redirect after 5 seconds
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 5000);
            })();
        } else {
            setIsLoading(false);
            setSuccess(false);
        }
    }, [token, navigate]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen bg-white/60 justify-center items-center px-5">
                <div className="text-xl font-medium text-slate-800">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-screen bg-white/60 justify-center items-center px-5">
            <div className="flex flex-col bg-white rounded-2xl items-center overflow-hidden gap-10 pb-10 px-5 shadow-lg pt-10 w-full max-w-sm">
                {success ? (
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                ) : (
                    <AlertCircle className="h-12 w-12 text-red-500" />
                )}

                <div className="flex flex-col items-center gap-3">
                    <p className="text-black text-xl font-medium text-center">
                        {success
                            ? "You have successfully verified your email"
                            : "Email verification failed"}
                    </p>
                </div>
            </div>
        </div>
    );
}
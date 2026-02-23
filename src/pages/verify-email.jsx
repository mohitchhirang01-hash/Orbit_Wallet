import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function VerifyEmail() {
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const verifyToken = async () => {
            if (!token) {
                if (isMounted) {
                    setIsLoading(false);
                    setSuccess(false);
                }
                return;
            }

            try {
                if (isMounted) setIsLoading(true);

                // Replacing the old `verifyEmail` hook with a direct API fetch.
                // NOTE: Change this API URL to match your actual backend endpoint.
                const apiUrl = import.meta.env.VITE_API_URL || "https://api.orbitwallet.in";
                const response = await fetch(`${apiUrl}/auth/verify-email`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                if (isMounted) {
                    // Check if response is successful
                    setSuccess(response.ok);
                }
            } catch (error) {
                console.error("Email verification error:", error);
                if (isMounted) {
                    setSuccess(false);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                    // Redirect after 5 seconds just like the NextJS version
                    setTimeout(() => {
                        navigate("/", { replace: true });
                    }, 5000);
                }
            }
        };

        verifyToken();

        return () => {
            isMounted = false;
        };
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
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import heroImage from "../assets/bg_herosection_light_without_card.webp"; // Using available hero as fallback

function Subscription() {
    const [searchParams] = useSearchParams();
    const paymentSessionId = searchParams.get("paymentSessionId");

    useEffect(() => {
        if (paymentSessionId) {
            (async () => {
                const cashfree = await load({
                    mode: import.meta.env.VITE_APP_ENV === "production" ? "production" : "sandbox",
                });

                cashfree
                    .subscriptionsCheckout({
                        subsSessionId: paymentSessionId,
                        redirectTarget: "_self",
                    })
                    .then(function (result) {
                        if (result.error) {
                            console.error("Cashfree subscription error:", result.error);
                        }
                    });
            })();
        }
    }, [paymentSessionId]);

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[var(--orbit-primary)] px-6">
            <img
                src={heroImage}
                alt="subscription-auth-status"
                className="flex-1 max-h-[600px] object-contain animate-floating"
            />
        </div>
    );
}

export default Subscription;
import React from "react";
// Assuming the image is actually stored in the Vite project assets:
import heroImage from "../assets/bg_herosection_light_without_card.webp"; // Using available hero as fallback

export default function SubscriptionAuthStatus() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-[var(--orbit-primary)] px-6">
            <img
                src={heroImage}
                alt="subscription-auth-status"
                className="flex-1 max-h-[600px] object-contain animate-floating"
            />
        </div>
    );
}
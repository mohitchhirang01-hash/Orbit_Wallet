import React, { useEffect } from "react";

export default function RefundPolicy() {
    useEffect(() => {
        // Redirects to the Notion Refund Policy doc
        window.location.replace("https://orbitwallet.notion.site/Refund-Policy-53bd02d3ae7f4ee8a9de8860d7dfe9d5");
    }, []);

    return <div>Redirecting to Refund Policy...</div>;
}
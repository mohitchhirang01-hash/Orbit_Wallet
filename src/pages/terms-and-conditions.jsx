import React, { useEffect } from "react";

export default function TermsAndConditions() {
    useEffect(() => {
        // Redirects to the Notion Terms and Conditions doc
        window.location.replace("https://orbitwallet.notion.site/Terms-Conditions-71db29ea149e443e92516e2e8499969c");
    }, []);

    return <div>Redirecting to Terms and Conditions...</div>;
}
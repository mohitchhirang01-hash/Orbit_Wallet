import { useEffect } from 'react';

// Constants for store links (equivalent to your STORE_LINKS in utils/constants)
const STORE_LINKS = {
    ios: "https://apps.apple.com/in/app/orbit-wallet/id6480415069",
    google: "https://play.google.com/store/apps/details?id=com.orbitwallet&hl=en_IN"
};

/**
 * A custom hook that replicates Next.js Edge Middleware for App Store redirects.
 * It checks the user agent and redirects iOS users to the App Store, and Android users to Google Play.
 * Desktop users (or unrecognized agents) will remain on the page.
 */
export function useAppRedirect() {
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            window.location.replace(STORE_LINKS.ios);
        } else if (/android/i.test(userAgent)) {
            window.location.replace(STORE_LINKS.google);
        }
    }, []);
}

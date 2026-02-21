import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

let isInitialized = false;

export const initMixpanel = () => {
    if (isInitialized || typeof window === "undefined") return;

    if (!MIXPANEL_TOKEN) {
        console.warn("Mixpanel token is missing! Check your .env file.");
        return;
    }

    mixpanel.init(MIXPANEL_TOKEN, { autocapture: false });
    isInitialized = true;
};

export const track = (eventName, properties) => {
    if (!isInitialized) return;

    mixpanel.track(eventName, {
        ...properties,
        platform: 'web',
    });
};
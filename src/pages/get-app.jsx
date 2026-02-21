import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export default function GetApp() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/?sectionId=footer", { replace: true });
    }, [navigate]);

    return null;
}
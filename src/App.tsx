import React, { useState } from "react";
import { callBackendWithSsoToken, BackendResponse } from "./api";

// Typen aus @types/office-js
declare const OfficeRuntime: any;

export default function App() {
    const [status, setStatus] = useState<string>("Bereit");
    const [backendResult, setBackendResult] = useState<BackendResponse | null>(null);

    async function handleCallBackend() {
        try {
            setStatus("Hole SSO-Token …");

            // Moderne API, nur noch diese 2 Flags verwenden
            const token: string = await OfficeRuntime.auth.getAccessToken({
                allowConsentPrompt: false,
                allowSignInPrompt: true
            });

            setStatus("Token erhalten → Backend wird aufgerufen …");

            const result = await callBackendWithSsoToken(token);
            setBackendResult(result);

            setStatus("Backend erfolgreich");
        } catch (err: any) {
            console.error("SSO-Fehler:", err);

            // Offizielle Microsoft-Fehlercodes
            switch (err.code) {
                case 13003:
                    setStatus("Benutzer ist nicht angemeldet oder SSO nicht verfügbar (13003).");
                    break;
                case 13005:
                    setStatus("Dieser Office-Host unterstützt kein SSO (13005).");
                    break;
                case 13007:
                    setStatus("AAD-Token konnte nicht ausgestellt werden (13007).");
                    break;
                default:
                    setStatus("Fehler: " + (err.message ?? err.toString()));
            }
        }
    }

    return (
        <div style={{ padding: "1rem" }}>
            <h1>Outlook Add-in (React + Vite + Modern SSO)</h1>

            <p>Status: {status}</p>

            <button onClick={handleCallBackend}>Mit Backend sprechen</button>

            {backendResult && (
                <div style={{ marginTop: "1rem" }}>
                    <h2>Backend-Antwort</h2>
                    <pre style={{
                        background: "#eee",
                        padding: "0.5rem",
                        borderRadius: "4px"
                    }}>
            {JSON.stringify(backendResult, null, 2)}
          </pre>
                </div>
            )}
        </div>
    );
}

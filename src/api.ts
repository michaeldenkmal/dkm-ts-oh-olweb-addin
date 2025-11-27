export interface BackendResponse {
    message: string;
    oid?: string;
    upn?: string;
}

export async function callBackendWithSsoToken(
    ssoToken: string
): Promise<BackendResponse> {
    const response = await fetch("https://dein-backend.example.com/api/graph/me", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + ssoToken
        },
        body: JSON.stringify({}) // falls du Payload brauchst
    });

    if (!response.ok) {
        throw new Error("Backend error: " + response.status);
    }

    return (await response.json()) as BackendResponse;
}

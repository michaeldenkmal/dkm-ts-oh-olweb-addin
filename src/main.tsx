import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Wenn du @types/office-js verwendest, kannst du Office normal tippen
declare const Office: any;

function render() {
    const rootElement = document.getElementById("root")!;
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}

// Office.onReady stellt sicher, dass Office-Host bereit ist
if (typeof Office !== "undefined" && Office.onReady) {
    Office.onReady(function () {
        render();
    });
} else {
    // Fallback (z. B. im Browser für Dev-Test ohne Outlook-Host)
    render();
}

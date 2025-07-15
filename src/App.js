import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from "react-router-dom";
import URLShortenerForm from "./components/URLShortenerForm";
import URLStatistics from "./components/URLStatistics";
import { resolveShortcode, recordClick } from "./api";
import { logEvent } from "./middleware/logger";

const RedirectPage = () => {
  const { code } = useParams();
  try {
    const url = resolveShortcode(code);
    recordClick(code);
    logEvent("frontend", "info", "RedirectPage", `Redirecting to ${url}`);
    window.location.href = url;
  } catch (err) {
    logEvent("frontend", "error", "RedirectPage", err.message);
    return <p>{err.message}</p>;
  }
  return <p>Redirecting...</p>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLShortenerForm />} />
        <Route path="/stats" element={<URLStatistics />} />
        <Route path="/:code" element={<RedirectPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

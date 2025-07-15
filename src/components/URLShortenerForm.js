import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Grid } from "@mui/material";
import { shortenURL } from "../api";
import { logEvent } from "../middleware/logger";

const URLShortenerForm = () => {
  const [entries, setEntries] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (i, key, val) => {
    const newEntries = [...entries];
    newEntries[i][key] = val;
    setEntries(newEntries);
  };

  const addEntry = () => {
    if (entries.length < 5)
      setEntries([...entries, { longUrl: "", validity: "", shortcode: "" }]);
  };

  const handleSubmit = () => {
    const res = [];
    for (const entry of entries) {
      try {
        if (!/^https?:\/\//.test(entry.longUrl)) throw new Error("Invalid URL");
        const result = shortenURL(entry.longUrl, parseInt(entry.validity), entry.shortcode);
        res.push({ ...result, longUrl: entry.longUrl });
        logEvent("frontend", "info", "URLShortener", `Shortened: ${entry.longUrl}`);
      } catch (err) {
        alert(err.message);
        logEvent("frontend", "error", "URLShortener", err.message);
      }
    }
    setResults(res);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5">URL Shortener</Typography>
      {entries.map((entry, idx) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={5}>
            <TextField
              label="Long URL"
              fullWidth
              value={entry.longUrl}
              onChange={(e) => handleChange(idx, "longUrl", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Validity (mins)"
              type="number"
              fullWidth
              value={entry.validity}
              onChange={(e) => handleChange(idx, "validity", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Custom Shortcode"
              fullWidth
              value={entry.shortcode}
              onChange={(e) => handleChange(idx, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addEntry} disabled={entries.length >= 5}>Add</Button>
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>Shorten</Button>

      <Typography mt={3} variant="h6">Results:</Typography>
      {results.map((r, idx) => (
        <Paper key={idx} sx={{ mt: 2, p: 2 }}>
          <div>Original: {r.longUrl}</div>
          <div>Short URL: <a href={`/${r.shortcode}`} target="_blank" rel="noreferrer">{window.location.origin}/{r.shortcode}</a></div>
          <div>Expires: {r.expiry.toString()}</div>
        </Paper>
      ))}
    </Paper>
  );
};

export default URLShortenerForm;

import React from "react";
import { getStats } from "../api";
import { Typography, Paper } from "@mui/material";
import { logEvent } from "../middleware/logger";

const URLStatistics = () => {
  const stats = getStats();

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">Statistics</Typography>
      {Object.entries(stats).map(([code, data]) => (
        <Paper sx={{ mt: 2, p: 2 }} key={code}>
          <div>Short: <a href={`/${code}`}>{window.location.origin}/{code}</a></div>
          <div>Created: {data.created.toString()}</div>
          <div>Expires: {data.expiry.toString()}</div>
          <div>Clicks: {data.clicks.length}</div>
          <ul>
            {data.clicks.map((click, i) => (
              <li key={i}>{click.time.toString()} - {click.source} - {click.location}</li>
            ))}
          </ul>
        </Paper>
      ))}
    </Paper>
  );
};

export default URLStatistics;

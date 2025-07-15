const API_URL = "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJheXVzaGdvZWw1NDRAZ21haWwuY29tIiwiZXhwIjoxNzUyNTYwMDY4LCJpYXQiOjE3NTI1NTkxNjgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI0NDBmZTkyNS02MGY5LTQ4MTgtODcwYS1lZWFlNTQ0M2RkMzkiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJheXVzaCBnb2VsIiwic3ViIjoiZjlmZGFjODEtNmUzZC00ZmVhLWI5NGYtMjMxODAyYzE2NWRiIn0sImVtYWlsIjoiYXl1c2hnb2VsNTQ0QGdtYWlsLmNvbSIsIm5hbWUiOiJheXVzaCBnb2VsIiwicm9sbE5vIjoiMjIxODU2MCIsImFjY2Vzc0NvZGUiOiJRQWhEVXIiLCJjbGllbnRJRCI6ImY5ZmRhYzgxLTZlM2QtNGZlYS1iOTRmLTIzMTgwMmMxNjVkYiIsImNsaWVudFNlY3JldCI6IlFBaE1ZYkZUd1BXVEdGdHQifQ.zZb9an88nsHY7Cp9dH5icOnGMcClofAW9aVoPvbDC34"; 
export async function logEvent(stack, level, pkg, message) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch (err) {
    console.error("Logging failed:", err);
  }
}

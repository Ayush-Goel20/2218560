let db = {};
export function generateShortcode() {
  return Math.random().toString(36).substring(2, 8);
}
export function shortenURL(longUrl, validity, customCode) {
  const code = customCode || generateShortcode();
  const now = new Date();
  const expiry = new Date(now.getTime() + (validity || 30) * 60 * 1000);
  if (db[code]) throw new Error("Shortcode already exists.");
  db[code] = {
    longUrl,
    created: now,
    expiry,
    clicks: [],
  };
  return { shortcode: code, expiry, created:now };
}

export function resolveShortcode(code) {
  const entry = db[code];
  if (!entry) throw new Error("Shortcode not found");
  if (new Date() > entry.expiry) throw new Error("Shortcode expired");
  return entry.longUrl;
}

export function recordClick(code) {
  const entry = db[code];
  if (!entry) return;
  entry.clicks.push({
    time: new Date(),
    source: "browser",
    location: "India", 
  });
}

export function getStats() {
  return db;
}

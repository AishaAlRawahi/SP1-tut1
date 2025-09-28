// src/middleware/errorHandler.js
export function notFound(req, res, next) {
  res.status(404).json({ error: "route not found" });
}

export function errorHandler(err, req, res, next) {
  console.error("❌", err);
  res.status(500).json({ error: "internal server error" });
}

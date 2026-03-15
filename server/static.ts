import express, { type Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function serveStatic(app: Express) {
  const clientPath = path.resolve(__dirname, "..", "client");
  
  // Serve static assets from the client directory
  app.use(express.static(clientPath));

  // Serve static files from the public directory as well
  const publicPath = path.resolve(clientPath, "public");
  app.use(express.static(publicPath));

  // Fallback to index.html for SPA routing
  // Use a regex that excludes anything starting with /api
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

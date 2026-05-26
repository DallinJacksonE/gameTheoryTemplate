import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import apiRouter from './api.js';
import { handleConnection } from './ws.js'; // You will import your ws.ts logic here later

const app = express();
const server = http.createServer(app);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount the RESTful API routes under the '/api' path
app.use('/api', apiRouter);

// Initialize the WebSocket server instance and attach it to the HTTP server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, _req) => {
  handleConnection(ws, _req);
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`HTTP Server running on http://localhost:${PORT}`);
  console.log(`WebSocket Server listening on ws://localhost:${PORT}`);
});

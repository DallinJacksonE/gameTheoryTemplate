import type { WebSocket } from 'ws';
import type { IncomingMessage } from 'http';
import { gameManager } from './game_manager.js';

export function handleConnection(ws: WebSocket, _req: IncomingMessage): void {
  console.log('Client connected to WebSocket.');

  ws.on('message', (rawMessage) => {
    try {
      const parsed = JSON.parse(rawMessage.toString());

      // Basic Action Dispatcher Pattern
      switch (parsed.type) {
        case 'GET_STATE':
          if (parsed.lobbyId) {
            const game = gameManager.getGame(parsed.lobbyId);
            if (game) {
              ws.send(JSON.stringify({ type: 'GAME_STATE', payload: game.getState() }));
            } else {
              ws.send(JSON.stringify({ type: 'ERROR', message: 'Game not found or already finished.' }));
            }
          }
          break;

        default:
          console.log('Unknown action type:', parsed.type);
      }
    } catch (error) {
      console.error('Failed to parse WS message:', error);
      ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid JSON payload' }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected from WS.');
  });
}

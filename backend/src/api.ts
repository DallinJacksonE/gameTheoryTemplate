// Change line 1 to use 'type':
import { Router, type Request, type Response } from 'express';
import { gameManager } from './game_manager.js';
const router = Router();

// Change line 10 to underscore the unused '_req':
router.get('/status', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    message: 'Game server is up and running.',
    timestamp: new Date().toISOString()
  });
});

/**
 * Create a New Game Lobby
 * POST /api/lobbies
 * Expects JSON body: { "lobbyName": "string" }
 */
router.post('/lobbies', (req: Request, res: Response) => {
  const { lobbyName } = req.body;

  if (!lobbyName) {
    return res.status(400).json({ error: 'lobbyName is required to create a game.' });
  }

  // TODO: Integrate with your models/Lobby.ts to actually create and store the instance
  const mockLobbyId = Math.random().toString(36).substring(2, 9); // Simple random ID
  gameManager.createGame(mockLobbyId);
  res.status(201).json({
    message: 'Lobby successfully created.',
    data: {
      lobbyId: mockLobbyId,
      lobbyName: lobbyName
    }
  });
});

export default router;

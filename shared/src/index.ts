export enum SessionState {
  LOBBY = 'LOBBY',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}

export interface Participant {
  id: string;
  name: string;
  isHuman: boolean;
}

export interface LobbyConfig {
  agentCount: number;
  targetAddress: string;
  humanOptIn: boolean;
}

export interface StateUpdatePayload {
  type: 'STATE_UPDATE';
  sessionState: SessionState;
  participants: Participant[];
  config: LobbyConfig;
}

export interface ClientMessage {
  type: 'UPDATE_CONFIG' | 'START_GAME' | 'HUMAN_JOIN' | 'HUMAN_LEAVE';
  payload?: Partial<LobbyConfig>;
}

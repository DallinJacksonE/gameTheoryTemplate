# Template

This is a template built for the needs of Jacob Crandall's AI-Human Interaction Lab at BYU. Having this template, potential games can quickly be mocked and tested, as well as deployed for production locally or using cloud infrastructure. If you are needing to utilize this template, please fork this repository for you and your team.

## Getting Started

Make a fork of this repository and clone your repo to your machine. You will need:
- **Docker**: Have the docker and docker compose tools installed, not just the VS extensions.
- **Node**: Install node, you will need a newer version than will come with Ubuntu's apt installer, go for v24.16.0 at least.
- **Python**: For compatibility with bot clients.
- **Typescript**: A Typescript LSP is recommended so that the power of types can keep your back and frontend working together

### Quickstart

After cloning your fork to your machine, run 

<div style="position: relative; border-radius: 6px; overflow: hidden; border: 1px solid #e1e48;">
  <button style="position: absolute; top: 8px; right: 8px; padding: 3px 8px; font-size: 12px; font-weight: 500; color: #24292e; background-color: #f6f8fa; border: 1px solid #d1d5da; border-radius: 4px; cursor: pointer; z-index: 1;" onclick="navigator.clipboard.writeText(document.getElementById('styled-code').textContent.trim()).then(() => { this.textContent = 'Copied!'; setTimeout(() => this.textContent = 'Copy', 2000); })"></button>
  <pre style="margin: 0; background-color: #f6f8fa; padding: 16px;"><code id="styled-code" style="font-family: SFMono-Regular, Consolas, monospace; color: #24292e;">sudo docker compose up --build</code></pre>
</div>   

to spin up the docker containers on your machine. If you have processes running on those ports you can either free those up for the docker containers or change the ports they run on in the docker-compose.yml.

If you are wanting to work on the frontend with vite's hot reloading you should run
<div style="position: relative; border-radius: 6px; overflow: hidden; border: 1px solid #e1e48;">
  <button style="position: absolute; top: 8px; right: 8px; padding: 3px 8px; font-size: 12px; font-weight: 500; color: #24292e; background-color: #f6f8fa; border: 1px solid #d1d5da; border-radius: 4px; cursor: pointer; z-index: 1;" onclick="navigator.clipboard.writeText(document.getElementById('styled-code').textContent.trim()).then(() => { this.textContent = 'Copied!'; setTimeout(() => this.textContent = 'Copy', 2000); })"></button>
  <pre style="margin: 0; background-color: #f6f8fa; padding: 16px;"><code id="styled-code" style="font-family: SFMono-Regular, Consolas, monospace; color: #24292e;">sudo docker compose up backend --build</code></pre>
</div>  

which will only start the needed backend processes, make sure your ```vite.config``` points all HTTP and WS traffic to the backend container port ```http://localhost:<backend port>``` and ```ws://localhost:<backend port>```.

Flask has hot reloading as well, you can toggle this on or off in the app.py in the ```/backend``` directory.

### Longstart

This is a full-stack application with a Typescript React frontend and a Python backend. These services are written to run as separate processes on the hosted machine, where the frontend hosts the website files and acts as a proxy to the backend for API calls. This means that with a cloudflare tunnel, you only need to have one port exposed. (TODO write about cloudflare deployment)

**Frontend**
The Frontend is a high-performance React application serving as the visual interface for the game. Using an MVP (Model-View-Presenter) architecture, it renders views entirely based on the JSON game_state pushed down from the backend via WebSockets, keeping the UI dumb and the backend authoritative. For building your application, you will want to write .tsx components in the ```/components``` directory that render according to the ```game_state``` JSON sent down from your backend. The frontend starts a WS connection when a user joins the game instance, so all relevant game info should be will be sent in payloads defined in the ```GameplayPresenter.ts```.

> [!NOTE] Types
All data packets and game specific types (i.e player, game_state, map, etc.) are defined in the ```types.ts``` file. If it isn't a type defined there, then there is a _high_ chance that no one will know what you are sending to the backend.

See more in the frontend's README

**Backend**
The TS Node Backend is the authoritative game server. It manages the lifecycle of game lobbies, handles real-time bidirectional communication via WebSockets, and enforces the rules of the game to prevent client-side cheating.

- index.ts: The entry point of the application. It bootstraps the environment, initializes the Express server for standard HTTP traffic, attaches the WebSocket server to it, and starts listening on your designated port (e.g., 8080).

- api.ts: Handles standard RESTful routes. You use this for stateless operations before a game begins—like user authentication, fetching leaderboards, creating a new game lobby, or returning the current active server status.

- ws.ts: The WebSocket lifecycle manager. It handles raw connection events (onConnect, onMessage, onDisconnect). When a message is received, this file parses the raw buffer into JSON, determines which game lobby the user belongs to, and passes the payload to the Action Dispatcher.

- game.ts: The core game engine/loop. This file holds the logic for evaluating the current state of a specific match, checking win/loss conditions, advancing turns, and broadcasting the updated game_state back to all connected players in that lobby.

- models/: A directory containing the data classes and entities of your game. You would put files like Player.ts, Lobby.ts, or Board.ts here. These classes hold instance-specific data and helper methods (e.g., player.reduceHealth(10)).

- actions/ActionDispatcher.ts: The traffic cop for gameplay. When ws.ts receives a parsed JSON message, the Dispatcher looks at the action's type (e.g., "PLAY_CARD", "MOVE_UNIT") and routes the payload to the appropriate handler function.

- actions/actions.ts: Contains the actual handler functions executed by the Dispatcher. These functions contain the specific business logic for a move—they validate if the move is legal, apply the changes to the models, and tell the game.ts engine to process the next turn.


## Brief Overviews

### Cloudflare Tunnel Deployment 
TODO write about what it is and why it is great for the labs needs. (Any computer, not just ones on the LAN)

### Model View Presenter Architecture
TODO write overview of what this is

### Command Pattern
TODO overview of what this is and how its used by the Action Dispatcher to run logic based on the websocket packet sent from the client passed from ```game.ts```.

### Database Factory
TODO why this is helpful to have an In Memory db for development and then how it can be used to implement any time of db storage needed.

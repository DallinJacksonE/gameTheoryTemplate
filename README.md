# Template

This is a template built for the needs of Jacob Crandall's AI-Human Interaction Lab at BYU. Having this template, potential games can quickly be mocked and tested, as well as deployed for production locally or using cloud infrastructure. If you are needing to utilize this template, please fork this repository for you and your team.

## Getting Started

Make a fork of this repository and clone your repo to your machine. You will need:
- **Docker**: Have the docker and docker compose tools installed, not just the VS extensions.
- **Node**: Install node, you will need a newer version than will come with Ubuntu's apt installer, go for v24.16.0 at least.
- **Python**: The backend is written in python for compatibility with bot clients.
- **Typescript**: A Typescript LSP is recommended so that the power of types can keep your back and frontend working together

### Quickstart

After cloning your fork to your machine, run ```sudo docker compose up --build``` to spin up the docker containers on your machine. If you have processes running on those ports you can either free those up for the docker containers or change the ports they run on in the docker-compose.yml.

If you are wanting to work on the frontend with vite's hot reloading you should run ```sudo docker compose up backend --build``` which will only start the needed backend processes, make sure your vite.config points all HTTP and WS traffic to the backend container port ```http://localhost:<backend port>``` and ```ws://localhost:<backend port>```.



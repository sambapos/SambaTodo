# SambaTodo
Todo app implemented with SambaPOS Tasks

#Installation
- Install NodeJS (https://nodejs.org/)
- Install Github Client (https://desktop.github.com/)
- Add git executable path to Windows Environment variables. (http://stackoverflow.com/questions/26620312/installing-git-in-path-with-github-client-for-windows)
- run `git clone https://github.com/sambapos/SambaTodo.git` command to download project. 
- run `npm install` command under project folder to install libraries.
- `npm run start` will start dev server on 8080 port.
- `npm run build` will build for production. 

#Configuration
- Edit app > queries.js and set `serverUrl` constant to setup GraphQL Server.
- Edit app > signalr.js and set `serverUrl` constant to setup SignalR Server.

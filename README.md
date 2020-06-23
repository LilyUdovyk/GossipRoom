# Gossip Room

**Gossip Room** – Messaging App <br>
**Live demo** [gossip-room.surge.sh](http://gossip-room.surge.sh/)

## Technologies

- React
- TypeScript
- Redux
- Redux-Saga
- GraphQL query
- AJAX
- Socket.IO


## Install

1.	Clone the repo ```git clone git@github.com:LilyUdovyk/GossipRoom.git```
2.	Change directory ```cd GossipRoom```
3.	Install dependencies ```npm install``` or ```yarn install``` <br>
4.	Run the application ```npm start``` or ```yarn start```


## Deploy

I chose to deploy Surge, but you can choose any other resource

1. Getting Surge ```npm install -g surge``` or ```yarn global add  surge```
2. Add a new value to *package.json* at the top level ```"homepage": "./"```
3. In *package.json* in the *scripts* section, replace the value *build* ```"build": "react-scripts build && cp build/index.html build/404.html"```
4. Preparing to deploy ```npm run build``` or ```yarn build```
5. Change directory ```cd build```
6. Deploying ```surge```
7. Hit **enter** in your project directory to get it online immediately
8. Setting the hostname *NAME.surge.sh*


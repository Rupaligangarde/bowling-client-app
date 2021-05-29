# Bowling Client Application

## Description

This client side application has two scripts which calls apis of bowling case study game.

1. server-side-roll-scripts.js
   This script starts game, send only player name , displays score after every roll.

2. client-side-roll-scripts.js
   This script starts game, send only player name & point, displays score after every roll.


## Running Locally

To run the application locally, please follow following steps:

* install node packages `npm i`
* to run client-side-roll-scripts.js `node client-side-roll-scripts.js`
* to run server-side-roll-scripts.js `node server-side-roll-scripts.js`

## APIS provided by server

* To start the game  `http://localhost:8080/bowling/start`
* To roll with player names and points provided`http://localhost:8080/bowling/:gameId/roll`
* To roll with just player names and app generating points `http://localhost:8080/bowling/v2/:gameId/roll`
* To get scoreboard of all players `http://localhost:8080/bowling/:gameId/score`


Please find automated client side application here.
*  [Blowing server side app](https://github.com/Rupaligangarde/bowling-server-app)

const fetch = require('node-fetch');
const baseUrl = "http://localhost:8080/bowling";

const players = ["test-player1", "test-player2"];
const startReqBody = { "players": players };

const post = (baseUrl, reqBody) => fetch(baseUrl, { method: 'POST', body: JSON.stringify(reqBody),  headers: { 'Content-Type': 'application/json' }});
const get = baseUrl => fetch(baseUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' }});

(async () => {
  try {

    const gameId = await post(baseUrl + "/start", startReqBody).then(res => res.text());
    console.log('------------------------------------------------------------------');
    console.log("GAME STARTED: ", gameId)
    console.log('------------------------------------------------------------------');
    const newBaseUrl = baseUrl + "/" + gameId;

    const scoreResponse = await get(newBaseUrl + "/score").then(res => res.json());
    console.log("INITIAL SCORE: ", scoreResponse);

    for(let i = 1; i <= 10; i++) {
       console.log('------------------------------------------------------------------');
        console.log("ROLLING FOR FRAME: ", i);
        await post(baseUrl + "/v2/"+ gameId + "/roll");
        const scorePostGame = await get(newBaseUrl + "/score").then(res => res.json());
        console.log("FINAL SCORE: ", scorePostGame);
      
      };

  } catch (error) {
    console.log(error.response.body);
  }
})();
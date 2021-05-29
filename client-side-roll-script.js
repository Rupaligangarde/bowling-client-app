const fetch = require('node-fetch');

const baseUrl = "http://localhost:8080/bowling";

const players = ["test-player1", "test-player2"];
const startReqBody = { "players": players };

const post = (baseUrl, reqBody) => fetch(baseUrl, { method: 'POST', body: JSON.stringify(reqBody),  headers: { 'Content-Type': 'application/json' }});
const get = baseUrl => fetch(baseUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' }});

const roll1Point = ()=> Math.floor(Math.random() * 11);

const roll2Point = (value) => Math.floor(Math.random() * value + 1);

(async () => {
  try {

    const gameId = await post(baseUrl + "/start", startReqBody).then(res => res.text());
    console.log('------------------------------------------------------------------');
    console.log("GAME STARTED: ", gameId)

    const newBaseUrl = baseUrl + "/" + gameId;
    const scoreResponse = await get(newBaseUrl + "/score").then(res => res.json());
    
    console.log('------------------------------------------------------------------');
    console.log("INITIAL SCORE: ", scoreResponse);

    for(let i = 1; i <= 10; i++) {
      
      const playersAfterBothRolls = players.map(player => {
        const roll1 = roll1Point();
        if(roll1 === 10){
            return { playerName: player, rolls: [roll1]}
        }else {
          const roll2 = roll2Point(10 - roll1);
          return { playerName: player, rolls: [roll1, roll2]};
        }
      });

      console.log(`AT frame ${i}`, playersAfterBothRolls);
      
      await post(newBaseUrl + "/roll", playersAfterBothRolls);

      if(i==10){
          const finalScore = playersAfterBothRolls.map(player => {

            const frame = player.rolls;
            const isSpare = frame.length == 2 && (frame[0] + frame[1]) == 10;
            const isStrike = frame.length == 1 && frame[0] == 10;
              if(isSpare){
                const r1 = roll1Point();
                return { playerName: player.playerName, rolls: [r1]};
              }
              if(isStrike){
                const r1 = roll1Point();
                const r2 = roll1Point();
                return { playerName: player.playerName, rolls: [r1, r2]};
              }
            });

            var filtered = finalScore.filter(function(x) {
              return x !== undefined;
            });
            await post(newBaseUrl + "/roll", filtered);
      }
      console.log('------------------------------------------------------------------');
      console.log("ROLLING FOR FRAME: ", i);
      const scorePostGame = await get(newBaseUrl + "/score").then(res => res.json());
      console.log("FINAL SCORE: ", scorePostGame);
    }

  } catch (error) {
    console.log(error.response.body);
  }
})();
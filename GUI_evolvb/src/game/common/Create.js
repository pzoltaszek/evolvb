const scale = 30;
let color = 'hotpink';
const Create = {
    elemnts: async (frame, elementObject, levelObstacles) => {
        levelObstacles.forEach(el => {
            let newEl = document.createElement('div');
            newEl.className = `${el.type}`;
            newEl.id = `${el.sub}`;
            newEl.actorId = el.actorId;
            newEl.style.width = `${el.width * scale}px`;
            newEl.style.height = `${el.height * scale}px`;
            newEl.style.left = `${el.posX * scale}px`;
            newEl.style.top = `${el.posY * scale}px`;
            newEl.style.backgroundImage = `url(${el.url})`;
            newEl.style.position = "absolute"
            frame.appendChild(newEl);
            elementObject.push({
                type: el.type,
                id: el.sub,
                actorId: el.actorId,
                x0: el.posX * scale,
                x1: el.posX * scale + el.width * scale,
                y0: el.posY * scale,
                y1: el.posY * scale + el.height * scale
            })
        });
    },
    elemnts2: async (frame, obstaclesArray, actorsObj, playerObj, playerDom, dat) => {
        let mapLevel = new Map(Object.entries(dat));
        let pp;
        mapLevel.forEach((value, key) => {
            if (value === 'player'){
                obstaclesArray[key] = "a"
            } else {
                obstaclesArray[key] = value
            }
            
            switch (value) {
                case 'wall':
                    let newEl = document.createElement('div');
                    newEl.className = value;
                    // newEl.id = `${el.sub}`;
                    // newEl.actorId = el.actorId;
                    newEl.style.width = `${1 * scale}px`;
                    newEl.style.height = `${1 * scale}px`;
                    newEl.style.left = `${+key[0] * scale}px`;
                    newEl.style.top = `${+key[1] * scale}px`;
                    newEl.style.backgroundImage = `url(/wall2.jpg)`;
                    newEl.style.position = "absolute"
                    newEl.id = key;
                    frame.appendChild(newEl);
                    break;
                case 'player':
                    let playerDom2 = document.createElement('div');
                    playerDom2.className = 'player';
                    playerDom2.style.width = `${playerObj.width}px`;
                    playerDom2.style.height = `${playerObj.height}px`;
                    playerDom2.style.left = `${+key[0] * scale}px`; //half of the width
                    playerDom2.style.top = `${+key[1] * scale}px`;
                    playerDom2.style.position = "absolute"
                    playerDom2.style.backgroundImage = `url(./player_1.jpg)`;
                    frame.appendChild(playerDom2);
                    pp = playerDom2;
                    playerObj.x = +key[0];
                    playerObj.y = +key[1]
                    break;
                case 'a':
                    let newEl2 = document.createElement('div');
                    newEl2.id = key;
                    newEl2.className = 'frame';
                    newEl2.style.width = `${1 * scale}px`;
                    newEl2.style.height = `${1 * scale}px`;
                    newEl2.style.left = `${+key[0] * scale}px`;
                    newEl2.style.top = `${+key[1] * scale}px`;
                    newEl2.style.position = "absolute"
                    frame.appendChild(newEl2);
                    break;
                    default:
                        break;
            }
        });
        return pp;
    },
    player2: async (frame, playerObj, dat) => {
        let mapLevel = new Map(Object.entries(dat));
        let pp;
        mapLevel.forEach((value, key) => {
            if (value === 'player') {
                let playerDom2 = document.createElement('div');
                playerDom2.className = 'player';
                playerDom2.style.width = `${playerObj.width}px`;
                playerDom2.style.height = `${playerObj.height}px`;
                playerDom2.style.left = `${+key[0] * scale}px`; //half of the width
                playerDom2.style.top = `${+key[1] * scale}px`;
                playerDom2.style.position = "absolute"
                playerDom2.style.backgroundImage = `url(./player_1.jpg)`;
                frame.appendChild(playerDom2);
                pp = playerDom2;
            }
        });
        return pp;
    },
    player: async (frame, playerObj, levelPlayer) => {
        let playerDom = document.createElement('div');
        playerDom.className = 'player';
        playerDom.style.width = `${playerObj.width}px`;
        playerDom.style.height = `${playerObj.height}px`;
        playerDom.style.left = `${levelPlayer.posX * scale}px`; //half of the width
        playerDom.style.top = `${levelPlayer.posY * scale}px`;
        playerDom.style.position = "absolute"
        playerDom.style.backgroundImage = `url(./player_1.jpg)`;
        frame.appendChild(playerDom);
        return playerDom;
    }
}

export default Create;


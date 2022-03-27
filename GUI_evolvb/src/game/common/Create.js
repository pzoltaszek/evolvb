const scale = 20;
const Create = {
    elemnts: async (frameDOM, obstaclesArray, actorsObj, playerObj, dat) => {
        let mapLevel = new Map(Object.entries(dat));
        let pp;
        mapLevel.forEach((value, key) => {
            if (value === 'player'){
                obstaclesArray[key] = "."
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
                    frameDOM.appendChild(newEl);
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
                    frameDOM.appendChild(playerDom2);
                    pp = playerDom2;
                    playerObj.x = +key[0];
                    playerObj.y = +key[1];
                    playerObj.posX = (+key[0] * scale);
                    playerObj.posY = (+key[1] * scale);
                    break;
                // case 'actor':
                //     let newEl2 = document.createElement('div');
                //     newEl2.id = key;
                //     newEl2.className = 'actor';
                //     newEl2.style.width = `${1 * scale}px`;
                //     newEl2.style.height = `${1 * scale}px`;
                //     newEl2.style.left = `${+key[0] * scale}px`;
                //     newEl2.style.top = `${+key[1] * scale}px`;
                //     newEl2.style.position = "absolute";
                //     newEl2.style.backgroundImage = `url(./player_1.jpg)`;
                //     frameDOM.appendChild(newEl2);
                //     break;
                    default:
                        break;
            }
        });
        return pp;
    }
}

export default Create;


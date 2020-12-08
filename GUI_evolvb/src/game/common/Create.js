const scale = 20;
let color = 'hotpink';
const Create = {
    elemnts: async(frame, elementObject, levelObstacles) => {
        levelObstacles.forEach(el => {
            let newEl = document.createElement('div');
            newEl.className = `${el.type}`;
            newEl.id = `${el.sub}`;
            newEl.actorId= el.actorId;
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
    player: async(frame, playerObj, levelPlayer) => {
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
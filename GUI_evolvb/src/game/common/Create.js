const scale = 20;
let color = 'hotpink';
const Create = {
    background: async(frame, obstaclesObject, levelObstacles) => {
        levelObstacles.forEach(el => {
            let newEl = document.createElement('div');
            newEl.className = `${el.type}`;
            newEl.id = `${el.sub}`;
            newEl.style.width = `${el.width * scale}px`;
            newEl.style.height = `${el.height * scale}px`;
            newEl.style.left = `${el.posX * scale}px`;
            newEl.style.top = `${el.posY * scale}px`;
            newEl.style.backgroundImage = `url(${el.url})`;
            newEl.style.position = "absolute"
            frame.appendChild(newEl);
            obstaclesObject.push({
                type: el.type,
                id: el.sub,
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
        playerDom.style.backgroundColor = `${color}`;
        frame.appendChild(playerDom);
        return playerDom;
    },
    actor: async(frame, actorsObj, levelActors, actorClickHandler) => {
        levelActors.forEach(el => {
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
            newEl.addEventListener("click", actorClickHandler);
            frame.appendChild(newEl);
            actorsObj.push({
                type: el.type,
                actorId: el.actorId,
                id: el.sub,
                x0: el.posX * scale,
                x1: el.posX * scale + el.width * scale,
                y0: el.posY * scale,
                y1: el.posY * scale + el.height * scale
            })
        });
    },
}

export default Create;
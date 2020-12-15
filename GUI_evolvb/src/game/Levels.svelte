
<script>
    import { onMount } from 'svelte';
    import Create from './common/Create';
    import ActorTooltip from './ActorTooltip.svelte';
    import TargetMark from './TargetMark.svelte'
    import { gameStatus } from '../store/gameStore.js';
    import Enum from '.././common/Enum.js';

    onMount(async () => {
        frame = document.querySelector('.frame');
        await Create.elemnts(frame, obstaclesObj, levels.obstacles);
        await Create.elemnts(frame, actorsObj, levels.actors);
        playerDom = await Create.player(frame, playerObj, levels.player);
        setLevelConstans();
        start();
    }); 

    let pauseGame = true;
    const unsubscribe = gameStatus.subscribe(value => {
        pauseGame = value === Enum.GAME_STATE.PLAY ? false: true;
	});
    
const setLevelConstans = () => {
    frame.startXPoint = frame.offsetLeft + frame.clientLeft; //frame position +frame border
    frame.startYPoint = frame.offsetTop + frame.clientTop;
    frame.style.backgroundImage = `url(${levels.background})`;
    gameStatus.set(Enum.GAME_STATE.PLAY);
}

const start = () => {
    function frame() {
        if (gameStatuss !== 'playing') {
            cancelAnimationFrame(frame);
            //TODO add ending
            return;
        } else {
            updateFrame();
        }
        requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)  
};

const handleGameClick = (e) => {
    if (pauseGame || actorClicked) {
        return;
    }
    if (e) {
        target = {
        x: e.x + frame.scrollLeft - frame.startXPoint,
        y: e.y + frame.scrollTop - frame.startYPoint,
        el: e.target.classList[0]
        }
        if (target.el === 'frame') {     
            let targetMark = new TargetMark({target: frame, props: {target}, accessors: true});
            destroyTargetMarkDelay(targetMark);
        } else if (target.el === 'Enemy') {
            actorClickHandler(e);
        } else if (possibleTarget) {
            target = possibleTarget;
            possibleTarget = null;
        } else {
            target = null;
        }
       
    }
};

const updateFrame = () => {
    if (!(pauseGame || target == null)) {
        moveplayer();
    }
};

const moveplayer = () => { 
    let left = Number(playerDom.style.left.slice(0, playerDom.style.left.indexOf('p')));
    let top = Number(playerDom.style.top.slice(0, playerDom.style.top.indexOf('p')));
    let centerX = left + playerObj.centerX;
    let centerY = top + playerObj.centerY;
    if (Math.round(target.x) == Math.round(centerX) && Math.round(target.y) == Math.round(centerY)) {
        target = null;
        return;
    }
      
    let steps = Math.max(Math.abs(target.x - centerX), Math.abs(target.y - centerY));
    let xStep = (target.x - centerX) / steps;
    let yStep = (target.y - centerY) / steps;
    let nextX = centerX + xStep;
    let nextY = centerY + yStep;
    let obstacleTouched = obstaclesObj.some(el=> overlap(el, nextX, nextY));
    if (obstacleTouched) {
        target = null;
        return;
    } else {
        playerDom.style.left = `${left + xStep* 1}px`; //1=speed
        playerDom.style.top = `${top + yStep* 1}px`;
    }     
    frame.scrollLeft =  left + xStep -  (resolutionWidth/2);
    frame.scrollTop = top + yStep - (resolutionHeight/2)
};

const overlap = (element, left, top) => {
    return element.x0 <= left &&
        left < element.x1 &&
        element.y0 <= top &&
        top <element.y1;
};
let actorClicked = false;
const actorClickHandler = (e) => {
    if (actorClicked) return;
    actorClicked = true;
    let selectedActor = actorsObj.find(actor => actor.actorId === e.target.actorId);
    if (selectedActor){
        possibleTarget = target;
        target = null;
        let actorTooltip = new ActorTooltip({target: frame, props: {selectedActor}});
        actorTooltip.$on('close-actor-tooltip', event => closeActorTooltip(actorTooltip));
        actorTooltip.$on('click-actor-tooltip', event => clickActorTooltip(actorTooltip));
    } else {
        actorClicked = false;
    }
};

const closeActorTooltip = (actorTooltip) => {
    if (!pauseGame) {
        actorTooltip.$destroy();
        actorClicked = false;
        possibleTarget = null;
    }
};

const clickActorTooltip = (actorTooltip) => {
    if (!pauseGame) {
        actorTooltip.$destroy();
        actorClicked = false;
    }
};

const destroyTargetMarkDelay = (targetMark) => {
        setTimeout(()=> {targetMark.$destroy();}, 3000);
    };

const resolutionWidth = (window.screen.availWidth) * 0.7;
const resolutionHeight = (window.screen.availHeight) * 0.7;
let target = null;
let possibleTarget = null;
let playerDom;
let playerObj = {
    width: 20,
    height: 20,
    centerX: 10,
    centerY: 10 
}
let gameStatuss = 'playing';
let frame;
let obstaclesObj=[];
let actorsObj=[];

const levels = {
    number: 0,
    background: '/Capture.jpg',
    player: {
        posX:30,
        posY:1,
    },
    obstacles: [
        {
            type: 'Wall',
            sub: 'a',
            posX:0,
            posY:0,
            // pos: new Vector(0, 25), //x = left, y = top
            width: 75,
            height: 1,
            url: '/wall2.jpg'
        },
        {
            type: 'Wall',
            sub: 'b',
            posX:0,
            posY:0,
            //pos: new Vector(0, 0),
            width: 1,
            height: 50,
            url: '/wall2.jpg'
        },
        {
            type: 'Wall',
            sub: 'c',
            posX:75,
            posY:0,
            //pos: new Vector(0, 0),
            width: 1,
            height: 50,
            url: '/wall2.jpg'
        },
        {
            type: 'Wall',
            sub: 'd',
            posX:0,
            posY:50,
            //  pos: new Vector(25, 0),
            width: 75,
            height: 1,
            url: '/wall2.jpg'
        }],
        actors: [
            {
                type: 'Enemy',
                sub: 'good',
                actorId: 1,
                posX:5,
                posY:5,
                //pos: new Vector(0, 0),
                width: 1,
                height: 1,
                url: '/wall2.jpg'
            },
            {
                type: 'Enemy',
                sub: 'good',
                actorId: 2,
                posX:49,
                posY:5,
                //pos: new Vector(0, 0),
                width: 1,
                height: 1,
                url: '/wall2.jpg'
            },
            {
                type: 'Enemy',
                sub: 'good',
                actorId: 3,
                posX:20,
                posY:20,
                width: 1,
                height: 1,
                url: '/wall2.jpg'
            }
        ]
}
</script>

<div
on:click={handleGameClick}
class='frame'
style="width:{resolutionWidth}px;
height:{resolutionHeight}px;
position:absolute;"></div>

<style>
.frame {
    overflow: hidden;
    background: gray;
    top: 10%;
    left: 10%;
    border: 3px groove #ff3e00;
}
</style>

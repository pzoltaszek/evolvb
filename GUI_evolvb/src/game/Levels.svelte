
<script>
    import { onMount } from 'svelte';
    import Create from './common/Create';
    import ActorTooltip from './ActorTooltip.svelte'
    export let pauseGame;

    onMount(async () => {
        frame = document.querySelector('.frame');
        await Create.background(frame, obstaclesObj, levels.obstacles, actorClickHandler);
        await Create.actor(frame, actorsObj, levels.actors, actorClickHandler);
        playerDom = await Create.player(frame, playerObj, levels.player);
        frame.startXPoint = frame.offsetLeft + frame.clientLeft; //frame position +frame border
        frame.startYPoint = frame.offsetTop + frame.clientTop;
        start();
    }); 
    
const start = () => {
    function frame() {
        if (gameStatus !== 'playing') {
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
    if (pauseGame) {
        return;
    }
    if (e) {
        target = {
        x: e.x + frame.scrollLeft - frame.startXPoint,
        y: e.y + frame.scrollTop - frame.startYPoint,
        el: e.target.classList[0]
        }
        console.log('x: ' + target.x + ' :  y: ' + target.y);
    }
};

const updateFrame = () => {
    if (pauseGame || target == null || target.el !== 'frame'){
        return;
    }
    moveplayer();
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
    let obstacleResult = obstaclesObj.some(el=> overlap(el, nextX, nextY));
    if (obstacleResult) {
        target = {};
        return;
    } else {
        playerDom.style.left = `${(left + xStep)* 1}px`; //1=speed
        playerDom.style.top = `${(top + yStep)* 1}px`;
    }     
    frame.scrollLeft =  left + xStep -  (0.7*resolutionWidth/2);
    frame.scrollTop = top + yStep - (0.7*resolutionHeight/2)
};

const overlap = (element, left, top) => {
    return element.x0 <= left &&
        left < element.x1 &&
        element.y0 <= top &&
        top <element.y1;
};

const actorClickHandler = (e) => {
    let selectedActor = actorsObj.find(actor => actor.actorId === e.target.actorId);
    let actorTooltip = new ActorTooltip({target: frame, props: {selectedActor}});
    actorTooltip.$on('close-actor-tooltip', event => close(actorTooltip));
};

const close = (actorTooltip) => {
    actorTooltip.$destroy();
}

const resolutionWidth = window.screen.availWidth;
const resolutionHeight = window.screen.availHeight;
let target = null;
let playerDom;
let playerObj = {
    width: 9,
    height: 9,
    centerX: 4.5,
    centerY: 4.5 
}
let gameStatus = 'playing';
let frame;
let obstaclesObj=[];
let actorsObj=[];

const levels = {
    number: 0,
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
                //pos: new Vector(0, 0),
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
style="width:{0.7*resolutionWidth}px;
height:{0.7*resolutionHeight}px;
position:absolute;"></div>

<style>
.frame {
    overflow: hidden;
    background: gray;
    top: 10%;
    left: 10%;
    border: 5px double orange;
}
</style>
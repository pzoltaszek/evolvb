
<script>
    import { onMount } from 'svelte';
    import Create from './common/Create';
    export let pauseGame;

    onMount(async () => {
        frame = document.querySelector('.frame');
        await Create.background(frame, obstaclesObj, levels.obstacles, actorClickHandler);
        await Create.actor(frame, levels.actors, actorClickHandler);
        playerDom = await Create.player(frame, playerObj, levels.player);
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
        x: e.x - 105, //frame positio top100 left 100 + border5
        y: e.y - 105, //offset doesnt work when click on wall
        el: e.target.classList[0]
        }
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
    let centerX = left + playerConstans.centerX;
    let centerY = top + playerConstans.centerY;
    if (Math.round(target.x) == Math.round(centerX) || Math.round(target.y) == Math.round(centerY)) {
        target = null;
        return;
    }
      
        let steps = Math.max(Math.abs(target.x - centerX), Math.abs(target.y - centerY));
        let xStep = (target.x - centerX) / steps;
        let yStep = (target.y - centerY) / steps;
        let nextX = xStep > 0 ? left + 9 + xStep : left + xStep;
        let nextY = yStep > 0 ? top + 9 + yStep : top + yStep;
        let obstacleResult = obstaclesObj.some(el=> overlap(el, nextX, nextY));
        if (obstacleResult) {
            target = {};
            return;
        } else {
            playerDom.style.left = `${(left + xStep)* 1}px`; //1=speed
            playerDom.style.top = `${(top + yStep)* 1}px`;
        }     
        //TEST
        // frame.scrollLeft = left + xStep - 50
};


const overlap = (element, left, top) => {
    return element.x0 <= left &&
        left < element.x1 &&
        element.y0 <= top &&
        top <element.y1;
};

const actorClickHandler = (e) => {
console.log('aaaa')
};

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
let playerConstans = {
    width: 9,
    height: 9,
    centerX: 4.5,
    centerY: 4.5
}
let gameStatus = 'playing';
const scale = 20;
let frame;
let obstaclesObj=[];

const levels = {
    number: 0,
    player: {
        posX:1,
        posY:1,
    },
        obstacles: [
            {
                type: 'Wall',
                sub: 'a',
                posX:0,
                posY:0,
               // pos: new Vector(0, 25), //x = left, y = top
                width: 15,
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
                height: 15,
                url: '/wall2.jpg'
            },
            {
                type: 'Wall',
                sub: 'c',
                posX:15,
                posY:0,
                //pos: new Vector(0, 0),
                width: 1,
                height: 15,
                url: '/wall2.jpg'
            },
            {
                type: 'Wall',
                sub: 'd',
                posX:0,
                posY:15,
              //  pos: new Vector(25, 0),
                width: 16,
                height: 1,
                url: '/wall2.jpg'
        }],
        actors: [
            {
                type: 'Enemy',
                sub: 'good',
                posX:5,
                posY:5,
                //pos: new Vector(0, 0),
                width: 1,
                height: 1,
                url: '/wall2.jpg'
            }
        ]
}
</script>

{#if true}
<div
on:click={handleGameClick}
class='frame'
style="width:{0.7*resolutionWidth}px;
height:{0.7*resolutionHeight}px;
position:absolute;"></div>
{/if}
<style>
.frame {
    overflow: hidden;
    background: gray;
    top: 100px;
    left: 100px;
    max-width: 1024px;
    max-height: 768px;
    border: 5px double orange;
}
</style>
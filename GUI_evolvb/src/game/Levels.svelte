
<script>
    import { onMount } from 'svelte';
    export let pauseGame;

    onMount(() => {

        frame = document.querySelector('.frame');
        levels.obstacles.forEach(el=>{
            let newEl = document.createElement('div');
            newEl.className =`${el.type}`;
            newEl.id = `${el.sub}`;
            newEl.style.width = `${el.width * scale}px`;
            newEl.style.height = `${el.height * scale}px`;
            newEl.style.left = `${el.posX * scale}px`;
            newEl.style.top = `${el.posY * scale}px`;
            newEl.style.backgroundImage = `url(${el.url})`;
            newEl.style.position = "absolute"
            frame.appendChild(newEl);
            obstacles.push({
                type: el.type,
                id: el.sub,
                x0:el.posX * scale,
                x1: el.posX * scale + el.width * scale,
                y0: el.posY * scale,
                y1: el.posY * scale + el.height * scale
            })
        });   
        playerDom = document.createElement('div');
        playerDom.className = 'player';
        playerDom.style.width = `${9}px`;
        playerDom.style.height = `${9}px`;
        playerDom.style.left = `${1* scale}px`; //half of the width
        playerDom.style.top = `${1* scale}px`;
        playerDom.style.position = "absolute"
        playerDom.style.backgroundColor = `${color}`;
        frame.appendChild(playerDom); 
        start();
    });
    
const start = () => {
    function frame() {
        if (playerDom == null || gameStatus !== 'playing') {
            cancelAnimationFrame(frame);
            console.log('======================wychodze');
            return;
        } else {
            handleGameClick();
            moveplayer();
        }
        requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)  
} 
const handleGameClick = (e) => {
    if (e){
        target = {
        x: e.x - 105, //frame positio top100 left 100 + border5
        y: e.y - 105, //offset doesnt work when click on wall
        el: e.target.className
        }
    }
};

const moveplayer = () => {
    if (target == null){
        return;
    }
    if(pauseGame){
                return;
            }
   
    let left = Number(playerDom.style.left.slice(0, playerDom.style.left.indexOf('p')));
    let top = Number(playerDom.style.top.slice(0, playerDom.style.top.indexOf('p')));
    if (Math.round(target.x) == Math.round(left) || Math.round(target.y) == Math.round(top)) {
            target = null;
            return;
        }
        let steps = Math.max(Math.abs(target.x - left), Math.abs(target.y - top));
        let xStep = (target.x - left) / steps;
        let yStep = (target.y - top) / steps;
console.log( 'left: ' +left + ' ,top: ' + top + ' ,steps: '+steps + ' ,xtarget:'+ target.x+ ' ,ytarrget:'+target.y);
        // let xBeyond = xStep > 0 ? left + 9 + xStep : left + xStep;
        // let yBeyond = yStep > 0 ? top + 9 + yStep : top + yStep;
        // let elemntBeyond = document.elementFromPoint(xBeyond, yBeyond);
        // if (elemntBeyond.className == 'Wall') {
            obstacles.forEach(el=> {
                if(overlap(el, left, top)){
            target = {};
            return;
            }
        })
           
        let newLeft = left + xStep;
        let newTop = top + yStep;
        playerDom.style.left = `${newLeft* 1}px`; //1=speed
        playerDom.style.top = `${newTop* 1}px`;
        //TEST

        // let frame = document.querySelector('.frame');
        // frame.scrollLeft = left + xStep - 50
    };

    const overlap = (element, left, top) => {
    return   element.x0 <= left &&
            left < element.x1 &&
            element.y0 <= top &&
            top <element.y1;
}


let width = window.screen.availWidth;
let height = window.screen.availHeight;
let color = 'hotpink';
let target = null;
let playerDom;
let gameStatus = 'playing';
const scale = 20;
let frame;
let obstacles=[];

const levels = {
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
            }]
}
</script>

{#if true}
<div
on:click={handleGameClick}
class='frame'
style=" 
color:{color};
width:{0.7*width}px;
height:{0.7*height}px;
position:absolute;
"></div>
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
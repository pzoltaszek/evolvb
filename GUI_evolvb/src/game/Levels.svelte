<script>
    import { onMount } from "svelte";
    import Create from "./common/Create";
    import ActorTooltip from "./ActorTooltip.svelte";
    import TargetMark from "./TargetMark.svelte";
    import { gameStatus } from "../store/gameStore.js";
    import Enum from ".././common/Enum.js";
    import GameApi from "../api/GameApi.js";

    onMount(async () => {
        frame = document.querySelector(".frame");
        let dat = level2; //await GameApi.loadGame({level: 2});
        playerDom = await Create.elemnts2(
            frame,
            obstaclesArray,
            actorsObj,
            playerObj,
            playerDom,
            dat
        );
        // playerDom = await Create.player2(frame, playerObj, dat);
        //------ old ---------
        //frame = document.querySelector('.frame');
        //await Create.elemnts(frame, obstaclesObj, levels.obstacles);
        // await Create.elemnts(frame, actorsObj, levels.actors);
        //playerDom = await Create.player(frame, playerObj, levels.player);
        setLevelConstans();
        start();
    });

    let pauseGame = true;
    const unsubscribe = gameStatus.subscribe((value) => {
        pauseGame = value === Enum.GAME_STATE.PLAY ? false : true;
    });

    const setLevelConstans = () => {
        frame.startXPoint = frame.offsetLeft + frame.clientLeft; //frame position +frame border
        frame.startYPoint = frame.offsetTop + frame.clientTop;
        frame.style.backgroundImage = `url(${levels.background})`;
        gameStatus.set(Enum.GAME_STATE.PLAY);
    };

    const start = () => {
        function frame() {
            if (gameStatuss !== "playing") {
                cancelAnimationFrame(frame);
                //TODO add ending
                return;
            } else {
                updateFrame();
            }
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    };

    const handleGameClick = (e) => {
        if (pauseGame || actorClicked) {
            return;
        }
        if (e) {
            target = {
                x: e.x + frame.scrollLeft - frame.startXPoint,
                y: e.y + frame.scrollTop - frame.startYPoint,
                el: e.target.classList[0],
            };
            if (target.el === "frame") {
                let targetMark = new TargetMark({
                    target: frame,
                    props: { target },
                    accessors: true,
                });
                destroyTargetMarkDelay(targetMark);
            } else if (target.el === "Enemy") {
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
        let left = Number(
            playerDom.style.left.slice(0, playerDom.style.left.indexOf("p"))
        );
        let top = Number(
            playerDom.style.top.slice(0, playerDom.style.top.indexOf("p"))
        );
        let centerX = left + playerObj.centerX;
        let centerY = top + playerObj.centerY;
        if (
            Math.round(target.x) == Math.round(centerX) &&
            Math.round(target.y) == Math.round(centerY)
        ) {
            target = null;
            return;
        }

        let steps = Math.max(
            Math.abs(target.x - centerX),
            Math.abs(target.y - centerY)
        );
        let xStep = (target.x - centerX) / steps;
        let yStep = (target.y - centerY) / steps;
        //nextX i Y of player center
        let nextX = Math.floor((centerX + xStep)/scale);
        let nextY = Math.floor((centerY + yStep)/scale);
        //bazuje na center, ale moge na szerokosc playera +- player width
        let obstacleTouched = obstaclesArray[+(String(nextX) + String(nextY))]
        if (obstacleTouched !== 'a') {
            target = null;
            return;
        } else {
            playerObj.x = nextX;
            playerObj.y = nextY;
            playerDom.style.left = `${left + xStep * 1}px`; //1=speed
            playerDom.style.top = `${top + yStep * 1}px`;
        }
        frame.scrollLeft = left + xStep - resolutionWidth / 2;
        frame.scrollTop = top + yStep - resolutionHeight / 2;
    };
    
    let actorClicked = false;
    const actorClickHandler = (e) => {
        if (actorClicked) return;
        actorClicked = true;
        let selectedActor = actorsObj.find(
            (actor) => actor.actorId === e.target.actorId
        );
        if (selectedActor) {
            possibleTarget = target;
            target = null;
            let actorTooltip = new ActorTooltip({
                target: frame,
                props: { selectedActor },
            });
            actorTooltip.$on("close-actor-tooltip", (event) =>
                closeActorTooltip(actorTooltip)
            );
            actorTooltip.$on("click-actor-tooltip", (event) =>
                clickActorTooltip(actorTooltip)
            );
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
        setTimeout(() => {
            targetMark.$destroy();
        }, 3000);
    };

    const resolutionWidth = window.screen.availWidth * 0.7;
    const resolutionHeight = window.screen.availHeight * 0.7;
    let target = null;
    let possibleTarget = null;
    let playerDom;
    const scale = 30;
    let playerObj = {
        width: 20,
        height: 20,
        centerX: 10,
        centerY: 10,
        x: 0,
        y: 0

    };
    let gameStatuss = "playing";
    let frame;
    let obstaclesArray = [];
    let actorsObj = [];

    const levels = {
        number: 0,
        background: "/Capture.jpg",
        player: {
            posX: 30,
            posY: 1,
        },
        obstacles: [
            {
                type: "Wall",
                sub: "a",
                posX: 0,
                posY: 0,
                // pos: new Vector(0, 25), //x = left, y = top
                width: 75,
                height: 1,
                url: "/wall2.jpg",
            },
            {
                type: "Wall",
                sub: "b",
                posX: 0,
                posY: 0,
                //pos: new Vector(0, 0),
                width: 1,
                height: 50,
                url: "/wall2.jpg",
            },
            {
                type: "Wall",
                sub: "c",
                posX: 75,
                posY: 0,
                //pos: new Vector(0, 0),
                width: 1,
                height: 50,
                url: "/wall2.jpg",
            },
            {
                type: "Wall",
                sub: "d",
                posX: 0,
                posY: 50,
                //  pos: new Vector(25, 0),
                width: 75,
                height: 1,
                url: "/wall2.jpg",
            },
            {
                type: "Wall",
                sub: "a",
                posX: 10,
                posY: 10,
                // pos: new Vector(0, 25), //x = left, y = top
                width: 10,
                height: 1,
                url: "/wall2.jpg",
            },
            {
                type: "Wall",
                sub: "b",
                posX: 10,
                posY: 10,
                //pos: new Vector(0, 0),
                width: 1,
                height: 10,
                url: "/wall2.jpg",
            },
            {
                type: "Wall",
                sub: "c",
                posX: 10,
                posY: 20,
                //pos: new Vector(0, 0),
                width: 10,
                height: 1,
                url: "/wall2.jpg",
            },
            {
                type: "Wall",
                sub: "d",
                posX: 20,
                posY: 10,
                //  pos: new Vector(25, 0),
                width: 1,
                height: 11,
                url: "/wall2.jpg",
            },
        ],
        actors: [
            {
                type: "Enemy",
                sub: "good",
                actorId: 1,
                posX: 5,
                posY: 5,
                //pos: new Vector(0, 0),
                width: 1,
                height: 1,
                url: "/wall2.jpg",
            },
            {
                type: "Enemy",
                sub: "good",
                actorId: 2,
                posX: 49,
                posY: 5,
                //pos: new Vector(0, 0),
                width: 1,
                height: 1,
                url: "/wall2.jpg",
            },
            {
                type: "Enemy",
                sub: "good",
                actorId: 3,
                posX: 22,
                posY: 22,
                width: 1,
                height: 1,
                url: "/wall2.jpg",
            },
        ],
    };

    const level2 = {
        "10": "wall",
        "11": "a",
        "12": "a",
        "13": "a",
        "14": "a",
        "15": "a",
        "16": "a",
        "17": "a",
        "18": "a",
        "19": "wall",
        "20": "wall",
        "21": "a",
        "22": "a",
        "23": "a",
        "24": "a",
        "25": "a",
        "26": "a",
        "27": "a",
        "28": "a",
        "29": "wall",
        "30": "wall",
        "31": "a",
        "32": "a",
        "33": "a",
        "34": "a",
        "35": "a",
        "36": "a",
        "37": "a",
        "38": "a",
        "39": "wall",
        "40": "wall",
        "41": "a",
        "42": "a",
        "43": "a",
        "44": "player",
        "45": "a",
        "46": "a",
        "47": "a",
        "48": "a",
        "49": "wall",
        "50": "wall",
        "51": "a",
        "52": "a",
        "53": "a",
        "54": "a",
        "55": "a",
        "56": "a",
        "57": "a",
        "58": "a",
        "59": "wall",
        "60": "wall",
        "61": "a",
        "62": "a",
        "63": "a",
        "64": "a",
        "65": "a",
        "66": "a",
        "67": "a",
        "68": "a",
        "69": "wall",
        "70": "wall",
        "71": "a",
        "72": "a",
        "73": "a",
        "74": "a",
        "75": "a",
        "76": "a",
        "77": "a",
        "78": "a",
        "79": "wall",
        "80": "wall",
        "81": "a",
        "82": "a",
        "83": "a",
        "84": "a",
        "85": "a",
        "86": "a",
        "87": "a",
        "88": "a",
        "89": "wall",
        "90": "wall",
        "91": "wall",
        "92": "wall",
        "93": "wall",
        "94": "wall",
        "95": "wall",
        "96": "wall",
        "97": "wall",
        "98": "wall",
        "99": "wall",
        "00": "wall",
        "01": "wall",
        "02": "wall",
        "03": "wall",
        "04": "wall",
        "05": "wall",
        "06": "wall",
        "07": "wall",
        "08": "wall",
        "09": "wall",
    };
</script>

<div
    on:click={handleGameClick}
    class="frame"
    style="width:{resolutionWidth}px;
height:{resolutionHeight}px;
position:absolute;"
/>

<style>
    .frame {
        overflow: hidden;
        background: gray;
        top: 10%;
        left: 10%;
        border: 3px groove #ff3e00;
    }
</style>

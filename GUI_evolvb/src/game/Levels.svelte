<script>
    import { onMount } from "svelte";
    import Create from "./common/Create";
    import Time from "./common/Time";
    import Player from "./common/Player";
    import GameConst from "./common/GameConst";
    import ActorTooltip from "./ActorTooltip.svelte";
    import TargetMark from "./TargetMark.svelte";
    import { gameStatus, playerEnergy } from "../store/gameStore.js";
    import Enum from ".././common/Enum.js";
    import GameApi from "../api/GameApi.js";

    onMount(async () => {
        frameDOM = document.querySelector(".frame");
        let dat = level2; //await GameApi.loadGame({level: 2});
        playerDom = await Create.elemnts(
            frameDOM,
            obstaclesArray,
            actorsObj,
            Player,
            dat
        );
        setLevelConstans();
        start();
    });

    const setLevelConstans = () => {
        frameDOM.startXPoint = frameDOM.offsetLeft + frameDOM.clientLeft; //frame position +frame border
        frameDOM.startYPoint = frameDOM.offsetTop + frameDOM.clientTop;
        frameDOM.style.backgroundImage = `url(${levels.background})`;
        gameStatus.set(Enum.GAME_STATE.PLAY);
    };

    const start = () => {
        let lastFrameTimeMs = 0;
        function frame(timeStamp) {
            if ($gameStatus === Enum.GAME_STATE.STOP) {
                cancelAnimationFrame(frame);
                return;
            }
            if (timeStamp < lastFrameTimeMs + 1000 / Time.MAX_FPS) {
                requestAnimationFrame(frame);
                return;
            }
            lastFrameTimeMs = timeStamp;
            requestAnimationFrame(frame);
            updateFrame();
        }
        requestAnimationFrame(frame);
    };

    const handleGameClick = (e) => {
        if ($gameStatus === Enum.GAME_STATE.PAUSE || actorClicked) {
            return;
        }
        if (e) {
            target = {
                x: e.x + frameDOM.scrollLeft - frameDOM.startXPoint,
                y: e.y + frameDOM.scrollTop - frameDOM.startYPoint,
                el: e.target.classList[0],
            };
            if (target.el === "frame") {
                let targetMark = new TargetMark({
                    target: frameDOM,
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
        if (!($gameStatus === Enum.GAME_STATE.PAUSE || target == null)) {
            moveplayer();
        }
        updatePlayer();
    };

    const moveplayer = () => {
        Player.isRunning = true;
        let centerX = Player.posX + Player.centerX;
        let centerY = Player.posY + Player.centerY;
        //acceptable error in player coords
        if (Math.abs(Math.round(target.x - centerX)) < Player.speed && Math.abs(Math.round(target.y - centerY)) < Player.speed) {
            target = null;
            Player.isRunning = false;
            return;
        }

        let steps = Math.max(
            Math.abs(target.x - centerX),
            Math.abs(target.y - centerY)
        );
        let xStep = (target.x - centerX) / steps;
        let yStep = (target.y - centerY) / steps;
        //next X i Y of player center
        let nextX = Math.floor((centerX + xStep) / GameConst.scale);
        let nextY = Math.floor((centerY + yStep) / GameConst.scale);
        //bazuje na center, ale moge na szerokosc playera +- player width
        let obstacleTouched = obstaclesArray[+(String(nextX) + String(nextY))];
        if (obstacleTouched !== ".") {
            target = null;
            Player.isRunning = false;
            return;
        } else {
            playerDom.style.left = `${Player.posX + (xStep * Player.speed)}px`; //1=speed
            playerDom.style.top = `${Player.posY + (yStep * Player.speed)}px`;
        }
        frameDOM.scrollLeft = Player.posX + xStep - GameConst.resolutionWidth / 2;
        frameDOM.scrollTop = Player.posY + yStep - GameConst.resolutionHeight / 2;
        Player.x = nextX;
        Player.y = nextY;
        Player.posX = Player.posX + (xStep * Player.speed);
        Player.posY = Player.posY + (yStep * Player.speed);
    };

    const updatePlayer = () => {
        if ($gameStatus !== Enum.GAME_STATE.PLAY){
            return;
        }
        Time.one_sec_frames--;
        if(Time.one_sec_frames === 0){
            Time.one_sec_frames = Time.ONE_SEC_FRAMES;
            //every sec update
            Player.energy -= Player.isMoving ? 200 : 50;
            playerEnergy.set(Player.energy);
        }
        if(Player.energy < 0) {
            gameStatus.set(Enum.GAME_STATE.STOP);
        }
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
                target: frameDOM,
                props: { selectedActor },
            });
            actorTooltip.$on("close-actor-tooltip", () =>
                closeActorTooltip(actorTooltip)
            );
            actorTooltip.$on("click-actor-tooltip", () =>
                clickActorTooltip(actorTooltip)
            );
        } else {
            actorClicked = false;
        }
    };

    const closeActorTooltip = (actorTooltip) => {
        if ($gameStatus === Enum.GAME_STATE.PLAY) {
            actorTooltip.$destroy();
            actorClicked = false;
            possibleTarget = null;
        }
    };

    const clickActorTooltip = (actorTooltip) => {
        if ($gameStatus === Enum.GAME_STATE.PLAY) {
            actorTooltip.$destroy();
            actorClicked = false;
        }
    };

    const destroyTargetMarkDelay = (targetMark) => {
        setTimeout(() => {
            targetMark.$destroy();
        }, 3000);
    };

    let target = null;
    let possibleTarget = null;
    let playerDom;
    let frameDOM;
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
        "11": ".",
        "12": ".",
        "13": ".",
        "14": ".",
        "15": ".",
        "16": ".",
        "17": ".",
        "18": ".",
        "19": "wall",
        "20": "wall",
        "21": ".",
        "22": ".",
        "23": ".",
        "24": ".",
        "25": ".",
        "26": ".",
        "27": ".",
        "28": ".",
        "29": "wall",
        "30": "wall",
        "31": ".",
        "32": ".",
        "33": ".",
        "34": ".",
        "35": ".",
        "36": ".",
        "37": ".",
        "38": ".",
        "39": "wall",
        "40": "wall",
        "41": ".",
        "42": ".",
        "43": ".",
        "44": "player",
        "45": ".",
        "46": ".",
        "47": ".",
        "48": ".",
        "49": "wall",
        "50": "wall",
        "51": ".",
        "52": ".",
        "53": ".",
        "54": ".",
        "55": ".",
        "56": ".",
        "57": ".",
        "58": ".",
        "59": "wall",
        "60": "wall",
        "61": ".",
        "62": ".",
        "63": ".",
        "64": ".",
        "65": ".",
        "66": ".",
        "67": ".",
        "68": ".",
        "69": "wall",
        "70": "wall",
        "71": ".",
        "72": ".",
        "73": ".",
        "74": ".",
        "75": ".",
        "76": ".",
        "77": ".",
        "78": ".",
        "79": "wall",
        "80": "wall",
        "81": ".",
        "82": ".",
        "83": ".",
        "84": ".",
        "85": ".",
        "86": ".",
        "87": ".",
        "88": ".",
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
    style="width:{GameConst.resolutionWidth}px;
height:{GameConst.resolutionHeight}px;
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

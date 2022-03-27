import { writable } from 'svelte/store';
import Enum from '../common/Enum.js';
import Player from '../game/common/Player.js';

export const gameStatus = writable(Enum.GAME_STATE.PAUSE);
export const playerEnergy = writable(Player.energy);
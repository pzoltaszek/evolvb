import { writable } from 'svelte/store';
import Enum from '../common/Enum.js';

export const gameStatus = writable(Enum.GAME_STATE.PAUSE);
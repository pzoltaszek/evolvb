import { writable } from 'svelte/store';
import Enum from '../common/Enum.js';

export const loggedUser = writable(null);
export const isLoading = writable(false);
export const menuState = writable(Enum.MENU_STATE.NOT_LOGGED);
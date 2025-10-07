import { writable } from 'svelte/store';
const KEY = 'kanban_v2_items';


function load(){
try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
catch(e){ return []; }
}


export const itemsStore = writable(load());
itemsStore.subscribe(v => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch(e){} });


export function addItem(item){ itemsStore.update(a=>[...a,item]); }
export function removeItem(id){ itemsStore.update(a=>a.filter(i=>i.id!==id)); }
export function updateItem(id, patch){ itemsStore.update(a=>a.map(i=>i.id===id?{...i,...patch}:i)); }
export function moveItem(id,to){ itemsStore.update(a=>a.map(i=>i.id===id?{...i,lane:to}:i)); }
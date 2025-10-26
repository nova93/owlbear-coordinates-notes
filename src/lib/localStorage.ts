import { LS_KEY } from "../config";
import type { Note } from "../types";


export const getNotes = (): Note[] => {
  const raw = window.localStorage.getItem(LS_KEY)

  if (!raw) {
    return []
  }

  return JSON.parse(raw)
}

export const create = (sceneId: Note['sceneId'], x: Note['x'], y: Note['y'], content: Note['content']) => {
  if (!sceneId || !x || !y) {
    throw Error("this shouldn't be firing lol")
  }
  
  const notes: Note[] = [
    ...getNotes(),
    { sceneId, x, y, content }
  ];

  window.localStorage.setItem(LS_KEY, JSON.stringify(notes));
}

export const read = (sceneId: Note['sceneId'], x: Note['x'], y: Note['y']) => {
  const notes = getNotes();

  return notes?.find(note => 
    note.sceneId === sceneId
    && note.x === x
    && note.y === y
  )
}

export const update = (sceneId: Note['sceneId'], x: Note['x'], y: Note['y'], content: Note['content']) => {
  const notes = getNotes();

  // remove the original entry
  const filtered = notes.filter(note => note.sceneId !== sceneId && note.x !== x && note.y !== y)

  // add the new entry
  const updatedNotes = [
    ...filtered,
    { sceneId, x, y, content }
  ]

  // persist to LS
  window.localStorage.setItem(LS_KEY, JSON.stringify(updatedNotes));
}

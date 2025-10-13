import { Database } from "bun:sqlite";
import { type Note, type NoteQueryParams } from "../types";

const db = new Database("notes.sqlite", { create: true });

// seed the table, making sure not to override existing
db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    sceneId TEXT NOT NULL,
    content TEXT NOT NULL
  );
`);

export const getNote = db.query<Note, NoteQueryParams>(`SELECT content FROM notes WHERE x = $x AND y = $y AND sceneId = $sceneId;`)
export const createNote = db.query<Note, NoteQueryParams>(`
  INSERT INTO notes (x, y, sceneId, content)
  VALUES($x, $y, $sceneId, $content);
`)
export const updateNote = db.query<Note, NoteQueryParams>(`
  UPDATE notes
  SET content = $content
  WHERE
    x = $x AND
    y = $y AND
    sceneId = $sceneId
  `)

export default db

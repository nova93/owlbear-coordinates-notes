import markdownit from 'markdown-it';
import * as LS from "../../lib/localStorage";

import type { Note } from "../../types";
import getUserSettings from './getUserSettings';

const getNote = async (noteParams: Omit<Note, 'content'>, url: URL) => {
  const {storage} = getUserSettings();

  if (storage === 'browser') {
    let note = LS.read(noteParams.sceneId, noteParams.x, noteParams.y)

    if (!note) {
      LS.create(noteParams.sceneId, noteParams.x, noteParams.y, '### new page' )
      note = LS.read(noteParams.sceneId, noteParams.x, noteParams.y)
    }

    const md = markdownit()
    const formatted = md.render(note.content);

    return {formatted, raw: note.content}
  }

  const res = await fetch(`/api?${url.searchParams.toString()}`);
  const {formatted, raw} = await res.json()

  return  {formatted, raw}

}

export default getNote

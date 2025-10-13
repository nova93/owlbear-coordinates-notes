import type { BunRequest } from "bun";
import { updateNote } from "../../lib/db";
import type { Note } from "../../types";

const POST = async (req: BunRequest) => {
  const body  = await req.json() as Note;
  // TODO: validate data
  const {x, y, sceneId, content} = body

  try {
    updateNote.run({$x: x, $y: y, $sceneId: sceneId, $content: content})
    return Response.json({ updated: true });
  } catch(error) {
    return new Response("Failed to update", { status: 500 });
  }
}

export default POST

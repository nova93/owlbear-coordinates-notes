# Tasks

## To-do

- implement proper-persistence
- implement auth system for the proper-persistence
- add data validation to endpoints
- add error handling so that users know what they did wrong/how to do it right
  - if I can figure out what what they should have done, why not just do it?
- Add testing library (vitest + playwright if e2e is needed)
- Add DrizzleORM, because :puke:
- CSS styles for all markdown things under #formatted
- Don't create notes on click
- Try to use pointer builder to show (local items so only the current user can see them) which grid locations have a note attached
- Use the tool toolbar for visibility toggle
- Write a how-to use the extension

## Ideas

- [idea] Implement syntax highlighting in the editor mode
- [idea] persist not-saved notes to `localStorage`.
- [idea] Note versioning?
- [idea] Attach notes to assets
- [idea] Allow players to view notes

## Completed

- ~~use `localStorage` by default to persist notes (maybe indexedDb because fun?)~~
- ~~use `localStorage` to save the local state (large/small popover etc)~~
- ~~Where should I host this app?~~
  - ~~proper db, I'd like to host them together, where's that?~~
- ~~Setup CI/CD~~
- ~~FE framework rewrite? Vanilla is cool, but tiring, maybe web components, because fun?~~
- ~~Add linting (biome.js)~~
- ~~Settings page (popover url in the manifest)~~
- ~~Homepage (description of the extension/installation etc)~~

import OBR from '@owlbear-rodeo/sdk';
import { POPOVER_ID, TOOL_ID } from '../../config';
import '../../style.css';
import type { SceneMeta } from '../../types';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h3>Welcome to Notes!</h3>
    <p>Llama welcomes thee 🦙</p>
  </div>
`

OBR.onReady(async () => {
  OBR.scene.onReadyChange(async (ready) => {
    if (ready) {
      const sceneMeta = (await OBR.scene.getMetadata())[`${TOOL_ID}/metadata`] as SceneMeta;
      
      if (sceneMeta?.sceneId) {
        console.log('Scene has an ID already!', sceneMeta.sceneId)
      } else {
        console.log('Creating a new ID for this scene!')
        await OBR.scene.setMetadata({
          [`${TOOL_ID}/metadata`]: {
            sceneId: window.crypto.randomUUID()
          }
        })
      }
    }
  })
  
  await OBR.tool.create({
    id: `${TOOL_ID}/tool`,
    icons: [
      {
        icon: "/notebook-pen.svg",
        label: "Notes",
      },
    ],
    defaultMode: `${TOOL_ID}/mode`,
  });
  await OBR.tool.createMode({
    id: `${TOOL_ID}/mode`,
    preventDrag: {dragging: false},
    cursors: [{
      cursor: 'pointer',
      filter: {
          activeTools: [`${TOOL_ID}/tool`],
        },
    }],
    icons: [
      {
        icon: "/pen-line.svg",
        label: "Line",
        filter: {
          activeTools: [`${TOOL_ID}/tool`],
        },
      },
    ],
    async onToolClick(_, event) {
      await OBR.popover.close(POPOVER_ID);
      const {x, y} = await OBR.scene.grid.snapPosition(event.pointerPosition, 1, false, true);
      const sceneMeta = (await OBR.scene.getMetadata())[`${TOOL_ID}/metadata`] as SceneMeta;

      await OBR.popover.open({
        id: POPOVER_ID,
        url: `/notes?sceneId=${sceneMeta.sceneId}&x=${Math.round(x)}&y=${Math.round(y)}`,
        height: 500,
        width: 500,
        anchorOrigin: {
          horizontal: 'LEFT',
          vertical: 'BOTTOM'
        },
        disableClickAway: true
      })
    },
    async onToolDoubleClick() {
        await OBR.popover.close(POPOVER_ID)
    }
  });
});

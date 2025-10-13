import OBR from '@owlbear-rodeo/sdk';
import '../../style.css';
import type { SceneMeta } from '../../types';

const toolID = "coordinates-notes";
const popoverID = `${toolID}-popover`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h3>Welcome to Notes!</h3>
    <p>Llama welcomes thee 🦙</p>
  </div>
`

OBR.onReady(async () => {
  OBR.scene.onReadyChange(async (ready) => {
    if (ready) {
      const sceneMeta = (await OBR.scene.getMetadata())[`${toolID}/metadata`] as SceneMeta;
      
      if (sceneMeta?.sceneId) {
        console.log('Scene has an ID already!', sceneMeta.sceneId)
      } else {
        console.log('Creating a new ID for this scene!')
        await OBR.scene.setMetadata({
          [`${toolID}/metadata`]: {
            sceneId: window.crypto.randomUUID()
          }
        })
      }
    }
  })
  
  await OBR.tool.create({
    id: `${toolID}/tool`,
    icons: [
      {
        icon: "/notebook-pen.svg",
        label: "Notes",
      },
    ],
    defaultMode: `${toolID}/mode`,
  });
  await OBR.tool.createMode({
    id: `${toolID}/mode`,
    preventDrag: {dragging: false},
    cursors: [{
      cursor: 'pointer',
      filter: {
          activeTools: [`${toolID}/tool`],
        },
    }],
    icons: [
      {
        icon: "/pen-line.svg",
        label: "Line",
        filter: {
          activeTools: [`${toolID}/tool`],
        },
      },
    ],
    async onToolClick(_, event) {
      await OBR.popover.close(popoverID);
      const {x, y} = await OBR.scene.grid.snapPosition(event.pointerPosition, 1, false, true);
      const sceneMeta = (await OBR.scene.getMetadata())[`${toolID}/metadata`] as SceneMeta;

      await OBR.popover.open({
        id: popoverID,
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
        await OBR.popover.close(popoverID)
    }
  });
});

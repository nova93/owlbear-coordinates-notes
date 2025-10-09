import OBR from '@owlbear-rodeo/sdk';
import './style.css';

const url =  new URL(window.location.toString())
const searchParams = url.searchParams

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h3>Notes</h3>
    <p>X: ${searchParams.get('x')}</p>
    <p>Y: ${searchParams.get('y')}</p>
  </div>
`

const toolID = "coordinates-notes";
const popoverID = `${toolID}-popover`

async function openPopover(x:number, y:number) {
   await OBR.popover.open({
    id: popoverID,
    url: `/?x=${x}&y=${y}`,
    height: 400,
    width: 500,
    anchorOrigin: {
      horizontal: 'LEFT',
      vertical: 'BOTTOM'
    },
    disableClickAway: true,
    marginThreshold: 50
  })
}

OBR.onReady(async () => {
  OBR.tool.create({
    id: `${toolID}/tool`,
    icons: [
      {
        icon: "/vite.svg",
        label: "Notes",
      },
    ],
    defaultMode: `${toolID}/mode`,
  });
  OBR.tool.createMode({
    id: `${toolID}/mode`,
    preventDrag: {dragging: false},
    icons: [
      {
        icon: "/icon.svg",
        label: "Line",
        filter: {
          activeTools: [`${toolID}/tool`],
        },
      },
    ],
    async onToolClick(_, event) {
      await OBR.popover.close(popoverID)
      const {x, y} = await OBR.scene.grid.snapPosition(event.pointerPosition, 1, false, true)
      await openPopover(x, Math.round(y))
    },
    async onToolDoubleClick() {
        await OBR.popover.close(popoverID)
    }
  });
});

import OBR, { type Popover } from "@owlbear-rodeo/sdk"
import { POPOVER_ID } from "../config"
import type { Note } from "../types"

type Variant = 'small' | 'large'
type Size = {
  [K in Variant]: {
    height: Popover['height'],
    width: Popover['width'],
    anchorOrigin: Popover['anchorOrigin']
  }
}

export default async (ids: Omit<Note, 'content'>, variant: Variant) => {
  const size: Size = {
    large: {
      height: 10000,
      width: 10000,
      anchorOrigin: {
        horizontal: 'CENTER',
        vertical: 'CENTER'
      }
    },
    small: {
      height: 500,
      width: 500,
      anchorOrigin: {
        horizontal: 'LEFT',
        vertical: 'BOTTOM'
      }
    }
  };

  await OBR.popover.open({
      ...size[variant],
      id: POPOVER_ID,
      url: `/notes?sceneId=${ids.sceneId}&x=${ids.x}&y=${ids.y}`,
      disableClickAway: true
    });
}

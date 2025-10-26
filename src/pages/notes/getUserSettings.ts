import type { UserSettings } from "../../types";

const KEY = 'OBR-Grid-Notes-Settings'

const getUserSettings = (): UserSettings => {
  const settings: UserSettings = JSON.parse(window.localStorage.getItem(KEY));

  if (!settings) {
    return {
      storage: 'browser'
    }
  }

  if (settings.storage === 'sqlite') {
    console.log('If you are running this extension locally:')
    console.log('Comment out this whole code block to enable local SQLite')
    throw Error('Please, do not try to use SQLite on a live version')
  }

  return settings
}

export default getUserSettings

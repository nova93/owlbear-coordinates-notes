import type { UserSettings } from "../../types";

const KEY = "OBR-Grid-Notes-Settings";

const getUserSettings = (): UserSettings => {
	const settings: UserSettings = JSON.parse(window.localStorage.getItem(KEY));

	if (!settings) {
		return {
			storage: "browser",
		};
	}

	return settings;
};

export default getUserSettings;

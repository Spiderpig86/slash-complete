import { MarkdownView, Plugin } from "obsidian";
import { SlashCompleteSettingsTab } from "./src/settings";
import { Command } from "./src/models/command";
import { AutoComplete } from "./src/autocomplete";
import { SlashCompleteSettings } from "./src/models/slash_complete_settings";
import { DEFAULT_SETTINGS } from "./src/constants";

export default class SlashCompletePlugin extends Plugin {
	settings: SlashCompleteSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SlashCompleteSettingsTab(this.app, this));

		this.registerEditorSuggest(new AutoComplete(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = await this.mergeSettings();
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async mergeSettings(): Promise<SlashCompleteSettings> {
		const stored = await this.loadData();
		if (!stored) {
			return DEFAULT_SETTINGS;
		}

		// Merge commands into stored settings when new ones are added
		const commands = Object.assign(
			{},
			DEFAULT_SETTINGS.commands,
			stored.commands
		);
		stored.commands = commands;
		return stored;
	}
}

import { MarkdownView, Plugin } from "obsidian";
import { SlashCompleteSettingsTab } from "./src/settings";
import { Command } from "./src/command";
import { AutoComplete } from "./src/autocomplete";

// Remember to rename these classes and interfaces!

interface SlashCompleteSettings {
	hotKey: string;
	commands: Command[];
}

const DEFAULT_SETTINGS: SlashCompleteSettings = {
	hotKey: `/`,
	commands: [
		{
			command: `info`,
			shortKey: null,
			value: `>[!INFO]\n>`,
		},
		{
			command: `tip`,
			shortKey: null,
			value: `>[!TIP]\n>`,
		},
		{
			command: `important`,
			shortKey: null,
			value: `>[!IMPORTANT]\n>`,
		},
		{
			command: `warning`,
			shortKey: null,
			value: `>[!WARNING]\n>`,
		},
		{
			command: `caution`,
			shortKey: null,
			value: `>[!CAUTION]\n>`,
		},
	],
};

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
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

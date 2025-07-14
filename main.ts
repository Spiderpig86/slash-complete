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
			command: `h1`,
			shortKey: null,
			value: `# `,
		},
		{
			command: `h2`,
			shortKey: null,
			value: `## `,
		},
		{
			command: `h3`,
			shortKey: null,
			value: `### `,
		},
		{
			command: `h4`,
			shortKey: null,
			value: `#### `,
		},
		{
			command: `h5`,
			shortKey: null,
			value: `##### `,
		},
		{
			command: `h6`,
			shortKey: null,
			value: `###### `,
		},
		{
			command: `bold`,
			shortKey: null,
			value: `____`,
		},
		{
			command: `italics`,
			shortKey: null,
			value: `__`,
		},
		{
			command: `strike-through`,
			shortKey: null,
			value: `~~~~`,
		},
		{
			command: `subscript`,
			shortKey: null,
			value: `<sub></sub>`,
		},
		{
			command: `super`,
			shortKey: null,
			value: `____`,
		},
		{
			command: `underline`,
			shortKey: null,
			value: `<ins></ins>`,
		},
		{
			command: `highlight`,
			shortKey: null,
			value: `====`,
		},
		{
			command: `quote`,
			shortKey: null,
			value: `>`,
		},
		{
			command: `link`,
			shortKey: null,
			value: `[]()`,
		},
		{
			command: `image`,
			shortKey: `img`,
			value: `![]()`,
		},
		{
			command: `newline`,
			shortKey: `br`,
			value: `<br />`,
		},
		{
			command: `bullet-list`,
			shortKey: `li`,
			value: `- `,
		},
		{
			command: `number-list`,
			shortKey: `ol`,
			value: `1. `,
		},
		{
			command: `checkbox`,
			shortKey: `cb`,
			value: `- [ ] `,
		},
		{
			command: `code`,
			shortKey: null,
			value: `\`\`\``,
		},
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

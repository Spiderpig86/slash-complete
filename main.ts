import {
	MarkdownView,
	Plugin
} from "obsidian";
import { SlashCompleteSettingsTab } from "./settings";

// Remember to rename these classes and interfaces!

interface SlashCompleteSettings {
	hotKey: string;
	commands: Map<string, string>;
}

const DEFAULT_SETTINGS: SlashCompleteSettings = {
	hotKey: `/`,
	commands: new Map([[`info`, `>[!info]\n`]]),
};

export default class SlashCompletePlugin extends Plugin {
	settings: SlashCompleteSettings;

	async onload() {
		await this.loadSettings();

		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: "open-sample-modal-complex",
			name: "Open sample modal (complex)",
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// Can only invoke in Markdown editor
				}
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SlashCompleteSettingsTab(this.app, this));
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

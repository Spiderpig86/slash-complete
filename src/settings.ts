import { App, PluginSettingTab, Setting } from "obsidian";
import SlashCompletePlugin from "../main";
import { DEFAULT_SETTINGS } from "./constants";

export class SlashCompleteSettingsTab extends PluginSettingTab {
	plugin: SlashCompletePlugin;

	constructor(app: App, plugin: SlashCompletePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: `SlashComplete Settings` });
		containerEl.createEl("p", {
			text: `Settings for SlashComplete.`,
		});

		new Setting(containerEl)
			.setName(`Hotkey`)
			.setDesc(`Hotkey to trigger autocomplete for Markdown commands.`)
			.addText((text) =>
				text
					.setPlaceholder("Enter a single char")
					.setValue(this.plugin.settings.hotKey)
					.onChange(async (value) => {
						// Only save the most recently entered char
						// We should only allow for 1 char
						if (value.trim().length < 1) {
							// Don't allow nothing to be set
							text.setValue(this.plugin.settings.hotKey);
							return;
						}

						let c = value[0];
						if (value.trim().length === 2) {
							c = value.charAt(1);
						}
						text.setValue(c);
						this.plugin.settings.hotKey = c;

						await this.plugin.saveSettings();
					})
			);

		containerEl.createEl("h3", { text: `Markdown Constructs` });
		for (let c of this.plugin.settings.commands) {
			new Setting(containerEl)
				.setName(c.command)
				.setDesc(`Set the autocomplete settings for ${c.command}.`)
				.addText((text) =>
					text
						.setPlaceholder("Enter (optional) alias")
						.setValue(c.alias ?? ``)
						.onChange(async (value) => {
							c.alias = value;
							await this.plugin.saveSettings();
						})
				)
				.addTextArea((text) =>
					text
						.setPlaceholder("Enter autocomplete value")
						.setValue(c.value)
						.onChange(async (value) => {
							c.value = value;
							await this.plugin.saveSettings();
						})
				);
		}
	}
}

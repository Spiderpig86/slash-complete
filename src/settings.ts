import { App, Notice, PluginSettingTab, Setting } from "obsidian";
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

		const callout = containerEl.createEl("p");

		callout.appendText("Need help? Check out the ");
		callout.appendChild(
			createEl("a", {
				text: "SlashComplete documentation",
				href: "https://github.com/Spiderpig86/slash-complete",
			})
		);
		callout.appendText(". You can support continued development by ");
		callout.appendChild(
			createEl("a", {
				text: "buying me a coffee",
				href: "https://github.com/sponsors/Spiderpig86",
			})
		);
		callout.appendText(" ☕");

		containerEl.createEl("h3", { text: `Basics` });
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
		for (let [_, c] of Object.entries(this.plugin.settings.commands)) {
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

		containerEl.createEl("h3", { text: `Danger!` });
		new Setting(containerEl)
			.setName(`Reset settings`)
			.setDesc(`Resets SlashComplete to default state.`)
			.addButton((cb) => {
				cb.setButtonText(`Reset`)
					.setWarning()
					.onClick(async (event) => {
						this.plugin.settings = {...DEFAULT_SETTINGS};
						await this.plugin.saveSettings();
						await this.plugin.loadSettings();
						await this.display(); // Reload settings tab

						new Notice(`SlashComplete settings successfully reset.`, /* ms */ 2500);
					});
			});
	}
}

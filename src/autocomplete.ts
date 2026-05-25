import {
	App,
	Editor,
	EditorPosition,
	EditorSuggest,
	EditorSuggestContext,
	EditorSuggestTriggerInfo,
	setIcon,
	TFile,
} from "obsidian";
import { Command } from "./models/command";
import SlashCompletePlugin from "../main";
import { ensureCloseMenuFooter } from "./close_menu";
import { getCommandDisplayLabel } from "./command_label";
import { getCommandIcon } from "./icon_map";
import { getSuggestionShortcutHint } from "./suggestion_shortcut";

const NO_COMMAND = -1;

export class AutoComplete extends EditorSuggest<Command> {
	private slashComplete: SlashCompletePlugin;
	private commandStartIndex: number;

	constructor(app: App, slashComplete: SlashCompletePlugin) {
		super(app);
		this.slashComplete = slashComplete;
		this.commandStartIndex = NO_COMMAND;
	}

	onTrigger(
		cursor: EditorPosition,
		editor: Editor,
		file: TFile | null
	): EditorSuggestTriggerInfo | null {
		const line = editor.getLine(cursor.line);

		if (
			this.commandStartIndex === NO_COMMAND &&
			line[cursor.ch - 1] !== this.slashComplete.settings.hotKey
		) {
			// Not in command and most recent char is not the hotkey, skip
			return null;
		}

		// Command char hit
		if (this.commandStartIndex === NO_COMMAND) {
			// Not in command yet, so we should mark the start here
			this.commandStartIndex = cursor.ch - 1;
		}
		const currentCommand = line.slice(this.commandStartIndex, cursor.ch);

		if (
			currentCommand.includes(` `) ||
			currentCommand[0] !== this.slashComplete.settings.hotKey
		) {
			// Also in case trigger char gets removed, we should exit autocompletion
			this.commandStartIndex = NO_COMMAND;
			return null;
		}

		return {
			start: cursor,
			end: cursor,
			query: currentCommand.slice(1),
		};
	}
	getSuggestions(
		context: EditorSuggestContext
	): Command[] | Promise<Command[]> {
		const commands = Object.entries(this.slashComplete.settings.commands)
			.filter(
				(entry) =>
					entry[1].command.includes(context.query) ||
					(entry[1].alias !== null &&
						entry[1].alias.includes(context.query))
			)
			.map((entry) => entry[1]);

		return commands;
	}
	renderSuggestion(value: Command, el: HTMLElement): void {
		el.empty();
		el.addClass("slash-complete-item");

		const row = el.createDiv({ cls: "slash-complete-row" });

		const iconEl = row.createDiv({ cls: "slash-complete-icon" });
		const iconName = getCommandIcon(value.command);
		if (iconName) {
			setIcon(iconEl, iconName);
		}

		row.createDiv({
			cls: "slash-complete-label",
			text: getCommandDisplayLabel(value.command),
		});

		const hint = getSuggestionShortcutHint(value);
		if (hint) {
			row.createDiv({ cls: "slash-complete-hint", text: hint });
		}

		ensureCloseMenuFooter(() => {
			this.commandStartIndex = NO_COMMAND;
			this.close();
		});
	}
	selectSuggestion(value: Command, evt: MouseEvent | KeyboardEvent): void {
		if (NO_COMMAND == this.commandStartIndex) {
			return;
		}

		this.context?.editor.replaceRange(
			value.value,
			{ line: this.context.start.line, ch: this.commandStartIndex },
			this.context.end
		);
		this.close();
	}
}

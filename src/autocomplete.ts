import {
	App,
	Editor,
	EditorPosition,
	EditorSuggest,
	EditorSuggestContext,
	EditorSuggestTriggerInfo,
	TFile,
} from "obsidian";
import { Command } from "./command";
import SlashCompletePlugin from "../main";

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
		return this.slashComplete.settings.commands.filter(
			(c) =>
				c.command.includes(context.query) ||
				(c.shortKey !== null && c.shortKey.includes(context.query))
		);
	}
	renderSuggestion(value: Command, el: HTMLElement): void {
		const div = document.createElement(`div`);
		div.textContent = value.command;
		el.appendChild(div);
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

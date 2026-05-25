import { Command } from "./models/command";

/** Markdown snippet shown on the right (e.g. #, ##, []). */
export function getSuggestionShortcutHint(command: Command): string | null {
	const value = command.value.trim();

	if (!value || value.includes("\n") || value.length > 24) {
		return null;
	}

	return value;
}

import type { IconName } from "obsidian";

/** Lucide icon id per slash command (from product spec). */
export const COMMAND_ICON_MAP: Record<string, IconName> = {
	h1: "heading-1",
	h2: "heading-2",
	h3: "heading-3",
	h4: "heading-4",
	h5: "heading-5",
	h6: "heading-6",
	bold: "bold",
	italics: "italic",
	"strike-through": "strikethrough",
	subscript: "subscript",
	super: "superscript",
	underline: "underline",
	highlight: "highlighter",
	quote: "quote",
	link: "link",
	image: "image",
	newline: "corner-down-left",
	"bullet-list": "list",
	"number-list": "list-ordered",
	checkbox: "list-todo",
	code: "code",
	info: "info",
	tip: "lightbulb",
	important: "message-square-warning",
	warning: "triangle-alert",
	caution: "octagon-alert",
	table: "table",
};

export function getCommandIcon(command: string): IconName | null {
	return COMMAND_ICON_MAP[command] ?? null;
}

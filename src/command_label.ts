/** Menu labels shown in the UI (internal command ids stay lowercase for search). */
const COMMAND_DISPLAY_LABELS: Record<string, string> = {
	h1: "Heading 1",
	h2: "Heading 2",
	h3: "Heading 3",
	h4: "Heading 4",
	h5: "Heading 5",
	h6: "Heading 6",
	bold: "Bold",
	italics: "Italics",
	"strike-through": "Strikethrough",
	subscript: "Subscript",
	super: "Superscript",
	underline: "Underline",
	highlight: "Highlight",
	quote: "Quote",
	link: "Link",
	image: "Image",
	newline: "Line break",
	"bullet-list": "Bullet list",
	"number-list": "Numbered list",
	checkbox: "To-do list",
	code: "Code",
	info: "Info",
	tip: "Tip",
	important: "Important",
	warning: "Warning",
	caution: "Caution",
	table: "Table",
};

function titleCaseFromId(command: string): string {
	return command
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function getCommandDisplayLabel(command: string): string {
	return COMMAND_DISPLAY_LABELS[command] ?? titleCaseFromId(command);
}

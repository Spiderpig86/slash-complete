import { SlashCompleteSettings } from "./models/slash_complete_settings";

export const DEFAULT_SETTINGS: SlashCompleteSettings = {
	hotKey: `/`,
	commands: {
		h1: {
			command: "h1",
			alias: null,
			value: "# ",
		},
		h2: {
			command: "h2",
			alias: null,
			value: "## ",
		},
		h3: {
			command: "h3",
			alias: null,
			value: "### ",
		},
		h4: {
			command: "h4",
			alias: null,
			value: "#### ",
		},
		h5: {
			command: "h5",
			alias: null,
			value: "##### ",
		},
		h6: {
			command: "h6",
			alias: null,
			value: "###### ",
		},
		bold: {
			command: "bold",
			alias: null,
			value: "____",
		},
		italics: {
			command: "italics",
			alias: null,
			value: "__",
		},
		"strike-through": {
			command: "strike-through",
			alias: null,
			value: "~~~~",
		},
		subscript: {
			command: "subscript",
			alias: null,
			value: "<sub></sub>",
		},
		super: {
			command: "super",
			alias: null,
			value: "____",
		},
		underline: {
			command: "underline",
			alias: null,
			value: "<ins></ins>",
		},
		highlight: {
			command: "highlight",
			alias: null,
			value: "====",
		},
		quote: {
			command: "quote",
			alias: null,
			value: ">",
		},
		link: {
			command: "link",
			alias: null,
			value: "[]()",
		},
		image: {
			command: "image",
			alias: "img",
			value: "![]()",
		},
		newline: {
			command: "newline",
			alias: "br",
			value: "<br />",
		},
		"bullet-list": {
			command: "bullet-list",
			alias: "li",
			value: "- ",
		},
		"number-list": {
			command: "number-list",
			alias: "ol",
			value: "1. ",
		},
		checkbox: {
			command: "checkbox",
			alias: "cb",
			value: "- [ ] ",
		},
		code: {
			command: "code",
			alias: null,
			value: "```",
		},
		info: {
			command: "info",
			alias: null,
			value: ">[!INFO]\n>",
		},
		tip: {
			command: "tip",
			alias: null,
			value: ">[!TIP]\n>",
		},
		important: {
			command: "important",
			alias: null,
			value: ">[!IMPORTANT]\n>",
		},
		warning: {
			command: "warning",
			alias: null,
			value: ">[!WARNING]\n>",
		},
		caution: {
			command: "caution",
			alias: null,
			value: ">[!CAUTION]\n>",
		},
		table: {
			command: "table",
			alias: "tb",
			value: `| | | |
|---|---|---|
| | | |
| | | |`,
		},
	},
};

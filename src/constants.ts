import { SlashCompleteSettings } from "./models/slash_complete_settings";

export const DEFAULT_SETTINGS: SlashCompleteSettings = {
	hotKey: `/`,
	commands: [
		{
			command: `h1`,
			alias: null,
			value: `# `,
		},
		{
			command: `h2`,
			alias: null,
			value: `## `,
		},
		{
			command: `h3`,
			alias: null,
			value: `### `,
		},
		{
			command: `h4`,
			alias: null,
			value: `#### `,
		},
		{
			command: `h5`,
			alias: null,
			value: `##### `,
		},
		{
			command: `h6`,
			alias: null,
			value: `###### `,
		},
		{
			command: `bold`,
			alias: null,
			value: `____`,
		},
		{
			command: `italics`,
			alias: null,
			value: `__`,
		},
		{
			command: `strike-through`,
			alias: null,
			value: `~~~~`,
		},
		{
			command: `subscript`,
			alias: null,
			value: `<sub></sub>`,
		},
		{
			command: `super`,
			alias: null,
			value: `____`,
		},
		{
			command: `underline`,
			alias: null,
			value: `<ins></ins>`,
		},
		{
			command: `highlight`,
			alias: null,
			value: `====`,
		},
		{
			command: `quote`,
			alias: null,
			value: `>`,
		},
		{
			command: `link`,
			alias: null,
			value: `[]()`,
		},
		{
			command: `image`,
			alias: `img`,
			value: `![]()`,
		},
		{
			command: `newline`,
			alias: `br`,
			value: `<br />`,
		},
		{
			command: `bullet-list`,
			alias: `li`,
			value: `- `,
		},
		{
			command: `number-list`,
			alias: `ol`,
			value: `1. `,
		},
		{
			command: `checkbox`,
			alias: `cb`,
			value: `- [ ] `,
		},
		{
			command: `code`,
			alias: null,
			value: `\`\`\``,
		},
		{
			command: `info`,
			alias: null,
			value: `>[!INFO]\n>`,
		},
		{
			command: `tip`,
			alias: null,
			value: `>[!TIP]\n>`,
		},
		{
			command: `important`,
			alias: null,
			value: `>[!IMPORTANT]\n>`,
		},
		{
			command: `warning`,
			alias: null,
			value: `>[!WARNING]\n>`,
		},
		{
			command: `caution`,
			alias: null,
			value: `>[!CAUTION]\n>`,
		},
	],
};

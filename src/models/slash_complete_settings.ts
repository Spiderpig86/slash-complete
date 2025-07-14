import { Command } from "./command";

export interface SlashCompleteSettings {
	hotKey: string;
	commands: {
		[x: string]: Command;
	};
}

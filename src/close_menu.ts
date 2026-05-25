/** Pinned footer below the scrollable command list. */
export function ensureCloseMenuFooter(onClose: () => void): void {
	requestAnimationFrame(() => {
		const container = document.querySelector(
			".suggestion-container:has(.slash-complete-item)"
		) as HTMLElement | null;

		if (!container) {
			return;
		}

		container.addClass("slash-complete-menu");

		if (container.querySelector(".slash-complete-footer")) {
			return;
		}

		const footer = container.createDiv({ cls: "slash-complete-footer" });
		const row = footer.createDiv({
			cls: "slash-complete-row slash-complete-close-row",
		});
		row.createDiv({ cls: "slash-complete-label", text: "Close menu" });
		row.createDiv({ cls: "slash-complete-hint", text: "esc" });

		footer.addEventListener("mousedown", (event: MouseEvent) => {
			event.preventDefault();
			event.stopPropagation();
		});
		footer.addEventListener("click", (event: MouseEvent) => {
			event.preventDefault();
			event.stopPropagation();
			onClose();
		});
	});
}

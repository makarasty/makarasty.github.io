const blockedKeysForPages = new Set(['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F12', 'Alt']);

/**
 * @param {Event} event
 */
function breakEvent(event) {
	event.preventDefault()
	return false
}

document.addEventListener('dragstart', breakEvent);
document.addEventListener('selectstart', breakEvent);
document.addEventListener('contextmenu', breakEvent);

/**
 * @param {KeyboardEvent} event
 */
function onKeyDownEvent(event) {
	if (blockedKeysForPages.has(event.key.toUpperCase())) {
		return breakEvent(event)
	}
}

document.addEventListener('keydown', onKeyDownEvent);
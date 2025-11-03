# ⚓ Smart Anchor V1.1: Quick Page Navigation with Hotkeys

**Smart Anchor V1.1** is a minimalist extension for Chromium-based browsers (Chrome, Opera, Edge). It allows you to create up to 5 anchors (marks) on any web page and instantly return to them.

Version 1.1 adds support for **Keyboard Shortcuts** and a **Context Menu (Right-Click)**, making navigation even faster.

## ✨ Main Features

*   **5 Reusable Anchors**: Save up to 5 different positions on a page.
*   **Instant Jump**: Quickly navigate to a saved mark.
*   **Persistence**: Anchors are saved even after a page refresh.
*   **Keyboard Shortcuts**: Set and jump to the first two anchors using your keyboard.
*   **Context Menu Integration**: Manage all anchors via the right-click context menu.
*   **Three Ways to Use**: Use the popup, right-click menu, or hotkeys—whichever you prefer.

## 🚀 Installation

Since the extension is not published in official stores, it can be easily installed manually in Developer Mode.

1.  **Download ZIP**: Go to the main repository page, click the green `Code` button, then select `Download ZIP`.
2.  **Unzip**: Unzip the downloaded file to a convenient location.
3.  **Open Extension Manager**:
    *   In your browser (Chrome/Opera/Edge), go to: `chrome://extensions` or `opera://extensions`.
4.  **Enable Developer Mode**: Turn on the "Developer mode" switch in the upper right corner.
5.  **Load Extension**: Click the "Load unpacked" button and select the `Smart Anchor V1.1` folder (not the ZIP file!).

The extension is ready to use! Don't forget to pin its icon for quick access.

## 📖 How to Use

You now have three ways to manage anchors:

### 1. The Popup Menu
The classic way: click the extension icon and use the `SET #` buttons to save an anchor on selected text and `JUMP #` to go to it.

### 2. The Context Menu (Right-Click)
This is the most convenient way to manage all five anchors:
*   **To set an anchor**: Highlight text on the page, right-click, and select `Smart Anchor` -> `Set anchor` -> `Set Anchor #...`.
*   **To jump to an anchor**: Right-click anywhere on the page and select `Smart Anchor` -> `Jump to anchor` -> `Jump to Anchor #...`.

### 3. Keyboard Shortcuts (Hotkeys)
The fastest way to work with the first two anchors:

*   `Alt + Shift + 1` — Set Anchor #1 (on highlighted text)
*   `Alt + Shift + 2` — Set Anchor #2 (on highlighted text)
*   `Alt + Shift + 3` — Jump to Anchor #1
*   `Alt + Shift + 4` — Jump to Anchor #2

The `RESET ALL` function is available in the popup and the context menu.

## ⚠️ Important Notes

*   **Character Limit**: The system saves only the first 50 characters of the selected text for an anchor.
*   **Duplicate Text**: If the page contains multiple identical text fragments, the extension will jump to the first occurrence it finds.
*   **Security Restrictions**: The extension will not run on protected browser pages (like the extension store or internal settings pages). This is a standard security measure.

## 🛠️ Development

This extension uses standard Chrome Extension APIs:
*   `manifest.json` (V3)
*   `chrome.storage.local`
*   `chrome.scripting.executeScript`
*   `chrome.contextMenus`
*   Pure JavaScript, HTML, CSS.

## License

This project is licensed under the MIT License.
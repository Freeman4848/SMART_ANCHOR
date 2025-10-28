# ⚓ Smart Anchor V1: Quick Page Navigation Tool



Smart Anchor V1 is a minimalist extension for Chromium-based browsers (Chrome, Opera, Edge). It allows you to quickly create up to 5 permanent anchors (labels) on any web page and instantly return to them after scrolling or refreshing the page.

---

## ✨ Main Features

* **5 Reusable Anchors:** Save up to 5 different positions on the same page.
* **Instant Jump:** Quickly jump to a saved label using the `GO #` button.
* **Persistence:** Anchors persist even after page refresh or reload.
* **Simple Interface:** Clean, minimalistic pop-up menu without unnecessary features.

---

## 🚀 Installation

Since the extension is not yet published in the official stores, it can be easily installed manually in **Developer Mode**.

1. **Download ZIP:** Go to the main page of this repository and click the **Code** button, then select **Download ZIP**.
2. **Unzip:** Unzip the downloaded file `SmartAnchor_V1.zip` to a convenient location for you.
3. **Open Extension Manager:**
* Open a browser (Chrome/Opera/Edge) and go to: `chrome://extensions` or `opera://extensions`.
4. **Enable Developer Mode:** Turn on the **Developer mode"** switch in the upper right corner of the page.
5. **Load Extension:** Click the **"Load unpacked"** button and select the **folder** `Smart Anchor V1` (not the ZIP file!).

The extension is ready to use! **Don't forget to pin the icon** for easy access to the menu.

---

## 📖 How to use

Use the `SET #` buttons to save the position and `GO #` to jump.

### 1. Setting an Anchor (SET)

**To save an Anchor Mark on the page, select the desired text and press 'SET \# 1'.** (You can save up to 5 unique Anchors.)

* After pressing `SET # 1`, you will see a message about successful saving.
* **To reassign a tag** (overwrite), simply highlight the new text and press `SET # 1` again.

### 2. Jump to Tag (GO)

**After successfully setting Anchor \#1, scroll up or down the page and click the 'GO \# 1' button. The extension will perform an instant jump to the saved mark.**

### 3. Clear Tags (RESET ALL)

**When the marks are no longer needed, simply click the 'RESET ALL' button to erase all 5 saved anchors simultaneously.**

---

## ⚠️ Important Notes

1. **Anchor Limit:** The system currently saves only the first **60 characters** of the selected text for the anchor name.
2. **Important Note on Jumping:** If the page contains multiple instances of the exact same saved text, the extension will jump to any one of the identical text occurrences.
3. **Security Notice:** If the anchor fails to save, it means the current webpage is protected from browser extensions (e.g., store pages, internal browser settings) for security reasons.

---

## 🛠️ Development

This extension was created using standard Chrome extension APIs:
* `manifest.json` (V3)
* `chrome.tabs.sendMessage`
* `chrome.scripting.executeScript`
* `chrome.storage.local`
* Pure JavaScript, HTML, CSS.

### License


This project is licensed under the MIT License.


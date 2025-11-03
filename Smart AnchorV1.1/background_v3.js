let anchors = {};
let anchorsLoadedPromise;

function loadAnchors() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['v3_anchors'], (result) => {
            anchors = result.v3_anchors || {};
            resolve();
        });
    });
}

anchorsLoadedPromise = loadAnchors();

async function saveAnchors() {
    await chrome.storage.local.set({ 'v3_anchors': anchors });
}

function sendMessageToContent(tabId, message) {
     chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content_v3.js']
    }, () => {
        if (chrome.runtime.lastError) {
            return;
        }
        chrome.tabs.sendMessage(tabId, message);
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({ id: "parent", title: "Smart Anchor", contexts: ["all"] });
        chrome.contextMenus.create({ id: "set-submenu", parentId: "parent", title: "Set Anchor", contexts: ["selection"] });
        chrome.contextMenus.create({ id: "jump-submenu", parentId: "parent", title: "Jump to Anchor", contexts: ["all"] });
        for (let i = 1; i <= 5; i++) {
            chrome.contextMenus.create({ id: `set-context-${i}`, parentId: "set-submenu", title: `Set Anchor #${i}`, contexts: ["selection"] });
            chrome.contextMenus.create({ id: `jump-${i}`, parentId: "jump-submenu", title: `Jump to Anchor #${i}`, contexts: ["all"] });
        }
        chrome.contextMenus.create({ id: "separator", parentId: "parent", type: "separator", contexts: ["all"] });
        chrome.contextMenus.create({ id: "reset-all-context", parentId: "parent", title: "Reset All Anchors", contexts: ["all"] });
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    await anchorsLoadedPromise;
    if (info.menuItemId.startsWith('set-context-')) {
        const id = info.menuItemId.split('-')[2];
        sendMessageToContent(tab.id, {
            action: `v3_set-from-context-${id}`,
            selectionText: info.selectionText
        });
    } else if (info.menuItemId.startsWith('jump-')) {
        const id = info.menuItemId.split('-')[1];
        sendMessageToContent(tab.id, { action: `v3_jump-${id}` });
    } else if (info.menuItemId === 'reset-all-context') {
        sendMessageToContent(tab.id, { action: 'v3_reset-all' });
    }
});

chrome.commands.onCommand.addListener(async (command, tab) => {
    await anchorsLoadedPromise;
    const needsSelection = command.startsWith('set-anchor-');
    if (needsSelection) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => window.getSelection().toString()
        }, (injectionResults) => {
            const selectedText = (injectionResults && injectionResults[0].result) || "";
            const id = command.split('-')[2];
            sendMessageToContent(tab.id, {
                action: `v3_set-${id}`,
                selectionText: selectedText
            });
        });
    } else {
        const id = command.split('-')[3];
        sendMessageToContent(tab.id, { action: `v3_jump-${id}` });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    (async () => {
        await anchorsLoadedPromise;
        const action = request.action;

        if (action === 'v3_set-with-text') {
            anchors[request.id] = request.anchorText;
            await saveAnchors();
            sendResponse({ status: 'success' });
        } else if (action === 'v3_get-anchor') {
            sendResponse({ anchorText: anchors[request.id] || null });
        } else if (action === 'v3_reset-all') {
            anchors = {};
            await saveAnchors();
            sendResponse({ status: 'success' });
        }
    })();
    return true;
});
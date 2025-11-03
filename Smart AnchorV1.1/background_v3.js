let anchors = {};
let anchorsLoadedPromise;

function loadAnchors() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['v3_anchors'], (result) => {
            anchors = result.v3_anchors || {};
            console.log("Anchors loaded:", anchors);
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
            return console.error("Script injection failed:", chrome.runtime.lastError.message);
        }
        chrome.tabs.sendMessage(tabId, message);
    });
}


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({ id: "parent", title: "Smart Anchor", contexts: ["all"] });
        chrome.contextMenus.create({ id: "set-submenu", parentId: "parent", title: "Установить якорь", contexts: ["selection"] });
        chrome.contextMenus.create({ id: "jump-submenu", parentId: "parent", title: "Перейти к якорю", contexts: ["all"] });
        for (let i = 1; i <= 5; i++) {
            chrome.contextMenus.create({ id: `set-context-${i}`, parentId: "set-submenu", title: `Установить якорь #${i}`, contexts: ["selection"] });
            chrome.contextMenus.create({ id: `jump-${i}`, parentId: "jump-submenu", title: `Перейти к якорю #${i}`, contexts: ["all"] });
        }
        chrome.contextMenus.create({ id: "separator", parentId: "parent", type: "separator", contexts: ["all"] });
        chrome.contextMenus.create({ id: "reset-all-context", parentId: "parent", title: "Сбросить все якоря", contexts: ["all"] });
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
    
    const commandMap = {
        "set-anchor-1": { action: 'v3_set-1', needsSelection: true },
        "jump-to-anchor-1": { action: 'v3_jump-1' },
        "set-anchor-2": { action: 'v3_set-2', needsSelection: true },
        "jump-to-anchor-2": { action: 'v3_jump-2' },
    };
    
    const cmd = commandMap[command];
    if (!cmd) return;

    if (cmd.needsSelection) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => window.getSelection().toString()
        }, (injectionResults) => {
            const selectedText = (injectionResults && injectionResults[0].result) || "";
            sendMessageToContent(tab.id, { 
                action: cmd.action, 
                selectionText: selectedText 
            });
        });
    } else {
        sendMessageToContent(tab.id, { action: cmd.action });
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
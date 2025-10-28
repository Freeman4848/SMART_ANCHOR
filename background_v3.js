

let anchors = {};


function saveAnchors() {
    return new Promise((resolve) => {
        chrome.storage.local.set({ 'v3_anchors': anchors }, resolve);
    });
}


chrome.storage.local.get(['v3_anchors'], (result) => {
    if (result.v3_anchors) {
        anchors = result.v3_anchors;
    }
    console.log("Background: Anchors loaded.", anchors);
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const action = request.action;

    if (action === 'v3_set-with-text') {
        const id = request.id;
        const anchorText = request.anchorText;
        
        anchors[id] = anchorText; 
        
        
        saveAnchors().then(() => {
            sendResponse({ status: 'success', message: `Anchor ${id} saved.` });
        });
        
        return true; 
        
    } else if (action === 'v3_get-anchor') {
        const id = request.id;
        const anchorText = anchors[id] || null;
        
        sendResponse({ 
            status: 'success', 
            anchorText: anchorText, 
            message: anchorText ? `Anchor ${id} found.` : `Anchor ${id} not found.`
        });
        return true;
        
    } else if (action === 'v3_reset-all') {
        anchors = {};
        
        
        saveAnchors().then(() => {
            sendResponse({ status: 'success', message: 'All anchors reset.' });
        });
        return true;
    }
});
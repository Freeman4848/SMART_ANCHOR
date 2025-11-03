<<<<<<< HEAD
﻿
=======

>>>>>>> 4aa4b6a3fd708e56f76179ee077d5047911d9b49

function showToast(message, isError = false) {
    let toast = document.getElementById('smart-anchor-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'smart-anchor-toast';
        document.body.appendChild(toast);
    }
    const style = isError ? "background-color: #f44336; border: 2px solid #b71c1c;" : "background-color: #4CAF50; border: 2px solid #1b5e20;";
    toast.style.cssText = `
        visibility: visible; min-width: 250px; color: white; text-align: center;
        border-radius: 5px; padding: 12px; position: fixed; z-index: 999999; 
        right: 20px; top: 20px; font-size: 14px; opacity: 1;
        transition: opacity 0.5s, top 0.5s; box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        ${style}
    `;
    toast.innerHTML = message;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.top = '0px';
        setTimeout(() => { toast.style.visibility = 'hidden'; }, 500);
    }, 1000); 
}

function jumpToAnchorLogic(id, savedAnchorText) {
    if (!savedAnchorText) {
        showToast(`Anchor ${id} is not set.`);
        return;
    }
    savedAnchorText = savedAnchorText.replace(/[\n\r\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
    let found = window.find(savedAnchorText, false, false, true, false, false, true);
    if (!found && savedAnchorText.length > 25) {
        const shorterText = savedAnchorText.substring(0, 25);
        found = window.find(shorterText, false, false, true, false, false, true);
    }
    if (found) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const targetElement = selection.getRangeAt(0).startContainer.parentElement;
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        showToast(`✅ Jump to Anchor ${id} successful!`);
    } else {
        showToast(`❌ Error: Could not find the anchor text for Anchor ${id}.`);
    }
}


(function() {
    if (window.isAnchorScriptLoaded) {
        return; 
    }
    window.isAnchorScriptLoaded = true;
    
    function setAnchor(id, text) {
        const selectedText = (text || "").replace(/[\n\r\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
        if (selectedText) {
            const shortText = selectedText.substring(0, 50); 
            chrome.runtime.sendMessage({ 
                action: 'v3_set-with-text', 
                id: id, 
                anchorText: shortText 
            }, (response) => {
                if (chrome.runtime.lastError) return console.error(chrome.runtime.lastError.message);
                if (response && response.status === 'success') {
                    showToast(`✅ Anchor ${id} set: "${shortText}..."`);
                }
            });
        } else {
            showToast(`Please highlight text to set Anchor ${id}.`);
        }
    }

<<<<<<< HEAD
    
=======
   
>>>>>>> 4aa4b6a3fd708e56f76179ee077d5047911d9b49
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        const command = request.action;
        
        if (command.startsWith('v3_set-from-context-')) {
            const id = command.substring(22); 
            setAnchor(id, request.selectionText);
        
        } else if (command.startsWith('v3_set-')) {
            const id = command.substring(7); 
            let textToSet = "";
            if (request.hasOwnProperty('selectionText')) {
                textToSet = request.selectionText;
            } else {
                textToSet = window.getSelection().toString();
            }
            setAnchor(id, textToSet);
        
        } else if (command.startsWith('v3_jump-')) {
            const id = command.substring(8); 
            chrome.runtime.sendMessage({ action: 'v3_get-anchor', id: id }, (response) => {
                if (chrome.runtime.lastError) return console.error(chrome.runtime.lastError.message);
                if (response && response.anchorText) {
                    jumpToAnchorLogic(id, response.anchorText);
                } else {
                    showToast(`Anchor ${id} is not set.`);
                }
            });

        } else if (command === 'v3_reset-all') {
            chrome.runtime.sendMessage({ action: 'v3_reset-all' }, (response) => {
                 if (chrome.runtime.lastError) return console.error(chrome.runtime.lastError.message);
                 if (response && response.status === 'success') {
                     showToast("All anchors reset. Memory cleared.");
                 }
            });
        }
        return true;
    });
})();

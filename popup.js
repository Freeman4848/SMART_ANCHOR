

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('buttons-container');

    
    for (let i = 1; i <= 5; i++) {
        const div = document.createElement('div');
        div.className = 'btn-group';
        
        
        const setBtn = document.createElement('button');
        setBtn.id = `v3_set-${i}`;
        setBtn.className = 'btn-set';
        
        setBtn.innerHTML = `Set&nbsp;&nbsp;#&nbsp;&nbsp;${i}`; 
        div.appendChild(setBtn);

        
        const jumpBtn = document.createElement('button');
        jumpBtn.id = `v3_jump-${i}`;
        jumpBtn.className = 'btn-jump';
        jumpBtn.innerHTML = `Jump&nbsp;&nbsp;#&nbsp;&nbsp;${i}`; 
        div.appendChild(jumpBtn);
        
        container.appendChild(div);
    }
    
    
    document.getElementById('reset-all').textContent = 'RESET ALL';

    
    container.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const command = e.target.id;
            sendMessageToContent(command);
        }
    });

    
    document.getElementById('reset-all').addEventListener('click', () => {
        sendMessageToContent('v3_reset-all');
    });
});



function sendMessageToContent(command) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
            const tabId = tabs[0].id;

            
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ['content_v3.js'] 
            }, () => {
                
                chrome.tabs.sendMessage(tabId, { action: command });
                window.close();
            });
        }
    });
}
const chatDisplay = document.getElementById('chatDisplay');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');

// Helper to set command from quick actions
window.setCommand = function(cmd) {
    userInput.value = cmd;
    userInput.focus();
};

function addMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    msgDiv.innerHTML = `
        <div class="avatar">${isUser ? 'U' : 'A'}</div>
        <div class="content">${text}</div>
    `;
    
    chatDisplay.appendChild(msgDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

async function handleCommand() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, true);
    userInput.value = '';

    // Simulate Processing
    setTimeout(() => {
        processCommand(text);
    }, 1000);
}

function processCommand(text) {
    let response = "";
    const lowerText = text.toLowerCase();

    if (lowerText.includes("واتساب") || lowerText.includes("whatsapp")) {
        response = "جاري فتح واتساب لبرمجة إرسال الرسالة... هل تود استخدام رقم معين؟";
    } else if (lowerText.includes("ايميل") || lowerText.includes("gmail")) {
        response = "سأقوم بفحص بريدك الإلكتروني الآن. ترقب التحديثات.";
    } else if (lowerText.includes("افتح") || lowerText.includes("open")) {
        response = "أمرك مطاع. سأقوم بمحاولة فتح التطبيق المطلوب على جهازك.";
    } else {
        response = "لقد استلمت أمرك: '" + text + "'. سأقوم بمعالجته فوراً بربطه بمحرك الذكاء الاصطناعي.";
    }

    addMessage(response, false);
}

sendBtn.addEventListener('click', handleCommand);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleCommand();
});

// Voice Input Simulation
voiceBtn.addEventListener('click', () => {
    addMessage("جاري الاستماع إليك... قل أمرك الآن.", false);
    // Here we would implement Web Speech API or custom backend voice recording
});

// Success UI touch
console.log("Astra AI Interface Initialized");

const chatDisplay = document.getElementById('chatDisplay');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');

// Speech Recognition Setup
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = Recognition ? new Recognition() : null;
if (recognition) {
    recognition.lang = 'ar-SA';
    recognition.interimResults = false;
}

// Voice Synthesis Setup
const synth = window.speechSynthesis;

function speak(text) {
    if (!synth) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9; // Slightly slower for a "softer" feel
    utterance.pitch = 1.1; // A bit higher for a friendly tone
    
    // Choose a premium voice if available
    const voices = synth.getVoices();
    const arabicVoice = voices.find(v => v.lang.includes('ar') && v.name.includes('Google')) || voices.find(v => v.lang.includes('ar'));
    if (arabicVoice) utterance.voice = arabicVoice;

    synth.speak(utterance);
}

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

    if (!isUser) speak(text);
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

// Voice Input Logic
if (recognition) {
    recognition.onstart = () => {
        voiceBtn.classList.add('recording');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        handleCommand();
    };

    recognition.onend = () => {
        voiceBtn.classList.remove('recording');
    };
}

voiceBtn.addEventListener('click', () => {
    if (recognition) {
        recognition.start();
    } else {
        alert("عذراً، متصفحك لا يدعم التعرف على الصوت.");
    }
});

// Warm up voices
window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices loaded");
};

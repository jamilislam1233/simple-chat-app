// ভেরিয়েবল (তথ্য রাখার জায়গা)
let currentUser = '';
let messages = [];

// চ্যাট শুরু করার ফাংশন
function startChat() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();

    // যদি নাম খালি থাকে তাহলে এলার্ট দেখাবে
    if (name === '') {
        alert('দয়া করে আপনার নাম লিখুন!');
        return;
    }

    // নাম সংরক্ষণ করুন
    currentUser = name;

    // Setup সেকশন লুকান
    document.getElementById('setupSection').classList.add('hidden');
    // Chat সেকশন দেখান
    document.getElementById('chatSection').classList.remove('hidden');
    // নাম দেখান
    document.getElementById('userName').textContent = currentUser;

    // Focus করুন input এ
    document.getElementById('messageInput').focus();
}

// মেসেজ পাঠানোর ফাংশন
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const text = messageInput.value.trim();

    // যদি মেসেজ খালি থাকে তাহলে রিটার্ন করুন
    if (text === '') {
        return;
    }

    // মেসেজ অবজেক্ট তৈরি করুন
    const message = {
        user: currentUser,
        text: text,
        time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true // এটি আপনার মেসেজ
    };

    // মেসেজ অ্যারেতে যোগ করুন
    messages.push(message);

    // মেসেজ দেখান
    displayMessage(message);

    // Input খালি করুন
    messageInput.value = '';

    // Focus করুন input এ
    messageInput.focus();

    // LocalStorage এ সেভ করুন
    saveMessages();

    // অটোমেটিক রিপ্লাই পাঠাবে (সিমুলেশন)
    simulateReply();
}

// মেসেজ দেখানোর ফাংশন
function displayMessage(message) {
    const chatBox = document.getElementById('chatBox');

    // নতুন মেসেজ ডিভ তৈরি করুন
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.isOwn ? 'own' : 'other'}`;

    // মেসেজ কন্টেন্ট
    messageDiv.innerHTML = `
        <div class="message-info">
            <strong>${message.user}</strong> - ${message.time}
        </div>
        <div>${message.text}</div>
    `;

    // চ্যাট বক্সে যোগ করুন
    chatBox.appendChild(messageDiv);

    // স্ক্রল করুন নিচে
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter চাপলে মেসেজ পাঠানোর ফাংশন
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// সিমুলেট রিপ্লাই (অটোমেটিক উত্তর)
function simulateReply() {
    const replies = [
        'হ্যাঁ, ঠিক আছে! 😊',
        'আমি একমত! 👍',
        'ওয়াও, দারুণ! 🎉',
        'সেটা সত্যিই ভালো 💯',
        'আপনি কি বলছেন? 🤔',
        'হাহা, মজার! 😂',
        'বিল্কুল! ✨',
        'আমি বুঝি না 😅'
    ];

    // র্যান্ডম রিপ্লাই সিলেক্ট করুন
    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    // ১-২ সেকেন্ড পরে রিপ্লাই পাঠাবে
    setTimeout(() => {
        const reply = {
            user: 'সহায়ক',
            text: randomReply,
            time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
            isOwn: false // এটি অন্যের মেসেজ
        };

        messages.push(reply);
        displayMessage(reply);
        saveMessages();
    }, 1000 + Math.random() * 1000);
}

// LocalStorage এ মেসেজ সেভ করুন
function saveMessages() {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// LocalStorage থেকে মেসেজ লোড করুন
function loadMessages() {
    const saved = localStorage.getItem('chatMessages');
    if (saved) {
        messages = JSON.parse(saved);
    }
}

// পেজ লোড হওয়ার সময় মেসেজ লোড করুন
window.addEventListener('DOMContentLoaded', () => {
    loadMessages();
});

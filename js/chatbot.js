// AI Chatbot Engine - Farming Knowledge Base
const farmingKB = [
    {
        keywords: ['rice', 'paddy', 'dhaan'],
        answer: '🌾 Rice grows best in clay or clay-loam soil with a pH of 5.5–7.0. It needs 150–300 mm rainfall and temperatures of 20–35°C. Apply Urea (Nitrogen) in splits for best yield. Transplant seedlings 25–30 days old.'
    },
    {
        keywords: ['wheat', 'gehun'],
        answer: '🌾 Wheat is a Rabi crop (Oct–Mar). It prefers loamy soil, pH 6.0–7.5, and cool temperatures (10–25°C). Apply NPK 120:60:40 kg/ha. Irrigate at CRI stage (21 days) for best results.'
    },
    {
        keywords: ['cotton', 'kapas'],
        answer: '🌿 Cotton grows well in black/clay soils with pH 6–8. Sow in May–June. Apply nitrogen in 3 splits. Watch for bollworm — use pheromone traps and neem-based pesticides.'
    },
    {
        keywords: ['fertilizer', 'npk', 'urea', 'dap', 'nutrient'],
        answer: '🧪 For balanced nutrition, apply NPK based on soil test. Generally: Urea for Nitrogen, DAP/SSP for Phosphorus, MOP for Potassium. Split Nitrogen application (50% basal, 25% at tillering, 25% at panicle) improves efficiency by 20–30%.'
    },
    {
        keywords: ['disease', 'blight', 'rust', 'fungal', 'pest', 'insect'],
        answer: '🦠 Common fungal diseases: Blast (rice), Blight (potato/tomato), Rust (wheat). Prevention: crop rotation, resistant varieties, neem oil spray. For severe infection, use Mancozeb or Carbendazim fungicides. Always consult local agriculture office for dosage.'
    },
    {
        keywords: ['soil', 'ph', 'loamy', 'clay', 'sandy', 'acidic', 'alkaline'],
        answer: '🌱 Soil pH 6–7 is ideal for most crops. If pH < 5.5, add agricultural lime (2–3 t/ha). If pH > 8, add gypsum or sulphur. Loamy soil is the best for most crops. Sandy soil needs more frequent irrigation and fertilizer application.'
    },
    {
        keywords: ['irrigation', 'water', 'drip', 'sprinkler', 'flood'],
        answer: '💧 Drip irrigation saves 40–50% water vs flood irrigation. For vegetables and orchards, drip is recommended. Critical irrigation stages: germination, flowering, grain filling. Avoid waterlogging — it causes root rot.'
    },
    {
        keywords: ['weather', 'rain', 'monsoon', 'temperature', 'climate'],
        answer: '🌦️ Kharif crops (June–Oct) depend on monsoon rains. Rabi crops (Oct–Mar) need mild temperatures. Check the Weather page for your local 7-day forecast. Cold waves below 5°C can damage vegetable crops.'
    },
    {
        keywords: ['mango', 'aam'],
        answer: '🥭 Mango grows in tropical climates (24–30°C). Plant in loamy or laterite soil with pH 5.5–7.5. Spray urea (1%) at flowering to improve fruit set. Protect from powdery mildew with Sulphur spray.'
    },
    {
        keywords: ['sugarcane', 'ganna'],
        answer: '🎍 Sugarcane needs warm climate (20–35°C), deep loamy soil, pH 6.5–7.5. Ratoon management: keep 2–3 ratoons for best yield. Apply Nitrogen fertilizer in splits. Requires ~1500 mm water per season.'
    },
    {
        keywords: ['potato', 'aloo'],
        answer: '🥔 Potato is a cool-season crop (15–25°C). Plant in well-drained sandy loam soil. Apply high Potassium (MOP) for better tuber development. Scout for Late Blight after rains — spray Copper Oxychloride preventively.'
    },
    {
        keywords: ['banana', 'kela'],
        answer: '🍌 Banana needs high Potassium (MOP: 300 kg/ha) for quality fruit. Plant in loamy soil with good drainage. Requires consistent moisture. Protect from Sigatoka leaf spot using Mancozeb spray.'
    },
    {
        keywords: ['hello', 'hi', 'help', 'start', 'hey', 'namaste'],
        answer: '👋 Hello! I am your AI Farming Assistant. Ask me about:\n• Crop recommendations\n• Fertilizer advice\n• Disease management\n• Irrigation tips\n• Soil health\n• Any specific crop (Rice, Wheat, Cotton, Mango, etc.)'
    },
    {
        keywords: ['thank', 'thanks', 'thankyou', 'dhanyawad'],
        answer: '😊 You are welcome! Happy farming! Feel free to ask more questions anytime. Good luck with your crops! 🌾'
    }
];

function getBotResponse(userMessage) {
    const msg = userMessage.toLowerCase().trim();
    if (!msg) return null;

    for (const entry of farmingKB) {
        for (const kw of entry.keywords) {
            if (msg.includes(kw)) {
                return entry.answer;
            }
        }
    }

    return `🤖 I'm not sure about "${userMessage}". Try asking about:\n• Specific crops (rice, wheat, cotton, mango...)\n• Fertilizer (NPK, urea, DAP...)\n• Soil or pH\n• Disease or pest management\n• Irrigation tips`;
}

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');
    const askBtn = document.getElementById('askBtn');

    if (!chatBox || !chatInput || !askBtn) return;

    function appendMessage(text, sender) {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: ${sender === 'user' ? 'flex-end' : 'flex-start'};
            margin-bottom: 14px;
            animation: fadeIn 0.3s ease;
        `;

        const bubble = document.createElement('div');
        bubble.style.cssText = `
            max-width: 80%;
            padding: 12px 16px;
            border-radius: ${sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
            background: ${sender === 'user' ? '#2962ff' : '#f0f4ff'};
            color: ${sender === 'user' ? 'white' : '#2c3e50'};
            font-size: 0.95rem;
            line-height: 1.6;
            white-space: pre-line;
            box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        `;
        bubble.textContent = text;

        const label = document.createElement('div');
        label.textContent = sender === 'user' ? 'You' : '🤖 AI Assistant';
        label.style.cssText = `
            font-size: 0.75rem;
            color: #7f8c8d;
            margin: ${sender === 'user' ? '4px 4px 0 0' : '4px 0 0 4px'};
        `;

        wrapper.appendChild(bubble);
        wrapper.appendChild(label);
        chatBox.appendChild(wrapper);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.id = 'typingIndicator';
        typing.style.cssText = 'display:flex;align-items:flex-start;margin-bottom:14px;';
        typing.innerHTML = `
            <div style="background:#f0f4ff;padding:12px 18px;border-radius:18px 18px 18px 4px;color:#7f8c8d;font-size:0.9rem;">
                <span style="display:inline-block;animation:pulse 1s infinite;">●</span>
                <span style="display:inline-block;animation:pulse 1s 0.2s infinite;">●</span>
                <span style="display:inline-block;animation:pulse 1s 0.4s infinite;">●</span>
            </div>
        `;
        chatBox.appendChild(typing);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeTyping() {
        const t = document.getElementById('typingIndicator');
        if (t) t.remove();
    }

    function sendMessage() {
        const msg = chatInput.value.trim();
        if (!msg) return;

        appendMessage(msg, 'user');
        chatInput.value = '';
        askBtn.disabled = true;

        showTyping();

        setTimeout(() => {
            removeTyping();
            const response = getBotResponse(msg);
            appendMessage(response, 'bot');
            askBtn.disabled = false;
        }, 700 + Math.random() * 500);
    }

    askBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Welcome message
    setTimeout(() => {
        appendMessage('👋 Hello! I am your AI Farming Assistant. Ask me anything about crops, fertilizers, soil health, irrigation, or pest management!', 'bot');
    }, 400);
});

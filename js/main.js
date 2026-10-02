// Common JS functionality for the UI
document.addEventListener('DOMContentLoaded', () => {
    // Language selection is shared by every page and remembered for the next visit.
    const translations = {
        hi: {
            'Farmer Friendly App': 'किसान मित्र ऐप',
            'Language': 'भाषा',
            'Dashboard': 'डैशबोर्ड',
            'Crop Recommendation': 'फसल सिफारिश',
            'Disease Detection': 'रोग पहचान',
            'Fertilizer Advisory': 'उर्वरक सलाह',
            'AI Chatbot': 'एआई चैटबॉट',
            'Weather': 'मौसम',
            'Market Prices': 'बाज़ार भाव',
            'Ask your question': 'अपना प्रश्न पूछें',
            'Ask': 'पूछें',
            'Get scientific crop suggestions based on soil.': 'मिट्टी के आधार पर वैज्ञानिक फसल सुझाव पाएं।',
            'Identify plant diseases instantly.': 'पौधों के रोगों की तुरंत पहचान करें।',
            'Get expert fertilizer and treatment recommendations.': 'विशेषज्ञ उर्वरक और उपचार सुझाव पाएं।',
            'Your 24/7 farming assistant.': 'आपका 24/7 खेती सहायक।',
            'Live local weather updates & 15-day forecast.': 'स्थानीय मौसम अपडेट और 15-दिन का पूर्वानुमान।',
            'Check recent crop market prices before you sell.': 'बेचने से पहले फसलों के ताज़ा बाज़ार भाव देखें।'
        },
        te: {
            'Farmer Friendly App': 'రైతు మిత్ర యాప్',
            'Language': 'భాష',
            'Dashboard': 'డాష్‌బోర్డ్',
            'Crop Recommendation': 'పంట సిఫార్సు',
            'Disease Detection': 'వ్యాధి గుర్తింపు',
            'Fertilizer Advisory': 'ఎరువుల సలహా',
            'AI Chatbot': 'ఏఐ చాట్‌బాట్',
            'Weather': 'వాతావరణం',
            'Market Prices': 'మార్కెట్ ధరలు',
            'Ask your question': 'మీ ప్రశ్న అడగండి',
            'Ask': 'అడగండి',
            'Get scientific crop suggestions based on soil.': 'నేల ఆధారంగా శాస్త్రీయ పంట సూచనలు పొందండి.',
            'Identify plant diseases instantly.': 'మొక్కల వ్యాధులను వెంటనే గుర్తించండి.',
            'Get expert fertilizer and treatment recommendations.': 'నిపుణుల ఎరువులు మరియు చికిత్స సూచనలు పొందండి.',
            'Your 24/7 farming assistant.': 'మీ 24/7 వ్యవసాయ సహాయకుడు.',
            'Live local weather updates & 15-day forecast.': 'స్థానిక వాతావరణ సమాచారం మరియు 15 రోజుల అంచనా.',
            'Check recent crop market prices before you sell.': 'అమ్మే ముందు తాజా పంట మార్కెట్ ధరలు చూడండి.'
        }
    };

    const translatePage = (language) => {
        const dictionary = translations[language] || {};
        document.documentElement.lang = language;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);
        textNodes.forEach((node) => {
            const text = node.textContent;
            const key = node.__i18nKey || text.trim();
            if (!translations.hi[key] && !translations.te[key]) return;
            node.__i18nKey = key;
            const leading = text.match(/^\s*/)[0];
            const trailing = text.match(/\s*$/)[0];
            node.textContent = `${leading}${dictionary[key] || key}${trailing}`;
        });
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.dataset.i18n;
            element.textContent = dictionary[key] || key;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
            const key = element.dataset.i18nPlaceholder;
            element.placeholder = dictionary[key] || key;
        });
        const root = document.documentElement;
        const pageTitle = root.dataset.originalTitle || document.title.replace(' - AI Crop Advisory', '');
        root.dataset.originalTitle = pageTitle;
        document.title = `${dictionary[pageTitle] || pageTitle} - AI Crop Advisory`;
    };

    const languageSelector = document.querySelector('.language-selector');
    const savedLanguage = localStorage.getItem('appLanguage') || 'en';
    if (languageSelector) {
        languageSelector.value = savedLanguage;
        languageSelector.addEventListener('change', () => {
            localStorage.setItem('appLanguage', languageSelector.value);
            translatePage(languageSelector.value);
        });
    }
    translatePage(savedLanguage);

    // Mobile sidebar toggle
    const createSidebarToggle = () => {
        const toggleBtn = document.createElement('button');
        toggleBtn.innerHTML = '&#9776;';
        toggleBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-main);
            cursor: pointer;
            margin-right: 15px;
            display: none;
        `;
        
        // Append it only on mobile screens
        if (window.innerWidth <= 768) {
            toggleBtn.style.display = 'block';
        }
        
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.prepend(toggleBtn);
        }
        
        toggleBtn.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar.style.display === 'none' || !sidebar.style.display) {
                sidebar.style.display = 'flex';
                sidebar.style.position = 'absolute';
                sidebar.style.zIndex = '1000';
                sidebar.style.width = '100%';
            } else {
                sidebar.style.display = 'none';
            }
        });
    };

    createSidebarToggle();
});

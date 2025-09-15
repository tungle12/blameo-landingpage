// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn, .footer-lang');
    let currentLanguage = 'en';
    
    const languages = {
        en: 'locales/en.json',
        vi: 'locales/vi.json'
    };
    
    // Set active language button
    function setActiveLanguage(lang) {
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.id.includes(lang)) {
                btn.classList.add('active');
            }
        });
    }
    
    // Load and apply translations
    async function loadLanguage(language) {
        try {
            const response = await fetch(languages[language]);
            const translations = await response.json();
            applyTranslations(translations);
        } catch (error) {
            console.error('Error loading language:', error);
        }
    }
    
    // Apply translations to elements with data-translate attribute
    function applyTranslations(translations) {
        const elementsToTranslate = document.querySelectorAll('[data-translate]');
        elementsToTranslate.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }
    
    // Switch language
    function switchLanguage(language) {
        if (languages[language]) {
            currentLanguage = language;
            setActiveLanguage(language);
            loadLanguage(language);
        }
    }
    
    // Add event listeners to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            let language;
            if (this.id.includes('en')) {
                language = 'en';
            } else if (this.id.includes('vi')) {
                language = 'vi';
            }
            if (language) {
                switchLanguage(language);
            }
        });
    });
    
    // Load default language
    loadLanguage(currentLanguage);
    
    // Gallery functionality
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-tab-content');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            galleryTabs.forEach(t => t.classList.remove('active'));
            galleryContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(tabName);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Gallery item click effect (placeholder for future lightbox)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a subtle pulse effect when clicked
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

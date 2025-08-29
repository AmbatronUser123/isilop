// Police Brutality Tracker JavaScript - Fixed Version
let currentLanguage = 'id';
let isAdminLoggedIn = false;
let yearlyChart = null;

// Data from the provided JSON - Exact numbers as required
const data = {
    total_cases: 18777,
    deaths: 1856,
    injuries: 16159,
    last_updated: "2025-08-29",
    yearly_data: [
        {"year": 2005, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2006, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2007, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2008, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2009, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2010, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2011, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2012, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2013, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2014, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2015, "cases": 1143, "deaths": 136, "injuries": 1327, "source": "Indonesian National Violence Monitoring System"},
        {"year": 2016, "cases": 650, "deaths": 50, "injuries": 200, "source": "Estimated based on trend analysis"},
        {"year": 2017, "cases": 650, "deaths": 50, "injuries": 200, "source": "Estimated based on trend analysis"},
        {"year": 2018, "cases": 650, "deaths": 50, "injuries": 200, "source": "Estimated based on trend analysis"},
        {"year": 2019, "cases": 652, "deaths": 52, "injuries": 202, "source": "Indonesian Legal Aid Institute"},
        {"year": 2020, "cases": 651, "deaths": 13, "injuries": 98, "source": "KontraS"},
        {"year": 2021, "cases": 677, "deaths": 15, "injuries": 120, "source": "KontraS"},
        {"year": 2022, "cases": 622, "deaths": 41, "injuries": 150, "source": "KontraS"},
        {"year": 2023, "cases": 600, "deaths": 35, "injuries": 140, "source": "KontraS"},
        {"year": 2024, "cases": 602, "deaths": 29, "injuries": 152, "source": "KontraS + Amnesty"},
        {"year": 2025, "cases": 450, "deaths": 25, "injuries": 100, "source": "KontraS + Amnesty (partial)"}
    ],
    recent_incidents: [
        {"date": "2025-08-25", "location": "Jakarta", "description": "Police used excessive force during DPR protests", "type": "Protest suppression"},
        {"date": "2025-08-28", "location": "Jakarta", "description": "Police violence against workers and student demonstrators", "type": "Labor protest suppression"},
        {"date": "2025-03-21", "location": "Multiple cities", "description": "Police brutality during TNI Law protests", "type": "Law enforcement violence"},
        {"date": "2024-08-22", "location": "Multiple cities", "description": "Police violence during election law protests", "type": "Political suppression"},
        {"date": "2022-10-01", "location": "Malang", "description": "Kanjuruhan Stadium incident involving police tear gas", "type": "Stadium incident"}
    ],
    categories: {
        "shootings": {"count": 6572, "percentage": 35.0, "label": "Penembakan"},
        "torture": {"count": 1127, "percentage": 6.0, "label": "Penyiksaan"},
        "arbitrary_arrest": {"count": 1690, "percentage": 9.0, "label": "Penangkapan Sewenang-wenang"},
        "assault": {"count": 1596, "percentage": 8.5, "label": "Kekerasan Fisik"},
        "tear_gas_misuse": {"count": 845, "percentage": 4.5, "label": "Penyalahgunaan Gas Air Mata"},
        "sexual_violence": {"count": 225, "percentage": 1.2, "label": "Kekerasan Seksual"},
        "other": {"count": 6722, "percentage": 35.8, "label": "Lainnya"}
    }
};

// Translations
const translations = {
    id: {
        mainTitle: "Monitoring Kekerasan Polisi di Indonesia",
        mainSubtitle: "Data Real-time Sejak 2005",
        totalCasesLabel: "Total Kasus",
        totalDeathsLabel: "Korban Meninggal",
        totalInjuriesLabel: "Korban Luka",
        lastUpdatedLabel: "Terakhir diperbarui:",
        shareTitle: "Bagikan Data Ini",
        adminBtnText: "Akses Admin",
        helpBtnText: "Perlu Bantuan?",
        filtersTitle: "Filter Data",
        chartTitle: "Tren Tahunan Kasus Kekerasan Polisi",
        categoriesTitle: "Kategori Kekerasan",
        incidentsTitle: "Insiden Terbaru",
        sourcesTitle: "Sumber Data",
        adminLoginTitle: "Akses Admin",
        passwordLabel: "Password:",
        loginBtn: "Masuk",
        adminPanelTitle: "Panel Admin",
        addIncidentTab: "Tambah Insiden",
        editStatsTab: "Edit Statistik",
        auditLogTab: "Log Audit",
        helpTitle: "Formulir Bantuan",
        langText: "English",
        disclaimerText: "⚠️ Perhatian: Data ini sedang dalam proses verifikasi berkelanjutan. Kami berkomitmen untuk memberikan informasi yang akurat. Jika Anda memiliki koreksi atau informasi tambahan, silakan gunakan formulir bantuan di bawah ini.",
        severityNote: "Catatan: Data spesifik korban sedang dalam proses verifikasi untuk menghindari informasi yang menyesatkan.",
        verificationText: "Semua data sedang dalam proses verifikasi berkelanjutan dengan sumber-sumber terpercaya. Jika Anda memiliki informasi untuk melengkapi atau mengoreksi data ini, silakan hubungi kami melalui formulir bantuan.",
        helpIntroText: "Gunakan formulir ini untuk melaporkan koreksi data, insiden baru, atau masalah teknis. Email akan disiapkan untuk Anda kirimkan.",
        helpNameLabel: "Nama *",
        helpEmailLabel: "Email *",
        helpSubjectLabel: "Subjek *",
        helpMessageLabel: "Pesan *",
        helpSourceLabel: "Sumber (jika ada)",
        helpSubmit: "Siapkan Email",
        helpReset: "Reset Form",
        emailPreviewTitle: "Email Siap Dikirim",
        emailToLabel: "Kepada:",
        emailSubjectDisplay: "Subjek:",
        emailContentTitle: "Isi Pesan:",
        copyEmailBtn: "📋 Salin ke Clipboard",
        openEmailBtn: "📧 Buka Email",
        emailInstructionsText: "Instruksi:\n1. Klik \"Salin ke Clipboard\" untuk menyalin pesan\n2. Buka aplikasi email Anda\n3. Buat email baru ke: dawsan@example.com\n4. Tempel pesan yang telah disalin",
        subjectOptions: {
            "": "Pilih Subjek",
            data_correction: "Koreksi Data",
            new_incident: "Lapor Insiden Baru",
            technical_issue: "Masalah Teknis",
            general_inquiry: "Pertanyaan Umum"
        }
    },
    en: {
        mainTitle: "Indonesian Police Brutality Monitor",
        mainSubtitle: "Real-time Data Since 2005",
        totalCasesLabel: "Total Cases",
        totalDeathsLabel: "Deaths",
        totalInjuriesLabel: "Injuries",
        lastUpdatedLabel: "Last updated:",
        shareTitle: "Share This Data",
        adminBtnText: "Admin Access",
        helpBtnText: "Need Help?",
        filtersTitle: "Filter Data",
        chartTitle: "Annual Police Violence Trends",
        categoriesTitle: "Violence Categories",
        incidentsTitle: "Recent Incidents",
        sourcesTitle: "Data Sources",
        adminLoginTitle: "Admin Access",
        passwordLabel: "Password:",
        loginBtn: "Login",
        adminPanelTitle: "Admin Panel",
        addIncidentTab: "Add Incident",
        editStatsTab: "Edit Statistics",
        auditLogTab: "Audit Log",
        helpTitle: "Help Form",
        langText: "Bahasa Indonesia",
        disclaimerText: "⚠️ Notice: This data is under continuous verification process. We are committed to providing accurate information. If you have corrections or additional information, please use the help form below.",
        severityNote: "Note: Specific casualty data is under verification process to avoid misleading information.",
        verificationText: "All data is under continuous verification process with trusted sources. If you have information to complement or correct this data, please contact us through the help form.",
        helpIntroText: "Use this form to report data corrections, new incidents, or technical issues. An email will be prepared for you to send.",
        helpNameLabel: "Name *",
        helpEmailLabel: "Email *",
        helpSubjectLabel: "Subject *",
        helpMessageLabel: "Message *",
        helpSourceLabel: "Source (if any)",
        helpSubmit: "Prepare Email",
        helpReset: "Reset Form",
        emailPreviewTitle: "Email Ready to Send",
        emailToLabel: "To:",
        emailSubjectDisplay: "Subject:",
        emailContentTitle: "Message Content:",
        copyEmailBtn: "📋 Copy to Clipboard",
        openEmailBtn: "📧 Open Email",
        emailInstructionsText: "Instructions:\n1. Click \"Copy to Clipboard\" to copy the message\n2. Open your email application\n3. Create new email to: dawsan@example.com\n4. Paste the copied message",
        subjectOptions: {
            "": "Select Subject",
            data_correction: "Data Correction",
            new_incident: "Report New Incident",
            technical_issue: "Technical Issue",
            general_inquiry: "General Inquiry"
        }
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    
    // Initialize all components
    initializeCounters();
    initializeChart();
    populateCategories();
    populateIncidents();
    populateYearFilter();
    setupEventListeners();
    updateLanguage();
    
    // Set update interval
    setInterval(updateTimestamp, 60000);
    
    console.log('App initialization complete');
});

// Initialize animated counters with correct values
function initializeCounters() {
    console.log('Initializing counters...');
    
    // Start animation after a short delay
    setTimeout(() => {
        animateCounter('total-cases', 0, data.total_cases, 2000);
        animateCounter('total-deaths', 0, data.deaths, 2500);
        animateCounter('total-injuries', 0, data.injuries, 3000);
    }, 300);
}

// Animate counter with smooth increments
function animateCounter(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.classList.add('animating');
    
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    
    function updateCounter() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startValue + (endValue - startValue) * easeOutCubic);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.classList.remove('animating');
            console.log(`Counter ${elementId} completed: ${endValue.toLocaleString()}`);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize chart with actual data
function initializeChart() {
    console.log('Initializing chart...');
    
    const ctx = document.getElementById('yearly-chart');
    if (!ctx) {
        console.error('Chart canvas not found');
        return;
    }
    
    try {
        yearlyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.yearly_data.map(item => item.year),
                datasets: [
                    {
                        label: currentLanguage === 'id' ? 'Total Kasus' : 'Total Cases',
                        data: data.yearly_data.map(item => item.cases),
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#1FB8CD',
                        pointBorderColor: '#1FB8CD'
                    },
                    {
                        label: currentLanguage === 'id' ? 'Korban Meninggal' : 'Deaths',
                        data: data.yearly_data.map(item => item.deaths),
                        borderColor: '#FF5459',
                        backgroundColor: 'rgba(255, 84, 89, 0.1)',
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#FF5459',
                        pointBorderColor: '#FF5459'
                    },
                    {
                        label: currentLanguage === 'id' ? 'Korban Luka' : 'Injuries',
                        data: data.yearly_data.map(item => item.injuries),
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#FFC185',
                        pointBorderColor: '#FFC185'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f5f5f5',
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#f5f5f5',
                        bodyColor: '#f5f5f5',
                        borderColor: '#FF5459',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#f5f5f5'
                        },
                        grid: {
                            color: 'rgba(245, 245, 245, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#f5f5f5'
                        },
                        grid: {
                            color: 'rgba(245, 245, 245, 0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
        
        console.log('Chart initialized successfully');
    } catch (error) {
        console.error('Error initializing chart:', error);
    }
}

// Populate categories with actual data
function populateCategories() {
    console.log('Populating categories...');
    
    const categoriesGrid = document.getElementById('categories-grid');
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = '';
    
    Object.entries(data.categories).forEach(([key, category]) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        
        categoryCard.innerHTML = `
            <div class="category-number">${category.count.toLocaleString()}</div>
            <div class="category-label">${category.label} (${category.percentage}%)</div>
        `;
        
        categoriesGrid.appendChild(categoryCard);
    });
    
    console.log('Categories populated');
}

// Populate incidents timeline without casualty numbers
function populateIncidents() {
    console.log('Populating incidents...');
    
    const timeline = document.getElementById('incidents-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    data.recent_incidents.forEach(incident => {
        const incidentElement = document.createElement('div');
        incidentElement.className = 'incident-item';
        
        const date = new Date(incident.date);
        const formattedDate = date.toLocaleDateString(currentLanguage === 'id' ? 'id-ID' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        incidentElement.innerHTML = `
            <div class="incident-date">${formattedDate}</div>
            <div class="incident-location">${incident.location}</div>
            <div class="incident-description">${incident.description}</div>
            <div class="incident-type">${incident.type}</div>
        `;
        
        timeline.appendChild(incidentElement);
    });
    
    console.log('Incidents populated');
}

// Populate year filter
function populateYearFilter() {
    const yearFilter = document.getElementById('year-filter');
    if (!yearFilter) return;
    
    const years = [...new Set(data.yearly_data.map(item => item.year))].sort((a, b) => b - a);
    
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Setup all event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Language toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Admin login form
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Add incident form
    const addIncidentForm = document.getElementById('add-incident-form');
    if (addIncidentForm) {
        addIncidentForm.addEventListener('submit', handleAddIncident);
    }
    
    // Edit stats form
    const editStatsForm = document.getElementById('edit-stats-form');
    if (editStatsForm) {
        editStatsForm.addEventListener('submit', handleEditStats);
    }
    
    // Help form
    const helpForm = document.getElementById('help-form');
    if (helpForm) {
        helpForm.addEventListener('submit', handleHelpSubmit);
    }
    
    // Filter events
    const yearFilter = document.getElementById('year-filter');
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');
    
    if (yearFilter) yearFilter.addEventListener('change', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
            if (e.target.id === 'help-modal') {
                resetHelpForm();
            }
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                    if (modal.id === 'help-modal') {
                        resetHelpForm();
                    }
                }
            });
        }
        
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            toggleLanguage();
        }
    });
    
    console.log('Event listeners set up');
}

// Language switching
function toggleLanguage() {
    currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
    updateLanguage();
    populateIncidents(); // Refresh incidents with new language
    updateSubjectOptions(); // Update help form subject options
    
    // Update chart labels if chart exists
    if (yearlyChart) {
        const datasets = yearlyChart.data.datasets;
        datasets[0].label = currentLanguage === 'id' ? 'Total Kasus' : 'Total Cases';
        datasets[1].label = currentLanguage === 'id' ? 'Korban Meninggal' : 'Deaths';
        datasets[2].label = currentLanguage === 'id' ? 'Korban Luka' : 'Injuries';
        yearlyChart.update();
    }
}

function updateLanguage() {
    const t = translations[currentLanguage];
    
    const elements = {
        'main-title': t.mainTitle,
        'main-subtitle': t.mainSubtitle,
        'total-cases-label': t.totalCasesLabel,
        'total-deaths-label': t.totalDeathsLabel,
        'total-injuries-label': t.totalInjuriesLabel,
        'last-updated-label': t.lastUpdatedLabel,
        'share-title': t.shareTitle,
        'admin-btn-text': t.adminBtnText,
        'help-btn-text': t.helpBtnText,
        'nav-help-text': t.helpBtnText,
        'lang-text': t.langText,
        'filters-title': t.filtersTitle,
        'chart-title': t.chartTitle,
        'categories-title': t.categoriesTitle,
        'incidents-title': t.incidentsTitle,
        'sources-title': t.sourcesTitle,
        'admin-login-title': t.adminLoginTitle,
        'password-label': t.passwordLabel,
        'login-btn': t.loginBtn,
        'admin-panel-title': t.adminPanelTitle,
        'add-incident-tab': t.addIncidentTab,
        'edit-stats-tab': t.editStatsTab,
        'audit-log-tab': t.auditLogTab,
        'help-title': t.helpTitle,
        'disclaimer-text': t.disclaimerText,
        'severity-note': t.severityNote,
        'verification-text': t.verificationText,
        'help-intro-text': t.helpIntroText,
        'help-name-label': t.helpNameLabel,
        'help-email-label': t.helpEmailLabel,
        'help-subject-label': t.helpSubjectLabel,
        'help-message-label': t.helpMessageLabel,
        'help-source-label': t.helpSourceLabel,
        'help-submit': t.helpSubmit,
        'help-reset': t.helpReset,
        'email-preview-title': t.emailPreviewTitle,
        'email-to-label': t.emailToLabel,
        'email-subject-display': t.emailSubjectDisplay,
        'email-content-title': t.emailContentTitle,
        'copy-email-btn': t.copyEmailBtn,
        'open-email-btn': t.openEmailBtn,
        'email-instructions-text': t.emailInstructionsText
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
    
    updateLastUpdatedDisplay();
    updateSubjectOptions(); // Update subject options when language changes
}

// Update subject options in help form - FIXED VERSION
function updateSubjectOptions() {
    const subjectSelect = document.getElementById('help-subject');
    if (!subjectSelect) return;
    
    const t = translations[currentLanguage];
    const currentValue = subjectSelect.value;
    
    // Clear existing options
    subjectSelect.innerHTML = '';
    
    // Add options based on current language
    Object.entries(t.subjectOptions).forEach(([value, text]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        subjectSelect.appendChild(option);
    });
    
    // Restore previous value if it exists
    if (currentValue && subjectSelect.querySelector(`option[value="${currentValue}"]`)) {
        subjectSelect.value = currentValue;
    }
    
    console.log('Subject options updated for language:', currentLanguage);
}

// Help form submission
function handleHelpSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('help-name').value,
        email: document.getElementById('help-email').value,
        subject: document.getElementById('help-subject').value,
        message: document.getElementById('help-message').value,
        source: document.getElementById('help-source').value
    };
    
    if (!validateHelpForm(formData)) {
        return;
    }
    
    generateEmailPreview(formData);
    showMessage('success', currentLanguage === 'id' ? 'Email berhasil disiapkan!' : 'Email successfully prepared!');
}

// Validate help form
function validateHelpForm(formData) {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showMessage('error', currentLanguage === 'id' ? 'Mohon lengkapi semua field yang wajib diisi.' : 'Please fill in all required fields.');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showMessage('error', currentLanguage === 'id' ? 'Format email tidak valid.' : 'Invalid email format.');
        return false;
    }
    
    return true;
}

// Generate email preview
function generateEmailPreview(formData) {
    const t = translations[currentLanguage];
    const subjectText = t.subjectOptions[formData.subject] || formData.subject;
    
    document.getElementById('email-subject-text').textContent = subjectText;
    
    const emailBody = generateEmailBody(formData, subjectText);
    document.getElementById('email-body').textContent = emailBody;
    
    const preview = document.getElementById('email-preview');
    if (preview) {
        preview.classList.remove('hidden');
        preview.scrollIntoView({ behavior: 'smooth' });
    }
}

// Generate email body content
function generateEmailBody(formData, subjectText) {
    const timestamp = new Date().toLocaleString(currentLanguage === 'id' ? 'id-ID' : 'en-US');
    
    return `${currentLanguage === 'id' ? 'Subjek' : 'Subject'}: ${subjectText}
${currentLanguage === 'id' ? 'Dari' : 'From'}: ${formData.name} (${formData.email})
${currentLanguage === 'id' ? 'Tanggal' : 'Date'}: ${timestamp}

${currentLanguage === 'id' ? 'Pesan' : 'Message'}:
${formData.message}

${formData.source ? `${currentLanguage === 'id' ? 'Sumber' : 'Source'}: ${formData.source}` : ''}

---
${currentLanguage === 'id' ? 'Pesan ini dikirim melalui formulir bantuan' : 'This message was sent through the help form'} - Indonesian Police Brutality Monitor
${window.location.href}`;
}

// Copy email to clipboard
function copyEmailToClipboard() {
    const emailBody = document.getElementById('email-body').textContent;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(emailBody).then(() => {
            showMessage('success', currentLanguage === 'id' ? 'Email berhasil disalin ke clipboard!' : 'Email successfully copied to clipboard!');
        }).catch(() => {
            fallbackCopyToClipboard(emailBody);
        });
    } else {
        fallbackCopyToClipboard(emailBody);
    }
}

// Fallback copy method
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showMessage('success', currentLanguage === 'id' ? 'Email berhasil disalin!' : 'Email successfully copied!');
    } catch (err) {
        showMessage('error', currentLanguage === 'id' ? 'Gagal menyalin email.' : 'Failed to copy email.');
    }
    
    document.body.removeChild(textArea);
}

// Open email client
function openEmailClient() {
    const emailBody = document.getElementById('email-body').textContent;
    const subjectText = document.getElementById('email-subject-text').textContent;
    const mailto = `mailto:dawsan@example.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailto);
}

// Reset help form
function resetHelpForm() {
    const form = document.getElementById('help-form');
    if (form) {
        form.reset();
    }
    
    const preview = document.getElementById('email-preview');
    if (preview) {
        preview.classList.add('hidden');
    }
    
    clearMessages();
}

// Show success/error messages
function showMessage(type, text) {
    clearMessages();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    const form = document.getElementById('help-form');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Clear messages
function clearMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => msg.remove());
}

// Social media sharing functions
function shareToInstagram() {
    const text = `🚨 KEKERASAN POLISI INDONESIA:\n📊 ${data.total_cases.toLocaleString()} total kasus sejak 2005\n💀 ${data.deaths.toLocaleString()} korban meninggal\n🏥 ${data.injuries.toLocaleString()} korban luka\n\n#StopPoliceBrutality #IndonesiaHumanRights #HumanRights`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert(currentLanguage === 'id' ? 'Teks berhasil disalin! Tempel di Instagram story Anda.' : 'Text copied to clipboard! Paste it in your Instagram story.');
            window.open('https://www.instagram.com/', '_blank');
        });
    } else {
        window.open('https://www.instagram.com/', '_blank');
        alert((currentLanguage === 'id' ? 'Salin teks ini secara manual: ' : 'Please copy this text manually: ') + text);
    }
}

function shareToTwitter() {
    const text = `🚨 Police Brutality in Indonesia:\n📊 ${data.total_cases.toLocaleString()} total cases since 2005\n💀 ${data.deaths.toLocaleString()} deaths\n🏥 ${data.injuries.toLocaleString()} injuries\n\n#StopPoliceBrutality #IndonesiaHumanRights #HumanRights`;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
}

function shareToTikTok() {
    const text = `🚨 POLICE BRUTALITY INDONESIA: ${data.total_cases.toLocaleString()} cases, ${data.deaths.toLocaleString()} deaths, ${data.injuries.toLocaleString()} injuries since 2005. #StopPoliceBrutality #IndonesiaHumanRights`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert(currentLanguage === 'id' ? 'Teks berhasil disalin! Buat video TikTok dengan informasi ini.' : 'Text copied to clipboard! Create a TikTok video with this information.');
            window.open('https://www.tiktok.com/', '_blank');
        });
    } else {
        window.open('https://www.tiktok.com/', '_blank');
        alert((currentLanguage === 'id' ? 'Salin teks ini secara manual: ' : 'Please copy this text manually: ') + text);
    }
}

function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareToWhatsApp() {
    const text = `🚨 *KEKERASAN POLISI INDONESIA*\n📊 ${data.total_cases.toLocaleString()} total kasus sejak 2005\n💀 ${data.deaths.toLocaleString()} korban meninggal\n🏥 ${data.injuries.toLocaleString()} korban luka\n\nLihat data lengkap: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function shareToTelegram() {
    const text = `🚨 KEKERASAN POLISI INDONESIA\n📊 ${data.total_cases.toLocaleString()} total kasus sejak 2005\n💀 ${data.deaths.toLocaleString()} korban meninggal\n🏥 ${data.injuries.toLocaleString()} korban luka`;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${url}&text=${encodeURIComponent(text)}`, '_blank');
}

// Modal functions
function showAdminLogin() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideAdminLogin() {
    const modal = document.getElementById('admin-login-modal');
    if (modal) {
        modal.classList.add('hidden');
        const passwordField = document.getElementById('admin-password');
        if (passwordField) {
            passwordField.value = '';
        }
    }
}

function showAdminPanel() {
    const panel = document.getElementById('admin-panel-modal');
    if (panel) {
        panel.classList.remove('hidden');
    }
    hideAdminLogin();
}

function hideAdminPanel() {
    const panel = document.getElementById('admin-panel-modal');
    if (panel) {
        panel.classList.add('hidden');
    }
    isAdminLoggedIn = false;
}

function showHelp() {
    const modal = document.getElementById('help-modal');
    if (modal) {
        modal.classList.remove('hidden');
        // Ensure subject options are populated when showing help modal
        setTimeout(() => {
            updateSubjectOptions();
        }, 100);
    }
}

function hideHelp() {
    const modal = document.getElementById('help-modal');
    if (modal) {
        modal.classList.add('hidden');
        resetHelpForm();
    }
}

// Admin functionality
function handleAdminLogin(e) {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    
    if (password === 'dawsanakses2025') {
        isAdminLoggedIn = true;
        showAdminPanel();
        logAuditAction('Admin login successful');
    } else {
        alert(currentLanguage === 'id' ? 'Password salah!' : 'Wrong password!');
    }
}

function handleAddIncident(e) {
    e.preventDefault();
    
    if (!isAdminLoggedIn) {
        alert(currentLanguage === 'id' ? 'Tidak memiliki akses admin!' : 'No admin access!');
        return;
    }
    
    const date = document.getElementById('incident-date').value;
    const location = document.getElementById('incident-location').value;
    const description = document.getElementById('incident-description').value;
    const type = document.getElementById('incident-severity').value;
    
    const newIncident = {
        date: date,
        location: location,
        description: description,
        type: type
    };
    
    data.recent_incidents.unshift(newIncident);
    data.total_cases++;
    
    populateIncidents();
    updateCounterDisplay();
    
    logAuditAction(`Added new incident: ${location} - ${type} type`);
    
    e.target.reset();
    alert(currentLanguage === 'id' ? 'Insiden berhasil ditambahkan!' : 'Incident successfully added!');
}

function handleEditStats(e) {
    e.preventDefault();
    
    if (!isAdminLoggedIn) {
        alert(currentLanguage === 'id' ? 'Tidak memiliki akses admin!' : 'No admin access!');
        return;
    }
    
    const newCases = parseInt(document.getElementById('edit-total-cases').value);
    const newDeaths = parseInt(document.getElementById('edit-total-deaths').value);
    const newInjuries = parseInt(document.getElementById('edit-total-injuries').value);
    
    data.total_cases = newCases;
    data.deaths = newDeaths;
    data.injuries = newInjuries;
    data.last_updated = new Date().toISOString().split('T')[0];
    
    updateCounterDisplay();
    
    logAuditAction(`Statistics updated: Cases: ${newCases}, Deaths: ${newDeaths}, Injuries: ${newInjuries}`);
    
    alert(currentLanguage === 'id' ? 'Statistik berhasil diperbarui!' : 'Statistics successfully updated!');
}

function updateCounterDisplay() {
    document.getElementById('total-cases').textContent = data.total_cases.toLocaleString();
    document.getElementById('total-deaths').textContent = data.deaths.toLocaleString();
    document.getElementById('total-injuries').textContent = data.injuries.toLocaleString();
    
    updateLastUpdatedDisplay();
}

function updateLastUpdatedDisplay() {
    const date = new Date(data.last_updated);
    const formattedDate = date.toLocaleDateString(currentLanguage === 'id' ? 'id-ID' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const lastUpdatedElement = document.getElementById('last-updated-date');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = formattedDate;
    }
}

// Tab switching for admin panel
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Audit logging
function logAuditAction(action) {
    const auditLog = document.getElementById('audit-log-content');
    if (auditLog) {
        const timestamp = new Date().toLocaleString(currentLanguage === 'id' ? 'id-ID' : 'en-US');
        const logEntry = document.createElement('p');
        logEntry.textContent = `${timestamp} - ${action}`;
        auditLog.insertBefore(logEntry, auditLog.firstChild);
    }
}

// Filter functionality
function applyFilters() {
    const yearFilter = document.getElementById('year-filter');
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');
    
    const yearValue = yearFilter ? yearFilter.value : '';
    const categoryValue = categoryFilter ? categoryFilter.value : '';
    const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
    
    const timeline = document.getElementById('incidents-timeline');
    if (timeline) {
        const incidents = timeline.querySelectorAll('.incident-item');
        
        incidents.forEach(incident => {
            const text = incident.textContent.toLowerCase();
            const shouldShow = text.includes(searchValue);
            incident.style.display = shouldShow ? 'block' : 'none';
        });
    }
}

// Update timestamp for real-time feeling
function updateTimestamp() {
    updateLastUpdatedDisplay();
}

// Make functions available globally for onclick handlers
window.showAdminLogin = showAdminLogin;
window.hideAdminLogin = hideAdminLogin;
window.showAdminPanel = showAdminPanel;
window.hideAdminPanel = hideAdminPanel;
window.showHelp = showHelp;
window.hideHelp = hideHelp;
window.showTab = showTab;
window.resetHelpForm = resetHelpForm;
window.copyEmailToClipboard = copyEmailToClipboard;
window.openEmailClient = openEmailClient;
window.shareToInstagram = shareToInstagram;
window.shareToTwitter = shareToTwitter;
window.shareToTikTok = shareToTikTok;
window.shareToFacebook = shareToFacebook;
window.shareToWhatsApp = shareToWhatsApp;
window.shareToTelegram = shareToTelegram;
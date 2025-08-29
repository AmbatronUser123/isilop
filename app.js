// Police Brutality Tracker JavaScript - Final Anonymous Version
let currentLanguage = 'id';
let isAdminLoggedIn = false;
let yearlyChart = null;
const reportEmail = 'ngopidesu@gmail.com'; // Email tujuan (tidak akan terekspos)

const data = {
    total_cases: 12025,
    deaths: 2073,
    injuries: 14285,
    last_updated: "2025-08-29",
    yearly_data: [
        {"year": "2005-2015", "cases": 11431, "deaths": 1358, "injuries": 13265, "source": "SNPK (Akumulasi)"},
        {"year": 2018, "cases": 151, "deaths": 182, "injuries": 0, "source": "YLBHI"},
        {"year": 2019, "cases": 21, "deaths": 77, "injuries": 0, "source": "YLBHI"},
        {"year": 2020, "cases": 651, "deaths": 46, "injuries": 98, "source": "KontraS/YLBHI"},
        {"year": 2021, "cases": 677, "deaths": 40, "injuries": 120, "source": "KontraS"},
        {"year": 2022, "cases": 622, "deaths": 38, "injuries": 150, "source": "KontraS"},
        {"year": 2023, "cases": 645, "deaths": 38, "injuries": 140, "source": "KontraS"},
        {"year": 2024, "cases": 718, "deaths": 78, "injuries": 39, "source": "KontraS + Amnesty"},
        {"year": 2025, "cases": 42, "deaths": 0, "injuries": 1020, "source": "KontraS (Aksi Demo)"}
    ],
    recent_incidents: [
         {"date": "2025-05-01", "location": "Indonesia", "description": "Kekerasan terhadap 14 peserta aksi Hari Buruh, 13 luka-luka, 4 tim medis dianiaya.", "type": "Kekerasan Demonstrasi"},
        {"date": "2024-11-30", "location": "Indonesia", "description": "KontraS: 45 kasus extrajudicial killing (Des 2023-Nov 2024) menewaskan 47 orang.", "type": "Extrajudicial Killing"},
        {"date": "2024-11-30", "location": "Indonesia", "description": "Amnesty: 116 kasus kekerasan polisi, termasuk 29 extrajudicial killing & 26 penyiksaan (Jan-Nov).", "type": "Kekerasan Polisi & Penyiksaan"},
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    initializeCounters();
    initializeChart();
    populateCategories();
    populateIncidents();
    setupEventListeners();
});

function handleHelpSubmit(e) {
    e.preventDefault();
    const subject = document.getElementById('help-subject').value;
    const message = document.getElementById('help-message').value;
    const name = document.getElementById('help-name').value || 'Anonim';
    const email = document.getElementById('help-email').value || 'Tidak dicantumkan';

    const body = `
Laporan Baru dari Website Monitor Kekerasan Polisi:
-------------------------------------------------
Pengirim: ${name}
Email Kontak: ${email}

Pesan:
${message}
-------------------------------------------------
    `;

    // Buka mail client pengguna dengan data yang sudah diisi
    window.location.href = `mailto:${reportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Beri notifikasi dan tutup form
    alert('Terima kasih atas laporan Anda. Anda akan diarahkan ke aplikasi email untuk mengirim laporan.');
    hideHelp();
}

function setupEventListeners() {
    document.getElementById('lang-toggle')?.addEventListener('click', toggleLanguage);
    document.getElementById('admin-login-form')?.addEventListener('submit', handleAdminLogin);
    document.getElementById('help-form')?.addEventListener('submit', handleHelpSubmit);
}

// ... (Sisa fungsi lain seperti initializeCounters, initializeChart, dll tetap sama)
// Fungsi-fungsi yang tidak relevan (seperti applyFilters) bisa dihapus.

// --- SALIN DAN TEMPEL SISA FUNGSI DARI app.js SEBELUMNYA DI SINI ---
// (initializeCounters, animateCounter, initializeChart, populateCategories, populateIncidents, dll.)
// Pastikan tidak ada lagi fungsi applyFilters

function initializeCounters() {
    console.log('Initializing counters...');
    setTimeout(() => {
        animateCounter('total-cases', 0, data.total_cases, 2000);
        animateCounter('total-deaths', 0, data.deaths, 2500);
        animateCounter('total-injuries', 0, data.injuries, 3000);
    }, 300);
}

function animateCounter(elementId, start, end, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.classList.add('animating');
    const startTime = Date.now();
    
    function updateCounter() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeOutCubic);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.classList.remove('animating');
        }
    }
    requestAnimationFrame(updateCounter);
}

// FUNGSI INISIALISASI CHART DIUBAH
function initializeChart() {
    console.log('Initializing chart...');
    const ctx = document.getElementById('yearly-chart');
    if (!ctx) {
        console.error('Chart canvas not found');
        return;
    }

    // Hancurkan chart lama jika ada untuk mencegah error
    if (yearlyChart) {
        yearlyChart.destroy();
    }

    try {
        yearlyChart = new Chart(ctx, {
            type: 'bar', // TIPE CHART DIUBAH MENJADI 'bar'
            data: {
                labels: data.yearly_data.map(item => item.year),
                datasets: [
                    {
                        label: 'Total Kasus',
                        data: data.yearly_data.map(item => item.cases),
                        backgroundColor: '#1FB8CD',
                        borderColor: '#1FB8CD',
                        borderWidth: 1
                    },
                    {
                        label: 'Korban Meninggal',
                        data: data.yearly_data.map(item => item.deaths),
                        backgroundColor: '#FF5459',
                        borderColor: '#FF5459',
                        borderWidth: 1
                    },
                    {
                        label: 'Korban Luka',
                        data: data.yearly_data.map(item => item.injuries),
                        backgroundColor: '#FFC185',
                        borderColor: '#FFC185',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#f5f5f5', usePointStyle: true } },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#f5f5f5',
                        bodyColor: '#f5f5f5',
                        borderColor: '#FF5459',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(245, 245, 245, 0.1)' } },
                    x: { ticks: { color: '#f5f5f5' }, grid: { color: 'rgba(245, 245, 245, 0.1)' } }
                }
            }
        });
        console.log('Bar chart initialized successfully');
    } catch (error) {
        console.error('Error initializing chart:', error);
    }
}

function populateCategories() {
    const categoriesGrid = document.getElementById('categories-grid');
    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = '';
    Object.entries(data.categories).forEach(([key, category]) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <div class="category-number">${category.count.toLocaleString()}</div>
            <div class="category-label">${translations[currentLanguage].categoriesTitle === "Kategori Kekerasan" ? category.label : key.replace(/_/g, ' ')} (${category.percentage}%)</div>
        `;
        categoriesGrid.appendChild(categoryCard);
    });
}

function populateIncidents(incidents = data.recent_incidents) {
    const timeline = document.getElementById('incidents-timeline');
    if (!timeline) return;
    timeline.innerHTML = '';

    if (incidents.length === 0) {
        timeline.innerHTML = `<p style="text-align: center; color: var(--color-text-secondary);">Tidak ada insiden yang cocok dengan filter Anda.</p>`;
        return;
    }

    incidents.forEach(incident => {
        const incidentElement = document.createElement('div');
        incidentElement.className = 'incident-item';
        const date = new Date(incident.date);
        const formattedDate = date.toLocaleDateString(currentLanguage === 'id' ? 'id-ID' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        incidentElement.innerHTML = `
            <div class="incident-date">${formattedDate}</div>
            <div class="incident-location">${incident.location}</div>
            <div class="incident-description">${incident.description}</div>
            <div class="incident-type">${incident.type}</div>
        `;
        timeline.appendChild(incidentElement);
    });
}


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

function setupEventListeners() {
    document.getElementById('lang-toggle')?.addEventListener('click', toggleLanguage);
    document.getElementById('admin-login-form')?.addEventListener('submit', handleAdminLogin);
    document.getElementById('add-incident-form')?.addEventListener('submit', handleAddIncident);
    document.getElementById('edit-stats-form')?.addEventListener('submit', handleEditStats);
    document.getElementById('help-form')?.addEventListener('submit', handleHelpSubmit);
    
    document.getElementById('year-filter')?.addEventListener('change', applyFilters);
    document.getElementById('search-input')?.addEventListener('input', applyFilters);

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
            if (e.target.id === 'help-modal') resetHelpForm();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
                modal.classList.add('hidden');
                if (modal.id === 'help-modal') resetHelpForm();
            });
        }
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            toggleLanguage();
        }
    });
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
    updateLanguage();
    applyFilters(); 
    if (yearlyChart) {
        const t = translations[currentLanguage];
        yearlyChart.data.datasets[0].label = t.totalCasesLabel;
        yearlyChart.data.datasets[1].label = t.totalDeathsLabel;
        yearlyChart.data.datasets[2].label = t.totalInjuriesLabel;
        yearlyChart.update();
    }
}

function updateLanguage() {
    const t = translations[currentLanguage];
    Object.entries(t).forEach(([key, value]) => {
        if (typeof value === 'string') {
            const element = document.getElementById(key.replace(/([A-Z])/g, "-$1").toLowerCase());
            if(element) element.textContent = value;
             // Specific handler for nav-help-text
            if (key === 'helpBtnText') {
                const navHelpElement = document.getElementById('nav-help-text');
                if (navHelpElement) navHelpElement.textContent = value;
            }
        }
    });
    document.getElementById('lang-text').textContent = t.langText;
    updateLastUpdatedDisplay();
    updateSubjectOptions();
    populateCategories();
}


function updateSubjectOptions() {
    const subjectSelect = document.getElementById('help-subject');
    if (!subjectSelect) return;
    const t = translations[currentLanguage];
    const currentValue = subjectSelect.value;
    subjectSelect.innerHTML = '';
    Object.entries(t.subjectOptions).forEach(([value, text]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        subjectSelect.appendChild(option);
    });
    if (currentValue && subjectSelect.querySelector(`option[value="${currentValue}"]`)) {
        subjectSelect.value = currentValue;
    }
}

function handleHelpSubmit(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('help-name').value,
        email: document.getElementById('help-email').value,
        subject: document.getElementById('help-subject').value,
        message: document.getElementById('help-message').value,
        source: document.getElementById('help-source').value
    };
    if (!validateHelpForm(formData)) return;
    generateEmailPreview(formData);
    showMessage('success', currentLanguage === 'id' ? 'Email berhasil disiapkan!' : 'Email successfully prepared!');
}

function validateHelpForm(formData) {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showMessage('error', currentLanguage === 'id' ? 'Mohon lengkapi semua field yang wajib diisi.' : 'Please fill in all required fields.');
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        showMessage('error', currentLanguage === 'id' ? 'Format email tidak valid.' : 'Invalid email format.');
        return false;
    }
    return true;
}

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

function copyEmailToClipboard() {
    const emailBody = document.getElementById('email-body').textContent;
    navigator.clipboard.writeText(emailBody).then(() => {
        showMessage('success', currentLanguage === 'id' ? 'Email berhasil disalin!' : 'Email copied!');
    }).catch(() => {
        showMessage('error', currentLanguage === 'id' ? 'Gagal menyalin.' : 'Failed to copy.');
    });
}

function openEmailClient() {
    const emailBody = document.getElementById('email-body').textContent;
    const subjectText = document.getElementById('email-subject-text').textContent;
    window.open(`mailto:dawsan@example.com?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(emailBody)}`);
}

function resetHelpForm() {
    document.getElementById('help-form')?.reset();
    document.getElementById('email-preview')?.classList.add('hidden');
    clearMessages();
}

function showMessage(type, text) {
    clearMessages();
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    document.getElementById('help-form')?.insertBefore(messageDiv, document.getElementById('help-form').firstChild);
    setTimeout(() => messageDiv.remove(), 5000);
}

function clearMessages() {
    document.querySelectorAll('.message').forEach(msg => msg.remove());
}

function showAdminLogin() { document.getElementById('admin-login-modal')?.classList.remove('hidden'); }
function hideAdminLogin() { document.getElementById('admin-login-modal')?.classList.add('hidden'); }
function showAdminPanel() { document.getElementById('admin-panel-modal')?.classList.remove('hidden'); hideAdminLogin(); }
function hideAdminPanel() { document.getElementById('admin-panel-modal')?.classList.add('hidden'); isAdminLoggedIn = false; }
function showHelp() { document.getElementById('help-modal')?.classList.remove('hidden'); setTimeout(updateSubjectOptions, 100); }
function hideHelp() { document.getElementById('help-modal')?.classList.add('hidden'); resetHelpForm(); }

function handleAdminLogin(e) {
    e.preventDefault();
    if (document.getElementById('admin-password').value === 'dawsanakses2025') {
        isAdminLoggedIn = true;
        showAdminPanel();
        logAuditAction('Admin login successful');
    } else {
        alert(currentLanguage === 'id' ? 'Password salah!' : 'Wrong password!');
    }
}

function handleAddIncident(e) {
    e.preventDefault();
    if (!isAdminLoggedIn) return;
    const newIncident = {
        date: document.getElementById('incident-date').value,
        location: document.getElementById('incident-location').value,
        description: document.getElementById('incident-description').value,
        type: document.getElementById('incident-severity').value
    };
    data.recent_incidents.unshift(newIncident);
    data.total_cases++;
    applyFilters();
    updateCounterDisplay();
    logAuditAction(`Added new incident: ${newIncident.location}`);
    e.target.reset();
    alert(currentLanguage === 'id' ? 'Insiden berhasil ditambahkan!' : 'Incident successfully added!');
}

function handleEditStats(e) {
    e.preventDefault();
    if (!isAdminLoggedIn) return;
    data.total_cases = parseInt(document.getElementById('edit-total-cases').value);
    data.deaths = parseInt(document.getElementById('edit-total-deaths').value);
    data.injuries = parseInt(document.getElementById('edit-total-injuries').value);
    data.last_updated = new Date().toISOString().split('T')[0];
    updateCounterDisplay();
    logAuditAction(`Statistics updated`);
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
        year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('last-updated-date').textContent = formattedDate;
}

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName)?.classList.add('active');
    event.target.classList.add('active');
}

function logAuditAction(action) {
    const auditLog = document.getElementById('audit-log-content');
    if (auditLog) {
        const timestamp = new Date().toLocaleString(currentLanguage === 'id' ? 'id-ID' : 'en-US');
        const logEntry = document.createElement('p');
        logEntry.textContent = `${timestamp} - ${action}`;
        auditLog.insertBefore(logEntry, auditLog.firstChild);
    }
}

function applyFilters() {
    const yearValue = document.getElementById('year-filter').value;
    const searchValue = document.getElementById('search-input').value.toLowerCase();

    let filteredIncidents = data.recent_incidents;

    if (yearValue) {
        filteredIncidents = filteredIncidents.filter(incident => new Date(incident.date).getFullYear() == yearValue);
    }

    if (searchValue) {
        filteredIncidents = filteredIncidents.filter(incident => 
            incident.description.toLowerCase().includes(searchValue) ||
            incident.location.toLowerCase().includes(searchValue) ||
            incident.type.toLowerCase().includes(searchValue)
        );
    }

    populateIncidents(filteredIncidents);
}

function updateTimestamp() {
    updateLastUpdatedDisplay();
}

// Make functions globally available
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
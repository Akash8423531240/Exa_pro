// Global data storage
let pyqData = JSON.parse(localStorage.getItem('pyqData')) || {
    homeAds: {},
    yearsAds: {},
    readingAds: {},
    homePYQs: [],
    pyqs: {}
};

// Initialize page based on URL
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname.split('/').pop();
    
    if (path === 'index.html' || path === '') {
        initHomePage();
    } else if (path === 'years.html') {
        initYearsPage();
    } else if (path === 'reading.html') {
        initReadingPage();
    }
});

// Home Page Functions
function initHomePage() {
    // Load home ad
    if (pyqData.homeAds.content) {
        document.getElementById('home-ad').innerHTML = pyqData.homeAds.content;
    }
    
    // Load PYQ boxes
    const pyqContainer = document.getElementById('home-pyqs');
    pyqData.homePYQs.sort((a, b) => a.position - b.position).forEach(pyq => {
        const pyqBox = document.createElement('div');
        pyqBox.className = 'pyq-box';
        pyqBox.innerHTML = `
            <img src="${pyq.image}" alt="${pyq.title}">
            <h3>${pyq.title}</h3>
        `;
        pyqBox.addEventListener('click', () => {
            window.location.href = `years.html?subject=${encodeURIComponent(pyq.title)}`;
        });
        pyqContainer.appendChild(pyqBox);
    });
}

// Years Page Functions
function initYearsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    
    document.getElementById('subject-title').textContent = subject;
    
    // Load years ad
    if (pyqData.yearsAds.content) {
        document.getElementById('years-ad').innerHTML = pyqData.yearsAds.content;
    }
    
    // Load years for this subject
    const yearContainer = document.getElementById('year-pyqs');
    yearContainer.innerHTML = '';
    
    if (pyqData.pyqs[subject]) {
        Object.keys(pyqData.pyqs[subject]).sort().reverse().forEach(year => {
            const yearBox = document.createElement('div');
            yearBox.className = 'year-box';
            yearBox.textContent = year;
            yearBox.addEventListener('click', () => {
                window.location.href = `reading.html?subject=${encodeURIComponent(subject)}&year=${year}`;
            });
            yearContainer.appendChild(yearBox);
        });
    }
}

// Reading Page Functions
function initReadingPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const year = urlParams.get('year');
    
    document.getElementById('pyq-title').textContent = `${subject} - ${year}`;
    
    // Load reading ad
    if (pyqData.readingAds.content) {
        document.getElementById('reading-ad').innerHTML = pyqData.readingAds.content;
    }
    
    // Load PDF
    if (pyqData.pyqs[subject] && pyqData.pyqs[subject][year]) {
        document.getElementById('pdf-frame').src = pyqData.pyqs[subject][year].pdf;
    }
}

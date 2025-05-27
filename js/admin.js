// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
        });
    });
    
    // Load existing data
    loadHomePYQs();
    loadAds();
});

// Load home PYQs
function loadHomePYQs() {
    const container = document.getElementById('home-pyqs-list');
    container.innerHTML = '';
    
    pyqData.homePYQs.sort((a, b) => a.position - b.position).forEach((pyq, index) => {
        const item = document.createElement('div');
        item.className = 'pyq-item';
        item.innerHTML = `
            <div>
                <strong>#${pyq.position}</strong>
                <img src="${pyq.image}" alt="${pyq.title}" style="max-height: 50px;">
                <span>${pyq.title}</span>
            </div>
            <button onclick="removeHomePYQ(${index})">Remove</button>
        `;
        container.appendChild(item);
    });
}

// Load ads
function loadAds() {
    if (pyqData.homeAds.content) {
        document.getElementById('home-ad-content').value = pyqData.homeAds.content;
    }
    if (pyqData.yearsAds.content) {
        document.getElementById('years-ad-content').value = pyqData.yearsAds.content;
    }
    if (pyqData.readingAds.content) {
        document.getElementById('reading-ad-content').value = pyqData.readingAds.content;
    }
}

// Save home ad
function saveHomeAd() {
    const content = document.getElementById('home-ad-content').value;
    const imageInput = document.getElementById('home-ad-image');
    
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            pyqData.homeAds = {
                content: content || `<img src="${e.target.result}" style="max-height: 1.5in; width: auto;">`,
                image: e.target.result
            };
            localStorage.setItem('pyqData', JSON.stringify(pyqData));
            alert('Home ad saved successfully!');
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        pyqData.homeAds.content = content;
        localStorage.setItem('pyqData', JSON.stringify(pyqData));
        alert('Home ad saved successfully!');
    }
}

// Save years ad
function saveYearsAd() {
    const content = document.getElementById('years-ad-content').value;
    const imageInput = document.getElementById('years-ad-image');
    
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            pyqData.yearsAds = {
                content: content || `<img src="${e.target.result}" style="max-height: 1.5in; width: auto;">`,
                image: e.target.result
            };
            localStorage.setItem('pyqData', JSON.stringify(pyqData));
            alert('Years ad saved successfully!');
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        pyqData.yearsAds.content = content;
        localStorage.setItem('pyqData', JSON.stringify(pyqData));
        alert('Years ad saved successfully!');
    }
}

// Save reading ad
function saveReadingAd() {
    const content = document.getElementById('reading-ad-content').value;
    const imageInput = document.getElementById('reading-ad-image');
    
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            pyqData.readingAds = {
                content: content || `<img src="${e.target.result}" style="max-height: 1.5in; width: auto;">`,
                image: e.target.result
            };
            localStorage.setItem('pyqData', JSON.stringify(pyqData));
            alert('Reading ad saved successfully!');
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        pyqData.readingAds.content = content;
        localStorage.setItem('pyqData', JSON.stringify(pyqData));
        alert('Reading ad saved successfully!');
    }
}

// Add home PYQ
function addHomePYQ() {
    const title = document.getElementById('pyq-title').value;
    const position = parseInt(document.getElementById('pyq-position').value) || pyqData.homePYQs.length + 1;
    const imageInput = document.getElementById('pyq-image');
    
    if (!title || imageInput.files.length === 0) {
        alert('Please provide both title and image');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        pyqData.homePYQs.push({
            title,
            image: e.target.result,
            position
        });
        
        localStorage.setItem('pyqData', JSON.stringify(pyqData));
        loadHomePYQs();
        
        // Clear form
        document.getElementById('pyq-title').value = '';
        document.getElementById('pyq-position').value = '';
        document.getElementById('pyq-image').value = '';
        
        alert('PYQ added to home page!');
    };
    reader.readAsDataURL(imageInput.files[0]);
}

// Remove home PYQ
function removeHomePYQ(index) {
    pyqData.homePYQs.splice(index, 1);
    localStorage.setItem('pyqData', JSON.stringify(pyqData));
    loadHomePYQs();
}

// Add PYQ
function addPYQ() {
    const subject = document.getElementById('pyq-subject').value;
    const year = document.getElementById('pyq-year').value;
    const coverInput = document.getElementById('pyq-cover');
    const fileInput = document.getElementById('pyq-file');
    
    if (!subject || !year || coverInput.files.length === 0 || fileInput.files.length === 0) {
        alert('Please fill all fields');
        return;
    }
    
    const coverReader = new FileReader();
    coverReader.onload = function(e) {
        const fileReader = new FileReader();
        fileReader.onload = function(e2) {
            if (!pyqData.pyqs[subject]) {
                pyqData.pyqs[subject] = {};
            }
            
            pyqData.pyqs[subject][year] = {
                cover: e.target.result,
                pdf: e2.target.result
            };
            
            localStorage.setItem('pyqData', JSON.stringify(pyqData));
            
            // Clear form
            document.getElementById('pyq-year').value = '';
            document.getElementById('pyq-cover').value = '';
            document.getElementById('pyq-file').value = '';
            
            alert('PYQ added successfully!');
        };
        fileReader.readAsDataURL(fileInput.files[0]);
    };
    coverReader.readAsDataURL(coverInput.files[0]);
}

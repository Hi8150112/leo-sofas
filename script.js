// ===== CAROUSEL =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let autoSlideTimer;

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    resetAutoSlide();
}

function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, 5000);
}

resetAutoSlide();

// ===== MODAL FUNCTIONS =====
function openAdminModal() {
    document.getElementById('adminModal').style.display = 'block';
}
function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}
function logoutAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
    localStorage.removeItem('adminLoggedIn');
}

// ===== CLOSE MODAL ON OUTSIDE CLICK =====
window.onclick = function(e) {
    const adminModal = document.getElementById('adminModal');
    if (e.target === adminModal) closeAdminModal();
};

// ===== ESC TO CLOSE =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeAdminModal(); }
});

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    document.getElementById('mobileNav').classList.toggle('open');
}
function closeMobileMenu() {
    document.getElementById('mobileNav').classList.remove('open');
}

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 70;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
            closeMobileMenu();
        }
    });
});

// ===== CONTACT FORM (Bottom Contact Section) =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('[name="name"]').value;
    const email = this.querySelector('[name="email"]').value;
    const country = this.querySelector('[name="country"]').value;
    const style = this.querySelector('[name="style"]').value;
    const quantity = this.querySelector('[name="quantity"]').value;
    const message = this.querySelector('[name="message"]').value;

    const subject = encodeURIComponent('Sofa Inquiry - ' + name);
    const body = encodeURIComponent(
        'Full Name: ' + name + '\n' +
        'Email Address: ' + email + '\n' +
        'Country: ' + country + '\n' +
        'Interested Sofa Style: ' + style + '\n' +
        'Quantity: ' + quantity + '\n\n' +
        'Message:\n' + (message || 'No additional message.')
    );
    window.location.href = 'mailto:houlei@live.cn?subject=' + subject + '&body=' + body;

    // Show success message
    const formWrap = this.closest('.contact-form-wrap');
    this.style.display = 'none';
    formWrap.querySelector('h3').textContent = 'Thank you! We will reply to your email within 12 hours.';
    formWrap.querySelector('h3').style.color = '#2d8a4e';
    formWrap.querySelector('h3').style.fontSize = '1.1rem';

    // Save to localStorage
    saveInquiry({ name, email, country, style, quantity, message });
});

// ===== INLINE INQUIRY FORM =====
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const fullName = this.querySelector('[name="fullName"]').value;
    const emailAddress = this.querySelector('[name="emailAddress"]').value;
    const country = this.querySelector('[name="country"]').value;
    const sofaStyle = this.querySelector('[name="sofaStyle"]').value;
    const quantity = this.querySelector('[name="quantity"]').value;
    const message = this.querySelector('[name="message"]').value;

    const subject = encodeURIComponent('Sofa Inquiry - ' + fullName);
    const body = encodeURIComponent(
        'Full Name: ' + fullName + '\n' +
        'Email Address: ' + emailAddress + '\n' +
        'Country: ' + country + '\n' +
        'Interested Sofa Style: ' + sofaStyle + '\n' +
        'Quantity: ' + quantity + '\n\n' +
        'Message:\n' + (message || 'No additional message.')
    );
    window.location.href = 'mailto:houlei@live.cn?subject=' + subject + '&body=' + body;

    // Show success
    const section = this.closest('.inline-form-section');
    this.style.display = 'none';
    section.querySelector('.section-header p').textContent = 'Thank you! We will reply to your email within 12 hours.';
    section.querySelector('.section-header p').style.color = '#2d8a4e';
    section.querySelector('.section-header p').style.fontWeight = '600';

    // Save to localStorage
    saveInquiry({ name: fullName, email: emailAddress, country, style: sofaStyle, quantity, message });
});

// ===== ADMIN LOGIN =====
const ADMIN_USER = 'houlei850404';
const ADMIN_PASS = 'Hi850404';

document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem('adminLoggedIn', 'true');
        closeAdminModal();
        document.getElementById('adminPanel').style.display = 'block';
        loadInquiries();
        alert('Login successful!');
    } else {
        alert('Incorrect username or password!');
    }
    this.reset();
});

// ===== INQUIRIES (localStorage) =====
function saveInquiry(data) {
    let inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    data.id = Date.now();
    data.date = new Date().toLocaleString();
    inquiries.push(data);
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
}
function loadInquiries() {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    document.getElementById('orderCount').textContent = inquiries.length;
    const list = document.getElementById('ordersList');
    if (!inquiries.length) {
        list.innerHTML = '<p style="font-size:0.85rem;opacity:0.7;">No inquiries yet.</p>';
    } else {
        list.innerHTML = inquiries.reverse().map(o => `
            <div style="border:1px solid rgba(255,255,255,0.15);border-radius:4px;padding:12px;margin-bottom:8px;font-size:0.82rem;">
                <p><strong>${o.style || 'Inquiry'}</strong> - ${o.quantity || ''}</p>
                <p>Name: ${o.name}</p>
                <p>Email: ${o.email}</p>
                <p>Country: ${o.country || ''}</p>
                <p style="opacity:0.6;">${o.date}</p>
            </div>
        `).join('');
    }
}

// ===== SCROLL ANIMATION =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.product-card, .why-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('adminPanel').style.display = 'block';
        loadInquiries();
    }
});

// ===== LOGO ADMIN TRIGGER (triple click) =====
let logoClicks = 0;
document.querySelector('.logo').addEventListener('click', function() {
    logoClicks++;
    if (logoClicks >= 3) { openAdminModal(); logoClicks = 0; }
    setTimeout(() => { logoClicks = 0; }, 1500);
});

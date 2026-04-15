// ===== MODAL FUNCTIONS =====
function openOrderModal(sofaName) {
    const modal = document.getElementById('orderModal');
    const selected = document.getElementById('selectedSofa');
    selected.textContent = 'Product: ' + sofaName;
    selected.style.cssText = 'background:#f0f4f8;padding:8px 14px;border-radius:4px;font-size:0.9rem;color:#0F2B46;font-weight:600;margin-bottom:8px;display:block;';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}
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
    const orderModal = document.getElementById('orderModal');
    const adminModal = document.getElementById('adminModal');
    if (e.target === orderModal) closeOrderModal();
    if (e.target === adminModal) closeAdminModal();
};

// ===== ESC TO CLOSE =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeOrderModal(); closeAdminModal(); }
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

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('[name="name"]').value;
    const email = this.querySelector('[name="email"]').value;
    const message = this.querySelector('[name="message"]').value;

    // Build mailto link
    const subject = encodeURIComponent('Wholesale Sofa Inquiry - ' + name);
    const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Company: ' + (this.querySelector('[name="company"]').value || 'N/A') + '\n' +
        'Destination Port: ' + (this.querySelector('[name="port"]').value || 'N/A') + '\n\n' +
        'Requirements:\n' + message
    );
    window.location.href = 'mailto:houlei@live.cn?subject=' + subject + '&body=' + body;
    alert('Thank you! Your email client will open to send your inquiry to houlei@live.cn');
    this.reset();
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
        loadOrders();
        alert('Login successful!');
    } else {
        alert('Incorrect username or password!');
    }
    this.reset();
});

// ===== ORDERS (localStorage) =====
function saveOrder(data) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    data.id = Date.now();
    data.date = new Date().toLocaleString();
    orders.push(data);
    localStorage.setItem('orders', JSON.stringify(orders));
}
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    document.getElementById('orderCount').textContent = orders.length;
    const list = document.getElementById('ordersList');
    if (!orders.length) {
        list.innerHTML = '<p style="font-size:0.85rem;opacity:0.7;">No orders yet.</p>';
    } else {
        list.innerHTML = orders.reverse().map(o => `
            <div style="border:1px solid rgba(255,255,255,0.15);border-radius:4px;padding:12px;margin-bottom:8px;font-size:0.82rem;">
                <p><strong>${o.sofa || 'Inquiry'}</strong></p>
                <p>Name: ${o.name}</p>
                <p>Email: ${o.email}</p>
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
    // Animate cards
    document.querySelectorAll('.product-card, .why-card, .term-item, .step-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Check admin session
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('adminPanel').style.display = 'block';
        loadOrders();
    }
});

// ===== LOGO ADMIN TRIGGER (triple click) =====
let logoClicks = 0;
document.querySelector('.logo').addEventListener('click', function() {
    logoClicks++;
    if (logoClicks >= 3) { openAdminModal(); logoClicks = 0; }
    setTimeout(() => { logoClicks = 0; }, 1500);
});

console.log('KingZen Sofa - USA Wholesale Website loaded.');

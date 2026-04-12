// Order Modal Functions
function openOrderModal(sofaName) {
    const modal = document.getElementById('orderModal');
    const selectedSofa = document.getElementById('selectedSofa');
    selectedSofa.textContent = `Sofá selecionado: ${sofaName}`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderModal();
    }
}

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    
    // Show success message
    alert('Obrigado pela sua mensagem! Entraremos em contacto em breve.\n\nThank you for your message! We will contact you soon.');
    
    // Reset form
    this.reset();
});

// Order Form Submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const sofaName = document.getElementById('selectedSofa').textContent;
    
    // Show success message
    alert(`Encomenda recebida!\n\n${sofaName}\n\nEntraremos em contacto para confirmar os detalhes e pagamento do sinal de 200€.\n\nOrder received! We will contact you to confirm details and deposit payment.`);
    
    // Close modal and reset form
    closeOrderModal();
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards and service cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.product-card, .service-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// WhatsApp integration helper
function openWhatsApp(message) {
    const phoneNumber = '[ADICIONAR_NUMERO]'; // Replace with actual number
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Print product info
function printProductInfo(productName) {
    window.print();
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeOrderModal();
    }
});

// Form validation helpers
function validatePhone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add input validation
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
});

const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
});

// Admin Panel Functions
const ADMIN_USER = 'houlei850404';
const ADMIN_PASS = 'Hi850404';

function openAdminModal() {
    const modal = document.getElementById('adminModal');
    modal.style.display = 'block';
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    modal.style.display = 'none';
}

function logoutAdmin() {
    document.getElementById('adminPanel').style.display = 'none';
    localStorage.removeItem('adminLoggedIn');
}

// Admin Form Submission
document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const pass = document.getElementById('adminPass').value;
    
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem('adminLoggedIn', 'true');
        closeAdminModal();
        document.getElementById('adminPanel').style.display = 'block';
        loadOrders();
        alert('Login bem-sucedido! / Login successful!');
    } else {
        alert('Username ou password incorretos! / Incorrect username or password!');
    }
    this.reset();
});

// Save order to localStorage
function saveOrder(orderData) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orderData.id = Date.now();
    orderData.date = new Date().toLocaleString();
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Load orders for admin panel
function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    document.getElementById('orderCount').textContent = orders.length;
    
    const ordersList = document.getElementById('ordersList');
    if (orders.length === 0) {
        ordersList.innerHTML = '<p>Sem encomendas ainda / No orders yet</p>';
    } else {
        ordersList.innerHTML = orders.map(order => `
            <div class="order-item">
                <p><strong>Sofá:</strong> ${order.sofa}</p>
                <p><strong>Nome:</strong> ${order.name}</p>
                <p><strong>Telefone:</strong> ${order.phone}</p>
                <p><strong>Data:</strong> ${order.date}</p>
                <hr>
            </div>
        `).join('');
    }
}

// Update order form to save data
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const sofaName = document.getElementById('selectedSofa').textContent.replace('Sofá selecionado: ', '');
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const notes = this.querySelector('textarea').value;
    
    saveOrder({
        sofa: sofaName,
        name: name,
        phone: phone,
        email: email,
        notes: notes
    });
    
    alert(`Encomenda recebida!\n\nSofá: ${sofaName}\n\nEntraremos em contacto para confirmar os detalhes e pagamento do sinal de 200€.\n\nOrder received! We will contact you to confirm details and deposit payment.`);
    
    closeOrderModal();
    this.reset();
});

// Check if admin is already logged in
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        document.getElementById('adminPanel').style.display = 'block';
        loadOrders();
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const orderModal = document.getElementById('orderModal');
    const adminModal = document.getElementById('adminModal');
    if (event.target === orderModal) {
        closeOrderModal();
    }
    if (event.target === adminModal) {
        closeAdminModal();
    }
}

console.log('🏠 Mety的家具生活馆 - Mety Móveis & Vida website loaded successfully!');
console.log('📞 Ready to serve customers in Cabo Verde');

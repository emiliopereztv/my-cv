// ==================== CONTADOR DE VISITAS REAL (Global) ====================
(function() {
    const visitEl = document.getElementById('visitCount');
    if (!visitEl) return;

    fetch('https://api.countapi.xyz/hit/emilioperez-cv/visitas')
        .then(response => response.json())
        .then(data => {
            visitEl.textContent = data.value.toLocaleString();
        })
        .catch(err => {
            console.error('Error de carga del contador:', err);
            visitEl.textContent = "1";
        });
})();

// ==================== API INFO IP ====================
(function() {
    window.ipData = { ip: 'No disponible', country: 'No disponible', isp: 'No disponible', asn: 'No disponible' };

    // Usamos ip-api.com que es más permisiva para GitHub Pages
    fetch('https://ip-api.com/json/')
        .then(response => {
            if (!response.ok) throw new Error('Respuesta no exitosa');
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                window.ipData = {
                    ip: data.query || 'No disponible',
                    country: data.country || 'No disponible',
                    isp: data.isp || 'No disponible',
                    asn: data.as || 'No disponible'
                };
            }

            const ipEl = document.querySelector('.js-user-ip');
            const countryEl = document.querySelector('.js-user-country');
            const ispEl = document.querySelector('.js-user-ISP');
            const asnEl = document.querySelector('.js-user-ASN');

            if (ipEl) ipEl.textContent = window.ipData.ip;
            if (countryEl) countryEl.textContent = window.ipData.country;
            if (ispEl) ispEl.textContent = window.ipData.isp;
            if (asnEl) asnEl.textContent = window.ipData.asn;
        })
        .catch(err => {
            console.error('Error al obtener IP:', err);
            const elements = ['.js-user-ip', '.js-user-country', '.js-user-ISP', '.js-user-ASN'];
            elements.forEach(selector => {
                const el = document.querySelector(selector);
                if (el) el.textContent = 'No disponible';
            });
        });
})();

// ==================== ALTERNAR DATOS IP ====================
document.getElementById('hideIpBtn').addEventListener('click', function(e) {
    e.preventDefault();

    const ipEl = document.querySelector('.js-user-ip');
    const ispEl = document.querySelector('.js-user-ISP');
    const asnEl = document.querySelector('.js-user-ASN');

    const isHidden = this.getAttribute('data-hidden') === 'true';

    if (!isHidden) {
        // Ocultar datos
        if (ipEl) ipEl.textContent = '***.***.***.***';
        if (ispEl) ispEl.textContent = '********';
        if (asnEl) asnEl.textContent = '********';

        this.textContent = 'Muestra IP';
        this.setAttribute('data-hidden', 'true');
        this.style.background = '#0066cc';
    } else {
        // Mostrar datos originales guardados en window.ipData
        if (ipEl) ipEl.textContent = window.ipData.ip;
        if (ispEl) ipEl.textContent = window.ipData.isp;
        if (asnEl) asnEl.textContent = window.ipData.asn;

        this.textContent = 'Oculta tu IP';
        this.setAttribute('data-hidden', 'false');
        this.style.background = '#333';
    }
});

// ==================== LÓGICA DE LIKE ====================
(function() {
    const likeBtn = document.getElementById('likeBtn');
    const likeModal = document.getElementById('likeModal');
    const likeModalClose = document.getElementById('likeModalClose');
    const likeForm = document.getElementById('likeForm');

    if (!likeBtn || !likeModal) return;

    likeBtn.addEventListener('click', () => {
        likeModal.classList.add('active');
    });

    likeModalClose.addEventListener('click', () => {
        likeModal.classList.remove('active');
    });

    likeForm.addEventListener('submit', (e) => {
        // Formspree maneja el envío automáticamente, solo cerramos el modal
        setTimeout(() => {
            likeModal.classList.remove('active');
            alert('¡Gracias por tu Like! Se ha enviado tu verificación.');
        }, 500);
    });
})();

// ==================== SMOOTH SCROLL Y NAVEGACIÓN ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR RESPONSIVO ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        // Bloquear scroll del body cuando el menú está abierto
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
}

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('open');
        if (hamburger) hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Cerrar menú al hacer click fuera de él
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('open')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ==================== ANIMACIONES AL SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos animables - animación más rápida (0.3s) y permanente
document.querySelectorAll('.experience-card, .course-card, .reference-card, .timeline-item, .skill-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    observer.observe(el);
});

// ==================== ANIMACIÓN ESCALONADA DE SKILL-TAGS ====================
let skillTagsAnimated = false;

const skillTagsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillTagsAnimated) {
            // Seleccionar todos los tags dentro de la sección
            const tags = document.querySelectorAll('.skill-tag');
            tags.forEach((tag, index) => {
                // Ocultar inicialmente
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(10px) scale(0.95)';
                // Revelar con retraso escalonado más rápido (0.15s)
                setTimeout(() => {
                    tag.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0) scale(1)';
                }, 20 * index);
            });
            skillTagsAnimated = true;
        }
    });
}, { threshold: 0.15 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillTagsObserver.observe(skillsSection);
}

// ==================== CONTADOR DE ESTADÍSTICAS ====================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== EFECTO PARALLAX ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-background');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== VALIDACIÓN DE FORMULARIO (si se agrega) ====================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================== COPIAR AL PORTAPAPELES ====================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00a8ff;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== DARK MODE TOGGLE (Opcional) ====================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Cargar preferencia de dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ==================== LAZY LOADING DE IMÁGENES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #0066cc, #00a8ff);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    animation: fadeInScale 0.25s ease;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.transform = 'scale(1.15) translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 10px 25px rgba(0, 168, 255, 0.4)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.transform = 'scale(1) translateY(0)';
    scrollTopBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
});

// ==================== EFECTO HOVER EN CARDS ====================
document.querySelectorAll('.experience-card, .course-card, .reference-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    });
});

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página cargada correctamente');

    // Agregar clase de carga
    document.body.classList.add('loaded');

    // Inicializar tooltips si existen
    initializeTooltips();
});

function initializeTooltips() {
    document.querySelectorAll('[title]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.textContent = this.getAttribute('title');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 0.85rem;
                white-space: nowrap;
                pointer-events: none;
                z-index: 1000;
            `;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';

            setTimeout(() => tooltip.remove(), 3000);
        });
    });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== ANALYTICS (Opcional) ====================
// Rastrear clics en enlaces de redes sociales
document.querySelectorAll('.social-links-hero a, .social-btn').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.getAttribute('title') || this.textContent;
        console.log(`Clic en: ${platform}`);
    });
});

// ==================== PRINT STYLES ====================
window.addEventListener('beforeprint', () => {
    document.body.style.backgroundColor = 'white';
});

window.addEventListener('afterprint', () => {
    document.body.style.backgroundColor = '';
});

// ==================== QR MODAL ====================
(function () {
    const qrThumb  = document.getElementById('qrThumb');
    const qrModal  = document.getElementById('qrModal');
    const qrClose  = document.getElementById('qrModalClose');

    if (!qrThumb || !qrModal) return;

    function openModal() {
        qrModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        qrModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    qrThumb.addEventListener('click', openModal);
    qrClose.addEventListener('click', closeModal);

    // Cerrar al hacer click fuera del contenido
    qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) closeModal();
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
})();

// ==================== RELOJ Y FECHA ====================
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { hour12: false });
    const dateString = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('clock-time').textContent = timeString;
    document.getElementById('clock-date').textContent = dateString;
}

// Actualizar cada segundo
setInterval(updateClock, 1000);
updateClock();

// ==================== CALCULAR EDAD AUTOMÁTICA ====================
function calculateAge() {
    const birthDate = new Date('1999-10-31');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    const ageElement = document.getElementById('age-display');
    if (ageElement) {
        ageElement.textContent = `${age} años`;
    }
}

// Actualizar edad cada minuto
setInterval(calculateAge, 60000);
calculateAge();

// ==================== CAMBIO DE TEMA ====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Cargar tema guardado - solo 2 temas: 'light' o 'dark'
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Actualizar icono del botón
function updateThemeIcon() {
    const theme = html.getAttribute('data-theme');
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// ==================== FONDO DE RED NEURONAL ====================
function createNeuralNetwork() {
    const canvas = document.createElement('canvas');
    canvas.className = 'neural-network';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createNode() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        };
    }

    function initNodes() {
        nodes = [];
        const nodeCount = Math.floor((width * height) / 15000);
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(createNode());
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        const theme = html.getAttribute('data-theme');
        const color = theme === 'security' ? '0, 255, 65' : '0, 168, 255';

        // Dibujar nodos
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, 0.8)`;
            ctx.fill();
        });

        // Dibujar conexiones
        nodes.forEach((node1, i) => {
            nodes.slice(i + 1).forEach(node2 => {
                const dx = node1.x - node2.x;
                const dy = node1.y - node2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(node1.x, node1.y);
                    ctx.lineTo(node2.x, node2.y);
                    ctx.strokeStyle = `rgba(${color}, ${1 - distance / 150})`;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
        resize();
        initNodes();
    });

    resize();
    initNodes();
    draw();
}

// Crear red neuronal si no hay canvas
if (!document.querySelector('.neural-network')) {
    createNeuralNetwork();
}

// ==================== EFECTOS DE SEGURIDAD ====================
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('scanning');
        setTimeout(() => {
            this.classList.remove('scanning');
            this.classList.add('unlocked');
            setTimeout(() => this.classList.remove('unlocked'), 600);
        }, 1500);
    });
});

// Theme Toggle with localStorage
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Live Clock Function
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    
    const timeElement = document.getElementById('liveTime');
    const dateElement = document.getElementById('liveDate');
    const footerTime = document.getElementById('footerTime');
    const footerDate = document.getElementById('footerDate');
    
    if (timeElement) timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    if (dateElement) dateElement.textContent = `${day}/${month}/${year}`;
    if (footerTime) footerTime.textContent = `${hours}:${minutes}:${seconds}`;
    if (footerDate) footerDate.textContent = `${day}/${month}/${year}`;
}

updateClock();
setInterval(updateClock, 1000);

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Add fade animation
    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        document.body.style.opacity = '1';
    }, 150);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.padding = '1rem 0';
    }
    
    lastScroll = currentScroll;
});

// Active Section Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
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

// Back to Top Button
const backToTop = document.getElementById('backToTop');
const socialSidebar = document.querySelector('.social-sidebar');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    if (scrollPosition > 1000) {
        backToTop.classList.add('show');
        if (socialSidebar) {
            socialSidebar.classList.add('show');
        }
    } else {
        backToTop.classList.remove('show');
        if (socialSidebar) {
            socialSidebar.classList.remove('show');
        }
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-item, .stat-item, .education-card, .publication-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Skills Slider Navigation
const skillsSlider = document.getElementById('skillsSlider');
const prevBtn = document.getElementById('skillsPrev');
const nextBtn = document.getElementById('skillsNext');

if (skillsSlider && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        skillsSlider.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        skillsSlider.scrollBy({ left: 300, behavior: 'smooth' });
    });
}

// Contact Form with Web3Forms Integration
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const successMsg = document.getElementById('form-success');
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                if (successMsg) {
                    successMsg.style.display = 'block';
                    successMsg.textContent = '✓ Message sent successfully!';
                }
                contactForm.reset();
                setTimeout(() => {
                    if (successMsg) successMsg.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            if (successMsg) {
                successMsg.style.display = 'block';
                successMsg.style.color = '#ef4444';
                successMsg.textContent = '✗ Failed to send. Please try again.';
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Typing effect for hero subtitle (optional enhancement)
const heroSubtitle = document.querySelector('.hero-subtitle');
const text = heroSubtitle.textContent;
heroSubtitle.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
    loadProfileImage();
});

// Load Profile Image from Admin Panel
function loadProfileImage() {
    // Profile image is now directly in images/profile.jpg
    // No need to load from localStorage
    
    // Load Resume Link if exists
    const resumeData = localStorage.getItem('resumeData');
    const resumeFileName = localStorage.getItem('resumeFileName');
    const downloadBtn = document.getElementById('downloadResume');
    
    if (resumeData && downloadBtn) {
        downloadBtn.href = resumeData;
        downloadBtn.download = resumeFileName || 'VIVEK_V.pdf';
    }
}



// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Cursor trail effect (optional - can be removed if too much)
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

if (circles.length === 0 && window.innerWidth > 768) {
    // Create cursor trail circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            pointer-events: none;
            opacity: 0;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(circle);
    }
}

// Console message
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the GitHub repo!', 'color: #764ba2; font-size: 14px;');


// ============================================
// NEW FEATURES JAVASCRIPT
// ============================================

// GITHUB USERNAME CONFIGURATION
const GITHUB_USERNAME = 'Vivek7892'; // Change this to update everywhere

// Initialize new features on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubRepos();
    initVisitorCounter();
    initJourneyAnimation();
});

// GITHUB REPOS FETCHER
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching repos:', error);
        const reposList = document.getElementById('reposList');
        if (reposList) {
            reposList.innerHTML = '<p>Unable to load repositories</p>';
        }
    }
}

function displayRepos(repos) {
    const reposList = document.getElementById('reposList');
    if (!reposList) return;
    
    reposList.innerHTML = repos.map(repo => `
        <div class="repo-card">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank">View Repository →</a>
        </div>
    `).join('');
}

// VISITOR COUNTER
function initVisitorCounter() {
    const counterElement = document.getElementById('visitorCount');
    if (!counterElement) return;
    
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    counterElement.textContent = count;
}

// JOURNEY TIMELINE ANIMATION
function initJourneyAnimation() {
    const journeyItems = document.querySelectorAll('.journey-item');
    if (journeyItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    journeyItems.forEach(item => observer.observe(item));
}

// Typing Animation
const typingTexts = [
    "Full-Stack Web Development",
    "Mobile App Development",
    "Backend API Development",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// Share Button Functionality
const shareButton = document.querySelector('.social-sidebar-header');
if (shareButton) {
    shareButton.style.cursor = 'pointer';
    shareButton.addEventListener('click', async () => {
        const shareData = {
            title: 'Vivek V - Full Stack Developer',
            text: 'Check out my portfolio! AI & Full Stack Developer specializing in MERN, GenAI, and RAG Chatbots.',
            url: window.location.href
        };
        
        // Check if Web Share API is supported
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    copyToClipboard();
                }
            }
        } else {
            copyToClipboard();
        }
    });
}

function copyToClipboard() {
    const socialLinks = `
Vivek V - Portfolio
━━━━━━━━━━━━━━━━━━
🌐 Website: ${window.location.href}
💼 LinkedIn: https://linkedin.com/in/vivek-v-a0a41225a
💻 GitHub: https://github.com/Vivek7892
📧 Email: vivekvvivekv70@gmail.com
📱 Phone: +917892409872
    `.trim();
    
    navigator.clipboard.writeText(socialLinks).then(() => {
        // Show success message
        const originalIcon = shareButton.innerHTML;
        shareButton.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            shareButton.innerHTML = originalIcon;
        }, 2000);
    }).catch(() => {
        alert('Links copied! Share them with others.');
    });
}


// Bottom Navigation
const bottomNav = document.getElementById('bottomNav');
let lastScrollY = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;
    
    if (currentScrollY > 300) {
        bottomNav.classList.add('show');
    } else {
        bottomNav.classList.remove('show');
    }
    
    lastScrollY = currentScrollY;
});

// Active state for bottom nav
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    bottomNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});


// Projects Slider
const projectsSlider = document.getElementById('projectsSlider');
const projectsPrev = document.getElementById('projectsPrev');
const projectsNext = document.getElementById('projectsNext');

if (projectsSlider && projectsPrev && projectsNext) {
    projectsPrev.addEventListener('click', () => {
        projectsSlider.scrollBy({ left: -370, behavior: 'smooth' });
    });

    projectsNext.addEventListener('click', () => {
        projectsSlider.scrollBy({ left: 370, behavior: 'smooth' });
    });
}


// Animated Logo
const logoTexts = ['Hello 👋', 'ನಮಸ್ಕಾರ 🙏', 'Vivek.dev'];
let logoIndex = 0;
let logoCharIndex = 0;
let isLogoDeleting = false;
const animatedLogo = document.getElementById('animatedLogo');

function animateLogo() {
    if (!animatedLogo) return;
    
    const currentLogoText = logoTexts[logoIndex];
    
    if (isLogoDeleting) {
        animatedLogo.textContent = currentLogoText.substring(0, logoCharIndex - 1);
        logoCharIndex--;
    } else {
        animatedLogo.textContent = currentLogoText.substring(0, logoCharIndex + 1);
        logoCharIndex++;
    }
    
    let speed = isLogoDeleting ? 50 : 150;
    
    if (!isLogoDeleting && logoCharIndex === currentLogoText.length) {
        speed = 2000;
        isLogoDeleting = true;
    } else if (isLogoDeleting && logoCharIndex === 0) {
        isLogoDeleting = false;
        logoIndex = (logoIndex + 1) % logoTexts.length;
        speed = 500;
    }
    
    setTimeout(animateLogo, speed);
}

animateLogo();

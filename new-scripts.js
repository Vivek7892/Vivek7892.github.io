/* ADD THESE FUNCTIONS TO YOUR script.js FILE */

// ============================================
// GITHUB USERNAME CONFIGURATION
// ============================================
const GITHUB_USERNAME = 'Vivek7892'; // Change this to update everywhere

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================
function initDarkMode() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Call this on page load
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    fetchGitHubRepos();
    initVisitorCounter();
    initJourneyAnimation();
    initNetlifyForm();
});

// ============================================
// GITHUB REPOS FETCHER
// ============================================
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching repos:', error);
        document.getElementById('reposList').innerHTML = '<p>Unable to load repositories</p>';
    }
}

function displayRepos(repos) {
    const reposList = document.getElementById('reposList');
    reposList.innerHTML = repos.map(repo => `
        <div class="repo-card">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank">View Repository →</a>
        </div>
    `).join('');
}

// ============================================
// VISITOR COUNTER
// ============================================
function initVisitorCounter() {
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    document.getElementById('visitorCount').textContent = count;
    
    // For production, replace with actual API call:
    // fetch('YOUR_COUNTER_API_ENDPOINT')
    //     .then(res => res.json())
    //     .then(data => {
    //         document.getElementById('visitorCount').textContent = data.count;
    //     });
}

// ============================================
// JOURNEY TIMELINE ANIMATION
// ============================================
function initJourneyAnimation() {
    const journeyItems = document.querySelectorAll('.journey-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    journeyItems.forEach(item => observer.observe(item));
}

// ============================================
// NETLIFY FORM SUCCESS MESSAGE
// ============================================
function initNetlifyForm() {
    const form = document.querySelector('form[name="contact"]');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        // Netlify handles the submission
        // Show success message after a delay
        setTimeout(() => {
            const successMsg = document.getElementById('form-success');
            if (successMsg) {
                successMsg.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            }
        }, 1000);
    });
}

// ============================================
// SMOOTH SCROLL FOR NEW NAV LINKS
// ============================================
// Add these links to your navigation if needed:
// <li><a href="#github" class="nav-link">GitHub</a></li>
// <li><a href="#blog" class="nav-link">Blog</a></li>
// <li><a href="#journey" class="nav-link">Journey</a></li>

// The existing smooth scroll code will handle these automatically

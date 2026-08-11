/**
 * Vaidarbhi Buddhe - Chemical Engineering Portfolio
 * Main Application Orchestrator & UI Controller
 */

const App = {
  theme: localStorage.getItem('vb_theme') || 'dark',

  init() {
    this.applyTheme(this.theme);
    this.setupThemeToggle();
    this.setupMobileMenu();
    this.setupScrollSpy();
    this.setupModals();
    this.setupContactForm();
    this.renderDynamicContent();
    this.setupSkillsFilter();
  },

  /* ------------------------------------------------------------------------
     1. Theme Management (Dark / Light)
     ------------------------------------------------------------------------ */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vb_theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.className = theme === 'dark' ? 'icon-moon' : 'icon-sun';
      icon.innerHTML = theme === 'dark' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    }
  },

  setupThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.theme);
        this.showToast(`Switched to ${this.theme === 'dark' ? 'Industrial Dark' : 'Clean Laboratory Light'} Mode`);
      });
    }
  },

  /* ------------------------------------------------------------------------
     2. Navigation & Mobile Menu
     ------------------------------------------------------------------------ */
  setupMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
      });

      links.forEach(l => {
        l.addEventListener('click', () => {
          nav.classList.remove('mobile-open');
        });
      });
    }
  },

  setupScrollSpy() {
    const header = document.querySelector('.site-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      let current = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          current = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  },

  /* ------------------------------------------------------------------------
     3. Dynamic Content Rendering from data.js
     ------------------------------------------------------------------------ */
  renderDynamicContent() {
    if (typeof portfolioData === 'undefined') return;

    // Render Stats Strip
    const statsContainer = document.getElementById('stats-ticker-container');
    if (statsContainer) {
      statsContainer.innerHTML = portfolioData.stats.map(s => `
        <div class="stat-box">
          <div class="stat-number">${s.value}</div>
          <div class="stat-label">${s.label}</div>
          <div class="stat-highlight">${s.highlight}</div>
        </div>
      `).join('');
    }

    // Render Experience Timeline
    const expContainer = document.getElementById('experience-timeline-container');
    if (expContainer) {
      expContainer.innerHTML = portfolioData.experiences.map((exp, idx) => `
        <div class="exp-card glass-card" data-exp-id="${exp.id}">
          <div class="exp-node">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div class="exp-header-row">
            <div class="exp-org-info">
              <h3>${exp.company}</h3>
              <div class="exp-role-title">${exp.role} • <span>${exp.location}</span></div>
            </div>
            <div class="exp-meta-pill">
              <span class="badge badge-teal">${exp.badge}</span>
              <span class="exp-time">${exp.period}</span>
            </div>
          </div>
          <div class="exp-project-title">
            <h4>${exp.projectTitle}</h4>
          </div>
          <ul class="exp-bullets">
            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
          <div class="exp-metrics-grid">
            ${exp.metrics.map(m => `
              <div class="exp-metric-item">
                <span>${m.label}</span>
                <strong>${m.val}</strong>
              </div>
            `).join('')}
          </div>
          <div class="exp-tags">
            ${exp.technologies.map(t => `<span class="badge">${t}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    // Render Education & Awards
    const eduContainer = document.getElementById('edu-cards-container');
    if (eduContainer) {
      eduContainer.innerHTML = portfolioData.education.map((edu, idx) => `
        <div class="edu-item-card glass-card ${idx === 0 ? 'featured' : ''}">
          <div class="edu-header">
            <div>
              <h3>${edu.degree}</h3>
              ${edu.minor ? `<p style="color: var(--teal-400); font-weight: 600; margin-bottom: 0.2rem;">${edu.minor}</p>` : ''}
              <p style="color: var(--text-muted); font-size: 0.9rem;">${edu.institution}</p>
            </div>
            <div class="edu-meta-score">${edu.grade}</div>
          </div>
          <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--amber-400); margin-bottom: 0.75rem;">
            ${edu.rank} • <span style="color: var(--text-muted);">${edu.period}</span>
          </p>
          <ul class="exp-bullets" style="margin-bottom: 0;">
            ${edu.details.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }

    const awardsContainer = document.getElementById('awards-list-container');
    if (awardsContainer) {
      awardsContainer.innerHTML = portfolioData.certificationsAndAwards.map(a => `
        <div class="award-item glass-card">
          <div class="award-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <div class="award-content">
            <h4>${a.title}</h4>
            <div class="award-issuer">${a.issuer} • ${a.date}</div>
            <p class="award-desc">${a.desc}</p>
          </div>
        </div>
      `).join('');
    }

    // Render Leadership Grid
    const leadContainer = document.getElementById('leadership-grid-container');
    if (leadContainer) {
      leadContainer.innerHTML = portfolioData.leadership.map(l => `
        <div class="leadership-card glass-card">
          <div class="lead-icon-header">
            <div class="lead-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <span class="badge badge-cyan">${l.period}</span>
          </div>
          <h3>${l.role}</h3>
          <div class="lead-org">${l.org}</div>
          <p class="lead-desc">${l.description}</p>
        </div>
      `).join('');
    }
  },

  /* ------------------------------------------------------------------------
     4. Skills Filter & Matrix
     ------------------------------------------------------------------------ */
  setupSkillsFilter() {
    if (typeof portfolioData === 'undefined') return;

    const container = document.getElementById('skills-grid-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    const renderSkills = (filter = 'all') => {
      if (!container) return;

      const filtered = filter === 'all' 
        ? portfolioData.skillsData 
        : portfolioData.skillsData.filter(c => c.category.toLowerCase().includes(filter.toLowerCase()));

      container.innerHTML = filtered.map(cat => `
        <div class="skill-category-card glass-card">
          <div class="category-header">
            <div class="cat-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <div>
              <h3>${cat.category}</h3>
              <p style="font-size: 0.82rem; color: var(--teal-400); margin: 0;">${cat.skills.length} Core Competencies</p>
            </div>
          </div>
          <div class="skill-items-list">
            ${cat.skills.map(s => `
              <div class="skill-item">
                <div class="skill-row-header">
                  <span class="skill-name">${s.name}</span>
                  <span class="skill-pct">${s.level}%</span>
                </div>
                <div class="skill-bar-track">
                  <div class="skill-bar-fill" style="width: ${s.level}%;"></div>
                </div>
                <div class="skill-desc">${s.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSkills(btn.dataset.category);
      });
    });

    renderSkills('all');
  },

  /* ------------------------------------------------------------------------
     5. Modals (Print CV / CV Preview)
     ------------------------------------------------------------------------ */
  setupModals() {
    const cvModal = document.getElementById('cv-modal');
    const openCvBtns = document.querySelectorAll('.open-cv-btn');
    const closeBtns = document.querySelectorAll('.modal-close-btn');

    openCvBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (cvModal) cvModal.classList.add('open');
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-backdrop');
        if (modal) modal.classList.remove('open');
      });
    });

    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        e.target.classList.remove('open');
      }
    });

    const printBtn = document.getElementById('modal-print-cv-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  },

  /* ------------------------------------------------------------------------
     6. Contact Form & Copy Actions
     ------------------------------------------------------------------------ */
  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const topic = document.getElementById('contact-topic').value;
        const msg = document.getElementById('contact-message').value.trim();

        if (!name || !email || !msg) {
          this.showToast('Please fill out all required fields.', 'error');
          return;
        }

        // Open mailto link with pre-filled content
        const subject = encodeURIComponent(`[Portfolio Inquiry - ${topic}] Message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${msg}`);
        window.location.href = `mailto:imt22vs.buddhe@stumarj.ictmumbai.edu.in?subject=${subject}&body=${body}`;

        this.showToast(`Thank you, ${name}! Your email draft has been generated.`);
        form.reset();
      });
    }

    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('imt22vs.buddhe@stumarj.ictmumbai.edu.in').then(() => {
          this.showToast('Email copied to clipboard: imt22vs.buddhe@stumarj.ictmumbai.edu.in');
        });
      });
    }

    const copyPhoneBtn = document.getElementById('copy-phone-btn');
    if (copyPhoneBtn) {
      copyPhoneBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('+918484968019').then(() => {
          this.showToast('Phone number copied to clipboard: +91 8484968019');
        });
      });
    }
  },

  /* ------------------------------------------------------------------------
     7. Toast Notification Utility
     ------------------------------------------------------------------------ */
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

window.showToast = (msg, type) => App.showToast(msg, type);

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

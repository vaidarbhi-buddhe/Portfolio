/**
 * Vaidarbhi Buddhe - Chemical Engineering Portfolio
 * Main Application Orchestrator & UI Controller
 */

const App = {
  theme: 'dark',

  init() {
    this.applyTheme('dark');
    this.setupMobileMenu();
    this.setupScrollSpy();
    this.setupHeroDeck();
    this.setupModals();
    this.setupContactForm();
    this.renderDynamicContent();
    this.setupSkillsFilter();
  },

  /* ------------------------------------------------------------------------
     1. Theme Management (Permanently Locked to Industrial Dark)
     ------------------------------------------------------------------------ */
  applyTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('vb_theme', 'dark');
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
     2.1 Hero Interactive Chemical Deck
     ------------------------------------------------------------------------ */
  setupHeroDeck() {
    const tabs = document.querySelectorAll('.hero-deck-tab');
    const panes = document.querySelectorAll('.hero-deck-pane');
    if (!tabs.length || !panes.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const deckId = tab.dataset.deck;
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const target = document.getElementById(`deck-${deckId}`);
        if (target) {
          target.classList.add('active');
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

    // Render Minimized Experience Cards (Click to Pop Out Case Study)
    const expContainer = document.getElementById('experience-timeline-container');
    if (expContainer) {
      expContainer.innerHTML = portfolioData.experiences.map((exp, idx) => `
        <div class="exp-card glass-card exp-card-compact exp-card-clickable" data-exp-id="${exp.id}" onclick="openExperienceModal('${exp.id}')" role="button" tabindex="0" aria-haspopup="dialog" aria-label="Open case study for ${exp.company}">
          <div class="exp-node">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div class="exp-header-row">
            <div class="exp-org-info">
              <h3>${exp.company}</h3>
              <div class="exp-role-title">${exp.role} • <span>${exp.location}</span>${exp.guide ? ` • <span style="color: var(--amber-400); font-weight: 500;">Guide: ${exp.guide}</span>` : ''}</div>
            </div>
            <div class="exp-meta-pill">
              <span class="badge badge-teal">${exp.badge}</span>
              <span class="exp-time">${exp.period}</span>
            </div>
          </div>
          <p class="exp-teaser-text">
            ${exp.teaser || exp.projectTitle}
          </p>
          <div class="exp-card-bottom-row">
            <div class="exp-preview-tags">
              <span class="badge badge-amber" style="font-size: 0.75rem;">${exp.metrics[0].label}: ${exp.metrics[0].val}</span>
              <span class="exp-preview-tech">${exp.technologies.slice(0, 3).join(' • ')}</span>
            </div>
            <button type="button" class="btn-popout-prompt" onclick="event.stopPropagation(); openExperienceModal('${exp.id}')" data-exp-id="${exp.id}" aria-label="View case study for ${exp.company}">
              <span>View Case Study</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
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
              <p style="font-size: 0.82rem; color: var(--teal-400); margin: 0;">${cat.skills.length} Technical Competencies</p>
            </div>
          </div>
          <div class="skills-card-grid">
            ${cat.skills.map(s => {
              const blocks = s.tier === 'Expert' ? 5 : s.tier === 'Advanced' ? 4 : 3;
              return `
              <div class="skill-node-card">
                <div class="skill-node-top">
                  <div class="skill-node-name">
                    <span class="skill-beacon"></span>
                    <strong>${s.name}</strong>
                  </div>
                  <span class="skill-tier-badge tier-${(s.tier || 'advanced').toLowerCase()}">${s.tier || 'Advanced'}</span>
                </div>
                <p class="skill-node-desc">${s.desc}</p>
                <div class="skill-node-bottom">
                  <span class="skill-applied-tag">${s.appliedAt || 'Industrial Application'}</span>
                  <div class="skill-quantum-blocks" title="Engineering Mastery: ${s.tier}">
                    ${[1, 2, 3, 4, 5].map(i => `<span class="q-block ${i <= blocks ? 'filled' : ''}"></span>`).join('')}
                  </div>
                </div>
                ${s.simLink ? `
                  <div style="margin-top: 0.55rem; padding-top: 0.5rem; border-top: 1px dashed var(--border-subtle); display: flex; justify-content: flex-end;">
                    <a href="${s.simLink}" class="skill-sim-link">
                      <span>Test in Live Lab</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </a>
                  </div>
                ` : ''}
              </div>
            `;}).join('')}
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
     5. Modals (Print CV / Interactive Experience Pop-out Window)
     ------------------------------------------------------------------------ */
  setupModals() {
    const cvModal = document.getElementById('cv-modal');
    const openCvModalBtns = document.querySelectorAll('.open-cv-modal-btn');
    const closeBtns = document.querySelectorAll('.modal-close-btn');

    openCvModalBtns.forEach(btn => {
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

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
      }
    });

    const printBtn = document.getElementById('modal-print-cv-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Interactive Experience Pop-out Click Listeners
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.exp-card-clickable, .btn-popout-prompt, .exp-modal-btn');
      if (trigger) {
        const expId = trigger.dataset.expId;
        if (expId) {
          e.preventDefault();
          this.openExperienceModal(expId);
        }
      }

      // Inside Modal Prev/Next Navigation
      const navBtn = e.target.closest('.modal-nav-btn');
      if (navBtn) {
        const targetId = navBtn.dataset.targetId;
        if (targetId) {
          e.preventDefault();
          this.openExperienceModal(targetId);
        }
      }
    });

    // Keyboard accessibility for cards
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('exp-card-clickable')) {
        const expId = e.target.dataset.expId;
        if (expId) {
          e.preventDefault();
          this.openExperienceModal(expId);
        }
      }
    });
  },

  /* ------------------------------------------------------------------------
     5.1 Experience Pop-out Modal Orchestration
     ------------------------------------------------------------------------ */
  openExperienceModal(expId) {
    if (typeof portfolioData === 'undefined') return;

    const modal = document.getElementById('exp-modal');
    const content = document.getElementById('exp-modal-content');
    if (!modal || !content) return;

    // Collect all experiences including thesis
    const allItems = [portfolioData.thesis, ...portfolioData.experiences];
    const cleanId = String(expId || '').trim();
    let currIdx = allItems.findIndex(i => i.id === cleanId);
    if (currIdx === -1) currIdx = 0; // Safe fallback

    const item = allItems[currIdx];
    const prevItem = currIdx > 0 ? allItems[currIdx - 1] : allItems[allItems.length - 1];
    const nextItem = currIdx < allItems.length - 1 ? allItems[currIdx + 1] : allItems[0];

    content.innerHTML = `
      <div class="exp-modal-header">
        <div class="exp-modal-meta-row">
          <span class="badge badge-teal">${item.badge || 'Project Spotlight'}</span>
          <span class="badge badge-cyan">${item.category || 'Process Engineering'}</span>
          <span class="exp-modal-period">${item.period}</span>
        </div>
        <h2 id="exp-modal-title" class="exp-modal-org-title">${item.company || item.institution}</h2>
        <div class="exp-modal-role-line">
          <strong>${item.role || item.degree}</strong> • <span>${item.location || 'Jalna, Maharashtra'}</span>
          ${item.guide ? ` • <span class="exp-modal-guide">Guide: ${item.guide}</span>` : ''}
          ${item.majorGuide ? ` • <span class="exp-modal-guide">Major: ${item.majorGuide} | Minor: ${item.minorGuide}</span>` : ''}
        </div>
      </div>

      <div class="exp-modal-project-box">
        <span class="project-box-label">PROJECT SCOPE</span>
        <h3>${item.projectTitle || item.title}</h3>
      </div>

      ${item.metrics && item.metrics.length ? `
        <div class="exp-modal-metrics-grid">
          ${item.metrics.map(m => `
            <div class="exp-modal-metric-card">
              <span>${m.label}</span>
              <strong>${m.val}</strong>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="exp-modal-body">
        <h4 class="exp-modal-section-title">Key Engineering Responsibilities & Outcomes</h4>
        <ul class="exp-modal-bullets">
          ${item.highlights.map(h => `
            <li>
              <div class="bullet-dot">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      ${item.technologies && item.technologies.length ? `
        <div class="exp-modal-tech-stack">
          <span class="tech-stack-label">APPLIED TECHNOLOGIES & TOOLS</span>
          <div class="exp-modal-tags">
            ${item.technologies.map(t => `<span class="badge">${t}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      <div class="exp-modal-footer-nav">
        <button type="button" class="modal-nav-btn prev-exp-btn" onclick="openExperienceModal('${prevItem.id}')" data-target-id="${prevItem.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>${prevItem.company || 'Master’s Thesis'}</span>
        </button>
        <span class="modal-counter-text">${currIdx + 1} of ${allItems.length}</span>
        <button type="button" class="modal-nav-btn next-exp-btn" onclick="openExperienceModal('${nextItem.id}')" data-target-id="${nextItem.id}">
          <span>${nextItem.company || 'Master’s Thesis'}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div style="display: flex; justify-content: center; margin-top: 1.25rem;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="closeExperienceModal()">
          <span>Close Window (Esc)</span>
        </button>
      </div>
    `;

    modal.classList.add('open');
    document.body.classList.add('modal-open');
  },

  closeExperienceModal() {
    const modal = document.getElementById('exp-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.classList.remove('modal-open');
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
        window.location.href = `mailto:vaidarbhibuddhe@gmail.com?subject=${subject}&body=${body}`;

        this.showToast(`Thank you, ${name}! Your email draft has been generated.`);
        form.reset();
      });
    }

    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('vaidarbhibuddhe@gmail.com').then(() => {
          this.showToast('Email copied to clipboard: vaidarbhibuddhe@gmail.com');
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
window.openExperienceModal = (id) => App.openExperienceModal(id);
window.closeExperienceModal = () => App.closeExperienceModal();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

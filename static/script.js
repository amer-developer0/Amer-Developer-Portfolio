/**
 * ========================================
 * 🚀 Amer Developer Portfolio - FULL-STACK SCRIPT (Final Version)
 * Version: 17.0 | Full-Stack Optimized for Flask + data.json
 * Author: Amer Developer
 * Backend: app.py (Flask) | Data: /api/data | Uploads: /api/upload
 * ========================================
 */

// =======================
// 1. Global Variables
// =======================
let currentLang = 'en';
let data = {
  skills: [],
  tools: [],
  projects: [],
  services: []
};
let logoUrl = '/static/assets/images/logo.png'; // سيتم تحديثه من السيرفر

// =======================
// 2. DOM Elements
// =======================
const logoImg = document.getElementById('logo-img');
const languageSwitcher = document.getElementById('language-switcher');
const languageMenu = document.getElementById('language-menu');
const toast = document.getElementById('toast');
const yearSpan = document.getElementById('year');
const adminPanel = document.getElementById('admin-panel');
const passwordModal = document.getElementById('password-modal');
const typingText = document.getElementById('typing-text');

// Contact Form
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const sendEmailBtn = document.getElementById('send-email');
const sendWhatsAppBtn = document.getElementById('send-whatsapp');

// Admin Panel
const editModeOverlay = document.getElementById('edit-mode-overlay');
const siteFrame = document.getElementById('site-frame');

// File Uploads
const projectImageInput = document.getElementById('input-project-image');
const projectVideoInput = document.getElementById('input-project-video');
const imageFilename = document.getElementById('image-filename');
const videoFilename = document.getElementById('video-filename');

// Delete Lists
const deleteProjectList = document.getElementById('delete-project-list');
const deleteSkillList = document.getElementById('delete-skill-list');
const deleteToolList = document.getElementById('delete-tool-list');

// Grids
const skillsGrid = document.getElementById('skills-grid');
const toolsGrid = document.getElementById('tools-grid');
const projectsGrid = document.getElementById('projects-grid');
const projectsEmpty = document.getElementById('projects-empty');
const servicesGrid = document.getElementById('services-grid');

// Modals
const tiktokModal = document.getElementById('tiktok-modal');
const adminPassword = document.getElementById('admin-password');
const passwordError = document.getElementById('password-error');

// Sections & Nav
const sections = document.querySelectorAll('.section, #home');
const navLinks = document.querySelectorAll('.nav-link');

// About Text
const aboutText = document.getElementById('about-text');
const aboutText2 = document.getElementById('about-text-2');
const aboutText3 = document.getElementById('about-text-3');

// Hero Name
const heroName = document.getElementById('hero-name');

// Forms
const formProject = document.getElementById('form-project');
const formSkill = document.getElementById('form-skill');
const formTool = document.getElementById('form-tool');

// Admin Forms Container
const adminForms = document.getElementById('admin-forms');
const formAddProject = document.getElementById('form-add-project');
const formAddSkill = document.getElementById('form-add-skill');
const formAddTool = document.getElementById('form-add-tool');
const deleteSections = document.getElementById('delete-sections');

// Page Title
const pageTitle = document.querySelector('title');

// Services Section Elements
const orderServiceBtn = document.getElementById('order-service-btn');
const servicesActions = document.getElementById('services-actions');
const cancelSelection = document.getElementById('cancel-selection');
const confirmOrder = document.getElementById('confirm-order');

// =======================
// 3. Translation System
// =======================
const translations = {
  ar: {
    home: 'الرئيسية',
    about: 'من أنا',
    skills: 'المهارات',
    tools: 'الأدوات',
    services: 'الخدمات',
    projects: 'المشاريع',
    contact: 'اتصل بي',
    'I offer professional development services tailored to your needs.': 'أقدم خدمات تطوير احترافية مخصصة لاحتياجاتك.',
    'More About Me': 'مزيد من التفاصيل',
    'Hello, I\'m': 'مرحبًا، أنا',
    'Building digital solutions': 'أبني حلولًا رقمية تساعدك على الظهور بشكل احترافي وفعّال في السوق الرقمي',
    'About Me': 'من أنا',
    'My Skills': 'مهاراتي',
    'My Tools': 'الأدوات',
    'My Services': 'خدماتي',
    'Latest Projects': 'أحدث %d مشاريع',
    'Contact Me': 'اتصل بي',
    'Your Name': 'اسمك',
    'Your Email': 'بريدك الإلكتروني',
    'Your Message': 'رسالتك',
    'Send via Email': 'إرسال عبر البريد الإلكتروني',
    'Send via WhatsApp': 'إرسال عبر واتساب',
    'I am available for collaboration': 'أنا متاح للتعاون والعمل على مشاريع جديدة، لا تتردد في التواصل معي لأي استفسار أو عرض عمل.',
    'Admin Panel': 'لوحة التحكم',
    'Add Project': 'إضافة مشروع',
    'Add Skill': 'إضافة مهارة',
    'Add Tool': 'إضافة أداة',
    'Delete Project': 'حذف مشروع',
    'Delete Skill': 'حذف مهارة',
    'Delete Tool': 'حذف أداة',
    'Project Name': 'اسم المشروع',
    'Project URL': 'رابط المشروع',
    'Upload Image': 'تحميل صورة',
    'Upload Video (optional)': 'تحميل فيديو (اختياري)',
    'Short Description': 'وصف مختصر',
    'Skill Abbreviation': 'اختصار المهارة (مثل: HTML)',
    'Full Name': 'الاسم الكامل (مثل: HyperText Markup Language)',
    'Tool Abbreviation': 'اختصار الأداة (مثل: Git)',
    'Save Project': 'حفظ المشروع',
    'Add Skill': 'إضافة مهارة',
    'Add Tool': 'إضافة أداة',
    'Sending...': 'جاري الإرسال...',
    'Success Email': 'تم إرسال الرسالة بنجاح، سيتم التواصل معك عبر البريد الإلكتروني خلال 24 ساعة',
    'Success WhatsApp': 'تم إرسال الرسالة بنجاح، سيتم التواصل معك عبر واتساب خلال 24 ساعة',
    'Error': 'تعذر إرسال الرسالة',
    'Error Network': 'تحقق من اتصالك بالإنترنت وحاول مرة أخرى.',
    'Error Invalid Email': 'يرجى إدخال بريد إلكتروني صحيح.',
    'Confirm Delete': 'هل أنت متأكد أنك تريد حذف هذا العنصر؟',
    'Enter Password': 'أدخل كلمة المرور للتأكيد',
    'Incorrect Password': 'كلمة المرور غير صحيحة',
    'No projects to delete': 'لا توجد مشاريع للحذف',
    'No skills to delete': 'لا توجد مهارات للحذف',
    'No tools to delete': 'لا توجد أدوات للحذف',
    'Enter Admin Password': 'أدخل كلمة مرور الإدارة',
    'This area is protected. Enter the password to continue.': 'هذه المنطقة محمية. أدخل كلمة المرور للمتابعة.',
    'Enter': 'أدخل',
    'Cancel': 'إلغاء',
    'TikTok Service Notice': 'إشعار خدمة تيك توك',
    'Got It': 'حسنًا',
    'Change Logo': 'تغيير الشعار',
    'Change About Text': 'تغيير نص "من أنا"',
    'Control Site Live': 'التحكم المباشر في الموقع',
    'No projects added yet.': 'لم تُضف مشاريع بعد.',
    'Back': 'العودة',
    'Order Service': 'اطلب خدمة',
    'Cancel Selection': 'إلغاء التحديد',
    'Confirm Order': 'تأكيد الطلب',
    'Service Selected': 'تم تحديد خدمة واحدة',
    'Services Selected': 'تم تحديد %d خدمات',
    'Please select at least one service': 'يرجى تحديد خدمة واحدة على الأقل',
    'Landing Pages': 'صفحات الهبوط',
    'Websites': 'مواقع الويب',
    'Python Scripts': 'سكربتات بايثون',
    'Support & Maintenance': 'الدعم والصيانة',
    'Landing Pages Desc': 'تصميم صفحات هبوط احترافية لزيادة التحويلات والتفاعل.',
    'Websites Desc': 'تطوير مواقع ويب حديثة وسريعة وسهلة الاستخدام.',
    'Python Scripts Desc': 'كتابة سكربتات بايثون لأتمتة المهام وتحليل البيانات.',
    'Support & Maintenance Desc': 'دعم فني وصيانة دورية لضمان استقرار موقعك.'
  },
  en: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    tools: 'Tools',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact',
    'I offer professional development services tailored to your needs.': 'I offer professional development services tailored to your needs.',
    'More About Me': 'More About Me',
    'Hello, I\'m': 'Hello, I\'m',
    'Building digital solutions': 'I build digital solutions that help you appear professionally and effectively in the digital market',
    'About Me': 'About Me',
    'My Skills': 'My Skills',
    'My Tools': 'My Tools',
    'My Services': 'My Services',
    'Latest Projects': 'Latest %d Projects',
    'Contact Me': 'Contact Me',
    'Your Name': 'Your Name',
    'Your Email': 'Your Email',
    'Your Message': 'Your Message',
    'Send via Email': 'Send via Email',
    'Send via WhatsApp': 'Send via WhatsApp',
    'I am available for collaboration': 'I am available for collaboration and new projects. Feel free to reach out for any inquiries or job offers.',
    'Admin Panel': 'Admin Panel',
    'Add Project': 'Add Project',
    'Add Skill': 'Add Skill',
    'Add Tool': 'Add Tool',
    'Delete Project': 'Delete Project',
    'Delete Skill': 'Delete Skill',
    'Delete Tool': 'Delete Tool',
    'Project Name': 'Project Name',
    'Project URL': 'Project URL',
    'Upload Image': 'Upload Image',
    'Upload Video (optional)': 'Upload Video (optional)',
    'Short Description': 'Short Description',
    'Skill Abbreviation': 'Skill Abbreviation (e.g. HTML)',
    'Full Name': 'Full Name (e.g. HyperText Markup Language)',
    'Tool Abbreviation': 'Tool Abbreviation (e.g. Git)',
    'Save Project': 'Save Project',
    'Add Skill': 'Add Skill',
    'Add Tool': 'Add Tool',
    'Sending...': 'Sending...',
    'Success Email': 'Message sent successfully! I will contact you via email within 24 hours.',
    'Success WhatsApp': 'Message sent successfully! I will contact you via WhatsApp within 24 hours.',
    'Error': 'Failed to send message',
    'Error Network': 'Please check your internet connection and try again.',
    'Error Invalid Email': 'Please enter a valid email address.',
    'Confirm Delete': 'Are you sure you want to delete this item?',
    'Enter Password': 'Enter password to confirm',
    'Incorrect Password': 'Incorrect password',
    'No projects to delete': 'No projects to delete',
    'No skills to delete': 'No skills to delete',
    'No tools to delete': 'No tools to delete',
    'Enter Admin Password': 'Enter Admin Password',
    'This area is protected. Enter the password to continue.': 'This area is protected. Enter the password to continue.',
    'Enter': 'Enter',
    'Cancel': 'Cancel',
    'TikTok Service Notice': 'TikTok Service Notice',
    'Got It': 'Got It',
    'Change Logo': 'Change Logo',
    'Change About Text': 'Change About Text',
    'Control Site Live': 'Control Site Live',
    'No projects added yet.': 'No projects added yet.',
    'Back': 'Back',
    'Order Service': 'Order Service',
    'Cancel Selection': 'Cancel Selection',
    'Confirm Order': 'Confirm Order',
    'Service Selected': '1 service selected',
    'Services Selected': '%d services selected',
    'Please select at least one service': 'Please select at least one service',
    'Landing Pages': 'Landing Pages',
    'Websites': 'Websites',
    'Python Scripts': 'Python Scripts',
    'Support & Maintenance': 'Support & Maintenance',
    'Landing Pages Desc': 'Professional landing pages to increase conversions and engagement.',
    'Websites Desc': 'Modern, fast, and user-friendly websites.',
    'Python Scripts Desc': 'Python scripts for automation and data analysis.',
    'Support & Maintenance Desc': 'Technical support and regular maintenance for stability.'
  }
};

// =======================
// 4. Language Management
// =======================
function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.setAttribute('data-lang', lang);

  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    heroName.textContent = 'عامر';
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    heroName.textContent = 'Amer';
  }

  // Update all data-translate elements
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[lang][key]) {
      const value = translations[lang][key];
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else if (el.tagName === 'LABEL') {
        el.textContent = value;
      } else if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)) {
        el.textContent = value;
      } else if (el.tagName === 'P' && !el.id.startsWith('about-text')) {
        el.textContent = value;
      } else {
        el.textContent = value;
      }
    }
  });

  // Update About Text
  if (lang === 'ar') {
    aboutText.textContent = data.meta.about.ar.part1;
    aboutText2.textContent = data.meta.about.ar.part2;
    aboutText3.textContent = data.meta.about.ar.part3;
  } else {
    aboutText.textContent = data.meta.about.en.part1;
    aboutText2.textContent = data.meta.about.en.part2;
    aboutText3.textContent = data.meta.about.en.part3;
  }

  // Update Page Title
  pageTitle.textContent = lang === 'ar' 
    ? data.meta.title.ar
    : data.meta.title.en;

  // Update Projects Title
  const projectsTitle = document.getElementById('projects-title');
  const projectCount = data.projects.length;
  projectsTitle.textContent = lang === 'ar'
    ? `أحدث ${projectCount} مشاريع`
    : `${projectCount} Latest Projects`;

  // Update Language Menu
  document.querySelectorAll('#language-menu li').forEach(li => {
    li.classList.toggle('active', li.dataset.lang === lang);
  });
  languageMenu.hidden = true;

  // Re-render all content
  renderAll();
  showToast(`Language changed to ${lang.toUpperCase()}`);
}

// Language Switcher Event
languageSwitcher.addEventListener('click', (e) => {
  e.stopPropagation();
  languageMenu.hidden = !languageMenu.hidden;
});

document.addEventListener('click', (e) => {
  if (!languageSwitcher.contains(e.target)) {
    languageMenu.hidden = true;
  }
});

document.querySelectorAll('#language-menu li').forEach(li => {
  li.addEventListener('click', () => {
    setLanguage(li.dataset.lang);
  });
});

// =======================
// 5. Typing Animation
// =======================
const roles = {
  en: ['Front-end Developer', 'Back-end Developer', 'Full-stack Developer'],
  ar: ['مطوّر واجهات أمامية', 'مطوّر واجهات خلفية', 'مطوّر متكامل']
};

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[currentLang]?.[roleIndex];
  if (!currentRole) return;

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    setTimeout(() => {
      isDeleting = true;
      typeRole();
    }, 1000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles[currentLang].length;
    setTimeout(typeRole, 1500);
    return;
  }

  const typingSpeed = 250;
  const erasingSpeed = 100;
  setTimeout(typeRole, isDeleting ? erasingSpeed : typingSpeed);
}

// =======================
// 6. Scroll Animations & Active Nav
// =======================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });

      // Show "Order Service" button only when in services section
      if (id === 'services') {
        orderServiceBtn.style.display = 'inline-flex';
      } else {
        orderServiceBtn.style.display = 'none';
      }
    }
  });
}, { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' });

sections.forEach(section => observer.observe(section));

function updateActiveLink() {
  const scrollPosition = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);
window.addEventListener('hashchange', () => {
  setTimeout(updateActiveLink, 100);
});

// =======================
// 7. Admin Access (8 clicks)
// =======================
let clickCount = 0;
let lastClickTime = 0;

logoImg.addEventListener('click', () => {
  const now = Date.now();
  if (now - lastClickTime < 2000) {
    clickCount++;
  } else {
    clickCount = 1;
  }
  lastClickTime = now;

  if (clickCount >= 8) {
    openPasswordModal();
    clickCount = 0;
  }
});

// Avatar Click on Mobile (8 clicks)
const heroAvatar = document.querySelector('.hero-avatar');
let mobileClickCount = 0;
let lastMobileClickTime = 0;

if (heroAvatar) {
  heroAvatar.addEventListener('click', () => {
    if (window.innerWidth > 768) return;
    const now = Date.now();
    if (now - lastMobileClickTime < 2000) {
      mobileClickCount++;
    } else {
      mobileClickCount = 1;
    }
    lastMobileClickTime = now;

    if (mobileClickCount >= 8) {
      openPasswordModal();
      mobileClickCount = 0;
      showToast('Admin access triggered via avatar!');
    }
  });
}

function openPasswordModal() {
  passwordModal.classList.add('show');
  passwordModal.hidden = false;
  adminPassword.value = '';
  passwordError.style.display = 'none';
}

function closePasswordModal() {
  passwordModal.classList.remove('show');
  setTimeout(() => {
    passwordModal.hidden = true;
  }, 300);
}

function checkPassword() {
  const pass = adminPassword.value;
  // سيتم التحقق من خلال السيرفر
  fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: pass, data: {} })
  })
  .then(response => {
    if (response.status === 403) {
      passwordError.textContent = translations[currentLang]['Incorrect Password'];
      passwordError.style.display = 'block';
    } else {
      closePasswordModal();
      toggleAdminPanel();
      renderDeleteLists();
      showToast('Admin panel unlocked!');
    }
  })
  .catch(err => {
    console.error('Login error:', err);
    passwordError.textContent = 'Server error. Try again.';
    passwordError.style.display = 'block';
  });
}

function toggleAdminPanel() {
  adminPanel.style.display = adminPanel.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!passwordModal.hidden) closePasswordModal();
    if (adminPanel.style.display === 'block') toggleAdminPanel();
    if (editModeOverlay.style.display !== 'none') exitEditMode();
  }
});

// =======================
// 8. Admin Controls
// =======================
function closeAllForms() {
  [formAddProject, formAddSkill, formAddTool, deleteSections].forEach(f => f.style.display = 'none');
}

function openAddProject() { closeAllForms(); formAddProject.style.display = 'block'; }
function openAddSkill() { closeAllForms(); formAddSkill.style.display = 'block'; }
function openAddTool() { closeAllForms(); formAddTool.style.display = 'block'; }
function openDeleteProject() { closeAllForms(); deleteSections.style.display = 'block'; }
function openDeleteSkill() { closeAllForms(); deleteSections.style.display = 'block'; }
function openDeleteTool() { closeAllForms(); deleteSections.style.display = 'block'; }

function changeLogo() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file, (url) => {
        logoImg.src = url;
        data.meta.logo_url = url;
        updateData();
        showToast('Logo changed successfully!');
      });
    }
  };
  input.click();
}

function changeAboutText() {
  const newText = prompt('Enter new About Me text (Part 1):', aboutText.textContent);
  if (newText && newText.trim()) {
    data.meta.about[currentLang].part1 = newText;
    updateData();
    showToast('About text updated successfully!');
  }
}

// =======================
// 9. Live Edit Mode
// =======================
function enterEditMode() {
  editModeOverlay.style.display = 'block';
  siteFrame.src = './';
}

function exitEditMode() {
  editModeOverlay.style.display = 'none';
}

// =======================
// 10. File Upload Display
// =======================
[projectImageInput, projectVideoInput].forEach(input => {
  input.addEventListener('change', function() {
    const filenameSpan = this === projectImageInput ? imageFilename : videoFilename;
    const placeholder = this === projectImageInput ? 'Upload Image' : 'Upload Video (optional)';
    filenameSpan.textContent = this.files.length ? this.files[0].name : translations[currentLang][placeholder];
  });
});

// =======================
// 11. Data Management (API)
// =======================
function fetchData() {
  fetch('/api/data')
    .then(res => res.json())
    .then(apiData => {
      data = apiData;
      logoUrl = data.meta.logo_url;
      logoImg.src = logoUrl;
      setLanguage(currentLang || 'en');
      typeRole();
      document.querySelector('body').classList.add('loaded');
    })
    .catch(err => {
      console.error('Failed to load data:', err);
      showToast('Failed to load data. Using defaults.', 'error');
    });
}

function updateData() {
  const password = prompt('Enter admin password:');
  if (!password) return;

  fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, data })
  })
  .then(res => res.json())
  .then(result => {
    if (result.success) {
      showToast('Data updated successfully!');
      fetchData(); // Refresh data
    } else {
      showToast('Failed to update data.', 'error');
    }
  })
  .catch(err => {
    console.error('Update error:', err);
    showToast('Update failed.', 'error');
  });
}

// =======================
// 12. Render Functions
// =======================
function renderAll() {
  renderSkills();
  renderTools();
  renderProjects();
  renderServices();
}

function renderSkills() {
  skillsGrid.innerHTML = '';
  data.skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    const desc = currentLang === 'ar' ? skill.desc_ar : skill.desc_en;
    card.innerHTML = `
      <h3>${skill.short}</h3>
      <p>${desc}</p>
      <div class="tooltip">${currentLang === 'ar' ? `الكامل: ${skill.full}<br>الوصف: ${desc}` : `Full: ${skill.full}<br>Desc: ${desc}`}</div>
    `;
    skillsGrid.appendChild(card);
  });
}

function renderTools() {
  toolsGrid.innerHTML = '';
  data.tools.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'tool-card';
    const desc = currentLang === 'ar' ? tool.desc_ar : tool.desc_en;
    card.innerHTML = `
      <h3>${tool.short}</h3>
      <p>${desc}</p>
      <div class="tooltip">${currentLang === 'ar' ? `الكامل: ${tool.full}<br>الوصف: ${desc}` : `Full: ${tool.full}<br>Desc: ${desc}`}</div>
    `;
    toolsGrid.appendChild(card);
  });
}

function renderProjects() {
  projectsGrid.innerHTML = '';
  if (data.projects.length === 0) {
    projectsEmpty.style.display = 'block';
    return;
  }
  projectsEmpty.style.display = 'none';
  data.projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.name}" class="project-img">
      ${project.video ? `<video src="${project.video}" controls class="project-img"></video>` : ''}
      <div class="project-content">
        <h3>${project.name}</h3>
        <p>${project.desc}</p>
        <a href="${project.link}" class="btn" target="_blank">View Project</a>
      </div>
    `;
    projectsGrid.appendChild(card);
  });

  // Update Projects Title
  const projectsTitle = document.getElementById('projects-title');
  const projectCount = data.projects.length;
  projectsTitle.textContent = currentLang === 'ar'
    ? `أحدث ${projectCount} مشاريع`
    : `${projectCount} Latest Projects`;
}

function renderServices() {
  servicesGrid.innerHTML = '';
  data.services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'service-card';
    const descKey = service.desc;
    const desc = translations[currentLang][descKey];
    const name = translations[currentLang][service.name];
    card.innerHTML = `
      <h3>${name}</h3>
      <p>${desc}</p>
    `;
    servicesGrid.appendChild(card);
  });
}

// =======================
// 13. Delete Lists
// =======================
function renderDeleteLists() {
  renderDeleteList(deleteProjectList, data.projects, 'project');
  renderDeleteList(deleteSkillList, data.skills, 'skill');
  renderDeleteList(deleteToolList, data.tools, 'tool');
}

function renderDeleteList(container, items, type) {
  container.innerHTML = '';
  if (items.length === 0) {
    const p = document.createElement('p');
    p.textContent = translations[currentLang][`No ${type}s to delete`];
    container.appendChild(p);
    return;
  }
  items.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'delete-item';
    div.innerHTML = `<span>${item.short || item.name}</span><button onclick="confirmAndDelete('${type}', ${i})">🗑️</button>`;
    container.appendChild(div);
  });
}

function confirmAndDelete(type, index) {
  if (confirm(translations[currentLang]['Confirm Delete'])) {
    const password = prompt(translations[currentLang]['Enter Password']);
    if (!password) return;

    fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
    .then(res => {
      if (res.status === 403) {
        showToast(translations[currentLang]['Incorrect Password'], 'error');
      } else {
        if (type === 'project') data.projects.splice(index, 1);
        else if (type === 'skill') data.skills.splice(index, 1);
        else if (type === 'tool') data.tools.splice(index, 1);
        updateData();
      }
    })
    .catch(err => {
      console.error('Delete error:', err);
      showToast('Delete failed.', 'error');
    });
  }
}

// =======================
// 14. Contact Form
// =======================
sendEmailBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const originalText = sendEmailBtn.innerHTML;

  if (!name || !email || !message) {
    showToast(translations[currentLang]['Error'], 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showToast(translations[currentLang]['Error Invalid Email'], 'error');
    return;
  }

  sendEmailBtn.disabled = true;
  sendEmailBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>${translations[currentLang]['Sending...']}</span>`;

  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('_subject', `رسالة جديدة من ${name}`);

    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showToast(translations[currentLang]['Success Email'], 'success');
      contactForm.reset();
    } else {
      throw new Error('فشل الإرسال');
    }
  } catch (err) {
    console.error('Formspree Error:', err);
    showToast(translations[currentLang]['Error Network'], 'error');
  } finally {
    sendEmailBtn.disabled = false;
    sendEmailBtn.innerHTML = originalText;
    const finalSpan = sendEmailBtn.querySelector('span');
    if (finalSpan) finalSpan.textContent = translations[currentLang]['Send via Email'];
  }
});

sendWhatsAppBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  if (!name || !message) {
    showToast(translations[currentLang]['Error'], 'error');
    return;
  }
  let whatsappMessage = `Hello Amer Abdo,\nMy name is ${name}:\nEmail: ${email}\nMessage: ${message}\nSent from your portfolio website.`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/201032637977?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
});

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// =======================
// 15. Admin Forms
// =======================
formProject.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('input-project-name').value;
  const link = document.getElementById('input-project-link').value;
  const imageFile = projectImageInput.files[0];
  const videoFile = projectVideoInput.files[0];
  const desc = document.getElementById('input-project-desc').value;

  uploadFile(imageFile, (imageUrl) => {
    let videoUrl = '';
    if (videoFile) {
      uploadFile(videoFile, (url) => {
        videoUrl = url;
        finishProjectSubmit(name, link, imageUrl, videoUrl, desc);
      });
    } else {
      finishProjectSubmit(name, link, imageUrl, '', desc);
    }
  });
});

function finishProjectSubmit(name, link, image, video, desc) {
  data.projects.unshift({ name, link, image, video, desc });
  updateData();
  formProject.reset();
  imageFilename.textContent = translations[currentLang]['Upload Image'];
  videoFilename.textContent = translations[currentLang]['Upload Video (optional)'];
  showToast('Project added successfully!');
}

formSkill.addEventListener('submit', (e) => {
  e.preventDefault();
  const short = document.getElementById('input-skill-short').value;
  const full = document.getElementById('input-skill-full').value;
  const descEn = document.getElementById('input-skill-desc-en').value;
  const descAr = document.getElementById('input-skill-desc-ar').value;

  data.skills.push({ short, full, desc_en: descEn, desc_ar: descAr });
  updateData();
  formSkill.reset();
  showToast('Skill added successfully!');
});

formTool.addEventListener('submit', (e) => {
  e.preventDefault();
  const short = document.getElementById('input-tool-short').value;
  const full = document.getElementById('input-tool-full').value;
  const descEn = document.getElementById('input-tool-desc-en').value;
  const descAr = document.getElementById('input-tool-desc-ar').value;

  data.tools.push({ short, full, desc_en: descEn, desc_ar: descAr });
  updateData();
  formTool.reset();
  showToast('Tool added successfully!');
});

// =======================
// 16. File Upload to Server
// =======================
function uploadFile(file, callback) {
  if (!file) return;
  const formData = new FormData();
  formData.append('file', file);

  fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.url) callback(data.url);
  })
  .catch(err => {
    console.error('Upload error:', err);
    showToast('Upload failed.', 'error');
  });
}

// =======================
// 17. Toast & UI Feedback
// =======================
function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = 'toast';
  toast.classList.add(type, 'show');
  setTimeout(() => toast.classList.remove('show'), 5000);
}

// =======================
// 18. Services Section Logic
// =======================
orderServiceBtn.addEventListener('click', () => {
  document.querySelectorAll('.service-card').forEach(card => {
    card.classList.add('selectable');
    card.classList.remove('selected');
    card.onclick = () => {
      card.classList.toggle('selected');
    };
  });
  servicesActions.style.display = 'block';
  orderServiceBtn.style.display = 'none';
});

cancelSelection.addEventListener('click', () => {
  document.querySelectorAll('.service-card').forEach(card => {
    card.classList.remove('selectable', 'selected');
    card.onclick = null;
  });
  servicesActions.style.display = 'none';
  orderServiceBtn.style.display = 'inline-flex';
});

confirmOrder.addEventListener('click', () => {
  const selected = document.querySelectorAll('.service-card.selected');
  if (selected.length === 0) {
    showToast(translations[currentLang]['Please select at least one service'], 'error');
    return;
  }
  const serviceNames = Array.from(selected).map(card => {
    const h3 = card.querySelector('h3').textContent;
    return data.services.find(s => translations[currentLang][s.name] === h3);
  });
  let message = '';
  if (serviceNames.length === 1) {
    message = currentLang === 'ar' ? serviceNames[0].message : serviceNames[0].message_en;
  } else {
    const messages = serviceNames.map(s => currentLang === 'ar' ? s.message : s.message_en);
    message = messages.join('\n');
  }
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  messageInput.value = message;
  showToast('Service request ready! Please fill your name and email.', 'success');
  document.querySelectorAll('.service-card').forEach(card => {
    card.classList.remove('selectable', 'selected');
    card.onclick = null;
  });
  servicesActions.style.display = 'none';
  orderServiceBtn.style.display = 'inline-flex';
});

// =======================
// 19. Initialize
// =======================
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  yearSpan.textContent = new Date().getFullYear();
});

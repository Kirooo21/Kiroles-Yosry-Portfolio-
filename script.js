(function () {
  'use strict';

  var T = {
    en: {
      brandName: 'Kiroles Yosry',
      kicker: 'Portfolio · Egypt · Remote',
      heroLine1: 'Video editing that',
      heroLine2: 'actually tells a story.',
      lede: 'I edit and produce video — motion graphics, client reels, and social-ready cuts — in CapCut, built for fast turnaround without cutting corners.',
      ctaWork: 'See the work',
      ctaContact: 'Get in touch',
      workTitle: 'Selected work',
      skillsTitle: 'What I bring',
      skill1: 'Video editing', skill2: 'Motion graphics', skill3: 'CapCut',
      skill4: 'Social-format cuts', skill5: 'Fast turnaround', skill6: 'Attention to detail',
      skill7: 'Arabic & English', skill8: 'Remote-ready',
      contactTitle: "Let's work together",
      emailLabel: 'Email', phoneLabel: 'Phone', linkedinLabel: 'LinkedIn',
      copy: 'Copy', copied: 'Copied',
      footerNote: 'Kiroles Yosry — Video editing & motion graphics, based in Egypt, available remote.',
      watch: 'Watch'
    },
    ar: {
      brandName: 'كيرلس يسري',
      kicker: 'معرض الأعمال · مصر · عمل عن بُعد',
      heroLine1: 'مونتاج فيديو',
      heroLine2: 'يحكي القصة فعلاً.',
      lede: 'أقوم بمونتاج وإنتاج الفيديو — موشن جرافيك، فيديوهات للعملاء، ومقاطع جاهزة لمواقع التواصل — باستخدام كاب كت، مع تسليم سريع دون التنازل عن الجودة.',
      ctaWork: 'شاهد الأعمال',
      ctaContact: 'تواصل معي',
      workTitle: 'أعمال مختارة',
      skillsTitle: 'ما أقدمه',
      skill1: 'مونتاج الفيديو', skill2: 'موشن جرافيك', skill3: 'كاب كت',
      skill4: 'مقاطع لمنصات التواصل', skill5: 'تسليم سريع', skill6: 'دقة في التفاصيل',
      skill7: 'العربية والإنجليزية', skill8: 'جاهز للعمل عن بُعد',
      contactTitle: 'لنعمل معًا',
      emailLabel: 'البريد الإلكتروني', phoneLabel: 'الهاتف', linkedinLabel: 'لينكدإن',
      copy: 'نسخ', copied: 'تم النسخ',
      footerNote: 'كيرلس يسري — مونتاج فيديو وموشن جرافيك، مقيم في مصر، متاح للعمل عن بُعد.',
      watch: 'مشاهدة'
    }
  };

  var lang = 'en';
  try {
    var saved = localStorage.getItem('kiro-portfolio-lang');
    if (saved === 'ar' || saved === 'en') lang = saved;
  } catch (e) {}

  function applyLang() {
    var t = T[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-t]').forEach(function (el) {
      var key = el.getAttribute('data-t');
      if (t[key] != null) el.innerHTML = t[key];
    });
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    var countEl = document.querySelector('[data-t="workCount"]');
    if (countEl) {
      var n = (window.REELS || []).length;
      countEl.textContent = lang === 'ar'
        ? 'عدد الأعمال: ' + n
        : String(n).padStart(2, '0') + ' reel' + (n === 1 ? '' : 's');
    }
    renderGrid();
    document.querySelectorAll('.copy-btn').forEach(function (b) {
      b.textContent = t.copy;
    });
  }

  document.querySelectorAll('.lang-switch button').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      try { localStorage.setItem('kiro-portfolio-lang', lang); } catch (e) {}
      applyLang();
    });
  });

  /* ---------- reel grid ---------- */
  var grid = document.getElementById('reelGrid');
  var playSvg = '<svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';

  function renderGrid() {
    if (!grid) return;
    grid.innerHTML = '';
    var reels = window.REELS || [];
    reels.forEach(function (r, i) {
      var title = lang === 'ar' ? (r.titleAr || r.titleEn) : (r.titleEn || r.titleAr);
      var card = document.createElement('div');
      card.className = 'reel';
      card.style.setProperty('--i', i);
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', (T[lang].watch) + ': ' + title);
      card.innerHTML =
        '<img src="' + r.poster + '" alt="" loading="lazy">' +
        '<div class="reel-play"><span class="ring">' + playSvg + '</span></div>' +
        '<div class="reel-meta"><h3>' + title + '</h3></div>';
      card.addEventListener('click', function () { openLightbox(r, title); });
      card.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openLightbox(r, title); }
      });
      grid.appendChild(card);
    });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxVideo = document.getElementById('lightboxVideo');
  var lightboxTitle = document.getElementById('lightboxTitle');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(reel, title) {
    lightboxVideo.src = reel.src;
    if (reel.poster) lightboxVideo.poster = reel.poster;
    lightboxTitle.textContent = title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { lightboxVideo.play().catch(function () {}); }, 150);
    lightboxClose.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    lightboxVideo.load();
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (ev) { if (ev.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });
  lightboxVideo.addEventListener('contextmenu', function (ev) { ev.preventDefault(); });

  /* ---------- copy buttons ---------- */
  document.querySelectorAll('.copy-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var val = b.getAttribute('data-copy');
      var done = function () {
        var t = T[lang];
        b.textContent = t.copied;
        setTimeout(function () { b.textContent = t.copy; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(done, function () {});
      }
    });
  });

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    var targets = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- init ---------- */
  applyLang();
  initReveal();
})();

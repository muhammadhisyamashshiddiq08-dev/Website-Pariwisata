/* ============================================
   script.js – JavaScript Premium
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // KONFIGURASI - GANTI DENGAN NOMOR WA ANDA
  // ============================================
  const WA_NUMBER = '6288219687504';
  const WA_MESSAGE = 'Halo%20PesonaNusa%2C%20saya%20ingin%20memesan%20paket%20wisata';

  // ============================================
  // DATA DESTINASI UNTUK SEARCH
  // ============================================
  const destinasiData = [
    { title: 'Pantai Kuta', location: 'Bali', image: 'https://i.imgur.com/SxEG0dZ.jpeg' },
    { title: 'Raja Ampat', location: 'Papua', image: 'https://i.imgur.com/h1PAC7H.jpeg' },
    { title: 'Candi Borobudur', location: 'Jateng', image: 'https://i.imgur.com/AnIwfCG.jpeg' },
    { title: 'Labuan Bajo', location: 'NTT', image: 'https://i.imgur.com/3OfcWx9.jpeg' },
    { title: 'Pantai Pink', location: 'Lombok', image: 'https://i.imgur.com/C1Cakxu.jpeg' },
    { title: 'Gunung Bromo', location: 'Jatim', image: 'https://i.imgur.com/hqIFOX8.jpeg' },
    { title: 'Tana Toraja', location: 'Sulsel', image: 'https://i.imgur.com/IaPNlTm.jpeg' },
    { title: 'Kepulauan Wayag', location: 'Raja Ampat', image: 'https://i.imgur.com/RQmUB5N.jpeg' },
    { title: 'Pulau Komodo', location: 'NTT', image: 'https://i.imgur.com/zBtXJVP.jpeg' },
    { title: 'Nusa Penida', location: 'Bali', image: 'https://i.imgur.com/a3DhGTj.jpeg' },
    { title: 'Kota Lama Semarang', location: 'Jateng', image: 'https://i.imgur.com/s4XZWjW.jpeg' },
    { title: 'Pulau Sabang', location: 'Aceh', image: 'https://i.imgur.com/AMiQe3E.jpeg' }
  ];

  // ============================================
  // FUNGSI WHATSAPP - DIPERBAIKI
  // ============================================
  function getWhatsAppUrl(message) {
    return `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${message}`;
  }

  function updateWhatsAppLinks() {
    document.querySelectorAll('.wa-ticket').forEach(function(el) {
      const destinasi = el.getAttribute('data-destinasi');
      const message = `Halo%20PesonaNusa%2C%20saya%20ingin%20memesan%20tiket%20wisata%20ke%20${encodeURIComponent(destinasi)}`;
      el.href = getWhatsAppUrl(message);
      el.setAttribute('target', '_blank');
    });

    document.querySelectorAll('.wa-order').forEach(function(el) {
      const paket = el.getAttribute('data-paket');
      const message = `Halo%20PesonaNusa%2C%20saya%20ingin%20memesan%20paket%20${encodeURIComponent(paket)}`;
      el.href = getWhatsAppUrl(message);
      el.setAttribute('target', '_blank');
    });

    document.querySelectorAll('.wa-chat').forEach(function(el) {
      el.href = getWhatsAppUrl(WA_MESSAGE);
      el.setAttribute('target', '_blank');
    });
  }

  // ============================================
  // FORM KONTAK
  // ============================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nama = document.getElementById('namaLengkap').value.trim();
      const email = document.getElementById('email').value.trim();
      const pesan = document.getElementById('pesan').value.trim();

      if (!nama || !email || !pesan) {
        alert('Harap isi semua field!');
        return;
      }

      const message = `Halo%20PesonaNusa%2C%0A%0A*Nama*%3A%20${encodeURIComponent(nama)}%0A*Email*%3A%20${encodeURIComponent(email)}%0A*Pesan*%3A%0A${encodeURIComponent(pesan)}%0A%0ATerima%20kasih.`;
      const waUrl = getWhatsAppUrl(message);
      window.open(waUrl, '_blank');
      contactForm.reset();
    });
  }

  // ============================================
  // FORM SUBSCRIBE
  // ============================================
  const subscribeForm = document.getElementById('subscribeForm');
  const subscribeMessage = document.getElementById('subscribeMessage');

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('subscribeEmail').value.trim();

      if (!email) {
        showSubscribeMessage('Harap masukkan email Anda!', '#ff6b6b');
        return;
      }

      console.log('📧 Email subscribed:', email);
      showSubscribeMessage('✅ Berhasil subscribe! Cek email Anda untuk promo terbaru.', '#f9d77e');
      subscribeForm.reset();

      setTimeout(function() {
        subscribeMessage.style.display = 'none';
      }, 5000);
    });
  }

  function showSubscribeMessage(text, color) {
    subscribeMessage.textContent = text;
    subscribeMessage.style.color = color;
    subscribeMessage.style.display = 'block';
  }

  // ============================================
  // FITUR SEARCH
  // ============================================
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchResults = document.getElementById('searchResults');

  function performSearch(query) {
    query = query.trim().toLowerCase();
    
    if (query === '') {
      searchResults.classList.remove('active');
      return;
    }

    const results = destinasiData.filter(function(item) {
      return item.title.toLowerCase().includes(query) || 
             item.location.toLowerCase().includes(query);
    });

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-result-empty">
          <i class="bi bi-search"></i>
          Tidak ada destinasi yang ditemukan untuk "<strong>${query}</strong>"
        </div>
      `;
    } else {
      let html = '';
      results.forEach(function(item) {
        html += `
          <div class="search-result-item" data-destinasi="${item.title}">
            <img src="${item.image}" alt="${item.title}" />
            <div class="result-info">
              <div class="result-title">${item.title}</div>
              <div class="result-sub"><i class="bi bi-geo-alt-fill me-1"></i>${item.location}</div>
            </div>
          </div>
        `;
      });
      searchResults.innerHTML = html;

      searchResults.querySelectorAll('.search-result-item').forEach(function(el) {
        el.addEventListener('click', function() {
          const title = this.getAttribute('data-destinasi');
          scrollToDestinasi(title);
          searchResults.classList.remove('active');
          searchInput.value = '';
        });
      });
    }

    searchResults.classList.add('active');
  }

  function scrollToDestinasi(title) {
    const cards = document.querySelectorAll('.card-destinasi');
    let found = false;
    
    cards.forEach(function(card) {
      const cardTitle = card.querySelector('.card-title')?.textContent || '';
      if (cardTitle === title) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = card.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        card.style.transition = 'box-shadow 0.3s, transform 0.3s';
        card.style.boxShadow = '0 0 0 4px #f9d77e, 0 20px 60px rgba(0,0,0,0.15)';
        card.style.transform = 'scale(1.02)';
        setTimeout(function() {
          card.style.boxShadow = '';
          card.style.transform = '';
        }, 2000);
        found = true;
      }
    });

    if (!found) {
      const destinasiSection = document.getElementById('destinasi');
      if (destinasiSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = destinasiSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }
  }

  searchInput.addEventListener('input', function(e) {
    performSearch(this.value);
  });

  if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      performSearch(searchInput.value);
    });
  }

  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch(this.value);
    }
  });

  document.addEventListener('click', function(e) {
    const wrapper = document.querySelector('.search-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });

  // ============================================
  // INIT - AOS
  // ============================================
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
  });

  // ============================================
  // INIT - NAVBAR SCROLL
  // ============================================
  const navbar = document.getElementById('mainNav');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ============================================
  // INIT - COUNTER ANIMATION
  // ============================================
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    let isCounted = false;
    function startCounter() {
      statNumbers.forEach(function(stat) {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = Math.ceil(target / 50);
        const timer = setInterval(function() {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = current + '+';
        }, 30);
      });
      isCounted = true;
    }
    window.addEventListener('scroll', function() {
      if (!isCounted) {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
          const rect = heroStats.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            startCounter();
          }
        }
      }
    });
  }

  // ============================================
  // INIT - UPDATE WHATSAPP LINKS
  // ============================================
  setTimeout(function() {
    updateWhatsAppLinks();
  }, 200);

  // ============================================
  // INIT - SMOOTH SCROLL
  // ============================================
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
        const navbarToggler = document.querySelector('.navbar-toggler');
        const collapseNav = document.getElementById('navbarNav');
        if (window.innerWidth < 992 && collapseNav.classList.contains('show')) {
          navbarToggler.click();
        }
      }
    });
  });

  // ============================================
  // INIT - VIDEO HERO
  // ============================================
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.addEventListener('loadedmetadata', function() {
      this.play().catch(function(e) {
        console.log('Video autoplay prevented:', e);
      });
    });
  }

  // ============================================
  // INIT - 3D CARD EFFECT
  // ============================================
  const cards = document.querySelectorAll('.card-destinasi, .card-paket, .card-testi, .event-card');
  cards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ============================================
  // SCROLLSPY - NAVBAR AKTIF (TAMBAHAN BARU)
  // ============================================
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;

    // Buat observer untuk setiap section
    const sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          
          // Update class active pada nav link
          navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href === '#' + currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -80px 0px'
    });

    // Observasi setiap section
    sections.forEach(function(section) {
      sectionObserver.observe(section);
    });
  }

  // ============================================
  // SCROLL PROGRESS BAR (TAMBAHAN BARU)
  // ============================================
  function createProgressBar() {
    // Cek apakah progress bar sudah ada
    if (document.querySelector('.scroll-progress-bar')) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.innerHTML = '<div class="scroll-progress-fill"></div>';
    document.body.appendChild(progressBar);

    const fill = progressBar.querySelector('.scroll-progress-fill');

    window.addEventListener('scroll', function() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      fill.style.width = progress + '%';
    });
  }

  // ============================================
  // SCROLL ANIMATION - FADE IN ON SCROLL (TAMBAHAN BARU)
  // ============================================
  function initScrollAnimation() {
    const elements = document.querySelectorAll('.card-destinasi, .card-paket, .event-card, .galeri-img, .card-testi, .contact-item, .feature-item, .accordion-item');
    
    if (elements.length === 0) return;

    const elementObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          // Hentikan observasi setelah elemen terlihat
          elementObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function(el) {
      // Tambahkan class awal untuk efek fade
      el.classList.add('scroll-hidden');
      elementObserver.observe(el);
    });
  }

  // ============================================
  // JALANKAN SCROLLSPY & ANIMATIONS (TAMBAHAN BARU)
  // ============================================
  // Jalankan semua fitur setelah DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initScrollSpy();
      createProgressBar();
      initScrollAnimation();
    });
  } else {
    initScrollSpy();
    createProgressBar();
    initScrollAnimation();
  }

  console.log('✨ PesonaNusa Premium - Carousel & Modal loaded successfully!');
  console.log('📱 WhatsApp Number:', WA_NUMBER);
  console.log('🔍 Search feature enabled with ' + destinasiData.length + ' destinations!');
  console.log('🔄 ScrollSpy & Animations enabled!');
})();
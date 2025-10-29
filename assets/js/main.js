const siteState = {
  news: [
    {
      title: 'Europos čempionatas 2024',
      date: '2024-03-18',
      link: '#renginiai'
    },
    {
      title: 'Naujų narių priėmimas pavasario sezonui',
      date: '2024-02-01',
      link: '#nariai'
    },
    {
      title: 'Trenerių sertifikavimo seminaras Kaune',
      date: '2024-04-05',
      link: '#renginiai'
    }
  ],
  sliderImages: [
    {
      src: 'assets/img/hero-team.svg',
      alt: 'Kyokushin karatė sportininkai turnyre',
      caption: 'Vieninga komanda kovojanti dėl pergalės'
    },
    {
      src: 'assets/img/training.svg',
      alt: 'Treniruotė salėje',
      caption: 'Intensyvi treniruotė federacijos nariams'
    },
    {
      src: 'assets/img/camp.svg',
      alt: 'Stovykla prie jūros',
      caption: 'Vasaros stovykla stiprinanti ryšius ir meistriškumą'
    }
  ],
  events: [
    {
      id: 1,
      title: 'Lietuvos čempionatas 2024',
      start: '2024-05-12',
      end: '2024-05-13',
      city: 'Vilnius',
      category: 'varzybos',
      registrationOpen: true
    },
    {
      id: 2,
      title: 'Tarptautinis trenerių seminaras',
      start: '2024-06-02',
      end: '2024-06-03',
      city: 'Kaunas',
      category: 'seminaras',
      registrationOpen: true
    },
    {
      id: 3,
      title: 'Jaunimo stovykla',
      start: '2023-08-15',
      end: '2023-08-20',
      city: 'Šventoji',
      category: 'stovykla',
      registrationOpen: false
    }
  ],
  clubs: [
    {
      name: 'Vilniaus Kyokushin centras',
      city: 'Vilnius',
      coordinates: [54.6872, 25.2797],
      phone: '+370 600 00001',
      email: 'vilnius@kyokushin.lt'
    },
    {
      name: 'Kauno „Osu“ klubas',
      city: 'Kaunas',
      coordinates: [54.8985, 23.9036],
      phone: '+370 600 00002',
      email: 'kaunas@kyokushin.lt'
    },
    {
      name: 'Klaipėdos kovos menų akademija',
      city: 'Klaipėda',
      coordinates: [55.7033, 21.1443],
      phone: '+370 600 00003',
      email: 'klaipeda@kyokushin.lt'
    }
  ]
};

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function initNavigation() {
  const toggle = qs('[data-nav-toggle]');
  const nav = qs('[data-nav]');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function generateNewsTicker() {
  const newsTicker = qs('[data-news-ticker]');
  if (!newsTicker) return;

  newsTicker.innerHTML = '';
  siteState.news.forEach((item) => {
    const span = document.createElement('span');
    const date = new Date(item.date);
    span.textContent = `${date.toLocaleDateString('lt-LT', {
      month: 'short',
      day: '2-digit'
    })} — ${item.title}`;
    span.setAttribute('role', 'listitem');
    span.addEventListener('click', () => {
      window.location.href = item.link;
    });
    newsTicker.appendChild(span);
  });
}

function initGallerySlider() {
  const slider = qs('[data-slider]');
  if (!slider) return;

  const image = qs('[data-slider-image]');
  const caption = qs('[data-slider-caption]');
  const prevBtn = qs('[data-slider-prev]');
  const nextBtn = qs('[data-slider-next]');
  let currentIndex = 0;

  function renderSlide(index) {
    const slide = siteState.sliderImages[index];
    image.src = slide.src;
    image.alt = slide.alt;
    caption.textContent = slide.caption;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + siteState.sliderImages.length) % siteState.sliderImages.length;
    renderSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % siteState.sliderImages.length;
    renderSlide(currentIndex);
  });

  renderSlide(currentIndex);
}

function initEventsPage() {
  const eventGrid = qs('[data-events-grid]');
  if (!eventGrid) return;

  const filterForm = qs('[data-events-filter]');
  const registrationForm = qs('[data-registration-form]');
  const registrationAlert = qs('[data-registration-alert]');

  function renderEvents(filter = {}) {
    eventGrid.innerHTML = '';
    const filtered = siteState.events.filter((event) => {
      const isUpcomingOnly = filter.when === 'upcoming';
      const isPastOnly = filter.when === 'past';
      const eventDate = new Date(event.end);
      const today = new Date();

      if (filter.search && !event.title.toLowerCase().includes(filter.search.toLowerCase())) {
        return false;
      }

      if (filter.category && filter.category !== 'all' && event.category !== filter.category) {
        return false;
      }

      if (isUpcomingOnly && eventDate < today) {
        return false;
      }

      if (isPastOnly && eventDate >= today) {
        return false;
      }

      return true;
    });

    filtered.forEach((event) => {
      const article = document.createElement('article');
      article.className = 'event-card';
      article.innerHTML = `
        <div class="badge">${event.category}</div>
        <h3>${event.title}</h3>
        <time datetime="${event.start}">Pradžia: ${new Date(event.start).toLocaleDateString('lt-LT')}</time>
        <time datetime="${event.end}">Pabaiga: ${new Date(event.end).toLocaleDateString('lt-LT')}</time>
        <p>Vieta: ${event.city}</p>
        <div class="event-actions">
          <button class="btn" data-register="${event.id}" ${event.registrationOpen ? '' : 'disabled'}>
            ${event.registrationOpen ? 'Registruotis' : 'Registracija baigta'}
          </button>
          <a class="btn btn-secondary" href="#galerija" aria-label="Peržiūrėti renginio galeriją">
            Galerija
          </a>
        </div>
      `;
      eventGrid.appendChild(article);
    });
  }

  filterForm?.addEventListener('input', () => {
    const formData = new FormData(filterForm);
    renderEvents({
      search: formData.get('search')?.toString() ?? '',
      category: formData.get('category')?.toString() ?? 'all',
      when: formData.get('when')?.toString() ?? 'all'
    });
  });

  eventGrid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-register]');
    if (!button) return;
    const eventId = Number(button.dataset.register);
    registrationForm.querySelector('[name="eventId"]').value = eventId;
    registrationForm.scrollIntoView({ behavior: 'smooth' });
  });

  registrationForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    registrationAlert.textContent = '';
    registrationAlert.className = '';

    const formData = new FormData(registrationForm);
    const payload = Object.fromEntries(formData.entries());

    if (!payload.participant || !payload.email) {
      registrationAlert.textContent = 'Užpildykite visus privalomus laukus.';
      registrationAlert.className = 'alert alert-error';
      return;
    }

    registrationForm.querySelector('button[type="submit"]').disabled = true;

    fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registracijos nepavyko.');
        }
        registrationAlert.textContent = 'Registracija sėkminga! Patvirtinimas išsiųstas el. paštu.';
        registrationAlert.className = 'alert alert-success';
        registrationForm.reset();
      })
      .catch(() => {
        registrationAlert.textContent = 'Įvyko klaida. Bandykite dar kartą.';
        registrationAlert.className = 'alert alert-error';
      })
      .finally(() => {
        registrationForm.querySelector('button[type="submit"]').disabled = false;
      });
  });

  renderEvents();
}

function initMembersPage() {
  const mapContainer = qs('[data-club-map]');
  if (!mapContainer || typeof L === 'undefined') return;

  const searchInput = qs('[data-club-search]');
  const listContainer = qs('[data-club-list]');

  const map = L.map(mapContainer).setView([55.1694, 23.8813], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const markers = siteState.clubs.map((club) => {
    const marker = L.marker(club.coordinates).addTo(map);
    marker.bindPopup(`<strong>${club.name}</strong><br>${club.city}<br><a href="tel:${club.phone}">${club.phone}</a>`);
    marker.club = club;
    return marker;
  });

  function renderClubs(filter = '') {
    listContainer.innerHTML = '';
    const filtered = siteState.clubs.filter((club) =>
      club.name.toLowerCase().includes(filter.toLowerCase()) ||
      club.city.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach((club) => {
      const item = document.createElement('article');
      item.className = 'card';
      item.tabIndex = 0;
      item.innerHTML = `
        <h3>${club.name}</h3>
        <p><strong>Miestas:</strong> ${club.city}</p>
        <p><strong>Telefonas:</strong> <a href="tel:${club.phone}">${club.phone}</a></p>
        <p><strong>El. paštas:</strong> <a href="mailto:${club.email}">${club.email}</a></p>
      `;
      item.addEventListener('click', () => {
        map.setView(club.coordinates, 12);
      });
      listContainer.appendChild(item);
    });

    markers.forEach((marker) => {
      const visible = filtered.includes(marker.club);
      if (visible) {
        marker.addTo(map);
      } else {
        marker.remove();
      }
    });
  }

  searchInput.addEventListener('input', (event) => {
    renderClubs(event.target.value);
  });

  renderClubs();
}

function initDocumentsPage() {
  const documentsGrid = qs('[data-documents-grid]');
  if (!documentsGrid) return;

  const filterSelect = qs('[data-documents-filter]');

  const documents = [
    {
      title: 'Federacijos įstatai',
      type: 'statutas',
      updated: '2024-01-18',
      url: '#'
    },
    {
      title: 'Nario registracijos forma',
      type: 'forma',
      updated: '2023-12-02',
      url: '#'
    },
    {
      title: 'Trenerio sertifikatas',
      type: 'sertifikatas',
      updated: '2023-09-22',
      url: '#'
    }
  ];

  function renderDocuments(filter = 'all') {
    documentsGrid.innerHTML = '';
    documents
      .filter((doc) => filter === 'all' || doc.type === filter)
      .forEach((doc) => {
        const article = document.createElement('article');
        article.className = 'document-card';
        article.innerHTML = `
          <h3>${doc.title}</h3>
          <p class="document-meta">Atnaujinta: ${new Date(doc.updated).toLocaleDateString('lt-LT')}</p>
          <span class="badge">${doc.type}</span>
          <a class="btn" href="${doc.url}" download>Parsisiųsti</a>
        `;
        documentsGrid.appendChild(article);
      });
  }

  filterSelect.addEventListener('change', (event) => {
    renderDocuments(event.target.value);
  });

  renderDocuments();
}

function initContactForm() {
  const contactForm = qs('[data-contact-form]');
  if (!contactForm) return;

  const alertBox = qs('[data-contact-alert]');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alertBox.textContent = '';
    alertBox.className = '';

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    if (!payload.name || !payload.email || !payload.message) {
      alertBox.textContent = 'Visi privalomi laukai turi būti užpildyti.';
      alertBox.className = 'alert alert-error';
      return;
    }

    contactForm.querySelector('button[type="submit"]').disabled = true;

    fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Užklausos nepavyko išsiųsti');
        }
        alertBox.textContent = 'Dėkojame! Susisieksime artimiausiu metu.';
        alertBox.className = 'alert alert-success';
        contactForm.reset();
      })
      .catch(() => {
        alertBox.textContent = 'Įvyko klaida. Pabandykite dar kartą.';
        alertBox.className = 'alert alert-error';
      })
      .finally(() => {
        contactForm.querySelector('button[type="submit"]').disabled = false;
      });
  });
}

function initDocumentsLinks() {
  qsa('[data-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

function init() {
  initNavigation();
  generateNewsTicker();
  initGallerySlider();
  initEventsPage();
  initMembersPage();
  initDocumentsPage();
  initContactForm();
  initDocumentsLinks();
}

document.addEventListener('DOMContentLoaded', init);

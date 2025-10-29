const App = (() => {
  const selectors = {
    menu: '.navbar__menu',
    toggle: '.navbar__toggle',
    newsTicker: '#newsTicker',
    galleryTrack: '.gallery__track',
    gallerySlides: '.gallery__slide',
    galleryPrev: '#galleryPrev',
    galleryNext: '#galleryNext',
    registrationForms: '.js-registration-form',
    contactForm: '#contactForm',
    eventsFilters: '#eventsFilters',
    eventsList: '#eventsList',
    documentsFilters: '#documentsFilters',
    documentsList: '#documentsList',
    mapContainer: '#clubsMap',
    searchInput: '#clubSearch',
    filterSelect: '#clubRegion'
  };

  const state = {
    currentSlide: 0,
    slideInterval: null,
    news: [
      {
        title: 'Lietuvos rinktinė ruošiasi Europos čempionatui',
        date: '2024-03-12',
        link: '#'
      },
      {
        title: 'Trenerių seminaras Kaune – registracija atidaryta',
        date: '2024-03-05',
        link: '#'
      },
      {
        title: 'Jaunimo taurės varžybų rezultatai',
        date: '2024-02-26',
        link: '#'
      },
      {
        title: 'Sveikatos ministerijos gairės dėl anti-dopingo',
        date: '2024-02-18',
        link: '#anti-doping'
      }
    ],
    events: [
      {
        id: 'evt1',
        title: 'Lietuvos Kyokushin karatė čempionatas',
        date: '2024-04-20',
        city: 'Vilnius',
        type: 'varžybos',
        status: 'registracija',
        description: 'Atviri nacionaliniai čempionato kovos visoms amžiaus grupėms.'
      },
      {
        id: 'evt2',
        title: 'Trenerių kvalifikacijos kėlimo seminaras',
        date: '2024-05-04',
        city: 'Kaunas',
        type: 'seminaras',
        status: 'registracija',
        description: 'Dviejų dienų seminaras treneriams ir teisėjams.'
      },
      {
        id: 'evt3',
        title: 'Jaunimo stovykla prie jūros',
        date: '2024-06-15',
        city: 'Palanga',
        type: 'stovykla',
        status: 'užpildyta',
        description: 'Intensyvi vasaros stovykla jaunimui su meistrais iš Japonijos.'
      },
      {
        id: 'evt4',
        title: 'Tarptautinis draugiškas turnyras',
        date: '2024-07-10',
        city: 'Klaipėda',
        type: 'varžybos',
        status: 'netrukus',
        description: 'Turnyras su svečiais iš Latvijos, Estijos ir Lenkijos.'
      }
    ],
    documents: [
      {
        title: 'LKKF statutas',
        type: 'statutai',
        size: '1.2 MB',
        url: '#'
      },
      {
        title: 'Nario registracijos forma',
        type: 'formos',
        size: '320 KB',
        url: '#'
      },
      {
        title: 'Instruktoriaus sertifikavimo nuostatai',
        type: 'sertifikatai',
        size: '860 KB',
        url: '#'
      },
      {
        title: 'Anti-dopingo taisyklės',
        type: 'statutai',
        size: '540 KB',
        url: '#anti-doping'
      }
    ],
    clubs: [
      {
        name: 'Vilniaus Kyokushin karatė centras',
        region: 'Vilnius',
        coords: [54.6872, 25.2797],
        contact: 'info@vilniuskyokushin.lt'
      },
      {
        name: 'Kauno Bushido klubas',
        region: 'Kaunas',
        coords: [54.8985, 23.9036],
        contact: 'kaunas@kyokushin.lt'
      },
      {
        name: 'Klaipėdos Dojo',
        region: 'Klaipėda',
        coords: [55.7033, 21.1443],
        contact: 'klaipeda@kyokushin.lt'
      },
      {
        name: 'Šiaulių Kovos menų akademija',
        region: 'Šiauliai',
        coords: [55.9333, 23.3167],
        contact: 'siauliai@kyokushin.lt'
      }
    ],
    map: null,
    markers: []
  };

  const initNavigation = () => {
    const menu = document.querySelector(selectors.menu);
    const toggle = document.querySelector(selectors.toggle);

    if (!menu || !toggle) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.setAttribute('aria-expanded', String(!expanded));
    });

    menu.addEventListener('click', (event) => {
      if (event.target.matches('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-expanded', 'false');
      }
    });
  };

  const populateNews = () => {
    const ticker = document.querySelector(selectors.newsTicker);
    if (!ticker) return;

    const fragment = document.createDocumentFragment();

    state.news.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'news-item';
      article.innerHTML = `
        <time datetime="${item.date}">${new Date(item.date).toLocaleDateString('lt-LT')}</time>
        <h4>${item.title}</h4>
        <a href="${item.link}" class="btn btn--primary" aria-label="Skaityti naujieną: ${item.title}">Plačiau</a>
      `;
      fragment.appendChild(article);
    });

    ticker.appendChild(fragment);
  };

  const initGallery = () => {
    const track = document.querySelector(selectors.galleryTrack);
    const slides = document.querySelectorAll(selectors.gallerySlides);
    const prev = document.querySelector(selectors.galleryPrev);
    const next = document.querySelector(selectors.galleryNext);

    if (!track || slides.length === 0) return;

    const goToSlide = (index) => {
      state.currentSlide = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${state.currentSlide * 100}%)`;
    };

    const nextSlide = () => goToSlide(state.currentSlide + 1);
    const prevSlide = () => goToSlide(state.currentSlide - 1);

    next?.addEventListener('click', nextSlide);
    prev?.addEventListener('click', prevSlide);

    state.slideInterval = window.setInterval(nextSlide, 6000);

    track.addEventListener('mouseenter', () => window.clearInterval(state.slideInterval));
    track.addEventListener('mouseleave', () => {
      state.slideInterval = window.setInterval(nextSlide, 6000);
    });
  };

  const initEventsPage = () => {
    const filters = document.querySelector(selectors.eventsFilters);
    const list = document.querySelector(selectors.eventsList);
    if (!filters || !list) return;

    const render = (items) => {
      list.innerHTML = '';
      if (!items.length) {
        const empty = document.createElement('p');
        empty.textContent = 'Renginiai pagal pasirinktus kriterijus nerasti.';
        list.appendChild(empty);
        return;
      }

      const fragment = document.createDocumentFragment();
      items.forEach((event) => {
        const article = document.createElement('article');
        article.className = 'event-card';
        article.innerHTML = `
          <h3>${event.title}</h3>
          <div class="event-card__meta">
            <span><strong>${new Date(event.date).toLocaleDateString('lt-LT')}</strong></span>
            <span>${event.city}</span>
            <span class="badge">${event.type}</span>
          </div>
          <p>${event.description}</p>
          <div class="event-card__actions">
            <button class="btn btn--primary" type="button" data-event="${event.id}">Registruotis</button>
          </div>
        `;
        fragment.appendChild(article);
      });
      list.appendChild(fragment);
    };

    const applyFilters = () => {
      const formData = new FormData(filters);
      const type = formData.get('type');
      const status = formData.get('status');
      const query = formData.get('query')?.toLowerCase() ?? '';

      const filtered = state.events.filter((event) => {
        const matchesType = !type || event.type === type;
        const matchesStatus = !status || event.status === status;
        const matchesQuery = event.title.toLowerCase().includes(query) || event.city.toLowerCase().includes(query);
        return matchesType && matchesStatus && matchesQuery;
      });

      render(filtered);
    };

    filters.addEventListener('input', applyFilters);
    filters.addEventListener('submit', (event) => {
      event.preventDefault();
      applyFilters();
    });

    list.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLButtonElement && target.dataset.event) {
        const selected = state.events.find((evt) => evt.id === target.dataset.event);
        if (selected) {
          window.alert(`Registracija į renginį: ${selected.title}. Užpildykite formą.`);
        }
      }
    });

    render(state.events);
  };

  const initDocumentsPage = () => {
    const filters = document.querySelector(selectors.documentsFilters);
    const list = document.querySelector(selectors.documentsList);
    if (!filters || !list) return;

    const render = (items) => {
      list.innerHTML = '';
      const fragment = document.createDocumentFragment();
      items.forEach((doc) => {
        const article = document.createElement('article');
        article.className = 'document-card';
        article.innerHTML = `
          <span class="document-card__type">${doc.type}</span>
          <h3>${doc.title}</h3>
          <p>Dydis: ${doc.size}</p>
          <a class="btn btn--primary" href="${doc.url}" download>Parsisiųsti</a>
        `;
        fragment.appendChild(article);
      });
      list.appendChild(fragment);
    };

    const applyFilters = () => {
      const formData = new FormData(filters);
      const type = formData.get('type');
      const query = formData.get('query')?.toLowerCase() ?? '';

      const filtered = state.documents.filter((doc) => {
        const matchesType = !type || doc.type === type;
        const matchesQuery = doc.title.toLowerCase().includes(query);
        return matchesType && matchesQuery;
      });

      render(filtered);
    };

    filters.addEventListener('input', applyFilters);
    filters.addEventListener('submit', (event) => {
      event.preventDefault();
      applyFilters();
    });

    render(state.documents);
  };

  const initRegistrationForms = () => {
    document.querySelectorAll(selectors.registrationForms).forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!(event.currentTarget instanceof HTMLFormElement)) return;
        const formData = new FormData(event.currentTarget);
        const required = ['name', 'email'];
        const missing = required.filter((field) => !(formData.get(field) ?? '').toString().trim());

        if (missing.length) {
          window.alert('Prašome užpildyti visus privalomus laukus.');
          return;
        }

        fetch(event.currentTarget.action || '#', {
          method: 'POST',
          body: formData
        })
          .then(() => {
            window.alert('Registracija sėkminga!');
            event.currentTarget.reset();
          })
          .catch(() => {
            window.alert('Įvyko klaida. Bandykite dar kartą.');
          });
      });
    });
  };

  const initContactForm = () => {
    const form = document.querySelector(selectors.contactForm);
    if (!form) return;

    const alertBox = form.querySelector('[data-alert]');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const requiredFields = ['name', 'email', 'message'];
      const missing = requiredFields.filter((field) => !(formData.get(field) ?? '').toString().trim());

      if (missing.length) {
        alertBox.textContent = 'Prašome užpildyti visus privalomus laukus.';
        alertBox.hidden = false;
        return;
      }

      fetch(form.action || '#', {
        method: 'POST',
        body: formData
      })
        .then(() => {
          alertBox.textContent = 'Žinutė išsiųsta! Susisieksime artimiausiu metu.';
          alertBox.hidden = false;
          form.reset();
        })
        .catch(() => {
          alertBox.textContent = 'Įvyko klaida siunčiant žinutę. Bandykite dar kartą.';
          alertBox.hidden = false;
        });
    });
  };

  const initMap = () => {
    const mapElement = document.querySelector(selectors.mapContainer);
    if (!mapElement || typeof L === 'undefined') return;

    state.map = L.map(mapElement).setView([55.1694, 23.8813], 6.5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(state.map);

    const renderMarkers = (clubs) => {
      state.markers.forEach((marker) => marker.remove());
      state.markers = clubs.map((club) =>
        L.marker(club.coords)
          .addTo(state.map)
          .bindPopup(`<strong>${club.name}</strong><br>${club.contact}`)
      );
    };

    const searchInput = document.querySelector(selectors.searchInput);
    const filterSelect = document.querySelector(selectors.filterSelect);

    const applyFilters = () => {
      const query = searchInput?.value.toLowerCase() ?? '';
      const region = filterSelect?.value ?? '';

      const filtered = state.clubs.filter((club) => {
        const matchesQuery = club.name.toLowerCase().includes(query);
        const matchesRegion = !region || club.region === region;
        return matchesQuery && matchesRegion;
      });

      renderMarkers(filtered);
    };

    searchInput?.addEventListener('input', applyFilters);
    filterSelect?.addEventListener('change', applyFilters);

    renderMarkers(state.clubs);
  };

  const initLazyLoading = () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (!('IntersectionObserver' in window) || lazyImages.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img instanceof HTMLImageElement) {
            img.src = img.dataset.src ?? '';
            img.removeAttribute('data-src');
            obs.unobserve(img);
          }
        }
      });
    }, { rootMargin: '100px' });

    lazyImages.forEach((img) => observer.observe(img));
  };

  const initNewsTicker = () => {
    const ticker = document.querySelector(selectors.newsTicker);
    if (!ticker) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    ticker.addEventListener('mousedown', (event) => {
      isDown = true;
      ticker.classList.add('is-dragging');
      startX = event.pageX - ticker.offsetLeft;
      scrollLeft = ticker.scrollLeft;
    });

    ticker.addEventListener('mouseleave', () => {
      isDown = false;
      ticker.classList.remove('is-dragging');
    });

    ticker.addEventListener('mouseup', () => {
      isDown = false;
      ticker.classList.remove('is-dragging');
    });

    ticker.addEventListener('mousemove', (event) => {
      if (!isDown) return;
      event.preventDefault();
      const x = event.pageX - ticker.offsetLeft;
      const walk = (x - startX) * 2;
      ticker.scrollLeft = scrollLeft - walk;
    });
  };

  const init = () => {
    document.documentElement.classList.remove('no-js');
    initNavigation();
    populateNews();
    initGallery();
    initEventsPage();
    initDocumentsPage();
    initRegistrationForms();
    initContactForm();
    initMap();
    initLazyLoading();
    initNewsTicker();
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);

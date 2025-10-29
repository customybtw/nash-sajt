(function () {
  const body = document.body;
  const nav = document.querySelector('.nav-links');
  const burger = document.querySelector('.burger');
  const currentYearSpans = document.querySelectorAll('#current-year');

  currentYearSpans.forEach((span) => {
    span.textContent = new Date().getFullYear();
  });

  if (burger && nav) {
    const toggleMenu = () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      body.classList.toggle('nav-open', !expanded);
    };

    burger.addEventListener('click', toggleMenu);
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        toggleMenu();
      }
    }));
  }

  // Lazy loading gallery images
  const lazyImages = document.querySelectorAll('[data-src]');
  if ('IntersectionObserver' in window && lazyImages.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });

    lazyImages.forEach((img) => observer.observe(img));
  } else {
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  // Highlight news feed & cards data
  const newsItems = [
    {
      title: 'Europos čempionato pergalės',
      summary: 'Lietuvos rinktinė iškovojo 5 aukso ir 3 sidabro medalius.',
      date: '2024-04-05'
    },
    {
      title: 'Trenerių kvalifikacijos kėlimas',
      summary: 'Vilniuje įvyko sertifikuota trenerių programa.',
      date: '2024-03-18'
    },
    {
      title: 'Jaunimo taurė Kaune',
      summary: 'Dalyvavo daugiau nei 300 jaunųjų sportininkų iš 20 klubų.',
      date: '2024-02-27'
    },
    {
      title: 'Naujokų stovykla pajūryje',
      summary: 'Trijų dienų stovykla pradedantiesiems sportininkams Palangoje.',
      date: '2024-05-10'
    }
  ];

  const strip = document.getElementById('naujienu-srautas');
  if (strip) {
    newsItems.forEach((item) => {
      const article = document.createElement('article');
      article.innerHTML = `
        <strong>${new Date(item.date).toLocaleDateString('lt-LT')}</strong>
        <span>${item.title}</span>
      `;
      strip.appendChild(article);
    });
  }

  const newsGrid = document.getElementById('news-grid');
  if (newsGrid) {
    newsItems.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'card news-item';
      article.innerHTML = `
        <span class="tag">${new Date(item.date).toLocaleDateString('lt-LT')}</span>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <a class="btn btn-secondary" href="#">Skaityti daugiau</a>
      `;
      newsGrid.appendChild(article);
    });
  }

  // Slider logic
  const sliderTrack = document.querySelector('[data-slider]');
  if (sliderTrack) {
    let currentSlide = 0;
    const slides = Array.from(sliderTrack.children);
    const totalSlides = slides.length;
    const prevBtn = document.querySelector('[data-slider-prev]');
    const nextBtn = document.querySelector('[data-slider-next]');

    const updateSlider = () => {
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    const goToSlide = (index) => {
      currentSlide = (index + totalSlides) % totalSlides;
      updateSlider();
    };

    prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

    let sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);

    [sliderTrack, prevBtn, nextBtn].forEach((element) => {
      element?.addEventListener('mouseenter', () => clearInterval(sliderInterval));
      element?.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
      });
    });

    updateSlider();
  }

  // Member map & list
  const memberListElement = document.getElementById('member-list');
  const memberFilterForm = document.getElementById('member-filter');
  const cityFilter = document.getElementById('city-filter');
  const levelFilter = document.getElementById('level-filter');
  const memberSearchInput = document.getElementById('search-members');

  const members = [
    {
      name: 'Vilniaus Kyokushin centras',
      city: 'Vilnius',
      instructor: 'Sensei Jonas Petrauskas',
      level: 'suaugusieji',
      phone: '+37061234567',
      coordinates: [54.6872, 25.2797]
    },
    {
      name: 'Kauno Dojo',
      city: 'Kaunas',
      instructor: 'Sensei Miglė Kazlauskaitė',
      level: 'jaunimas',
      phone: '+37061222222',
      coordinates: [54.8985, 23.9036]
    },
    {
      name: 'Klaipėdos Baltijos klubas',
      city: 'Klaipėda',
      instructor: 'Sempai Tomas Ivanauskas',
      level: 'vaikai',
      phone: '+37069898989',
      coordinates: [55.7033, 21.1443]
    },
    {
      name: 'Panevėžio Bushido',
      city: 'Panevėžys',
      instructor: 'Sensei Inga Marijauskienė',
      level: 'meistrai',
      phone: '+37068765432',
      coordinates: [55.7333, 24.35]
    },
    {
      name: 'Šiaulių Saulės klubas',
      city: 'Šiauliai',
      instructor: 'Sempai Darius Juodvalkis',
      level: 'suaugusieji',
      phone: '+37065522334',
      coordinates: [55.9333, 23.3167]
    }
  ];

  if (cityFilter) {
    const uniqueCities = Array.from(new Set(members.map((member) => member.city))).sort();
    uniqueCities.forEach((city) => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      cityFilter.appendChild(option);
    });
  }

  let memberMap;
  if (typeof L !== 'undefined' && document.getElementById('club-map')) {
    memberMap = L.map('club-map', { scrollWheelZoom: false }).setView([55.1694, 23.8813], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> autoriai'
    }).addTo(memberMap);
  }

  const memberMarkers = [];

  const renderMembers = () => {
    if (!memberListElement) return;

    const searchValue = memberSearchInput?.value.toLowerCase() ?? '';
    const cityValue = cityFilter?.value ?? '';
    const levelValue = levelFilter?.value ?? '';

    memberListElement.innerHTML = '';
    memberMarkers.forEach((marker) => marker.remove());
    memberMarkers.length = 0;

    members
      .filter((member) => {
        const matchesSearch =
          member.name.toLowerCase().includes(searchValue) ||
          member.instructor.toLowerCase().includes(searchValue);
        const matchesCity = cityValue ? member.city === cityValue : true;
        const matchesLevel = levelValue ? member.level === levelValue : true;
        return matchesSearch && matchesCity && matchesLevel;
      })
      .forEach((member) => {
        const article = document.createElement('article');
        article.className = 'card';
        article.innerHTML = `
          <h3>${member.name}</h3>
          <p><strong>Miestas:</strong> ${member.city}</p>
          <p><strong>Instruktorius:</strong> ${member.instructor}</p>
          <p><strong>Kategorija:</strong> ${member.level}</p>
          <p><strong>Tel.:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
        `;
        memberListElement.appendChild(article);

        if (memberMap) {
          const marker = L.marker(member.coordinates).addTo(memberMap);
          marker.bindPopup(`<strong>${member.name}</strong><br>${member.city}`);
          memberMarkers.push(marker);
        }
      });

    if (memberMap && memberMarkers.length) {
      const group = new L.featureGroup(memberMarkers);
      memberMap.fitBounds(group.getBounds().pad(0.2));
    }
  };

  if (memberListElement) {
    ['input', 'change'].forEach((eventName) => {
      memberFilterForm?.addEventListener(eventName, renderMembers);
    });
    renderMembers();
  }

  // Events data & filters
  const events = [
    {
      id: 'evt-1',
      title: 'Lietuvos čempionatas 2024',
      type: 'varzybos',
      location: 'Kaunas',
      date: '2024-06-15',
      description: 'Didžiausias metų turnyras su tarptautiniais svečiais.'
    },
    {
      id: 'evt-2',
      title: 'Instruktorių seminaras',
      type: 'mokymai',
      location: 'Vilnius',
      date: '2024-05-20',
      description: 'Privalomas seminaras klubų instruktoriams.'
    },
    {
      id: 'evt-3',
      title: 'Vasaros stovykla',
      type: 'stovykla',
      location: 'Palanga',
      date: '2024-07-10',
      description: 'Intensyvi treniruočių stovykla prie jūros visoms amžiaus grupėms.'
    }
  ];

  const pastEvents = [
    {
      title: 'Baltijos taurė 2023',
      location: 'Klaipėda',
      image:
        "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20640%20400%27%3E%0A%20%20%20%20%3Crect%20width%3D%27640%27%20height%3D%27400%27%20fill%3D%27%23c1121f%27%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2720%27%20y%3D%2720%27%20width%3D%27600%27%20height%3D%27360%27%20rx%3D%2724%27%20fill%3D%27%23f8f9fa%27%20opacity%3D%270.9%27%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2750%25%27%20y%3D%2750%25%27%20font-size%3D%2748%27%20text-anchor%3D%27middle%27%20fill%3D%27%23c1121f%27%20font-family%3D%27Roboto%2CArial%2Csans-serif%27%20dominant-baseline%3D%27middle%27%3EBaltijos%20taur%C4%97%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E"
    },
    {
      title: 'Sensei stažuotė Japonijoje',
      location: 'Tokijas',
      image:
        "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20640%20400%27%3E%0A%20%20%20%20%3Crect%20width%3D%27640%27%20height%3D%27400%27%20fill%3D%27%231a1a1a%27%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2720%27%20y%3D%2720%27%20width%3D%27600%27%20height%3D%27360%27%20rx%3D%2724%27%20fill%3D%27%23f8f9fa%27%20opacity%3D%270.9%27%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2750%25%27%20y%3D%2750%25%27%20font-size%3D%2748%27%20text-anchor%3D%27middle%27%20fill%3D%27%231a1a1a%27%20font-family%3D%27Roboto%2CArial%2Csans-serif%27%20dominant-baseline%3D%27middle%27%3ESensei%20kelion%C4%97%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E"
    },
    {
      title: 'Mokinių diržų egzaminai',
      location: 'Vilnius',
      image:
        "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20640%20400%27%3E%0A%20%20%20%20%3Crect%20width%3D%27640%27%20height%3D%27400%27%20fill%3D%27%236c757d%27%2F%3E%0A%20%20%20%20%3Crect%20x%3D%2720%27%20y%3D%2720%27%20width%3D%27600%27%20height%3D%27360%27%20rx%3D%2724%27%20fill%3D%27%23f8f9fa%27%20opacity%3D%270.9%27%2F%3E%0A%20%20%20%20%3Ctext%20x%3D%2750%25%27%20y%3D%2750%25%27%20font-size%3D%2748%27%20text-anchor%3D%27middle%27%20fill%3D%27%236c757d%27%20font-family%3D%27Roboto%2CArial%2Csans-serif%27%20dominant-baseline%3D%27middle%27%3EEgzaminai%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E"
    }
  ];

  const eventList = document.getElementById('event-list');
  const pastEventList = document.getElementById('past-events');
  const eventTypeSelect = document.getElementById('event-type');
  const eventLocationInput = document.getElementById('event-location');
  const eventDateInput = document.getElementById('event-date');
  const registrationSelect = document.getElementById('participant-event');

  const renderEvents = () => {
    if (!eventList) return;

    const typeValue = eventTypeSelect?.value ?? '';
    const locationValue = (eventLocationInput?.value ?? '').toLowerCase();
    const dateValue = eventDateInput?.value ?? '';

    eventList.innerHTML = '';

    events
      .filter((event) => {
        const matchesType = typeValue ? event.type === typeValue : true;
        const matchesLocation = locationValue
          ? event.location.toLowerCase().includes(locationValue)
          : true;
        const matchesDate = dateValue ? event.date.startsWith(dateValue) : true;
        return matchesType && matchesLocation && matchesDate;
      })
      .forEach((event) => {
        const article = document.createElement('article');
        article.className = 'card event-card';
        article.innerHTML = `
          <span class="event-date">${new Date(event.date).toLocaleDateString('lt-LT')}</span>
          <h3>${event.title}</h3>
          <p><strong>Vieta:</strong> ${event.location}</p>
          <p>${event.description}</p>
          <span class="badge">${event.type}</span>
        `;
        eventList.appendChild(article);
      });
  };

  if (eventList) {
    ['input', 'change'].forEach((eventName) => {
      eventTypeSelect?.addEventListener(eventName, renderEvents);
      eventLocationInput?.addEventListener(eventName, renderEvents);
      eventDateInput?.addEventListener(eventName, renderEvents);
    });
    renderEvents();
  }

  if (registrationSelect) {
    events.forEach((event) => {
      const option = document.createElement('option');
      option.value = event.id;
      option.textContent = `${event.title} (${new Date(event.date).toLocaleDateString('lt-LT')})`;
      registrationSelect.appendChild(option);
    });
  }

  if (pastEventList) {
    pastEvents.forEach((event) => {
      const article = document.createElement('article');
      article.className = 'card';
      article.innerHTML = `
        <img src="${event.image}" alt="${event.title} - ${event.location}" loading="lazy" />
        <h3>${event.title}</h3>
        <p>${event.location}</p>
      `;
      pastEventList.appendChild(article);
    });
  }

  // Documents rendering
  const documents = [
    {
      title: 'Federacijos statutas',
      type: 'statutai',
      size: '2.1 MB',
      url: '#'
    },
    {
      title: 'Narystės paraiškos forma',
      type: 'formos',
      size: '850 KB',
      url: '#'
    },
    {
      title: 'Trenerio licencijos prašymas',
      type: 'formos',
      size: '1.3 MB',
      url: '#'
    },
    {
      title: 'Sertifikatų išdavimo taisyklės',
      type: 'sertifikatai',
      size: '1.0 MB',
      url: '#'
    },
    {
      title: 'Anti-dopingo taisyklės 2024',
      type: 'anti-doping',
      size: '900 KB',
      url: '#'
    }
  ];

  const documentList = document.getElementById('document-list');
  const documentFilterForm = document.getElementById('document-filter');
  const documentType = document.getElementById('document-type');
  const documentSearch = document.getElementById('document-search');

  const renderDocuments = () => {
    if (!documentList) return;

    const typeValue = documentType?.value ?? '';
    const searchValue = (documentSearch?.value ?? '').toLowerCase();

    documentList.innerHTML = '';

    documents
      .filter((doc) => {
        const matchesType = typeValue ? doc.type === typeValue : true;
        const matchesSearch = searchValue ? doc.title.toLowerCase().includes(searchValue) : true;
        return matchesType && matchesSearch;
      })
      .forEach((doc) => {
        const article = document.createElement('article');
        article.className = 'card';
        article.innerHTML = `
          <h3>${doc.title}</h3>
          <p><strong>Tipas:</strong> ${doc.type}</p>
          <p><strong>Dydis:</strong> ${doc.size}</p>
          <a class="btn btn-secondary" href="${doc.url}" download>Parsisiųsti</a>
        `;
        documentList.appendChild(article);
      });
  };

  if (documentList) {
    ['input', 'change'].forEach((eventName) => {
      documentFilterForm?.addEventListener(eventName, renderDocuments);
    });
    renderDocuments();
  }

  // Contact form and registration form handling
  const handleFormSubmission = (form, statusElement) => {
    if (!form || !statusElement) return;

    const sendForm = (data) =>
      new Promise((resolve) => {
        setTimeout(() => resolve({ ok: true, data }), 800);
      });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      statusElement.textContent = '';
      statusElement.className = 'status-message';

      if (!form.checkValidity()) {
        statusElement.textContent = 'Patikrinkite privalomus laukus.';
        statusElement.classList.add('error');
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      statusElement.textContent = 'Siunčiama...';

      try {
        await sendForm(payload);
        statusElement.textContent = 'Jūsų žinutė sėkmingai išsiųsta!';
        statusElement.classList.add('success');
        form.reset();
      } catch (error) {
        statusElement.textContent = 'Įvyko klaida. Bandykite dar kartą.';
        statusElement.classList.add('error');
        console.error('Formos siuntimo klaida', error);
      }
    });
  };

  handleFormSubmission(document.getElementById('contact-form'), document.getElementById('contact-status'));
  handleFormSubmission(document.getElementById('registration-form'), document.getElementById('registration-status'));

  // Office map
  if (typeof L !== 'undefined' && document.getElementById('office-map')) {
    const officeMap = L.map('office-map', { scrollWheelZoom: false }).setView([54.700564, 25.263997], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> autoriai'
    }).addTo(officeMap);

    L.marker([54.700564, 25.263997])
      .addTo(officeMap)
      .bindPopup('<strong>LKKF būstinė</strong><br>Ozo g. 18, Vilnius');
  }
})();

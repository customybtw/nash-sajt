const state = {
    galleryIndex: 0
};

const newsItems = [
    {
        title: 'Lietuvos čempionato atrankos startas',
        url: '#'
    },
    {
        title: 'Jaunimo stovykla Palangoje – registracija prasidėjo',
        url: '#'
    },
    {
        title: 'Trenerių kvalifikacijos kėlimo seminaras Vilniuje',
        url: '#'
    },
    {
        title: 'Lietuvos rinktinės pasirengimas Europos čempionatui',
        url: '#'
    }
];

const galleryItems = [
    {
        title: 'Nacionalinis čempionatas',
        image: 'https://images.unsplash.com/photo-1522780209446-8a0fefbd0bfc?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Treniruotė kalnuose',
        image: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Vaikų stovykla',
        image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80'
    },
    {
        title: 'Tarptautinis seminaras',
        image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80'
    }
];

const members = [
    {
        name: 'Vilniaus Kyokushin centras',
        type: 'klubas',
        region: 'vilniaus',
        contact: 'vilnius@kyokushin.lt',
        phone: '+37060012345',
        coordinates: [54.6892, 25.2798]
    },
    {
        name: 'Kauno kovos menų akademija',
        type: 'klubas',
        region: 'kauno',
        contact: 'kaunas@kyokushin.lt',
        phone: '+37060054321',
        coordinates: [54.8985, 23.9036]
    },
    {
        name: 'Treneris Tomas V.',
        type: 'treneris',
        region: 'vilniaus',
        contact: 'tomas@kyokushin.lt',
        phone: '+37060011111',
        coordinates: [54.7065, 25.2636]
    },
    {
        name: 'Klaipėdos dojo',
        type: 'klubas',
        region: 'klaipedos',
        contact: 'klaipeda@kyokushin.lt',
        phone: '+37060022222',
        coordinates: [55.7033, 21.1443]
    },
    {
        name: 'Sensei Rūta P.',
        type: 'treneris',
        region: 'kauno',
        contact: 'ruta@kyokushin.lt',
        phone: '+37060077777',
        coordinates: [54.90, 23.97]
    }
];

const events = [
    {
        name: 'Lietuvos Kyokushin čempionatas',
        type: 'turnyras',
        region: 'vilnius',
        date: '2024-05-25',
        location: 'Vilnius, Avia Solutions Group arena',
        description: 'Didžiausias metų turnyras geriausiems šalies atletams.'
    },
    {
        name: 'Tarptautinis vasaros seminaras',
        type: 'seminaras',
        region: 'kaunas',
        date: '2024-07-10',
        location: 'Kaunas, sporto mokykla',
        description: 'Seminaras su kyokushin meistrais iš Japonijos ir Europos.'
    },
    {
        name: 'Jaunimo stovykla prie jūros',
        type: 'stovykla',
        region: 'klaipeda',
        date: '2024-08-15',
        location: 'Klaipėda, Dreverna',
        description: 'Intensyvi treniruočių savaitė jauniesiems sportininkams.'
    },
    {
        name: 'Trenerių kvalifikacijos kursai',
        type: 'seminaras',
        region: 'vilnius',
        date: '2024-09-05',
        location: 'Vilnius, LKKF būstinė',
        description: 'Teoriniai ir praktiniai mokymai treneriams ir teisėjams.'
    }
];

const documents = [
    {
        title: 'LKKF įstatai',
        type: 'statutes',
        size: '1.2 MB',
        url: '#'
    },
    {
        title: 'Narystės paraiškos forma',
        type: 'forms',
        size: '750 KB',
        url: '#'
    },
    {
        title: 'Trenerio licencijos atnaujinimo forma',
        type: 'forms',
        size: '920 KB',
        url: '#'
    },
    {
        title: 'Anti-dopingo gairės',
        type: 'guidelines',
        size: '650 KB',
        url: '#'
    },
    {
        title: 'LKKF sertifikavimo tvarka',
        type: 'certificates',
        size: '880 KB',
        url: '#'
    }
];

const pastEventImages = [
    {
        title: 'Sensei mokymai',
        image: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Vilniaus taurė',
        image: 'https://images.unsplash.com/photo-1528214101821-0023e43ec2e7?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'Vaikų varžybos',
        image: 'https://images.unsplash.com/photo-1552074280-a7f94882dd98?auto=format&fit=crop&w=600&q=80'
    }
];

function initNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.primary-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen.toString());
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function initTicker() {
    const ticker = document.querySelector('.ticker-items');
    if (!ticker) return;

    newsItems.forEach((item) => {
        const link = document.createElement('a');
        link.href = item.url;
        link.className = 'ticker-item';
        link.textContent = item.title;
        ticker.appendChild(link);
    });
}

function initGallery() {
    const track = document.querySelector('.gallery-track');
    if (!track) return;

    galleryItems.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'gallery-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <span>${item.title}</span>
        `;
        track.appendChild(card);
    });

    const prev = document.querySelector('.gallery-prev');
    const next = document.querySelector('.gallery-next');

    if (prev && next) {
        prev.addEventListener('click', () => {
            track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
        });

        next.addEventListener('click', () => {
            track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
        });
    }
}

function initMembersPage() {
    const results = document.querySelector('#members-results');
    if (!results) return;

    const searchInput = document.querySelector('#member-search');
    const regionFilter = document.querySelector('#region-filter');
    const typeFilter = document.querySelector('#type-filter');
    const mapContainer = document.querySelector('#members-map');
    let mapInstance;
    let markers = [];

    const renderMembers = () => {
        const term = searchInput.value.trim().toLowerCase();
        const region = regionFilter.value;
        const type = typeFilter.value;

        results.innerHTML = '';

        const filtered = members.filter((member) => {
            const matchesTerm = member.name.toLowerCase().includes(term);
            const matchesRegion = region === 'visos' || member.region === region;
            const matchesType = type === 'visi' || member.type === type;
            return matchesTerm && matchesRegion && matchesType;
        });

        if (!filtered.length) {
            results.innerHTML = '<p>Nerasta narių pagal pasirinktus kriterijus.</p>';
        }

        filtered.forEach((member) => {
            const card = document.createElement('article');
            card.className = 'card';
            card.innerHTML = `
                <div class="tag">${member.type === 'klubas' ? 'Klubas' : 'Treneris'}</div>
                <h3>${member.name}</h3>
                <p>Regionas: ${member.region.charAt(0).toUpperCase() + member.region.slice(1)}</p>
                <p>El. paštas: <a href="mailto:${member.contact}">${member.contact}</a></p>
                <p>Telefonas: <a href="tel:${member.phone}">${member.phone}</a></p>
            `;
            results.appendChild(card);
        });

        if (mapInstance) {
            markers.forEach((marker) => marker.remove());
        }

        if (mapInstance) {
            filtered.forEach((member) => {
                const marker = L.marker(member.coordinates).addTo(mapInstance);
                marker.bindPopup(`<strong>${member.name}</strong><br>${member.phone}`);
                markers.push(marker);
            });
            if (filtered.length) {
                const group = L.featureGroup(markers);
                mapInstance.fitBounds(group.getBounds().pad(0.2));
            }
        }
    };

    if (mapContainer && window.L) {
        mapInstance = L.map(mapContainer).setView([55.1694, 23.8813], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(mapInstance);
    }

    ['input', 'change'].forEach((eventName) => {
        searchInput.addEventListener(eventName, renderMembers);
        regionFilter.addEventListener(eventName, renderMembers);
        typeFilter.addEventListener(eventName, renderMembers);
    });

    renderMembers();
}

function initEventsPage() {
    const list = document.querySelector('#events-list');
    if (!list) return;

    const typeFilter = document.querySelector('#event-type-filter');
    const regionFilter = document.querySelector('#event-region-filter');
    const dateFilter = document.querySelector('#event-date-filter');
    const select = document.querySelector('#event-select');
    const pastGallery = document.querySelector('.past-gallery');

    const renderEvents = () => {
        const type = typeFilter.value;
        const region = regionFilter.value;
        const selectedDate = dateFilter.value;

        list.innerHTML = '';

        const filtered = events.filter((event) => {
            const typeMatch = type === 'visi' || event.type === type;
            const regionMatch = region === 'visi' || event.region === region;
            const dateMatch = !selectedDate || event.date === selectedDate;
            return typeMatch && regionMatch && dateMatch;
        });

        if (!filtered.length) {
            list.innerHTML = '<p>Šiuo metu nėra renginių pagal pasirinktus kriterijus.</p>';
        }

        filtered.forEach((event) => {
            const card = document.createElement('article');
            card.className = 'card';
            const date = new Date(event.date);
            const formattedDate = date.toLocaleDateString('lt-LT', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            card.innerHTML = `
                <div class="tag">${event.type}</div>
                <h3>${event.name}</h3>
                <p><strong>Data:</strong> ${formattedDate}</p>
                <p><strong>Vieta:</strong> ${event.location}</p>
                <p>${event.description}</p>
            `;
            list.appendChild(card);
        });

        if (select) {
            select.innerHTML = '<option value="">Pasirinkite renginį</option>';
            events.forEach((event) => {
                const option = document.createElement('option');
                option.value = event.name;
                option.textContent = `${event.name} – ${event.date}`;
                select.appendChild(option);
            });
        }
    };

    ['change', 'input'].forEach((eventName) => {
        typeFilter.addEventListener(eventName, renderEvents);
        regionFilter.addEventListener(eventName, renderEvents);
        dateFilter.addEventListener(eventName, renderEvents);
    });

    if (pastGallery) {
        pastEventImages.forEach((item) => {
            const figure = document.createElement('figure');
            figure.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <figcaption>${item.title}</figcaption>
            `;
            pastGallery.appendChild(figure);
        });
    }

    renderEvents();
}

function initDocumentsPage() {
    const list = document.querySelector('#documents-list');
    if (!list) return;

    const search = document.querySelector('#document-search');
    const typeFilter = document.querySelector('#document-type-filter');

    const renderDocs = () => {
        const term = search.value.trim().toLowerCase();
        const type = typeFilter.value;
        list.innerHTML = '';

        const filtered = documents.filter((doc) => {
            const matchesTerm = doc.title.toLowerCase().includes(term);
            const matchesType = type === 'visi' || doc.type === type;
            return matchesTerm && matchesType;
        });

        if (!filtered.length) {
            list.innerHTML = '<p>Dokumentų pagal paieškos kriterijus nerasta.</p>';
        }

        filtered.forEach((doc) => {
            const card = document.createElement('article');
            card.className = 'card';
            card.id = doc.type;
            card.innerHTML = `
                <div class="tag">${doc.type}</div>
                <h3>${doc.title}</h3>
                <p>Dydis: ${doc.size}</p>
                <a class="button ghost" href="${doc.url}" download>Parsisiųsti</a>
            `;
            list.appendChild(card);
        });
    };

    ['input', 'change'].forEach((eventName) => {
        search.addEventListener(eventName, renderDocs);
        typeFilter.addEventListener(eventName, renderDocs);
    });

    renderDocs();
}

function initContactPage() {
    const mapContainer = document.querySelector('#contact-map');
    if (mapContainer && window.L) {
        const map = L.map(mapContainer).setView([54.6872, 25.2797], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);
        L.marker([54.6872, 25.2797]).addTo(map).bindPopup('LKKF būstinė');
    }
}

function initForms() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            submitForm(contactForm);
        });
    }

    const registrationForm = document.querySelector('#event-registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            submitForm(registrationForm);
        });
    }
}

async function submitForm(form) {
    const feedback = form.querySelector('.form-feedback');
    if (!feedback) return;

    if (!form.checkValidity()) {
        feedback.textContent = 'Patikrinkite ar visi privalomi laukai užpildyti.';
        feedback.className = 'form-feedback error';
        return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    feedback.textContent = 'Siunčiama...';
    feedback.className = 'form-feedback';

    try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.info('Form data', payload);
        feedback.textContent = 'Žinutė sėkmingai išsiųsta!';
        feedback.className = 'form-feedback success';
        form.reset();
    } catch (error) {
        console.error(error);
        feedback.textContent = 'Įvyko klaida. Bandykite dar kartą.';
        feedback.className = 'form-feedback error';
    }
}

function initCopyright() {
    const yearSpans = document.querySelectorAll('#copyright-year');
    const year = new Date().getFullYear();
    yearSpans.forEach((span) => {
        span.textContent = year;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTicker();
    initGallery();
    initMembersPage();
    initEventsPage();
    initDocumentsPage();
    initContactPage();
    initForms();
    initCopyright();
});

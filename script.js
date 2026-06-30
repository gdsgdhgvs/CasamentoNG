/* ============================================================
   script.js — Natiely & Gustavo | 03.04.2027
   ============================================================ */

/* ---------- ENVELOPE ---------- */
(function () {
    const intro   = document.getElementById('intro');
    const envWrap = document.getElementById('envWrap');
    const hint    = document.getElementById('envHint');
    const openBtn = document.getElementById('openSite');
    let opened    = false;

    function openEnvelope() {
        if (opened) return;
        opened = true;

        // esconde a dica
        hint.classList.add('hidden');

        // adiciona a classe que dispara as animações CSS (flap + carta)
        envWrap.classList.add('open');
    }

    function goToSite() {
        intro.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }

    // clique em qualquer lugar do envelope abre a aba
    envWrap.addEventListener('click', openEnvelope);

    // botão "Abrir Convite" leva ao site
    // aguarda a animação da carta terminar (carta leva ~1.6s, mais uma pausa de 0.4s)
    openBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (!opened) openEnvelope();
        setTimeout(goToSite, 800);
    });

    // suporte a teclado
    envWrap.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') openEnvelope();
    });
})();


/* ---------- PARTÍCULAS ---------- */
(function () {
    const canvas = document.getElementById('particles');
    const ctx    = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x:       Math.random() * canvas.width,
            y:       Math.random() * canvas.height,
            size:    Math.random() * 2 + 0.5,
            speedX:  (Math.random() - 0.5) * 0.4,
            speedY:  (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.1,
        };
    }

    function init() {
        resize();
        particles = Array.from({ length: 80 }, createParticle);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200,168,106,${p.opacity})`;
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > canvas.width)  p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height)  p.speedY *= -1;
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
})();


/* ---------- MÚSICA ---------- */
(function () {
    const music = document.getElementById('music');
    const btn   = document.getElementById('musicButton');
    let playing = false;

    btn.addEventListener('click', function () {
        if (playing) {
            music.pause();
            btn.textContent = '🔇';
        } else {
            music.play().catch(() => {});
            btn.textContent = '🔊';
        }
        playing = !playing;
    });
})();


/* ---------- CONTAGEM REGRESSIVA ---------- */
(function () {
    const target = new Date('2027-04-03T17:00:00');

    function pad(n) { return String(n).padStart(2, '0'); }

    function update() {
        const diff = target - Date.now();
        if (diff <= 0) {
            ['days','hours','minutes','seconds'].forEach(id => {
                document.getElementById(id).textContent = '00';
            });
            return;
        }
        document.getElementById('days').textContent    = pad(Math.floor(diff / 86400000));
        document.getElementById('hours').textContent   = pad(Math.floor((diff % 86400000) / 3600000));
        document.getElementById('minutes').textContent = pad(Math.floor((diff % 3600000) / 60000));
        document.getElementById('seconds').textContent = pad(Math.floor((diff % 60000) / 1000));
    }

    update();
    setInterval(update, 1000);
})();


/* ---------- RSVP ---------- */
(function () {
    const form     = document.getElementById('rsvpForm');
    const feedback = document.getElementById('rsvpFeedback');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name   = document.getElementById('rsvpName').value.trim();
        const guests = document.getElementById('rsvpGuests').value.trim();

        feedback.classList.remove('error');

        if (!name || !guests) {
            feedback.textContent = 'Por favor, preencha todos os campos.';
            feedback.classList.add('error');
            return;
        }

        feedback.textContent = `Obrigado, ${name}! Presença confirmada para ${guests} pessoa(s). 💛`;
        form.reset();
    });
})();

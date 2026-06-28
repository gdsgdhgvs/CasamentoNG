const intro = document.getElementById("intro");
const openSite = document.getElementById("openSite");
const envelope = document.querySelector(".envelope");
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

// 1. EVENTO DE ABERTURA
openSite.addEventListener("click", (e) => {
    e.stopPropagation();
    envelope.classList.add("open");

    setTimeout(() => {
        intro.style.opacity = "0";
        intro.style.visibility = "hidden";
        document.body.classList.remove("no-scroll");
    }, 1600);

    music.volume = 0;
    music.play().catch(() => console.log("Interação necessária para áudio."));

    let vol = 0;
    const fadeIn = setInterval(() => {
        if (vol < 0.5) {
            vol += 0.05;
            music.volume = Math.min(vol, 0.5);
        } else {
            clearInterval(fadeIn);
        }
    }, 200);
});

// 2. MUDO / PLAY
musicButton.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicButton.innerHTML = "🔊";
    } else {
        music.pause();
        musicButton.innerHTML = "🔇";
    }
});

// 3. CONTADOR REGRESSIVO
const targetDate = new Date(2027, 3, 3, 17, 0, 0).getTime(); // Mês 3 = Abril

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (diff > 0) {
        daysEl.innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
        hoursEl.innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
        minutesEl.innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
        secondsEl.innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0");
    } else {
        daysEl.innerText = "00";
        hoursEl.innerText = "00";
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 4. EFEITO DE PARTÍCULAS (OURO) — adaptado para performance mobile
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function isMobile() {
    return window.innerWidth < 768;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createParticles() {
    const count = isMobile() ? 35 : 70;
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.5 + 0.2
        });
    }
}
createParticles();
window.addEventListener("resize", createParticles);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(200, 168, 106, 0.3)";
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.y += p.speed;
        if (p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(animate);
}
if (!prefersReducedMotion) {
    animate();
} else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 5. CONFIRMAÇÃO DE PRESENÇA (RSVP)
const rsvpForm = document.getElementById("rsvpForm");
const rsvpFeedback = document.getElementById("rsvpFeedback");

rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("rsvpName");
    const guestsInput = document.getElementById("rsvpGuests");
    const name = nameInput.value.trim();
    const guests = guestsInput.value.trim();

    if (!name || !guests || Number(guests) < 1) {
        rsvpFeedback.textContent = "Por favor, preencha seu nome e o número de convidados.";
        rsvpFeedback.classList.add("error");
        return;
    }

    rsvpFeedback.classList.remove("error");

    // Envia a confirmação via WhatsApp para os noivos.
    // Troque o número abaixo pelo número de WhatsApp do casal (formato: 55DDDNUMERO).
    const phoneNumber = "5500000000000";
    const message = `Olá! Confirmo minha presença no casamento de Natiely & Gustavo.%0ANome: ${encodeURIComponent(name)}%0ANúmero de convidados: ${encodeURIComponent(guests)}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    rsvpFeedback.textContent = "Obrigado! Abrindo o WhatsApp para confirmar...";
    window.open(whatsappUrl, "_blank");

    rsvpForm.reset();
});

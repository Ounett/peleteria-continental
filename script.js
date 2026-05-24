const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const links = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id], main[id]");

// Navbar con efecto al hacer scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Menú móvil
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.classList.toggle("active");
});

// Cerrar menú al tocar un link
links.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.classList.remove("active");
    });
});

// Animación reveal al bajar
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15,
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

// Link activo en navbar
const activeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");

                links.forEach((link) => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    },
    {
        threshold: 0.45,
    }
);

sections.forEach((section) => {
    activeObserver.observe(section);
});

// Pequeño efecto parallax en la imagen principal
const mainImage = document.querySelector(".main-image");

window.addEventListener("mousemove", (e) => {
    if (!mainImage) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;

    mainImage.style.transform = `rotate(2deg) translate(${x}px, ${y}px)`;
});

// En mobile quitamos el parallax raro
window.addEventListener("resize", () => {
    if (window.innerWidth <= 980 && mainImage) {
        mainImage.style.transform = "rotate(0deg)";
    }
});
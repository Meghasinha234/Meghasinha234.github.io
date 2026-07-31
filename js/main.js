const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navigationLinks = document.querySelector(".nav-links");
const currentYear = document.querySelector("#current-year");
const cursorGlow = document.querySelector(".cursor-glow");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
});

menuButton?.addEventListener("click", () => {
    const isOpen = navigationLinks?.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "Close" : "Menu";
});

navigationLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navigationLinks.classList.remove("open");
        menuButton?.setAttribute("aria-expanded", "false");
        menuButton.textContent = "Menu";
    });
});

document.addEventListener("mousemove", (event) => {
    if (!cursorGlow) {
        return;
    }

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12,
    }
);

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

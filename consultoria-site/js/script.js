// NÚMERO DO WHATSAPP
const whatsappNumber = "83920008661";

// MENSAGEM PADRÃO DOS BOTÕES DE WHATSAPP
const defaultWhatsappMessage = "Olá! Quero falar com um especialista sobre consultoria empresarial.";

// LINK DO WHATSAPP USADO NOS BOTÕES DO SITE
const defaultWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultWhatsappMessage)}`;

const whatsappButtons = document.querySelectorAll(".js-whatsapp");
whatsappButtons.forEach((button) => {
  button.setAttribute("href", defaultWhatsappLink);
});

// =========================
// MENU MOBILE
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");

function closeMobileMenu() {
  if (!menuToggle || !nav) return;

  menuToggle.classList.remove("is-open");
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const menuIsOpen = nav.classList.toggle("is-open");

    menuToggle.classList.toggle("is-open", menuIsOpen);
    menuToggle.setAttribute("aria-expanded", String(menuIsOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

// AQUI O MENU FECHA QUANDO O USUÁRIO CLICA FORA DELE NO CELULAR
document.addEventListener("click", (event) => {
  if (!menuToggle || !nav) return;

  const clickedInsideMenu = nav.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeMobileMenu();
  }
});

// =========================
// ROLAGEM SUAVE
// =========================

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMobileMenu();
    }
  });
});

// SCROLL SUAVE QUANDO VEM DE OUTRA PÁGINA COM #sobre OU #servicos
window.addEventListener("load", () => {
  if (!window.location.hash) return;

  const targetElement = document.querySelector(window.location.hash);

  if (targetElement) {
    setTimeout(() => {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
});

// =========================
// CARROSSEL DA SEÇÃO SOBRE
// Imagens e textos do carrossel
// =========================

// CARROSSEL PROCURA OS SLIDES, BOTÕES E INDICADORES
(function () {
  const slides = document.querySelectorAll(".carousel__slide");
  const dots = document.querySelectorAll(".carousel__dot");
  const btnPrev = document.querySelector("[data-carousel-prev]");
  const btnNext = document.querySelector("[data-carousel-next]");
  const carousel = document.querySelector(".carousel");

  if (!slides.length || !dots.length || !btnPrev || !btnNext) {
    return;
  }

  let slideAtual = 0;

  const tempoAutomatico = 3000;

  let intervaloCarrossel;

  function mostrarSlide(index) {
    slides.forEach(function (slide) {
      slide.classList.remove("is-active");
    });

    dots.forEach(function (dot) {
      dot.classList.remove("is-active");
    });

    slides[index].classList.add("is-active");
    dots[index].classList.add("is-active");

    slideAtual = index;
  }

  function proximoSlide() {
    let novoIndex = slideAtual + 1;

    if (novoIndex >= slides.length) {
      novoIndex = 0;
    }

    mostrarSlide(novoIndex);
  }

  function slideAnterior() {
    let novoIndex = slideAtual - 1;

    if (novoIndex < 0) {
      novoIndex = slides.length - 1;
    }

    mostrarSlide(novoIndex);
  }

  function iniciarCarrosselAutomatico() {
    intervaloCarrossel = setInterval(function () {
      proximoSlide();
    }, tempoAutomatico);
  }

  function reiniciarCarrosselAutomatico() {
    clearInterval(intervaloCarrossel);
    iniciarCarrosselAutomatico();
  }

  // Botão próximo
  btnNext.addEventListener("click", function () {
    proximoSlide();
    reiniciarCarrosselAutomatico();
  });

  // Botão voltar
  btnPrev.addEventListener("click", function () {
    slideAnterior();
    reiniciarCarrosselAutomatico();
  });

  // Bolinhas do carrossel
  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      const index = Number(dot.getAttribute("data-carousel-dot"));

      mostrarSlide(index);
      reiniciarCarrosselAutomatico();
    });
  });

  // Quando passa o mouse em cima, pausa
  if (carousel) {
    carousel.addEventListener("mouseenter", function () {
      clearInterval(intervaloCarrossel);
    });

    carousel.addEventListener("mouseleave", function () {
      iniciarCarrosselAutomatico();
    });
  }

  // Inicia o carrossel
  mostrarSlide(slideAtual);
  iniciarCarrosselAutomatico();
})();

// =========================
// FORMULÁRIO DE CONTATO
// P/ alterar o número do WhatsApp que recebe as mensagens
// =========================

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // DADOS PREENCHIDOS NO FORMULÁRIO
    const nome = document.querySelector("#nome").value.trim();
    const empresa = document.querySelector("#empresa").value.trim();
    const email = document.querySelector("#email").value.trim();
    const telefone = document.querySelector("#telefone").value.trim();
    const assunto = document.querySelector("#assunto").value.trim();
    const mensagem = document.querySelector("#mensagem").value.trim();

    // TEXTO DA MENSAGEM QUE SERÁ ENVIADA PELO WHATSAPP
    const whatsappMessage = `Olá, meu nome é ${nome}.\nEmpresa: ${empresa}\nE-mail: ${email}\nTelefone: ${telefone}\nAssunto: ${assunto}\nMensagem: ${mensagem}`;

    // NÚMERO DO WHATSAPP QUE RECEBE AS MENSAGENS
    const formWhatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(formWhatsappLink, "_blank");
  });
}

// PARA CRIAR ANIMAÇÕES LEVES QUANDO OS ELEMENTOS APARECEM NA TELA
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

// =========================
// Mudanças entre Início, Sobre e Serviços (no clicável e scrollando)
// =========================

(function () {
  const inicioSection = document.querySelector("#inicio");
  const sobreSection = document.querySelector("#sobre");
  const servicosSection = document.querySelector("#servicos");

  // Se não estiver na página inicial, esse código não roda
  if (!inicioSection || !sobreSection || !servicosSection) {
    return;
  }

  const menuLinksAtivos = document.querySelectorAll(".nav__link");
  const sectionsAtivas = [inicioSection, sobreSection, servicosSection];

  function limparMenuAtivo() {
    menuLinksAtivos.forEach(function (link) {
      link.classList.remove("is-current");
    });
  }

  function marcarMenuAtivo(idDaSecao) {
    const linkAtual = document.querySelector(
      `.nav__link[href="index.html#${idDaSecao}"], .nav__link[href="#${idDaSecao}"]`
    );

    if (linkAtual) {
      limparMenuAtivo();
      linkAtual.classList.add("is-current");
    }
  }

  // MUDA O MENU QUANDO CLICA
  menuLinksAtivos.forEach(function (link) {
    link.addEventListener("click", function () {
      const href = link.getAttribute("href") || "";

      if (href.includes("#inicio")) {
        marcarMenuAtivo("inicio");
      }

      if (href.includes("#sobre")) {
        marcarMenuAtivo("sobre");
      }

      if (href.includes("#servicos")) {
        marcarMenuAtivo("servicos");
      }
    });
  });

  // AMUDA O MENU QUANDO ROLA A PÁGINA
  function atualizarMenuAoRolar() {
    let secaoAtual = "inicio";

    sectionsAtivas.forEach(function (section) {
      const distanciaDoTopo = section.getBoundingClientRect().top;

      if (distanciaDoTopo <= 160) {
        secaoAtual = section.getAttribute("id");
      }
    });

    marcarMenuAtivo(secaoAtual);
  }

  window.addEventListener("scroll", atualizarMenuAoRolar);
  window.addEventListener("load", atualizarMenuAoRolar);

  atualizarMenuAoRolar();

})();
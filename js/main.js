document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Navegação & Header Scroll
       ========================================================================== */
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        // Mudar aparência do Header ao rolar a página
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Mostrar/Ocultar botão voltar ao topo
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Clique para voltar ao topo
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       Menu Mobile (Hamburger Menu)
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden'); // Impede scroll com menu aberto
    };

    const closeMenu = () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    /* ==========================================================================
       Efeito de Digitação (Typing Effect)
       ========================================================================== */
    const typingSpan = document.getElementById('typing-text');
    const roles = ['Desenvolvedora Front-End', 'Criadora de Interfaces', 'Especialista em React', 'Focada em UX/UI'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // Apagando texto
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Mais rápido ao deletar
        } else {
            // Digitando texto
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Normal ao digitar
        }

        // Transições de estado
        if (!isDeleting && charIndex === currentRole.length) {
            // Pausa no final do texto completo antes de apagar
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pausa antes de digitar o próximo termo
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Iniciar efeito de digitação
    setTimeout(typeEffect, 1000);

    /* ==========================================================================
       Scroll Reveal & Active Links (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    const skillFills = document.querySelectorAll('.progress-bar-fill');
    const sections = document.querySelectorAll('section[id]');

    // Configurações do Observer
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Se o elemento revelado for a seção de habilidades, ativa a animação das barras
                if (entry.target.id === 'skills') {
                    animateSkills();
                }

                observer.unobserve(entry.target); // Revela apenas uma vez
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Observer específico para a seção de Habilidades para animar barras
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Função para preencher barras de habilidade de forma animada
    function animateSkills() {
        skillFills.forEach(fill => {
            const progress = fill.getAttribute('data-progress');
            fill.style.width = progress;
        });
    }

    // Observer para atualizar links de navegação ativa
    const navObserverOptions = {
        threshold: 0.5,
        rootMargin: '-80px 0px -20% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });


    /* ==========================================================================
       Efeito Parallax Leve (Hero Section)
       ========================================================================== */
    const avatarParallax = document.getElementById('avatar-parallax');

    if (avatarParallax) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            // Deslocamento vertical suave no scroll
            if (scrollValue < window.innerHeight) {
                avatarParallax.style.transform = `translateY(${scrollValue * 0.15}px)`;
            }
        });
    }

    /* ==========================================================================
       Validação do Formulário de Contato
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');

            let isValid = true;

            // Validar Nome
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('error');
                nameError.style.display = 'flex';
                isValid = false;
            } else {
                nameInput.classList.remove('error');
                nameError.style.display = 'none';
            }

            // Validar Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('error');
                emailError.style.display = 'flex';
                isValid = false;
            } else {
                emailInput.classList.remove('error');
                emailError.style.display = 'none';
            }

            // Validar Mensagem
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('error');
                messageError.style.display = 'flex';
                isValid = false;
            } else {
                messageInput.classList.remove('error');
                messageError.style.display = 'none';
            }

            // Se for válido, simular envio
            if (isValid) {
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitButton.innerHTML;

                // Alterar texto do botão para envio simulado
                submitButton.disabled = true;
                submitButton.innerHTML = `
                    Enviando...
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
                `;

                // Adicionar animação de spin no CSS dinamicamente se necessário
                if (!document.getElementById('spin-keyframes')) {
                    const style = document.createElement('style');
                    style.id = 'spin-keyframes';
                    style.innerHTML = `
                        @keyframes spin { 100% { transform: rotate(360deg); } }
                        .animate-spin { animation: spin 1s linear infinite; }
                    `;
                    document.head.appendChild(style);
                }

                // Simular delay de rede
                setTimeout(() => {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';

                    // Reset do formulário e botões
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalBtnText;

                    // Remover classe focus dos inputs
                    document.querySelectorAll('.form-input').forEach(input => {
                        input.blur();
                    });

                    // Ocultar mensagem de sucesso após 5 segundos
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.className = 'form-status';
                    }, 5000);

                }, 1500);
            }
        });

        // Limpar estados de erro ao digitar
        const inputs = [document.getElementById('name'), document.getElementById('email'), document.getElementById('message')];
        inputs.forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                    const errorDiv = document.getElementById(`${input.id}-error`);
                    if (errorDiv) {
                        errorDiv.style.display = 'none';
                    }
                });
            }
        });
    }
});

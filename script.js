// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // ===== ANIMATION TITRE 3D =====
    const brandTitle = document.querySelector('.brand-title');
    
    if (brandTitle) {
        document.addEventListener('mousemove', function(e) {
            const x = (window.innerWidth / 2 - e.pageX) / 25;
            const y = (window.innerHeight / 2 - e.pageY) / 25;
            
            brandTitle.style.transform = `translateZ(50px) rotateX(${y}deg) rotateY(${-x}deg)`;
        });
    }

    // ===== EFFET DE PARALLAXE SUR DÉFILEMENT =====
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Titre et slogan
        const titleContainer = document.querySelector('.title-container');
        if (titleContainer) {
            titleContainer.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            titleContainer.style.opacity = 1 - scrollPosition * 0.002;
        }
        
        // Indicateur de défilement
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = 1 - scrollPosition * 0.01;
        }
        
        // Animation d'en-tête au défilement
        const header = document.querySelector('.header');
        if (header) {
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Animation des cartes de prix
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    });

    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Fermer le menu en cliquant sur un lien
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // ===== MODAL DEVIS =====
    const devisButton = document.getElementById('devisButton');
    const devisModal = document.getElementById('devisModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (devisButton && devisModal && closeModal) {
        devisButton.addEventListener('click', function() {
            devisModal.style.display = 'flex';
            setTimeout(() => {
                devisModal.classList.add('active');
            }, 10);
        });
        
        closeModal.addEventListener('click', function() {
            devisModal.classList.remove('active');
            setTimeout(() => {
                devisModal.style.display = 'none';
            }, 400);
        });
        
        // Fermer le modal en cliquant en dehors
        window.addEventListener('click', function(e) {
            if (e.target === devisModal) {
                devisModal.classList.remove('active');
                setTimeout(() => {
                    devisModal.style.display = 'none';
                }, 400);
            }
        });
    }

    // ===== FORMULAIRE DE DEVIS =====
    const devisForm = document.getElementById('devisForm');
    
    if (devisForm) {
        devisForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const details = document.getElementById('details').value;
            
            // Construire l'URL mailto avec les données du formulaire
            const subject = encodeURIComponent(`Demande de devis - ${name}`);
            const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nDétails du projet:\n${details}`);
            const mailtoUrl = `mailto:starten.contact@gmail.com?subject=${subject}&body=${body}`;
            
            // Ouvrir le client email
            window.location.href = mailtoUrl;
            
            // Fermer le modal après l'envoi
            devisModal.classList.remove('active');
            setTimeout(() => {
                devisModal.style.display = 'none';
                devisForm.reset();
            }, 400);
        });
    }

    // ===== DÉFILEMENT FLUIDE POUR LES LIENS D'ANCRAGE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerOffset = 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // ===== ANIMATION DES PROJETS AU DÉFILEMENT =====
    const projects = document.querySelectorAll('.project');
    
    function checkProjectsVisibility() {
        projects.forEach((project, index) => {
            const projectPosition = project.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (projectPosition < screenPosition) {
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    window.addEventListener('scroll', checkProjectsVisibility);
    checkProjectsVisibility(); // Vérifier lors du chargement initial

    // ===== EFFET 3D SUR LES CARTES DE TARIFICATION =====
    const cards = document.querySelectorAll('.pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const x = (e.clientX - cardRect.left) / cardRect.width - 0.5;
            const y = (e.clientY - cardRect.top) / cardRect.height - 0.5;
            
            card.style.transform = `translateY(-10px) scale(1.02) rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    // ===== ANIMATION DE LA CARTE GOLD =====
    const goldCard = document.querySelector('.pricing-card.gold');
    
    if (goldCard) {
        goldCard.addEventListener('mouseenter', function() {
            const goldGlow = document.querySelector('.card-gold-glow');
            if (goldGlow) {
                goldGlow.style.opacity = '1';
            }
        });
        
        goldCard.addEventListener('mouseleave', function() {
            const goldGlow = document.querySelector('.card-gold-glow');
            if (goldGlow) {
                goldGlow.style.opacity = '0';
            }
        });
    }

    // ===== ANIMATION 3D DU CADRE DE L'IMAGE DU FONDATEUR =====
    const imageFrame = document.querySelector('.image-frame');
    const imageContainer = document.querySelector('.image-placeholder');
    
    if (imageFrame && imageContainer) {
        imageContainer.addEventListener('mousemove', function(e) {
            const rect = imageContainer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            imageFrame.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
        });
        
        imageContainer.addEventListener('mouseleave', function() {
            imageFrame.style.transform = '';
        });
    }

    // ===== THREE.JS ANIMATION =====
    let scene, camera, renderer;
    const canvas = document.getElementById('threeCanvas');
    
    if (canvas && window.THREE) {
        // Initialisation de la scène
        scene = new THREE.Scene();
        
        // Configuration de la caméra
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Configuration du renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Création de particules 3D
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Matériau des particules
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x4169e1,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        // Création du système de particules
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Animation de rendu
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0003;
            particlesMesh.rotation.y += 0.0005;
            
            renderer.render(scene, camera);
        }
        
        // Redimensionnement du canvas
        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        window.addEventListener('resize', handleResize);
        
        // Démarrer l'animation
        animate();
    }

    // ===== PARTICULES INTERACTIVES =====
    const particleCanvas = document.getElementById('particleCanvas');
    
    if (particleCanvas) {
        const ctx = particleCanvas.getContext('2d');
        
        // Configuration du canvas
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
        
        // Tableau de particules
        const particles = [];
        const particleCount = 100;
        const connectionDistance = 150;
        let mouseX = 0;
        let mouseY = 0;
        
        // Suivi de la souris
        window.addEventListener('mousemove', function(e) {
            mouseX = e.x;
            mouseY = e.y;
        });
        
        // Classe Particule
        class Particle {
            constructor() {
                this.x = Math.random() * particleCanvas.width;
                this.y = Math.random() * particleCanvas.height;
                this.vx = Math.random() * 1 - 0.5;
                this.vy = Math.random() * 1 - 0.5;
                this.radius = Math.random() * 2 + 1;
                this.color = '#4169e1';
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            
            update() {
                // Mouvement
                this.x += this.vx;
                this.y += this.vy;
                
                // Rebond sur les bords
                if (this.x < 0 || this.x > particleCanvas.width) {
                    this.vx = -this.vx;
                }
                
                if (this.y < 0 || this.y > particleCanvas.height) {
                    this.vy = -this.vy;
                }
                
                // Interaction avec la souris
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (100 - distance) / 100;
                    
                    this.vx -= forceDirectionX * force * 0.5;
                    this.vy -= forceDirectionY * force * 0.5;
                }
                
                // Limiter la vitesse
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > 2) {
                    this.vx = (this.vx / speed) * 2;
                    this.vy = (this.vy / speed) * 2;
                }
            }
        }
        
        // Initialiser les particules
        function init() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        // Dessiner les connections entre particules
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(65, 105, 225, ${1 - distance / connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Boucle d'animation
        function animate() {
            // Effacer le canvas
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            
            // Mettre à jour et dessiner les particules
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            
            // Dessiner les connections
            drawConnections();
            
            requestAnimationFrame(animate);
        }
        
        // Redimensionnement du canvas
        function handleResize() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', handleResize);
        
        // Démarrer l'animation
        init();
        animate();
    }
});
        const menuLinks = document.querySelectorAll('.menu a');
        const sections = document.querySelectorAll('section');

        const offset = document.querySelector('.topbar').offsetHeight + 20; // section offset
        let isClickScrolling = false;
        
        function setActiveLink(id) {
            menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('DOMContentLoaded', () => {
            setActiveLink('home');
        });

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - offset;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            if (current) {
                setActiveLink(current);
                history.replaceState(null, '', `#${current}`);
            }
        });
        
        menuLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault(); // I'll make a custom scroll
                
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                isClickScrolling = true;
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });

                setActiveLink(targetId);
                // history.replaceState(null, '', window.location.pathname);

                setTimeout(() => {
                    isClickScrolling = false;
                }, 600);
            });
        });

        console.log('loaded.');
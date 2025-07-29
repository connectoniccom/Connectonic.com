
document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML = `
            <div class="loader">
                <img src="Images/loader.png" width="720" height="720" alt="">
            </div>
            
            <div class="content">
                <header>
                    <a href="https://wa.me/+256757760183" class="whatsapp-widget" target="_blank">
                        <div class="whatsapp-button">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                                 alt="WhatsApp" 
                                 class="whatsapp-icon">
                            <div class="whatsapp-text">WhatsApp us</div>
                       </div>
                    </a>  
                    
                    <div class="container">
                            <img src="Images/B3.jpg" width="68" height="64"  class="profile-img">
                            <h1>BYABASAJJA MATAYO</h1>
                            <p>Personal Blog & Journey</p>
                        </div>
                </header>

                <div class="nav-container">
                    <button class="more-btn" id="aboutBtn">
                        <span class="btn-text">More About Byabasajja matayo</span>
                    </button>
                </div>

                <nav>
                    <ul>
                        <h2>
                        <li><a href="#about">About Me</a></li>
                        <li><a href="#parents">My Parents</a></li>
                        <li><a href="#journey">My Journey</a></li>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#contact">Contact</a></li>
                        </h2>
                    </ul>
                </nav>

                <section id="about" class="section">
                    <div class="container">
                        <h2 class="section-title">About Me</h2>
                        <div class="about-content">
                            <div class="about-text">
                                <h3>My Story</h3>
                                <p>Hello! I'm Byabasajja matayo, a passionate writer and traveler. I was born and raised in Hoima/lubale, Uganda, where I spent the first 15 years of my life surrounded by the beautiful landscapes and vibrant culture of my homeland.</p>
                                <p>Currently, I'm living in Iganga, uganda.</p>
                                <p>Through this blog, I share my experiences, thoughts, and the lessons I've learned along the way. Join me as I navigate through life's adventures!</p>
                            </div>
                            <div class="about-image">
                            <img src="Images/B7.jpg" width="100%" height="1080"  alt="About me image">
                            </div>
                        </div>
                    </div>
                </section>

                <section id="parents" class="section">
                    <div class="container">
                        <h2 class="section-title">My Parents</h2>
                        <div class="parents-info">
                            <div class="parent-card">
                                <img src="Images/father.png" alt="Father" class="parent-img">
                                <h3></h3>
                                <p>Father</p>
                                <p><strong>Occupation:</strong>Farmer</p>
                                <p><strong>Phone:</strong> +256 754279450</p>
                                <p><strong>Email:</strong> </p>
                                <p><strong>Location:</strong> HOIMA/LUBALE, Uganda</p>
                            </div>
                            <div class="parent-card">
                                <img src="Images/mother.png" alt="Mother" class="parent-img">
                                <h3></h3>
                                <p>Mother</p>
                                <p><strong>Occupation:</strong> Teacher</p>
                                <p><strong>Phone:</strong> +256 </p>
                                <p><strong>Email:</strong> </p>
                                <p><strong>Location:</strong> Hoima/lubale, Uganda</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="about-text">
                    <h3>From Kamuli to iganga</h3>
                    <p>Growing up in Kampala was a beautiful experience. The city's energy, the warmth of its people, and the rich cultural heritage shaped who I am today. My parents provided me with a loving home and encouraged me to pursue my dreams.</p>
                    <p>In 2024, I moved to iganga to work  </p>
                    <p>Now, I split my time between kasolo and iganga, maintaining strong connections with my roots while embracing the opportunities in my new home.</p>
                </div><img src="" alt="">
            
                <section id="blog" class="section">
                    <div class="container">
                        <h2 class="section-title">Latest Blog Posts</h2>
                        <div class="blog-posts">
                            <div class="blog-card">
                             <img src="Images/B9.jpg" width="1080" height="810" alt="Blog post image" class="blog-img">
                                <div class="blog-content">
                                    <h3 class="blog-title">Embracing Change: My Move to iganga</h3>
                                    <p class="blog-date">April 15, 2024</p>
                                    <p class="blog-excerpt">Reflections on leaving my hometown and adapting to life in a new city...</p>
                                    <a href="#" class="read-more">Read More</a>
                                </div>
                            </div>

                            <div class="blog-card">
                                <img src="Images/B8.jpg" width="540" height="540" alt="Blog post image" class="blog-img">
                                <div class="blog-content">
                                    <h3 class="blog-title"></h3>
                                    <p class="blog-date">March 28, 2023</p>
                                    <p class="blog-excerpt">Cultural practices from my childhood that I maintain even while living abroad...</p>
                                    <a href="#" class="read-more">Read More</a>
                                </div>
                            </div>
                            <div class="blog-card">
                                <img src="Images/B2.jpg" width="540" height="540" alt="Blog post image" class="blog-img">
                                <div class="blog-content">
                                    <h3 class="blog-title">Balancing Two Homes</h3>
                                    <p class="blog-date">March 10, 2023</p>
                                    <p class="blog-excerpt">How I maintain connections with both kamuli and iganga, and what each place means to me...</p>
                                    <a href="#" class="read-more">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            
                <section id="contact" class="section">
                    <div class="container">
                        <h2 class="section-title">Contact Me</h2>
                        <div class="contact-info">
                            <div class="contact-card">
                                <div class="contact-icon">📱</div>
                                <h3>Phone</h3>
                                <p>+256 757760183</p>
                                <p>+256 780641327</p>
                            </div>
                            <div class="contact-card">
                                <div class="contact-icon">✉️</div>
                                <h3>Email</h3>
                                <p>Byabasajjam@gmail.com</p>
                                <p></p>
                            </div>
                            <div class="contact-card">
                                <div class="contact-icon">📍</div>
                                <h3>Address</h3>
                                <p>Hoima/lubale, Uganda</p>
                                <p>Now in iganga/kosolo, Uganda</p>
                            </div>
                        </div>
                    </div>
                </section>
            
                 <footer>
                    <div class="container">
                        <p><marquee>&copy; 2025 Byabasajja matayo's Personal Blog. All rights reserved.</marquee></p>
                        <div class="social-links">
                            <a href="https://www.facebook.com/profile.php?id=100089358362176&mibextid=ZbWKwL" aria-label="Facebook"><img src="Images/download.png" width="30px" height="30px" alt="" /></a>
                            <a href="https://x.com/Byabasajja98723?t=BkEmhkepLNMiS3a-M8idZw&s=09" aria-label="Twitter"><img src="Images/Twitter.png" width="30px" height="30px" alt="" /></a>
                            <a href="#" aria-label="Instagram"><img src="Images/Instagram.png" width="30px" height="30px" alt="" /></a>
                            <a href="#" aria-label="LinkedIn"><img src="Images/linkin.png" width="30px" height="30px" alt="" /></a>
                             <a href="https://youtube.com/@byabasajjamatayo366?si=W6D1c83P2ED-Ehmo" aria-label="Youtube"><img src="Images/Youtube_logo.png" width="30px" height="30px" alt="" /></a>
                            <a href="https://www.tiktok.com/@byabasajjamatayo3?_t=ZM-8rlvjK7MISe&_r=1" aria-label="Tiktok"><img src="Images/tiktok.png" width="30px" height="30px" alt="" /></a>
                        </div>
                        </div>
                        <p>Created by byabasajja matayo ❤️ from Uganda/hoima/lubale🤴🤴</p>
                        <div id="name">&reg;</div>
                    </div>
                    <div id="clock"></div>
                </footer>
            
                <button class="dark-mode-toggle" aria-label="Toggle dark mode"><img src="Images/B4.jpg" width="30" height="30"></button>
                <div id="api-message">Loading API message...</div>
        `;

        // my loader
        setTimeout(() => {
            const loader = document.querySelector('.loader');
            if (loader) loader.style.display = 'none';
            const content = document.querySelector('.content');
            if (content) content.style.display = 'block';
        },4000);

        // JavaScript for interactive elements
        // 1. Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }

                // Update active nav link
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            });
        });

        // 2. Highlight active navigation link based on scroll position
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;

            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        
        // 4. Blog post data (simulated)
        const blogPosts = [
            {
                id: 1,
                title: "Embracing Change: My Move to Nairobi",
                date: "April 15, 2025",
                excerpt: "Reflections on leaving my hometown and adapting to life in a new city...",
                image: "https://images.unsplash.com/photo-1496442226666-8d1883a95c4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                content: "<p>Full content would go here with more details about my experience moving from Kampala to Nairobi...</p>"
            },
            {
                id: 2,
                title: "Ugandan Traditions I Still Cherish",
                date: "March 28, 2025",
                excerpt: "Cultural practices from my childhood that I maintain even while living abroad...",
                image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                content: "<p>Full content would go here with descriptions of Ugandan traditions...</p>"
            },
            {
                id: 3,
                title: "Balancing Two Homes",
                date: "March 10, 2025",
                excerpt: "How I maintain connections with both Uganda and Kenya, and what each place means to me...",
                image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                content: "<p>Full content would go here about maintaining connections with both countries...</p>"
            }
        ];

        // 5. Blog post modal functionality
        function setupBlogModal(post) {
            const modal = document.createElement('div');
            modal.className = 'blog-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${post.image}" alt="${post.title}" class="modal-image">
                    <h2>${post.title}</h2>
                    <p class="modal-date">${post.date}</p>
                    <div class="modal-body">${post.content}</div>
                </div>
            `;

            document.body.appendChild(modal);

            // Close modal when clicking X
            modal.querySelector('.close-modal').addEventListener('click', function() {
                modal.remove();
            });

            // Close modal when clicking outside content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }

        // 6. Handle "Read More" button clicks
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('read-more')) {
                e.preventDefault();
                const postId = parseInt(e.target.getAttribute('data-post-id'));
                const post = blogPosts.find(p => p.id === postId);

                if (post) {
                    setupBlogModal(post);
                }
            }
        });

        // 7. Update copyright year automatically
        const copyright = document.querySelector('footer p:first-of-type');
        if(copyright) copyright.innerHTML =
            `<marquee>&copy; ${new Date().getFullYear()} Byabasajja matayo's Personal Blog. All rights reserved.</marquee>`;

        // 8. Initialize first nav link as active
        const firstNavLink = document.querySelector('nav a');
        if (firstNavLink) firstNavLink.classList.add('active');

        // Fetch data from the Vercel serverless function
        fetch('/api/hello')
          .then(response => response.json())
          .then(data => {
            const apiMessage = document.getElementById('api-message');
            if(apiMessage) apiMessage.innerText = data.message;
          })
          .catch(error => {
            console.error('Error:', error);
            const apiMessage = document.getElementById('api-message');
            if(apiMessage) apiMessage.innerText = 'Failed to load API message.';
          });

        const carousel = document.querySelector('.carousel');
        if (carousel) {
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const indicators = document.querySelectorAll('.indicator');

            let currentIndex = 0;
            const slideCount = slides.length;

            // Auto-play configuration
            let autoplayInterval = 5000; // 5 seconds
            let autoplay = setInterval(nextSlide, autoplayInterval);

            // Pause autoplay when hovering over carousel
            const carouselContainer = document.querySelector('.carousel-container');
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoplay);
            });

            carouselContainer.addEventListener('mouseleave', () => {
                autoplay = setInterval(nextSlide, autoplayInterval);
            });

            // Update carousel position
            function updateCarousel() {
                carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

                // Update indicators
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });

                // Pause all videos except current slide
                const videos = document.querySelectorAll('video');
                videos.forEach((video, index) => {
                    if (index === currentIndex) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            }

            // Next slide function
            function nextSlide() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }

            // Previous slide function
            function prevSlide() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateCarousel();
            }

            // Button event listeners
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);

            // Indicator click event
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    currentIndex = parseInt(this.getAttribute('data-slide'));
                    updateCarousel();
                });
            });

            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight') {
                    nextSlide();
                } else if (e.key === 'ArrowLeft') {
                    prevSlide();
                }
            });

            // Touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;

            carouselContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});

            carouselContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, {passive: true});

            function handleSwipe() {
                if (touchEndX < touchStartX) {
                    nextSlide(); // Swipe left
                } else if (touchEndX > touchStartX) {
                    prevSlide(); // Swipe right
                }
            }
        }

        const viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewportMeta);

        const nameText = "Byabasajja Matayo";
        const nameElement = document.getElementById("name");
        let index = 0;

        function typeName() {
            if (nameElement) {
                if (index < nameText.length) {
                    nameElement.innerText += nameText[index];
                    index++;
                    setTimeout(typeName, 300); // Adjust the speed here
                } else {
                    setTimeout(() => {
                        nameElement.innerText = "";
                        index = 0;
                        typeName();
                    }, 1000); // Delay before resetting
                }
            }
        }

        typeName();

        function updateClock() {
            const clock = document.getElementById('clock');
            if(clock) {
                const now = new Date();
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');
                clock.innerText = `${hours}:${minutes}:${seconds}`;
            }
        }

        setInterval(updateClock, 1000);
        updateClock();

        const aboutBtn = document.getElementById('aboutBtn');
                
        if(aboutBtn) aboutBtn.addEventListener('click', function() {
            // Navigate to about page (replace with your actual link)
            window.location.href = "Card.html";
        });
    }
});

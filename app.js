document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('root');
    const pagePath = window.location.pathname;

    const indexContent = `
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

    const cardContent = `
        <div class="card-container">
            <!-- FRONT SIDE -->
            <div class="card-side">
                <div class="rotating-text" id="front-text"></div>
                
                <div class="decorative flower" style="top:20px; left:20px;"></div>
                <div class="decorative emblem" style="bottom:20px; right:20px;"></div>
                <div class="decorative rotating-bird" style="top:50%; left:50%;"></div>
                
                <div class="front-content">
                    <div class="uganda-header">
              <div class="nav-container">           
            <button class="more-btn" id="aboutBtn">
                <span class="btn-text">More About Me</span>
            </button>
                        <h1>UGANDA BLOG ID</h1>
                        <p>Digital Creator Verification</p>
                    </div>
                    <div class="id-main">
                        <div class="id-photo-section">
                            <div class="profile-photo" id="profile-photo"><image src="Images/B4.jpg" width="124" height="154"></div>
                            <div class="uganda-map"><image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_5TF4t5uFZISn4eBzNcZjvIXNmZ9gj0vRjQ&s" width="122" height="101"></div>
                        </div>
                        
                        <div class="id-details">
                            <div class="detail-row">
                                <span class="detail-label">Name:</span>
                                <span id="name-field">BYABASAJJA MATAYO</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Country:</span>
                                <span>Uganda</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Village:</span>
                                <span id="village-field">Lubale</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">County:</span>
                                <span id="county-field">Lubale County</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Blog:</span>
                                <span>ugandatravel.blog</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="video-grid">
                        <div class="small-video">
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/WDXPJWIgX-o?autoplay=1&mute=1&controls=0&loop=1" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div class="small-video">
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/WDXPJWIgX-o?autoplay=1&mute=1&controls=0&loop=1" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- BACK SIDE -->
            <div class="card-side back-side">
                <div class="rotating-text" id="back-text"></div>
                
                <div class="decorative flower" style="bottom:20px; left:20px;"></div>
                <div class="decorative emblem" style="top:20px; right:20px;"></div>
                 <div class="decorative rotating-bird" style="top:30%; left:30%;"></div>
                <div class="decorative rotating-bird" style="bottom:30%; right:30%; animation-delay: 5s;"></div>
                
                <div class="back-content">
                    <div class="parents-header">
                         <div class="nav-container">
            <button class="more-btn" id="aboutBtn">
                <span class="btn-text">More About Me</span>
            </button>
                         </div>
                        <h2>PARENTAL INFORMATION</h2>
                    </div>
                    
                    <div class="parents-content">
                        <div class="parent">
                            <div class="parent-photo" id="father-photo"><image src="Images/father.png" width="130" height="130"></div>
                            <div class="parent-title">FATHER</div>
                            <div class="parent-details">
                                <p><strong>Name:</strong> Byabasajja's father</p>
                                <p><strong>Occupation:</strong> Farmer</p>
                                <p><strong>Village:</strong> Lubale</p>
                                <button class="parent-chat-btn" id="chat-father">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp"> Chat with Father
                                </button>
                            </div>
                        </div>
                        
                        <div class="parent">
                            <div class="parent-photo" id="mother-photo"><image src="Images/mother.png" width="130" height="130"></div>
                            <div class="parent-title">MOTHER</div>
                            <div class="parent-details">
                                <p><strong>Name:</strong> Byabasajja' Mother</p>
                                <p><strong>Occupation:</strong> Farmer</p>
                                <p><strong>Village:</strong> Lubale</p>
                                <button class="parent-chat-btn" id="chat-mother">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp"> Chat with Mother
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="video-grid">
                        <div class="small-video">
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/WDXPJWIgX-o?autoplay=1&mute=1&controls=0&loop=1" frameborder="0" allowfullscreen></iframe>
                        </div>
                        <div class="small-video">
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/WDXPJWIgX-o?autoplay=1&mute=1&controls=0&loop=1" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- WhatsApp Button -->
        <div class="whatsapp-button" id="whatsapp-button">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
        </div>

        <!-- WhatsApp Chat Container -->
        <div class="whatsapp-chat" id="whatsapp-chat">
            <div class="chat-header">
                <div class="chat-profile">
                    <img id="chat-profile-img" class="chat-profile-img" src="Images/B4.jpg" alt="Profile">
                    <div class="chat-profile-info">
                        <h4 class="chat-profile-name" id="chat-profile-name">Matayo</h4>
                        <p class="chat-profile-status" id="chat-profile-status">Online</p>
                        <div class="typing-indicator" id="typing-indicator">typing...</div>
                    </div>
                </div>
                <button class="chat-close" id="chat-close">&times;</button>
            </div>
            <div class="chat-messages" id="chat-messages">
                <!-- Messages will appear here -->
            </div>
            <div class="chat-input">
                <input type="text" id="message-input" placeholder="Type a message...">
                <button id="send-button">Send</button>
            </div>
        </div>

        <!-- Phone Number Input Modal -->
        <div class="phone-modal" id="phone-modal">
            <div class="phone-container">
                <h3>WhatsApp Verification</h3>
                <p>Please enter your WhatsApp phone number with country code:</p>
                <input type="tel" class="phone-input" id="user-phone" placeholder="+256XXXXXXXXX">
                <button class="phone-submit" id="phone-submit">Continue</button>
            </div>
        </div>
    `;

    if (root) {
        if (pagePath.endsWith('index.html') || pagePath === '/') {
            root.innerHTML = indexContent;
        } else if (pagePath.endsWith('Card.html')) {
            root.innerHTML = cardContent;
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML = `
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
        
        // WhatsApp Configuration
        const CHAT_PROFILES = {
            matayo: {
                name: "Matayo Kamuntu",
                phone: "+256757760183", // Replace with your actual number
                image: "https://randomuser.me/api/portraits/men/1.jpg",
                status: "Uganda Travel Blogger",
                typing: false
            },
            father: {
                name: "James Kamuntu",
                phone: "+256XXXXXXXXX", // Replace with father's number
                image: "https://randomuser.me/api/portraits/men/40.jpg",
                status: "Farmer",
                typing: false
            },
            mother: {
                name: "Mary Kamuntu",
                phone: "+256XXXXXXXXX", // Replace with mother's number
                image: "https://randomuser.me/api/portraits/women/40.jpg",
                status: "Teacher",
                typing: false
            }
        };
        
        let currentUserPhone = null;
        let chatHistory = {};
        let currentChat = 'matayo';

        // DOM Elements
        const phoneModal = document.getElementById('phone-modal');
        const userPhoneInput = document.getElementById('user-phone');
        const phoneSubmit = document.getElementById('phone-submit');
        const whatsappButton = document.getElementById('whatsapp-button');
        const whatsappChat = document.getElementById('whatsapp-chat');
        const chatClose = document.getElementById('chat-close');
        const chatMessages = document.getElementById('chat-messages');
        const messageInput = document.getElementById('message-input');
        const sendButton = document.getElementById('send-button');
        const chatProfileImg = document.getElementById('chat-profile-img');
        const chatProfileName = document.getElementById('chat-profile-name');
        const chatProfileStatus = document.getElementById('chat-profile-status');
        const typingIndicator = document.getElementById('typing-indicator');
        const chatFatherBtn = document.getElementById('chat-father');
        const chatMotherBtn = document.getElementById('chat-mother');

        // Initialize chat history
        function initChatHistory() {
            if (!localStorage.getItem('chatHistory')) {
                localStorage.setItem('chatHistory', JSON.stringify({}));
            }
            chatHistory = JSON.parse(localStorage.getItem('chatHistory'));
            
            if (!chatHistory.matayo) chatHistory.matayo = [];
            if (!chatHistory.father) chatHistory.father = [];
            if (!chatHistory.mother) chatHistory.mother = [];
        }

        // Check if user has provided phone number
        function checkUserPhone() {
            if (localStorage.getItem('userPhone')) {
                currentUserPhone = localStorage.getItem('userPhone');
                phoneModal.style.display = 'none';
            } else {
                phoneModal.style.display = 'flex';
            }
        }

        // Save user phone number
        phoneSubmit.addEventListener('click', function() {
            const phone = userPhoneInput.value.trim();
            if (phone && phone.startsWith('+')) {
                currentUserPhone = phone;
                localStorage.setItem('userPhone', phone);
                phoneModal.style.display = 'none';
                initChatHistory();
                loadChat('matayo');
                
                // Check if number is on WhatsApp (simulated)
                setTimeout(() => {
                    console.log(`Verified ${phone} is on WhatsApp`);
                }, 1000);
            } else {
                alert('Please enter a valid phone number with country code (e.g., +256...)');
            }
        });

        // WhatsApp button click
        whatsappButton.addEventListener('click', function() {
            if (!currentUserPhone) {
                checkUserPhone();
                return;
            }
            whatsappChat.style.display = 'flex';
            loadChat(currentChat);
        });

        // Close chat
        chatClose.addEventListener('click', function() {
            whatsappChat.style.display = 'none';
        });

        // Add message to chat
        function addMessage(text, isReceived, isSystem = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isReceived ? 'received' : 'sent'}`;
            if (isSystem) messageDiv.className += ' system';
            messageDiv.textContent = text;
            
            const timeDiv = document.createElement('div');
            timeDiv.className = 'message-time';
            timeDiv.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            messageDiv.appendChild(timeDiv);
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Send message
        function sendMessage() {
            const message = messageInput.value.trim();
            if (message) {
                // Add to chat UI
                addMessage(message, false);
                
                // Save to chat history
                chatHistory[currentChat].push({
                    sender: 'user',
                    message: message,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
                
                // Clear input
                messageInput.value = '';
                
                // Show typing indicator
                showTyping(true);
                
                // Open WhatsApp with the message
                const contact = CHAT_PROFILES[currentChat];
                const whatsappUrl = `https://wa.me/${contact.phone}?text=${encodeURIComponent(`Message from ${currentUserPhone}: ${message}`)}`;
                window.open(whatsappUrl, '_blank');
                
                // Simulate response after delay
                setTimeout(() => {
                    showTyping(false);
                    simulateResponse();
                }, 2000);
            }
        }

        // Show/hide typing indicator
        function showTyping(show) {
            CHAT_PROFILES[currentChat].typing = show;
            typingIndicator.style.display = show ? 'block' : 'none';
            if (show) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }

        // Simulate response from contact
        function simulateResponse() {
            const responses = {
                matayo: [
                    "Thanks for your message!",
                    "I'll get back to you soon about your Uganda travel questions.",
                    "How are you doing today?",
                    "Welcome to Uganda Travel Blog!",
                    "What would you like to know about Uganda?"
                ],
                father: [
                    "This is James responding.",
                    "I'm busy on the farm now, what do you need?",
                    "The crops are doing well this season.",
                    "I can show you around the village when you visit.",
                    "Have you been taking care of yourself?"
                ],
                mother: [
                    "Mary here, how can I help?",
                    "I'm teaching right now, can I call you later?",
                    "Education is very important for our children.",
                    "Have you been reading your books?",
                    "Let me know if you need help with anything."
                ]
            };
            
            const response = responses[currentChat][Math.floor(Math.random() * responses[currentChat].length)];
            addMessage(response, true);
            
            chatHistory[currentChat].push({
                sender: 'them',
                message: response,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }

        // Load chat history and update profile
        function loadChat(chat) {
            currentChat = chat;
            chatMessages.innerHTML = '';
            
            // Update chat profile
            const contact = CHAT_PROFILES[chat];
            chatProfileImg.src = contact.image;
            chatProfileName.textContent = contact.name;
            chatProfileStatus.textContent = contact.status;
            typingIndicator.style.display = 'none';
            
            // Add welcome message if empty
            if (chatHistory[chat].length === 0) {
                addMessage(`Hello! This is ${contact.name.split(' ')[0]}. How can I help you?`, true);
                return;
            }
            
            // Load existing messages
            chatHistory[chat].forEach(msg => {
                addMessage(msg.message, msg.sender !== 'user');
            });
        }

        // Initialize rotating text
        function initRotatingText() {
            const frontText = document.getElementById('front-text');
            const backText = document.getElementById('back-text');
            const text = "UGANDA BLOG ID • OFFICIAL VERIFICATION • PEARL OF AFRICA • ";
            
            if (frontText && backText) {
                for (let i = 0; i < text.length; i++) {
                    const frontSpan = document.createElement('span');
                    frontSpan.textContent = text[i];
                    frontSpan.style.transform = `rotate(${i * (360 / text.length)}deg)`;
                    frontText.appendChild(frontSpan);
                    
                    const backSpan = document.createElement('span');
                    backSpan.textContent = text[i];
                    backSpan.style.transform = `rotate(${i * (360 / text.length)}deg)`;
                    backText.appendChild(backSpan);
                }
            }
        }

        // Initialize photo click events
        function initPhotoEvents() {
            const profilePhoto = document.getElementById('profile-photo');
            if(profilePhoto) profilePhoto.addEventListener('click', function() {
                alert("This is Matayo Kamuntu - Uganda Travel Blogger");
            });

            const fatherPhoto = document.getElementById('father-photo');
            if(fatherPhoto) fatherPhoto.addEventListener('click', function() {
                alert("This is James Kamuntu - Father and Farmer");
            });

            const motherPhoto = document.getElementById('mother-photo');
            if(motherPhoto) motherPhoto.addEventListener('click', function() {
                alert("This is Mary Kamuntu - Mother and Teacher");
            });
        }

        // Initialize parent chat buttons
        function initParentChatButtons() {
            const chatFatherBtn = document.getElementById('chat-father');
            if(chatFatherBtn) chatFatherBtn.addEventListener('click', function() {
                if (!currentUserPhone) {
                    checkUserPhone();
                    return;
                }
                currentChat = 'father';
                whatsappChat.style.display = 'flex';
                loadChat('father');
            });

            const chatMotherBtn = document.getElementById('chat-mother');
            if(chatMotherBtn) chatMotherBtn.addEventListener('click', function() {
                if (!currentUserPhone) {
                    checkUserPhone();
                    return;
                }
                currentChat = 'mother';
                whatsappChat.style.display = 'flex';
                loadChat('mother');
            });
        }

        // Initialize decorative elements
        function initDecorations() {
            function createFloatingDecoration() {
                const decoration = document.createElement('div');
                decoration.className = 'decorative flower';
                decoration.style.left = Math.random() * 100 + '%';
                decoration.style.top = Math.random() * 100 + '%';
                decoration.style.opacity = Math.random() * 0.5 + 0.3;
                decoration.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                decoration.style.animationDuration = Math.random() * 15 + 10 + 's';
                
                const side = Math.random() > 0.5 ? document.querySelector('.card-side') : document.querySelector('.back-side');
                if (side) side.appendChild(decoration);
            }

            // Create multiple decorations
            for (let i = 0; i < 5; i++) {
                createFloatingDecoration();
            }
        }

        // Initialize
        
        initRotatingText();
        initPhotoEvents();
        initDecorations();
        initChatHistory();
        checkUserPhone();
        initParentChatButtons();
        
        // Set up send button
        if(sendButton) sendButton.addEventListener('click', sendMessage);
        if(messageInput) messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Set your profile image on the WhatsApp button
        const whatsappImg = whatsappButton.querySelector('img');
        whatsappImg.src = CHAT_PROFILES.matayo.image;
        

        const aboutBtn = document.getElementById('aboutBtn');
                
        if(aboutBtn) aboutBtn.addEventListener('click', function() {
            // Navigate to about page (replace with your actual link)
            window.location.href = "index.html";
        });
    }
});

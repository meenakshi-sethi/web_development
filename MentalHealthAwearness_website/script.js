// Add JavaScript code for your web site here and call it from index.html.
// Add JavaScript code for your web site here and call it from index.html.
/*** Dark Mode - FIXED ***
  
  Purpose:
  - Use this code to add a light mode toggle feature to your website.
  - Fixed to work with original gradient background theme

  When To Modify:
  - Project 5 (REQUIRED FEATURE) 
  - Any time after
***/

// Step 1: Select the theme button
const themeButton = document.getElementById('theme-button');

// Step 2: Write the callback function - FIXED
const toggleDarkMode = () => {
    // Toggle light mode class on body
    document.body.classList.toggle('light-mode');
    
    // Update button text and ensure visual change is clear
    if (document.body.classList.contains('light-mode')) {
        themeButton.textContent = '🌙 Dark Mode';
        showNotification('Switched to light mode ☀️');
    } else {
        themeButton.textContent = '☀️ Light Mode';
        showNotification('Switched to dark mode 🌙');
    }
    
    // Save preference to localStorage if available
    try {
        const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme-preference', theme);
    } catch (e) {
        console.log('Unable to save theme preference');
    }
    
    // Force repaint to ensure visual change
    document.body.offsetHeight;
}

// Step 3: Register a 'click' event listener for the theme button
if (themeButton) {
    themeButton.addEventListener('click', toggleDarkMode);
}

/*** Reduce Motion Feature ***
  
  Purpose:
  - Allow users to reduce animations for accessibility
  - Specifically controls modal image animations per Week 9 requirements

  When To Modify:
  - Project 9 (STRETCH FEATURE)
  - Any time after
***/

const reduceMotionButton = document.getElementById('reduce-motion-button');
let motionReduced = false;

// Reduce Motion function
const toggleReduceMotion = () => {
    motionReduced = !motionReduced;
    
    if (motionReduced) {
        document.body.classList.add('reduce-motion');
        reduceMotionButton.textContent = '🎭 Enable Motion';
        showNotification('Motion reduced for accessibility - animations disabled');
        
        // Stop any currently running modal animations
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        if (animationInterval2) {
            clearInterval(animationInterval2);
            animationInterval2 = null;
        }
        
        // Reset modal image if it exists
        if (modalImage) {
            modalImage.style.transform = 'rotate(0deg) scale(1) translateY(0px)';
            modalImage.style.filter = 'brightness(1) saturate(1)';
            modalImage.style.transition = '';
        }
        
        // Reset animation variables
        rotateFactor = 0;
        scaleFactor = 1;
        
    } else {
        document.body.classList.remove('reduce-motion');
        reduceMotionButton.textContent = '🎭 Reduce Motion';
        showNotification('Motion enabled - animations active');
    }
    
    // Save preference
    try {
        localStorage.setItem('motion-preference', motionReduced ? 'reduced' : 'enabled');
    } catch (e) {
        console.log('Unable to save motion preference');
    }
}

if (reduceMotionButton) {
    reduceMotionButton.addEventListener('click', toggleReduceMotion);
}

/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and details they 
    entered should be added to the list of participants.

  When To Modify:
  - Project 6 (REQUIRED FEATURE)
  - Project 6 (STRETCH FEATURE) 
  - Project 7 (REQUIRED FEATURE)
  - Project 9 (REQUIRED FEATURE)
  - Any time between / after
***/

// Step 1: Add query for the submit RSVP buttons
const meetupButton = document.getElementById('meetup-button');
const volunteerButton = document.getElementById('volunteer-button');

// Counters for participants with display elements
let meetupCount = 47;
let volunteerCount = 23;
let totalRSVPCount = meetupCount + volunteerCount; // Combined RSVP counter

// Create and display RSVP counter
function createRSVPCounter() {
    // Check if counter already exists
    let counterElement = document.getElementById('total-rsvp-counter');
    if (!counterElement) {
        counterElement = document.createElement('div');
        counterElement.id = 'total-rsvp-counter';
        counterElement.className = 'rsvp-counter';
        counterElement.innerHTML = `
            <div class="counter-content">
                <span class="counter-icon">🎯</span>
                <div class="counter-text">
                    <span class="counter-number" id="total-count">${totalRSVPCount}</span>
                    <span class="counter-label">Total RSVPs</span>
                </div>
            </div>
        `;
        
        // Add hover effect
        counterElement.addEventListener('mouseenter', () => {
            counterElement.style.transform = 'scale(1.05)';
        });
        
        counterElement.addEventListener('mouseleave', () => {
            counterElement.style.transform = 'scale(1)';
        });
        
        document.body.appendChild(counterElement);
    }
    
    // Update the counter display
    const countElement = document.getElementById('total-count');
    if (countElement) {
        countElement.textContent = totalRSVPCount;
    }
}

// Update RSVP counter function
function updateRSVPCounter() {
    totalRSVPCount = meetupCount + volunteerCount;
    const countElement = document.getElementById('total-count');
    if (countElement) {
        // Animate the number change
        countElement.style.transform = 'scale(1.2)';
        countElement.textContent = totalRSVPCount;
        setTimeout(() => {
            countElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Flash the counter
    const counterElement = document.getElementById('total-rsvp-counter');
    if (counterElement && !motionReduced) {
        counterElement.style.animation = 'pulse 0.6s ease';
        setTimeout(() => {
            counterElement.style.animation = '';
        }, 600);
    }
}

const addMeetupParticipant = (person) => {
    // Step 2: Write code to manipulate the DOM
    
    // Get the participants container
    const participantsContainer = document.getElementById('meetup-participants');
    
    // Create new participant element
    const newParticipant = document.createElement('p');
    newParticipant.textContent = `🎟️ ${person.name} from ${person.country} has joined our community!`;
    newParticipant.style.opacity = '0';
    newParticipant.style.transform = 'translateY(20px)';
    
    // Add participant to the list
    if (participantsContainer) {
        participantsContainer.appendChild(newParticipant);
        
        // Animate in the new participant
        if (!motionReduced) {
            setTimeout(() => {
                newParticipant.style.transition = 'all 0.5s ease';
                newParticipant.style.opacity = '1';
                newParticipant.style.transform = 'translateY(0)';
            }, 100);
        } else {
            newParticipant.style.opacity = '1';
            newParticipant.style.transform = 'translateY(0)';
        }
    }
    
    // Update counter
    meetupCount++;
    const countElement = document.getElementById('meetup-count');
    if (countElement) {
        countElement.textContent = meetupCount;
    }
    
    // Update total RSVP counter
    updateRSVPCounter();
    
    // Show success modal
    toggleModal(person, 'meetup');
}

const addVolunteerParticipant = (person) => {
    // Get the participants container
    const participantsContainer = document.getElementById('volunteer-participants');
    
    // Create new participant element
    const newParticipant = document.createElement('p');
    const roleText = person.background === 'mental-health-professional' ? 'Mental Health Professional' :
                    person.background === 'current-student' ? 'Peer Mentor' :
                    person.background === 'former-student' ? 'Alumni Mentor' : 'Community Advocate';
    
    newParticipant.textContent = `🌟 ${person.name} from ${person.location} (${roleText})`;
    newParticipant.style.opacity = '0';
    newParticipant.style.transform = 'translateY(20px)';
    
    // Add participant to the list
    if (participantsContainer) {
        participantsContainer.appendChild(newParticipant);
        
        // Animate in the new participant
        if (!motionReduced) {
            setTimeout(() => {
                newParticipant.style.transition = 'all 0.5s ease';
                newParticipant.style.opacity = '1';
                newParticipant.style.transform = 'translateY(0)';
            }, 100);
        } else {
            newParticipant.style.opacity = '1';
            newParticipant.style.transform = 'translateY(0)';
        }
    }
    
    // Update counter
    volunteerCount++;
    const countElement = document.getElementById('volunteer-count');
    if (countElement) {
        countElement.textContent = volunteerCount;
    }
    
    // Update total RSVP counter
    updateRSVPCounter();
    
    // Show success modal
    toggleModal(person, 'volunteer');
}

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - Project 7 (REQUIRED FEATURE)
  - Project 7 (STRETCH FEATURE)
  - Project 9 (REQUIRED FEATURE)
  - Any time between / after
***/

const validateMeetupForm = () => {
    let containsErrors = false;
    
    // Get form inputs
    const formInputs = document.getElementById("meetup-form").elements;
    
    // Week 9 Step 1-A: Create person object with appropriate properties
    const person = {
        name: document.getElementById('meetup-name').value.trim(),
        email: document.getElementById('meetup-email').value.trim(),
        country: document.getElementById('meetup-country').value.trim(),
        timezone: document.getElementById('meetup-timezone').value,
        focusArea: document.getElementById('meetup-focus').value,
        experience: document.getElementById('meetup-experience').value
    };
    
    // Week 9 Requirement: Loop through all inputs for basic validation using object properties
    for (let i = 0; i < formInputs.length; i++) {
        const input = formInputs[i];
        
        // Skip non-required fields and buttons
        if (!input.hasAttribute('required') || input.type === 'button' || input.tagName === 'BUTTON') {
            input.classList.remove('error');
            continue;
        }
        
        // Week 9 Requirement: Validate using person object properties
        let fieldValue = '';
        switch(input.id) {
            case 'meetup-name':
                fieldValue = person.name;
                break;
            case 'meetup-email':
                fieldValue = person.email;
                break;
            case 'meetup-country':
                fieldValue = person.country;
                break;
            default:
                fieldValue = input.value.trim();
        }
        
        // Check if required field is less than 2 characters
        if (fieldValue.length < 2) {
            containsErrors = true;
            input.classList.add('error');
            
            // Add shake animation if motion is enabled
            if (!motionReduced) {
                input.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
            }
        } else {
            input.classList.remove('error');
        }
    }
    
    // Week 9 Requirement: Email validation using person object
    const emailInput = document.getElementById('meetup-email');
    if (emailInput && person.email.length >= 2 && !person.email.includes('@')) {
        containsErrors = true;
        emailInput.classList.add('error');
        showNotification('Please enter a valid email address with @', 'error');
        
        if (!motionReduced) {
            emailInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                emailInput.style.animation = '';
            }, 500);
        }
    } else if (emailInput && person.email.includes('@')) {
        emailInput.classList.remove('error');
    }
    
    // Week 9 Step 1-A: If no errors, call addParticipant(person) with object
    if (!containsErrors) {
        addMeetupParticipant(person);
        
        // Clear the form
        for (let i = 0; i < formInputs.length; i++) {
            if (formInputs[i].type !== 'button' && formInputs[i].tagName !== 'BUTTON') {
                formInputs[i].value = "";
                formInputs[i].classList.remove('error');
            }
        }
        
        showNotification('Successfully registered for virtual meetup! 💻');
    } else {
        showNotification('Please fix the highlighted fields and try again', 'error');
    }
}

const validateVolunteerForm = () => {
    let containsErrors = false;
    
    // Get form inputs
    const formInputs = document.getElementById("volunteer-form").elements;
    
    // Week 9 Step 1-A: Create person object with appropriate properties
    const person = {
        name: document.getElementById('volunteer-name').value.trim(),
        email: document.getElementById('volunteer-email').value.trim(),
        location: document.getElementById('volunteer-location').value.trim(),
        background: document.getElementById('volunteer-background').value,
        interest: document.getElementById('volunteer-interest').value,
        availability: document.getElementById('volunteer-availability').value,
        languages: document.getElementById('volunteer-languages').value.trim(),
        experience: document.getElementById('volunteer-experience').value.trim()
    };
    
    // Week 9 Requirement: Loop through all inputs for basic validation using object properties
    for (let i = 0; i < formInputs.length; i++) {
        const input = formInputs[i];
        
        // Skip non-required fields and buttons
        if (!input.hasAttribute('required') || input.type === 'button' || input.tagName === 'BUTTON') {
            input.classList.remove('error');
            continue;
        }
        
        // Week 9 Requirement: Validate using person object properties
        let fieldValue = '';
        switch(input.id) {
            case 'volunteer-name':
                fieldValue = person.name;
                break;
            case 'volunteer-email':
                fieldValue = person.email;
                break;
            case 'volunteer-location':
                fieldValue = person.location;
                break;
            default:
                fieldValue = input.value.trim();
        }
        
        // Check if required field is less than 2 characters
        if (fieldValue.length < 2) {
            containsErrors = true;
            input.classList.add('error');
            
            // Add shake animation if motion is enabled
            if (!motionReduced) {
                input.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
            }
        } else {
            input.classList.remove('error');
        }
    }
    
    // Week 9 Requirement: Email validation using person object
    const emailInput = document.getElementById('volunteer-email');
    if (emailInput && person.email.length >= 2 && !person.email.includes('@')) {
        containsErrors = true;
        emailInput.classList.add('error');
        showNotification('Please enter a valid email address with @', 'error');
        
        if (!motionReduced) {
            emailInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                emailInput.style.animation = '';
            }, 500);
        }
    } else if (emailInput && person.email.includes('@')) {
        emailInput.classList.remove('error');
    }
    
    // Week 9 Step 1-A: If no errors, call addParticipant(person) with object
    if (!containsErrors) {
        addVolunteerParticipant(person);
        
        // Clear the form
        for (let i = 0; i < formInputs.length; i++) {
            if (formInputs[i].type !== 'button' && formInputs[i].tagName !== 'BUTTON') {
                formInputs[i].value = "";
                formInputs[i].classList.remove('error');
            }
        }
        
        showNotification('Successfully registered as volunteer! 🌟');
    } else {
        showNotification('Please fix the highlighted fields and try again', 'error');
    }
}

// Step 3: Add event listeners for form buttons
if (meetupButton) {
    meetupButton.addEventListener('click', validateMeetupForm);
}

if (volunteerButton) {
    volunteerButton.addEventListener('click', validateVolunteerForm);
}

/*** Modal ***
  
  Purpose:
  - Use this code to add a pop-up modal to your website.

  When To Modify:
  - Project 9 (REQUIRED FEATURE)
  - Project 9 (STRETCH FEATURE)
  - Any time after
***/

// Animation variables and animateImage() function - Week 9 Requirements
let rotateFactor = 0;
let scaleFactor = 1;
let animationInterval;
let animationInterval2;
const modalImage = document.getElementById('modal-img');

// Enhanced animation function with multiple effects
const animateImage = () => {
    // Rotation animation (Week 9 requirement)
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }
    
    // Scale animation for extra visual appeal
    scaleFactor = scaleFactor === 1 ? 1.05 : 1;
    
    if (modalImage) {
        // Apply both rotation and scale transforms
        modalImage.style.transform = `rotate(${rotateFactor}deg) scale(${scaleFactor})`;
        
        // Add a subtle color filter animation
        modalImage.style.filter = rotateFactor === 0 ? 'brightness(1.1) saturate(1.1)' : 'brightness(1) saturate(1)';
    }
}

// Advanced animation function for continuous floating effect
const floatImage = () => {
    if (!modalImage || motionReduced) return;
    
    const time = Date.now() * 0.002;
    const floatY = Math.sin(time) * 3;
    const currentTransform = modalImage.style.transform;
    
    // Preserve existing transforms and add floating
    if (currentTransform.includes('translateY')) {
        modalImage.style.transform = currentTransform.replace(/translateY\([^)]*\)/, `translateY(${floatY}px)`);
    } else {
        modalImage.style.transform = currentTransform + ` translateY(${floatY}px)`;
    }
}

const toggleModal = (person, type) => {
    // Week 9 Requirement: Select modal and modal content
    let modal = document.getElementById('success-modal');
    let modalText = document.getElementById('modal-text');
    
    if (!modal || !modalText) return;
    
    // Week 9 Requirement: Update modal display to flex
    modal.style.display = 'flex';
    
    // Week 9 Requirement: Update modal text to personalized message using person object
    let message = '';
    if (type === 'meetup') {
        message = `Thank you for RSVPing, ${person.name}! 💻 We're excited to have you join our supportive community from ${person.country}. You'll receive connection details via email soon.`;
    } else if (type === 'volunteer') {
        message = `Welcome to our volunteer team, ${person.name}! 🌟 Your contribution from ${person.location} will make a real difference in students' lives. We'll be in touch with next steps soon.`;
    } else {
        // Fallback personalized message
        message = `Thank you for joining us, ${person.name || 'friend'}! We can't wait to see you at our community events.`;
    }
    
    modalText.innerHTML = `<p>${message}</p>`;
    
    // Week 9 Requirement: Start image animation using setInterval (if motion is not reduced)
    if (!motionReduced && modalImage) {
        // Clear any existing intervals
        if (animationInterval) clearInterval(animationInterval);
        if (animationInterval2) clearInterval(animationInterval2);
        
        // Week 9 Requirement: Animate image every 500ms (half second)
        animationInterval = setInterval(animateImage, 500);
        
        // Additional smooth floating animation for enhanced experience
        animationInterval2 = setInterval(floatImage, 50);
        
        // Add entrance animation
        modalImage.style.opacity = '0';
        modalImage.style.transform = 'scale(0.8) rotate(0deg)';
        
        setTimeout(() => {
            modalImage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            modalImage.style.opacity = '1';
            modalImage.style.transform = 'scale(1) rotate(0deg)';
        }, 100);
    }
    
    // Week 9 Requirement: Set modal timeout between 3-10 seconds (using 7 seconds)
    setTimeout(() => {
        modal.style.display = 'none';
        
        // Week 9 Requirement: Clear animation intervals when modal closes
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        if (animationInterval2) {
            clearInterval(animationInterval2);
            animationInterval2 = null;
        }
        
        // Reset image state
        if (modalImage) {
            modalImage.style.transform = 'rotate(0deg) scale(1) translateY(0px)';
            modalImage.style.filter = 'brightness(1) saturate(1)';
            modalImage.style.transition = '';
            modalImage.style.opacity = '1';
        }
        
        // Reset animation variables
        rotateFactor = 0;
        scaleFactor = 1;
    }, 7000); // 7 seconds - within Week 9's 3-10 second requirement
}

// Week 9 Stretch Feature: Modal close button functionality
const modalCloseBtn = document.getElementById('modal-close-btn');
if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Week 9 Requirement: Clear animation intervals when modal closes
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        if (animationInterval2) {
            clearInterval(animationInterval2);
            animationInterval2 = null;
        }
        
        // Reset image state
        if (modalImage) {
            modalImage.style.transform = 'rotate(0deg) scale(1) translateY(0px)';
            modalImage.style.filter = 'brightness(1) saturate(1)';
            modalImage.style.transition = '';
            modalImage.style.opacity = '1';
        }
        
        // Reset animation variables
        rotateFactor = 0;
        scaleFactor = 1;
        
        // Provide user feedback
        showNotification('Modal closed 📋');
    });
}

// Week 9 Stretch Feature: Enhanced keyboard support for modal
document.addEventListener('keydown', function(e) {
    // Allow ESC to close modal (Week 9 accessibility enhancement)
    if (e.key === 'Escape') {
        const modal = document.getElementById('success-modal');
        if (modal && modal.style.display === 'flex') {
            // Trigger the same close behavior as the close button
            if (modalCloseBtn) {
                modalCloseBtn.click();
            }
        }
        
        // Close mobile nav and other modals
        const navLinks = document.getElementById('nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
    
    // Allow number keys to switch tabs quickly (Alt + number)
    const tabKeys = {
        '1': 'home',
        '2': 'resources', 
        '3': 'stories',
        '4': 'gallery',
        '5': 'support'
    };
    
    if (e.altKey && tabKeys[e.key]) {
        e.preventDefault();
        showTab(tabKeys[e.key]);
        showNotification(`Switched to ${tabKeys[e.key]} tab`);
    }
});

/*** Tab switching functionality ***/
function showTab(tabId) {
  console.log('Switching to tab:', tabId);
  
  // Hide all tabs
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Show selected tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Add active class to corresponding nav link
  const activeLink = document.querySelector(`[onclick="showTab('${tabId}')"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  // Close mobile nav if open
  const navLinksContainer = document.getElementById('nav-links');
  if (navLinksContainer) {
    navLinksContainer.classList.remove('active');
  }
  
  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: motionReduced ? 'auto' : 'smooth' });
}

// Mobile navigation toggle
function toggleMobileNav() {
  const navLinks = document.getElementById('nav-links');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

// Story expansion functionality
function showFullStory(storyId) {
  const fullStory = document.getElementById(storyId + '-story');
  const button = event.target;
  
  if (fullStory && fullStory.classList.contains('hidden')) {
    // Show full story
    fullStory.classList.remove('hidden');
    if (!motionReduced) {
        fullStory.style.animation = 'fadeInUp 0.6s ease';
    }
    button.textContent = 'Show Less';
    
    setTimeout(() => {
      fullStory.scrollIntoView({ 
        behavior: motionReduced ? 'auto' : 'smooth', 
        block: 'center' 
      });
    }, 300);
  } else if (fullStory) {
    // Hide story
    if (!motionReduced) {
        fullStory.style.animation = 'fadeInUp 0.3s ease reverse';
    }
    setTimeout(() => {
      fullStory.classList.add('hidden');
      button.textContent = 'Read Full Story';
    }, motionReduced ? 0 : 300);
  }
}

// Share story functionality
function showShareForm() {
  showNotification('Thank you for your interest in sharing your story! 📝');
  setTimeout(() => {
    alert('Thank you for your interest in sharing your story! This feature connects you with our support team who will guide you through the confidential sharing process. Please contact us at support@youarenotalone.org');
  }, 500);
}

// Newsletter signup
function showNewsletterForm() {
  showNotification('Newsletter signup coming soon! 📧');
  setTimeout(() => {
    alert('Newsletter signup coming soon! Stay tuned for updates on mental health resources and community stories.');
  }, 500);
}

// Ambassador program
function showAmbassadorForm() {
  showNotification('Thank you for your interest in our ambassador program! 🎓');
  setTimeout(() => {
    alert('Thank you for your interest in becoming a campus ambassador! This program helps spread mental health awareness. Please contact us at ambassador@youarenotalone.org');
  }, 500);
}

// Peer network
function showPeerNetwork() {
  showNotification('Connecting you to our peer support network! 🤝');
  setTimeout(() => {
    alert('Our peer support network connects international students worldwide. Join our community at community@youarenotalone.org');
  }, 500);
}

// Resource contributions
function showResourceForm() {
  showNotification('We appreciate your contribution! 📚');
  setTimeout(() => {
    alert('We welcome contributions of helpful mental health resources! Please share them with us at resources@youarenotalone.org');
  }, 500);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  
  const baseStyles = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 2rem;
    border-radius: 25px;
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    font-weight: 500;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    font-size: 0.9rem;
    color: white;
  `;
  
  const typeStyles = type === 'error' 
    ? 'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);'
    : 'background: var(--primary-gradient);';
  
  notification.style.cssText = baseStyles + typeStyles;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Hide notification after 4 seconds for errors, 3 seconds for others
  const hideDelay = type === 'error' ? 4000 : 3000;
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, hideDelay);
}

// Initialize theme on page load - FIXED
function initializeTheme() {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-button');
  
  // Check for saved theme preference
  try {
    const savedTheme = localStorage.getItem('theme-preference');
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      if (toggleBtn) {
        toggleBtn.textContent = '🌙 Dark Mode';
      }
    } else {
      if (toggleBtn) {
        toggleBtn.textContent = '☀️ Light Mode';
      }
    }
  } catch (e) {
    // Default to dark mode if localStorage is not available
    if (toggleBtn) {
      toggleBtn.textContent = '☀️ Light Mode';
    }
  }
  
  // Check for saved motion preference
  try {
    const savedMotion = localStorage.getItem('motion-preference');
    if (savedMotion === 'reduced') {
      motionReduced = true;
      body.classList.add('reduce-motion');
      if (reduceMotionButton) reduceMotionButton.textContent = '🎭 Enable Motion';
    }
  } catch (e) {
    // Default motion enabled
  }
}

// Initialize page functionality
function initializePage() {
  console.log('Enhanced Mental Health Support Website Initialized');
  
  // Initialize theme and motion preferences
  initializeTheme();
  
  // Create and display RSVP counter
  createRSVPCounter();
  
  // Add click handlers to nav brand
  const navBrand = document.querySelector('.nav-brand');
  if (navBrand) {
    navBrand.addEventListener('click', () => showTab('home'));
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: motionReduced ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add intersection observer for animations (if motion is enabled)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !motionReduced) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.glass-card, .feature-item, .stat-item').forEach(el => {
    if (!motionReduced) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    observer.observe(el);
  });
  
  // Form input enhancements
  const formInputs = document.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    // Clear error state on focus
    input.addEventListener('focus', () => {
      input.classList.remove('error');
    });
    
    // Add subtle validation feedback
    input.addEventListener('blur', () => {
      if (input.hasAttribute('required') && input.value.trim().length < 2) {
        input.classList.add('error');
      }
    });
    
    // Email validation on blur
    if (input.type === 'email') {
      input.addEventListener('blur', () => {
        if (input.value && !input.value.includes('@')) {
          input.classList.add('error');
        }
      });
    }
  });
  
  // Show welcome notification
  setTimeout(() => {
    showNotification('Welcome to YouAreNotAlone! 💙');
  }, 1500);
}

// Error handling for better user experience
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
  showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    console.log('Page is now visible');
  }
});

// Utility function to handle external links
function handleExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
      // Add a small delay to show the link is being followed
      const originalText = this.textContent;
      this.textContent = 'Opening...';
      setTimeout(() => {
        this.textContent = originalText;
      }, 1000);
    });
  });
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Accessibility improvements
function enhanceAccessibility() {
  // Add skip navigation link
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary-gradient);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main landmark
  const main = document.querySelector('main');
  if (main && !main.id) {
    main.id = 'main';
  }
  
  // Improve button accessibility
  document.querySelectorAll('button, .cta-button').forEach(button => {
    if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
      button.setAttribute('aria-label', 'Action button');
    }
  });
  
  // Add ARIA labels to form elements
  document.querySelectorAll('input, select, textarea').forEach(input => {
    if (!input.getAttribute('aria-label') && !input.previousElementSibling) {
      const label = input.parentElement.querySelector('label');
      if (label) {
        input.setAttribute('aria-labelledby', label.textContent);
      }
    }
  });
}

// Form data persistence (optional enhancement)
function setupFormPersistence() {
  const forms = ['meetup-form', 'volunteer-form'];
  
  forms.forEach(formId => {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Load saved form data
    inputs.forEach(input => {
      try {
        const savedValue = localStorage.getItem(`${formId}-${input.id}`);
        if (savedValue && input.type !== 'email') { // Don't persist email for privacy
          input.value = savedValue;
        }
      } catch (e) {
        // Ignore localStorage errors
      }
    });
    
    // Save form data on input
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        try {
          if (input.type !== 'email') { // Don't persist email for privacy
            localStorage.setItem(`${formId}-${input.id}`, input.value);
          }
        } catch (e) {
          // Ignore localStorage errors
        }
      });
    });
  });
}

// Advanced: Real-time form validation
function setupRealTimeValidation() {
  const forms = ['meetup-form', 'volunteer-form'];
  
  forms.forEach(formId => {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        // Remove error state when user starts typing
        if (input.classList.contains('error')) {
          input.classList.remove('error');
        }
        
        // Real-time length validation
        if (input.hasAttribute('required') && input.value.trim().length >= 2) {
          input.style.borderColor = 'var(--success-color)';
        } else if (input.value.trim().length > 0) {
          input.style.borderColor = 'var(--error-color)';
        } else {
          input.style.borderColor = '';
        }
        
        // Real-time email validation
        if (input.type === 'email' && input.value.length > 0) {
          if (input.value.includes('@') && input.value.includes('.')) {
            input.style.borderColor = 'var(--success-color)';
          } else {
            input.style.borderColor = 'var(--error-color)';
          }
        }
      });
    });
  });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
  handleExternalLinks();
  lazyLoadImages();
  enhanceAccessibility();
  setupFormPersistence();
  setupRealTimeValidation();
});

// Handle page load completion
window.addEventListener('load', function() {
  console.log('Enhanced Mental Health Website fully loaded');
  
  // Remove any loading states
  document.body.classList.add('loaded');
  
  // Start any delayed animations
  if (!motionReduced) {
    setTimeout(() => {
      document.querySelectorAll('.floating-element').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
      });
    }, 500);
  }
});

// Advanced feature: Auto-save draft responses (for future enhancement)
function setupDraftSaving() {
  const textareas = document.querySelectorAll('textarea');
  
  textareas.forEach(textarea => {
    let saveTimeout;
    
    textarea.addEventListener('input', () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        try {
          localStorage.setItem(`draft-${textarea.id}`, textarea.value);
        } catch (e) {
          // Ignore localStorage errors
        }
      }, 1000);
    });
    
    // Load draft on page load
    try {
      const draft = localStorage.getItem(`draft-${textarea.id}`);
      if (draft) {
        textarea.value = draft;
        // Show restore notification
        const restoreBtn = document.createElement('button');
        restoreBtn.textContent = 'Clear Draft';
        restoreBtn.style.cssText = `
          position: absolute;
          top: -30px;
          right: 0;
          background: var(--warm-gradient);
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          cursor: pointer;
        `;
        restoreBtn.onclick = () => {
          textarea.value = '';
          localStorage.removeItem(`draft-${textarea.id}`);
          restoreBtn.remove();
        };
        
        textarea.parentElement.style.position = 'relative';
        textarea.parentElement.appendChild(restoreBtn);
      }
    } catch (e) {
      // Ignore localStorage errors
    }
  });
}

// Call setupDraftSaving after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(setupDraftSaving, 1000);
});

// Service worker registration for offline support (optional future enhancement)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed');
      });
  });
}
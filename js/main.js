// main.js - Core functionality for Elevator Design Journey

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Set up navigation between steps
    setupNavigation();
    
    // Initialize GSAP animations
    initAnimations();
    
    // Set up interactive elements
    setupInteractiveElements();
    
    // Set initial section visibility
    showActiveSection();
}

/**
 * Navigation Setup
 * Handles navigation between steps and progress tracking
 */
function setupNavigation() {
    // Hero section CTA button
    const startJourneyBtn = document.getElementById('start-journey');
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', function() {
            navigateToStep(1);
        });
    }
    
    // Progress tracker navigation
    const progressItems = document.querySelectorAll('.progress-tracker li');
    progressItems.forEach(item => {
        item.addEventListener('click', function() {
            const step = parseInt(this.getAttribute('data-step'));
            navigateToStep(step);
        });
    });
    
    // Next/Previous step buttons
    const nextBtns = document.querySelectorAll('.next-step-btn');
    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));
            navigateToStep(nextStep);
        });
    });
    
    const prevBtns = document.querySelectorAll('.prev-step-btn');
    prevBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            navigateToStep(prevStep);
        });
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        const currentStep = getCurrentStep();
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (currentStep < 12) {
                navigateToStep(currentStep + 1);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (currentStep > 1) {
                navigateToStep(currentStep - 1);
            }
        }
    });
}

/**
 * Navigate to a specific step
 * @param {number} step - The step number to navigate to
 */
function navigateToStep(step) {
    // Update the URL hash for bookmark-ability
    window.location.hash = `step${step}`;
    
    // Update progress tracker
    updateProgressTracker(step);
    
    // Hide all sections and show the target section
    const sections = document.querySelectorAll('.step-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`step${step}`);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to the section with smooth behavior
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Update the progress tracker in the navigation
 * @param {number} currentStep - The current active step
 */
function updateProgressTracker(currentStep) {
    const progressItems = document.querySelectorAll('.progress-tracker li');
    
    progressItems.forEach(item => {
        const itemStep = parseInt(item.getAttribute('data-step'));
        
        // Remove all classes first
        item.classList.remove('active', 'completed');
        
        // Add appropriate classes
        if (itemStep === currentStep) {
            item.classList.add('active');
        } else if (itemStep < currentStep) {
            item.classList.add('completed');
        }
    });
}

/**
 * Get the current active step
 * @returns {number} - The current step number
 */
function getCurrentStep() {
    // Check URL hash first
    if (window.location.hash) {
        const hashStep = window.location.hash.replace('#step', '');
        if (!isNaN(parseInt(hashStep))) {
            return parseInt(hashStep);
        }
    }
    
    // Otherwise check for active section in the DOM
    const activeSection = document.querySelector('.step-section.active');
    if (activeSection) {
        return parseInt(activeSection.getAttribute('data-step'));
    }
    
    // Default to 1 if nothing is active
    return 1;
}

/**
 * Show the active section based on URL hash or default to step 1
 */
function showActiveSection() {
    // Check if there's a step in the URL hash
    if (window.location.hash && window.location.hash.includes('step')) {
        const step = parseInt(window.location.hash.replace('#step', ''));
        if (!isNaN(step) && step >= 1 && step <= 12) {
            navigateToStep(step);
            return;
        }
    }
    
    // Default: show the hero section
    // The hero section is always visible, and step1 is initially hidden
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.classList.add('active');
    }
}

/**
 * Set up all interactive elements across steps
 */
function setupInteractiveElements() {
    // Step 1: Hotspots in the blueprint
    setupHotspots();
    
    // Step 2: Scenario selector
    setupScenarioSelector();
    
    // Step 3: Draggable resources
    setupDraggableResources();
    
    // Step 4: Trade-off sliders
    setupTradeoffSliders();
    
    // Additional interactive elements for other steps would be set up here
}

/**
 * Set up hotspot interactions for Step 1
 */
function setupHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');
    
    // Position hotspots on the blueprint
    positionHotspots();
    
    // Add hover interactions if needed
    hotspots.forEach(hotspot => {
        // Add any additional hotspot behaviors here
    });
    
    // Handle window resize
    window.addEventListener('resize', positionHotspots);
}

/**
 * Position hotspots on the blueprint image
 */
function positionHotspots() {
    const blueprintContainer = document.querySelector('.blueprint-container');
    if (!blueprintContainer) return;
    
    const containerWidth = blueprintContainer.offsetWidth;
    const containerHeight = blueprintContainer.offsetHeight;
    
    // Position each hotspot
    // Door hotspot
    const doorHotspot = document.querySelector('.hotspot[data-target="door"]');
    if (doorHotspot) {
        doorHotspot.style.left = `${containerWidth * 0.3}px`;
        doorHotspot.style.top = `${containerHeight * 0.4}px`;
    }
    
    // Pulley hotspot
    const pulleyHotspot = document.querySelector('.hotspot[data-target="pulley"]');
    if (pulleyHotspot) {
        pulleyHotspot.style.left = `${containerWidth * 0.7}px`;
        pulleyHotspot.style.top = `${containerHeight * 0.2}px`;
    }
    
    // Control panel hotspot
    const controlPanelHotspot = document.querySelector('.hotspot[data-target="control-panel"]');
    if (controlPanelHotspot) {
        controlPanelHotspot.style.left = `${containerWidth * 0.8}px`;
        controlPanelHotspot.style.top = `${containerHeight * 0.5}px`;
    }
}

/**
 * Set up scenario selector interactions for Step 2
 */
function setupScenarioSelector() {
    const scenarioBtns = document.querySelectorAll('.scenario-btn');
    
    scenarioBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            scenarioBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the scenario to show
            const scenario = this.getAttribute('data-scenario');
            
            // Hide all scenario details
            const scenarioDetails = document.querySelectorAll('.scenario-details');
            scenarioDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // Show the selected scenario details
            const selectedScenario = document.getElementById(`${scenario}-scenario`);
            if (selectedScenario) {
                selectedScenario.style.display = 'block';
            }
        });
    });
}

/**
 * Set up draggable resources for Step 3
 */
function setupDraggableResources() {
    const resourceItems = document.querySelectorAll('.resource-item');
    const dropzone = document.querySelector('.resource-dropzone');
    const selectedResources = document.querySelector('.selected-resources');
    
    if (!resourceItems.length || !dropzone || !selectedResources) return;
    
    resourceItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.getAttribute('data-resource'));
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    // Prevent default drag behaviors
    dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    dropzone.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const resourceType = e.dataTransfer.getData('text/plain');
        
        // Check if resource already exists in the selected resources
        const existingResource = selectedResources.querySelector(`[data-resource="${resourceType}"]`);
        if (!existingResource) {
            const resourceItem = document.createElement('div');
            resourceItem.className = 'resource-item';
            resourceItem.setAttribute('data-resource', resourceType);
            resourceItem.textContent = resourceType.charAt(0).toUpperCase() + resourceType.slice(1);
            
            // Add a remove button
            const removeBtn = document.createElement('span');
            removeBtn.className = 'remove-resource';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', function() {
                resourceItem.remove();
            });
            
            resourceItem.appendChild(removeBtn);
            selectedResources.appendChild(resourceItem);
        }
    });
}

/**
 * Set up trade-off sliders for Step 4
 * Simplified version - full implementation in tradeoffs.js
 */
function setupTradeoffSliders() {
    // This is a placeholder - the actual implementation is in tradeoffs.js
    // This function is here to ensure all interactive elements are initialized in one place
    if (typeof window.initTradeoffSliders === 'function') {
        window.initTradeoffSliders();
    }
}

/**
 * Initialize GSAP animations
 */
function initAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    animateHeroSection();
    
    // Step section animations
    animateStepSections();
}

/**
 * Animate the hero section elements
 */
function animateHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    const timeline = gsap.timeline();
    
    timeline.from('h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
    .from('.hero-content p', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.cta-button', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.2');
}

/**
 * Animate step sections with ScrollTrigger
 */
function animateStepSections() {
    // Animate each step section
    gsap.utils.toArray('.step-section').forEach((section, i) => {
        // Skip the first section as it's animated differently
        if (i === 0) return;
        
        const contentElements = section.querySelectorAll('h2, p, .interactive-content, .step-nav');
        
        gsap.from(contentElements, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate interactive elements when they come into view
    gsap.utils.toArray('.interactive-content').forEach(content => {
        gsap.from(content, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: content,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
}

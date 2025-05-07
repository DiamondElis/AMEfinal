// animations.js - Advanced animations for Elevator Design Journey

/**
 * Advanced animations that enhance the user experience
 * This file extends the basic animations in main.js with more complex
 * animations for specific interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize blueprint glow effects
    initBlueprintEffects();
    
    // Set up layer transition animations
    initLayerTransitions();
    
    // Initialize abstraction layer animations (Step 6)
    initAbstractionLayers();
    
    // Initialize puzzle piece animations (Step 7)
    initPuzzlePieceAnimations();
    
    // Initialize feedback loop animations (Step 10)
    initFeedbackLoopAnimations();
    
    // Add parallax effects to backgrounds
    initParallaxEffects();
});

/**
 * Initialize blueprint glow effects
 * Adds subtle animations to blueprint elements
 */
function initBlueprintEffects() {
    // Animate blueprint lines
    gsap.to('.blueprint-container', {
        boxShadow: '0 0 20px rgba(57, 194, 215, 0.6)',
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut'
    });
    
    // Pulse animation for hotspots
    gsap.to('.hotspot-dot', {
        scale: 1.2,
        opacity: 0.7,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'sine.inOut',
        stagger: 0.3
    });
}

/**
 * Initialize layer transition animations
 * Handles smooth transitions between different steps
 */
function initLayerTransitions() {
    // Create a transition effect between steps
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'transition-overlay';
    document.body.appendChild(transitionOverlay);
    
    // Set up event listeners for step navigation buttons
    const nextButtons = document.querySelectorAll('.next-step-btn');
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default navigation
            e.preventDefault();
            
            // Get target step
            const nextStep = this.getAttribute('data-next');
            
            // Play transition animation
            playTransitionAnimation(nextStep);
        });
    });
}

/**
 * Play transition animation between steps
 * @param {string} targetStep - The step to navigate to
 */
function playTransitionAnimation(targetStep) {
    const overlay = document.querySelector('.transition-overlay');
    
    // Animation timeline
    const tl = gsap.timeline({
        onComplete: function() {
            // Navigate to the target step after animation completes
            navigateToStep(parseInt(targetStep));
        }
    });
    
    tl.to(overlay, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
    })
    .to(overlay, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        ease: 'power2.inOut'
    });
}

/**
 * Initialize abstraction layer animations for Step 6
 * Creates interactive layer peeling effect
 */
function initAbstractionLayers() {
    // This will be implemented when Step 6 is fully developed
    const abstractionStep = document.getElementById('step6');
    if (!abstractionStep) return;
    
    // Example animation for abstraction layers
    // Will be expanded when the full HTML for step 6 is implemented
    const layers = abstractionStep.querySelectorAll('.abstraction-layer');
    
    layers.forEach((layer, index) => {
        layer.addEventListener('click', () => {
            // Toggle expanded class
            layer.classList.toggle('expanded');
            
            // Animate expansion
            if (layer.classList.contains('expanded')) {
                gsap.to(layer, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(layer, {
                    height: '60px',
                    opacity: 0.8,
                    duration: 0.5,
                    ease: 'power2.in'
                });
            }
        });
    });
}

/**
 * Initialize puzzle piece animations for Step 7
 * Creates interactive draggable puzzle pieces
 */
function initPuzzlePieceAnimations() {
    // This will be implemented when Step 7 is fully developed
    const puzzleStep = document.getElementById('step7');
    if (!puzzleStep) return;
    
    // Example animation for puzzle pieces
    // Will be expanded when the full HTML for step 7 is implemented
    const puzzlePieces = puzzleStep.querySelectorAll('.puzzle-piece');
    
    puzzlePieces.forEach(piece => {
        // Make puzzle pieces draggable
        gsap.set(piece, { 
            cursor: 'move'
        });
        
        Draggable.create(piece, {
            type: 'x,y',
            bounds: puzzleStep.querySelector('.puzzle-container'),
            onDragStart: function() {
                gsap.to(this.target, { 
                    scale: 1.1, 
                    boxShadow: '0 5px 15px rgba(57, 194, 215, 0.6)',
                    duration: 0.3 
                });
            },
            onDragEnd: function() {
                gsap.to(this.target, { 
                    scale: 1, 
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                    duration: 0.3 
                });
                
                // Check if piece is close to its target position
                checkPuzzlePiecePosition(this.target);
            }
        });
    });
}

/**
 * Check if a puzzle piece is close to its correct position
 * @param {HTMLElement} piece - The puzzle piece element
 */
function checkPuzzlePiecePosition(piece) {
    const pieceRect = piece.getBoundingClientRect();
    const targetId = piece.getAttribute('data-target');
    const target = document.querySelector(`.puzzle-target[data-id="${targetId}"]`);
    
    if (!target) return;
    
    const targetRect = target.getBoundingClientRect();
    
    // Calculate distance between centers
    const distance = Math.sqrt(
        Math.pow(pieceRect.left + pieceRect.width/2 - (targetRect.left + targetRect.width/2), 2) +
        Math.pow(pieceRect.top + pieceRect.height/2 - (targetRect.top + targetRect.height/2), 2)
    );
    
    // If piece is close enough to its target
    if (distance < 50) {
        // Snap to position
        gsap.to(piece, {
            x: targetRect.left - pieceRect.left + (targetRect.width - pieceRect.width)/2,
            y: targetRect.top - pieceRect.top + (targetRect.height - pieceRect.height)/2,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
        
        // Add connected class
        piece.classList.add('connected');
        target.classList.add('connected');
        
        // Play connection animation
        playConnectionAnimation(piece, target);
        
        // Check if all pieces are connected
        checkAllPuzzlePiecesConnected();
    }
}

/**
 * Play animation when puzzle piece connects to its target
 * @param {HTMLElement} piece - The puzzle piece element
 * @param {HTMLElement} target - The target element
 */
function playConnectionAnimation(piece, target) {
    // Create connection visual effect
    const connection = document.createElement('div');
    connection.className = 'connection-effect';
    document.body.appendChild(connection);
    
    // Position the connection effect
    const pieceRect = piece.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    
    connection.style.left = `${pieceRect.left + pieceRect.width/2}px`;
    connection.style.top = `${pieceRect.top + pieceRect.height/2}px`;
    
    // Animate the connection
    gsap.to(connection, {
        x: targetRect.left + targetRect.width/2 - (pieceRect.left + pieceRect.width/2),
        y: targetRect.top + targetRect.height/2 - (pieceRect.top + pieceRect.height/2),
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: function() {
            connection.remove();
        }
    });
}

/**
 * Check if all puzzle pieces are connected to their targets
 */
function checkAllPuzzlePiecesConnected() {
    const puzzleStep = document.getElementById('step7');
    if (!puzzleStep) return;
    
    const totalPieces = puzzleStep.querySelectorAll('.puzzle-piece').length;
    const connectedPieces = puzzleStep.querySelectorAll('.puzzle-piece.connected').length;
    
    if (totalPieces > 0 && totalPieces === connectedPieces) {
        // All pieces are connected
        playPuzzleCompletionAnimation();
    }
}

/**
 * Play animation when all puzzle pieces are correctly placed
 */
function playPuzzleCompletionAnimation() {
    const puzzleStep = document.getElementById('step7');
    if (!puzzleStep) return;
    
    // Create completion effect
    const completionEffect = document.createElement('div');
    completionEffect.className = 'completion-effect';
    puzzleStep.appendChild(completionEffect);
    
    // Animate completion effect
    gsap.fromTo(completionEffect, 
        { scale: 0, opacity: 0 },
        { 
            scale: 1, 
            opacity: 1, 
            duration: 1, 
            ease: 'elastic.out(1, 0.3)',
            onComplete: function() {
                gsap.to(completionEffect, {
                    opacity: 0,
                    duration: 1,
                    delay: 2,
                    onComplete: function() {
                        completionEffect.remove();
                    }
                });
            }
        }
    );
    
    // Show completion message
    const completionMessage = puzzleStep.querySelector('.completion-message');
    if (completionMessage) {
        gsap.to(completionMessage, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.5
        });
    }
}

/**
 * Initialize feedback loop animations for Step 10
 */
function initFeedbackLoopAnimations() {
    const feedbackStep = document.getElementById('step10');
    if (!feedbackStep) return;
    
    // Create the feedback loop animation
    const feedbackLoop = feedbackStep.querySelector('.feedback-loop-animation');
    if (!feedbackLoop) return;
    
    // Draw the feedback loop path
    const pathLength = drawFeedbackLoopPath(feedbackLoop);
    
    // Animate data points along the path
    animateDataPointsAlongPath(feedbackLoop, pathLength);
}

/**
 * Draw the feedback loop path
 * @param {HTMLElement} container - The container element
 * @returns {number} - The path length
 */
function drawFeedbackLoopPath(container) {
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 400');
    container.appendChild(svg);
    
    // Create path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M100,200 C150,100 350,100 400,200 C450,300 650,300 700,200');
    path.setAttribute('stroke', 'var(--accent-teal)');
    path.setAttribute('stroke-width', '4');
    path.setAttribute('fill', 'none');
    path.classList.add('feedback-path');
    svg.appendChild(path);
    
    // Get path length
    const pathLength = path.getTotalLength();
    
    // Set up path for animation
    path.setAttribute('stroke-dasharray', pathLength);
    path.setAttribute('stroke-dashoffset', pathLength);
    
    // Animate path drawing
    gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.inOut'
    });
    
    return pathLength;
}

/**
 * Animate data points along the feedback loop path
 * @param {HTMLElement} container - The container element
 * @param {number} pathLength - The path length
 */
function animateDataPointsAlongPath(container, pathLength) {
    const svg = container.querySelector('svg');
    const path = container.querySelector('.feedback-path');
    
    // Create data points
    for (let i = 0; i < 5; i++) {
        const dataPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dataPoint.setAttribute('r', '8');
        dataPoint.setAttribute('fill', 'var(--highlight-orange)');
        dataPoint.classList.add('data-point');
        svg.appendChild(dataPoint);
        
        // Animate data point along path
        gsap.to(dataPoint, {
            motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true
            },
            duration: 8,
            repeat: -1,
            delay: i * 1.5,
            ease: 'none'
        });
    }
}

/**
 * Initialize parallax effects for backgrounds
 */
function initParallaxEffects() {
    // Add parallax effect to hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        // Create parallax background layers
        createParallaxLayers(heroSection);
    }
    
    // Add subtle parallax to other sections
    gsap.utils.toArray('.step-section').forEach(section => {
        gsap.to(section, {
            backgroundPositionY: '+=50',
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

/**
 * Create parallax background layers
 * @param {HTMLElement} container - The container to add parallax effect to
 */
function createParallaxLayers(container) {
    // Create background layers
    for (let i = 1; i <= 3; i++) {
        const layer = document.createElement('div');
        layer.className = `parallax-layer layer-${i}`;
        container.appendChild(layer);
    }
    
    // Set up parallax effect on mouse move
    container.addEventListener('mousemove', e => {
        const layers = container.querySelectorAll('.parallax-layer');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        layers.forEach((layer, index) => {
            const depth = (index + 1) * 10;
            const moveX = x * depth;
            const moveY = y * depth;
            
            gsap.to(layer, {
                x: moveX,
                y: moveY,
                duration: 1,
                ease: 'power2.out'
            });
        });
    });
} 
// tradeoffs.js - Functionality for Trade-offs section (Step 4)

document.addEventListener('DOMContentLoaded', function() {
    // Initialize trade-off sliders functionality
    initTradeoffSliders();
});

/**
 * Initialize interactive trade-off sliders
 */
function initTradeoffSliders() {
    const sliders = document.querySelectorAll('.trade-slider');
    
    sliders.forEach(slider => {
        // Set initial gradient based on value
        updateSliderGradient(slider);
        
        // Add change event listener
        slider.addEventListener('input', function() {
            // Update slider gradient
            updateSliderGradient(this);
            
            // Update effect description
            updateEffectDescription(this);
            
            // Update elevator representation
            updateElevatorRepresentation();
        });
    });
    
    // Initial update of elevator representation
    updateElevatorRepresentation();
}

/**
 * Update the gradient background of a slider based on its value
 * @param {HTMLElement} slider - The slider element
 */
function updateSliderGradient(slider) {
    const value = slider.value;
    const percentage = (value - slider.min) / (slider.max - slider.min) * 100;
    
    // Create gradient background
    slider.style.background = `linear-gradient(to right, 
        var(--accent-teal) 0%, 
        var(--accent-teal) ${percentage}%, 
        var(--highlight-orange) ${percentage}%, 
        var(--highlight-orange) 100%)`;
}

/**
 * Update the effect description for a slider
 * @param {HTMLElement} slider - The slider element
 */
function updateEffectDescription(slider) {
    const tradeoff = slider.getAttribute('data-tradeoff');
    const value = parseInt(slider.value);
    const effectElement = slider.parentElement.querySelector('.effect-description');
    
    // Add update animation
    effectElement.classList.add('update-animation');
    
    // Remove animation after it completes
    setTimeout(() => {
        effectElement.classList.remove('update-animation');
    }, 500);
    
    // Update description text based on tradeoff type and value
    switch(tradeoff) {
        case 'velocity-safety':
            updateVelocitySafetyDescription(effectElement, value);
            break;
        case 'simplicity-features':
            updateSimplicityFeaturesDescription(effectElement, value);
            break;
        case 'cost-reliability':
            updateCostReliabilityDescription(effectElement, value);
            break;
    }
}

/**
 * Update velocity vs safety description
 * @param {HTMLElement} element - The description element
 * @param {number} value - The slider value (1-100)
 */
function updateVelocitySafetyDescription(element, value) {
    const description = element.querySelector('p');
    
    if (value < 25) {
        description.textContent = 'Prioritizing maximum elevator speed with standard safety features.';
    } else if (value < 50) {
        description.textContent = 'Good balance with faster speed while maintaining important safety measures.';
    } else if (value < 75) {
        description.textContent = 'Balanced approach with moderate speed and solid safety features.';
    } else {
        description.textContent = 'Maximizing safety features with reduced maximum speed.';
    }
}

/**
 * Update simplicity vs features description
 * @param {HTMLElement} element - The description element
 * @param {number} value - The slider value (1-100)
 */
function updateSimplicityFeaturesDescription(element, value) {
    const description = element.querySelector('p');
    
    if (value < 25) {
        description.textContent = 'Minimalist design with only essential controls for clarity and ease of use.';
    } else if (value < 50) {
        description.textContent = 'Simple design with a few carefully selected additional features.';
    } else if (value < 75) {
        description.textContent = 'Balanced approach with a moderate set of useful features.';
    } else {
        description.textContent = 'Feature-rich experience with many options and capabilities.';
    }
}

/**
 * Update cost vs reliability description
 * @param {HTMLElement} element - The description element
 * @param {number} value - The slider value (1-100)
 */
function updateCostReliabilityDescription(element, value) {
    const description = element.querySelector('p');
    
    if (value < 25) {
        description.textContent = 'Budget-oriented approach with standard reliability components.';
    } else if (value < 50) {
        description.textContent = 'Good value balance with selective investment in key reliability areas.';
    } else if (value < 75) {
        description.textContent = 'Investing in quality components for better long-term reliability.';
    } else {
        description.textContent = 'Maximum reliability focus with premium components regardless of cost.';
    }
}

/**
 * Update the elevator representation based on all slider values
 */
function updateElevatorRepresentation() {
    // Get all slider values
    const speedSlider = document.querySelector('.trade-slider[data-tradeoff="velocity-safety"]');
    const featuresSlider = document.querySelector('.trade-slider[data-tradeoff="simplicity-features"]');
    const reliabilitySlider = document.querySelector('.trade-slider[data-tradeoff="cost-reliability"]');
    
    if (!speedSlider || !featuresSlider || !reliabilitySlider) return;
    
    const speedValue = parseInt(speedSlider.value);
    const featuresValue = parseInt(featuresSlider.value);
    const reliabilityValue = parseInt(reliabilitySlider.value);
    
    // Update speed indicator
    updateIndicator('speed', speedValue);
    
    // Update features indicator
    updateIndicator('features', featuresValue);
    
    // Update reliability indicator
    updateIndicator('reliability', reliabilityValue);
    
    // Update visualization (could be expanded with more visual feedback)
    updateVisualization(speedValue, featuresValue, reliabilityValue);
}

/**
 * Update an indicator value in the elevator representation
 * @param {string} indicatorType - The type of indicator to update
 * @param {number} value - The slider value (1-100)
 */
function updateIndicator(indicatorType, value) {
    let indicator;
    let valueText;
    
    switch(indicatorType) {
        case 'speed':
            indicator = document.querySelector('.elevator-speed-indicator .indicator-value');
            
            if (value < 25) {
                valueText = 'Maximum';
            } else if (value < 50) {
                valueText = 'High';
            } else if (value < 75) {
                valueText = 'Moderate';
            } else {
                valueText = 'Safety-Optimized';
            }
            break;
            
        case 'features':
            indicator = document.querySelector('.elevator-features-indicator .indicator-value');
            
            if (value < 25) {
                valueText = 'Minimal';
            } else if (value < 50) {
                valueText = 'Essential';
            } else if (value < 75) {
                valueText = 'Comprehensive';
            } else {
                valueText = 'Maximum';
            }
            break;
            
        case 'reliability':
            indicator = document.querySelector('.elevator-reliability-indicator .indicator-value');
            
            if (value < 25) {
                valueText = 'Basic';
            } else if (value < 50) {
                valueText = 'Standard';
            } else if (value < 75) {
                valueText = 'High';
            } else {
                valueText = 'Premium';
            }
            break;
    }
    
    if (indicator) {
        // Add update animation
        indicator.classList.add('update-animation');
        
        // Update text
        indicator.textContent = valueText;
        
        // Remove animation after it completes
        setTimeout(() => {
            indicator.classList.remove('update-animation');
        }, 500);
    }
}

/**
 * Update the visual representation of the elevator
 * @param {number} speedValue - The speed/safety slider value
 * @param {number} featuresValue - The simplicity/features slider value
 * @param {number} reliabilityValue - The cost/reliability slider value
 */
function updateVisualization(speedValue, featuresValue, reliabilityValue) {
    const elevatorRepresentation = document.querySelector('.elevator-representation');
    if (!elevatorRepresentation) return;
    
    // Calculate overall design emphasis
    const speedEmphasis = 100 - speedValue; // Invert so higher = more speed emphasis
    const featuresEmphasis = featuresValue; // Higher = more features
    const reliabilityEmphasis = reliabilityValue; // Higher = more reliability
    
    // Calculate overall design characteristics
    const efficiencyScore = (speedEmphasis * 0.6 + (100 - featuresEmphasis) * 0.4) / 100;
    const complexityScore = featuresEmphasis / 100;
    const qualityScore = reliabilityEmphasis / 100;
    
    // Update visual representation based on scores
    
    // 1. Update border color and thickness based on quality
    const borderThickness = 2 + Math.round(qualityScore * 4);
    const borderColor = getGradientColor('#39c2d7', '#e6a64d', qualityScore);
    elevatorRepresentation.style.borderWidth = `${borderThickness}px`;
    elevatorRepresentation.style.borderColor = borderColor;
    
    // 2. Update background opacity based on complexity
    const bgOpacity = 0.3 + (complexityScore * 0.4);
    elevatorRepresentation.style.backgroundColor = `rgba(26, 75, 105, ${bgOpacity})`;
    
    // 3. Update box shadow based on efficiency
    const shadowBlur = 5 + Math.round(efficiencyScore * 15);
    const shadowOpacity = 0.2 + (efficiencyScore * 0.4);
    elevatorRepresentation.style.boxShadow = `0 0 ${shadowBlur}px rgba(57, 194, 215, ${shadowOpacity})`;
    
    // 4. Add/remove classes based on overall design
    elevatorRepresentation.classList.remove('design-speed', 'design-features', 'design-reliability');
    
    // Determine dominant characteristic
    const scores = [
        { type: 'speed', value: speedEmphasis },
        { type: 'features', value: featuresEmphasis },
        { type: 'reliability', value: reliabilityEmphasis }
    ];
    
    // Sort by highest score
    scores.sort((a, b) => b.value - a.value);
    
    // Add class for dominant characteristic if it's significantly higher
    if (scores[0].value > scores[1].value + 15) {
        elevatorRepresentation.classList.add(`design-${scores[0].type}`);
    }
}

/**
 * Get a color between two colors based on percentage
 * @param {string} color1 - Starting color (hex)
 * @param {string} color2 - Ending color (hex)
 * @param {number} percentage - Percentage between colors (0-1)
 * @returns {string} - Resulting color (hex)
 */
function getGradientColor(color1, color2, percentage) {
    // Convert hex to RGB
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    // Calculate gradient color
    const r = Math.round(r1 + (r2 - r1) * percentage);
    const g = Math.round(g1 + (g2 - g1) * percentage);
    const b = Math.round(b1 + (b2 - b1) * percentage);
    
    // Convert back to hex
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Add event listeners for the quote highlight
 */
document.addEventListener('DOMContentLoaded', function() {
    const quoteHighlight = document.querySelector('.quote-highlight');
    
    if (quoteHighlight) {
        // Add glow effect on mouseover
        quoteHighlight.addEventListener('mouseover', function() {
            gsap.to(this, {
                textShadow: '0 0 20px rgba(57, 194, 215, 0.8)',
                scale: 1.05,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        // Remove glow effect on mouseout
        quoteHighlight.addEventListener('mouseout', function() {
            gsap.to(this, {
                textShadow: '0 0 10px rgba(57, 194, 215, 0.5)',
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        // Initial animation for the quote
        gsap.from(quoteHighlight, {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.5,
            ease: 'power2.out'
        });
    }
}); 
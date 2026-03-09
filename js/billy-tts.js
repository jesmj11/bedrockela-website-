/**
 * Billy TTS - Text-to-Speech using ElevenLabs (Mark voice)
 * Shared across all grade levels
 */

let currentAudio = null;
let currentButton = null;

/**
 * Speak text using ElevenLabs TTS
 * @param {string} text - Text to speak
 * @param {HTMLElement} button - Optional button element to update icon
 */
async function speakBilly(text, button) {
    // If audio is playing, stop it
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        if (currentButton) {
            currentButton.textContent = '🔊';
            currentButton = null;
        }
        return;
    }
    
    // Store button reference
    if (button) {
        currentButton = button;
        button.textContent = '⏸️';
    }
    
    try {
        // Call TTS endpoint
        const response = await fetch('http://localhost:3002/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                voice: 'mark' // Mark - ElevenLabs custom voice
            })
        });
        
        if (!response.ok) {
            console.error('[Billy TTS] Server error:', response.statusText);
            // NO FALLBACK - ElevenLabs only
            if (currentButton) {
                currentButton.textContent = '🔊';
                currentButton = null;
            }
            return;
        }
        
        // Get audio blob
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Play audio
        currentAudio = new Audio(audioUrl);
        currentAudio.play();
        
        // Cleanup when done
        currentAudio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            currentAudio = null;
            if (currentButton) {
                currentButton.textContent = '🔊';
                currentButton = null;
            }
        };
        
    } catch (error) {
        console.error('[Billy TTS] Error:', error);
        // NO FALLBACK - ElevenLabs only
        if (currentButton) {
            currentButton.textContent = '🔊';
            currentButton = null;
        }
    }
}

/**
 * Render Billy's avatar widget
 * @param {string} pageInstruction - Optional instruction text for this page
 * @returns {string} HTML for Billy widget
 */
function renderBillyWidget(pageInstruction = '') {
    return `
        <div class="billy-corner-widget">
            <div class="billy-avatar-circle" onclick="speakBilly('${pageInstruction.replace(/'/g, "\\'")}', null)">
                <img src="images/billy-avatar.jpg" alt="Billy" class="billy-mini-avatar">
            </div>
            <button class="billy-speak-btn" id="billy-speaker" onclick="speakBilly('${pageInstruction.replace(/'/g, "\\'")}', this)" title="Hear Billy's instructions">🔊</button>
        </div>
    `;
}

// Make functions available globally
window.speakBilly = speakBilly;
window.renderBillyWidget = renderBillyWidget;

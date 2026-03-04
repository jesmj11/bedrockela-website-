/**
 * Automatically inject Save button on pages with textareas
 */

function injectSaveButton() {
  // Wait for page to render
  setTimeout(() => {
    const contentCard = document.querySelector('.lesson-page-card.content-page');
    const textareas = document.querySelectorAll('textarea');
    
    // Only add if there are textareas and no save button exists yet
    if (contentCard && textareas.length > 0 && !document.getElementById('manual-save-btn')) {
      // Create save button container
      const saveButtonDiv = document.createElement('div');
      saveButtonDiv.innerHTML = window.createSaveButton ? window.createSaveButton() : '';
      
      // Insert at the end of the content card
      contentCard.appendChild(saveButtonDiv);
    }
  }, 500);
}

// Run when lesson viewer renders a new page
if (typeof window.lessonNextPage === 'function') {
  const originalNext = window.lessonNextPage;
  window.lessonNextPage = function() {
    originalNext();
    injectSaveButton();
  };
  
  const originalPrev = window.lessonPrevPage;
  window.lessonPrevPage = function() {
    originalPrev();
    injectSaveButton();
  };
}

// Initial injection
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(injectSaveButton, 1000);
});

/**
 * Simple Story Book - for decodable stories where student reads all pages
 * One page at a time with navigation
 */

class SimpleStoryBook {
    constructor(storyData, containerId) {
        this.story = storyData;
        this.container = document.getElementById(containerId);
        this.currentPage = 0;
        
        if (!this.container) {
            console.error(`Container #${containerId} not found`);
            return;
        }
        
        this.render();
    }
    
    render() {
        const totalPages = this.story.pages.length;
        const page = this.story.pages[this.currentPage];
        
        this.container.innerHTML = `
            <div class="simple-storybook">
                <div class="book-header">
                    <h2 style="color: #305853; margin-bottom: 10px;">📖 ${this.story.title}</h2>
                    <div style="color: #666; font-size: 16px;">Page ${this.currentPage + 1} of ${totalPages}</div>
                </div>
                
                <div class="book-page">
                    <div class="page-text">${page.text}</div>
                </div>
                
                <div class="book-nav">
                    <button class="story-nav-btn" onclick="window.samsVanBook.prevPage()" ${this.currentPage === 0 ? 'disabled' : ''}>
                        ← Previous
                    </button>
                    
                    <div class="page-dots">
                        ${this.story.pages.map((_, i) => `
                            <span class="page-dot ${i === this.currentPage ? 'active' : ''}" 
                                  onclick="window.samsVanBook.goToPage(${i})"></span>
                        `).join('')}
                    </div>
                    
                    <button class="story-nav-btn" onclick="window.samsVanBook.nextPage()" ${this.currentPage === totalPages - 1 ? 'disabled' : ''}>
                        ${this.currentPage === totalPages - 1 ? 'Finish' : 'Next'} →
                    </button>
                </div>
                
                <div style="text-align: center; margin-top: 20px; color: #666; font-size: 18px;">
                    👉 Read out loud!
                </div>
            </div>
            
            <style>
                .simple-storybook {
                    max-width: 700px;
                    margin: 0 auto;
                }
                .book-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .book-page {
                    background: white;
                    padding: 50px 40px;
                    border-radius: 15px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    min-height: 250px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .page-text {
                    font-size: 32px;
                    line-height: 1.8;
                    color: #305853;
                    text-align: center;
                    font-weight: 600;
                }
                .book-nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 30px;
                    gap: 20px;
                }
                .story-nav-btn {
                    padding: 12px 24px;
                    font-size: 16px;
                    font-weight: 600;
                    background: #B06821;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-family: 'Nunito', sans-serif;
                }
                .story-nav-btn:hover:not(:disabled) {
                    background: #8B5319;
                    transform: translateY(-2px);
                }
                .story-nav-btn:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
                .page-dots {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .page-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #ccc;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .page-dot.active {
                    background: #B06821;
                    transform: scale(1.3);
                }
                .page-dot:hover {
                    background: #FFD700;
                }
            </style>
        `;
    }
    
    nextPage() {
        if (this.currentPage < this.story.pages.length - 1) {
            this.currentPage++;
            this.render();
        }
    }
    
    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.render();
        }
    }
    
    goToPage(pageNum) {
        this.currentPage = pageNum;
        this.render();
    }
}

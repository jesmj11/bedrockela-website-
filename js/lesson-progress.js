// BedrockELA Lesson Progress Tracking
class LessonProgress {
    constructor(lessonId) {
        this.lessonId = lessonId;
        this.studentId = this.getCurrentStudent();
        this.progress = {
            started: false,
            completed: false,
            currentStep: 0,
            totalSteps: 0,
            answers: {},
            timeSpent: 0,
            achievements: []
        };
        
        this.startTime = Date.now();
        this.loadProgress();
    }
    
    getCurrentStudent() {
        const studentData = sessionStorage.getItem('bedrockStudent');
        if (studentData) {
            return JSON.parse(studentData).id;
        }
        return 'demo-student';
    }
    
    async loadProgress() {
        if (window.bedrockStorage && window.bedrockStorage.db) {
            try {
                const savedProgress = await bedrockStorage.getLessonProgress(this.studentId, this.lessonId);
                if (savedProgress && savedProgress.length > 0) {
                    // Get the most recent progress
                    const latest = savedProgress.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
                    this.progress = { ...this.progress, ...latest.progress };
                    
                    console.log(`Loaded offline progress for ${this.lessonId}:`, this.progress);
                    this.updateProgressDisplay();
                }
            } catch (error) {
                console.log('Could not load saved progress:', error);
            }
        }
    }
    
    async saveProgress() {
        // Calculate time spent
        this.progress.timeSpent += (Date.now() - this.startTime) / 1000;
        this.startTime = Date.now();
        
        if (window.bedrockStorage && window.bedrockStorage.db) {
            try {
                await bedrockStorage.saveProgress(this.studentId, this.lessonId, this.progress);
                console.log(`Progress saved offline for ${this.lessonId}`);
                
                // Show offline indicator if needed
                if (!navigator.onLine) {
                    this.showOfflineIndicator();
                }
            } catch (error) {
                console.error('Failed to save progress:', error);
            }
        }
    }
    
    // Progress tracking methods
    startLesson(totalSteps = 3) {
        this.progress.started = true;
        this.progress.startTime = new Date().toISOString();
        this.progress.totalSteps = totalSteps;
        this.progress.currentStep = 1;
        this.saveProgress();
        this.updateProgressDisplay();
    }
    
    completeStep(stepNumber, answers = {}) {
        this.progress.currentStep = Math.max(this.progress.currentStep, stepNumber + 1);
        this.progress.answers = { ...this.progress.answers, ...answers };
        
        // Check if lesson is complete
        if (this.progress.currentStep > this.progress.totalSteps) {
            this.completeLesson();
        } else {
            this.saveProgress();
            this.updateProgressDisplay();
        }
    }
    
    completeLesson() {
        this.progress.completed = true;
        this.progress.completedTime = new Date().toISOString();
        this.progress.currentStep = this.progress.totalSteps;
        
        // Award achievements
        const timeMinutes = this.progress.timeSpent / 60;
        if (timeMinutes < 10) {
            this.progress.achievements.push('Speed Climber');
        }
        if (!navigator.onLine) {
            this.progress.achievements.push('Offline Explorer');
        }
        
        this.saveProgress();
        this.updateProgressDisplay();
        this.celebrateCompletion();
    }
    
    // UI Methods
    updateProgressDisplay() {
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        const stepIndicators = document.querySelectorAll('.step-indicator');
        
        if (progressBar) {
            const percentage = (this.progress.currentStep / this.progress.totalSteps) * 100;
            progressBar.style.width = `${Math.min(percentage, 100)}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Step ${this.progress.currentStep} of ${this.progress.totalSteps}`;
        }
        
        // Update step indicators
        stepIndicators.forEach((indicator, index) => {
            const stepNumber = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNumber < this.progress.currentStep) {
                indicator.classList.add('completed');
            } else if (stepNumber === this.progress.currentStep) {
                indicator.classList.add('active');
            }
        });
        
        // Show achievements
        if (this.progress.achievements.length > 0) {
            this.showAchievements();
        }
    }
    
    showOfflineIndicator() {
        let indicator = document.querySelector('.offline-indicator');
        
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'offline-indicator';
            indicator.innerHTML = '📶 Offline Mode - Progress saved locally';
            indicator.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff9800;
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: bold;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(indicator);
        }
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => indicator.remove(), 300);
            }
        }, 3000);
    }
    
    showAchievements() {
        const achievementContainer = document.querySelector('.achievements-container');
        if (achievementContainer) {
            achievementContainer.innerHTML = this.progress.achievements
                .map(achievement => `<span class="achievement">🏆 ${achievement}</span>`)
                .join('');
        }
    }
    
    celebrateCompletion() {
        // Create celebration overlay
        const celebration = document.createElement('div');
        celebration.className = 'lesson-celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="billy-celebration">🐐</div>
                <h2>Summit Reached!</h2>
                <p>Great job completing this Norwegian mountain adventure!</p>
                <div class="completion-stats">
                    <div class="stat">
                        <span class="stat-icon">⏱️</span>
                        <span class="stat-text">${Math.round(this.progress.timeSpent / 60)} minutes</span>
                    </div>
                    <div class="stat">
                        <span class="stat-icon">📶</span>
                        <span class="stat-text">${navigator.onLine ? 'Online' : 'Offline'}</span>
                    </div>
                </div>
                <div class="achievements">
                    ${this.progress.achievements.map(a => `<span class="achievement-badge">🏆 ${a}</span>`).join('')}
                </div>
                <button class="continue-btn" onclick="this.parentNode.parentNode.remove()">
                    Continue Adventure
                </button>
            </div>
        `;
        
        celebration.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(celebration);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.remove();
            }
        }, 10000);
    }
    
    // Static method to initialize progress for a lesson
    static init(lessonId, totalSteps = 3) {
        const progress = new LessonProgress(lessonId);
        progress.startLesson(totalSteps);
        
        // Add progress UI if it doesn't exist
        LessonProgress.addProgressUI();
        
        return progress;
    }
    
    static addProgressUI() {
        // Add basic progress UI to page if not present
        if (!document.querySelector('.lesson-progress-container')) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'lesson-progress-container';
            progressContainer.innerHTML = `
                <div class="progress-wrapper">
                    <div class="progress-track">
                        <div class="progress-bar"></div>
                    </div>
                    <span class="progress-text">Step 0 of 0</span>
                </div>
                <div class="achievements-container"></div>
            `;
            
            progressContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                padding: 15px 20px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                z-index: 100;
            `;
            
            document.body.appendChild(progressContainer);
        }
    }
}

// CSS for animations and styling
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .progress-track {
        background: #e0e0e0;
        border-radius: 10px;
        height: 8px;
        overflow: hidden;
        margin-right: 15px;
        flex: 1;
    }
    
    .progress-bar {
        background: linear-gradient(135deg, #4169E1 0%, #1d4ed8 100%);
        height: 100%;
        width: 0;
        transition: width 0.3s ease;
    }
    
    .progress-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .progress-text {
        font-weight: bold;
        color: #333;
        min-width: 100px;
    }
    
    .achievement {
        background: #FFD700;
        color: #333;
        padding: 4px 8px;
        border-radius: 15px;
        font-size: 12px;
        margin-right: 8px;
        display: inline-block;
    }
    
    .achievement-badge {
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        color: #333;
        padding: 8px 15px;
        border-radius: 20px;
        margin: 5px;
        display: inline-block;
        font-weight: bold;
        box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
    }
    
    .celebration-content {
        background: white;
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .billy-celebration {
        font-size: 60px;
        margin-bottom: 20px;
    }
    
    .completion-stats {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 20px 0;
    }
    
    .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }
    
    .continue-btn {
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        color: #333;
        border: none;
        padding: 15px 30px;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 20px;
    }
`;

document.head.appendChild(style);

// Export for use in other scripts
window.LessonProgress = LessonProgress;
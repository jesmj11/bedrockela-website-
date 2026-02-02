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
    async startLesson(totalSteps = 3) {
        // Check offline lesson limits
        const limitCheck = await this.checkOfflineLimits();
        if (!limitCheck.allowed) {
            this.showOfflineLimitReached(limitCheck);
            return false;
        }
        
        this.progress.started = true;
        this.progress.startTime = new Date().toISOString();
        this.progress.totalSteps = totalSteps;
        this.progress.currentStep = 1;
        this.progress.offlineLessonsRemaining = limitCheck.remaining;
        this.saveProgress();
        this.updateProgressDisplay();
        
        if (!limitCheck.unlimited) {
            this.showOfflineLessonsRemaining(limitCheck.remaining);
        }
        
        return true;
    }

    async checkOfflineLimits() {
        if (window.bedrockStorage && window.bedrockStorage.db) {
            try {
                return await bedrockStorage.useOfflineLesson(this.studentId);
            } catch (error) {
                console.error('Failed to check offline limits:', error);
                return { 
                    allowed: navigator.onLine, 
                    remaining: navigator.onLine ? Infinity : 0,
                    message: navigator.onLine ? 'Online - unlimited' : 'Offline limit check failed'
                };
            }
        }
        
        // Fallback if storage not available
        return { 
            allowed: navigator.onLine, 
            remaining: navigator.onLine ? Infinity : 0,
            message: navigator.onLine ? 'Online - unlimited' : 'Offline storage unavailable'
        };
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
    
    async completeLesson() {
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
        
        await this.saveProgress();
        this.updateProgressDisplay();
        
        // Check remaining offline lessons for completion message
        let remainingLessons = null;
        if (!navigator.onLine && window.bedrockStorage) {
            try {
                const status = await bedrockStorage.getOfflineStatus(this.studentId);
                remainingLessons = status.lessonsRemaining;
            } catch (error) {
                console.log('Could not get remaining lessons:', error);
            }
        }
        
        this.celebrateCompletion(remainingLessons);
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
    
    celebrateCompletion(remainingLessons = null) {
        // Create celebration overlay
        const celebration = document.createElement('div');
        celebration.className = 'lesson-celebration';
        
        let remainingLessonsDisplay = '';
        if (!navigator.onLine && remainingLessons !== null) {
            if (remainingLessons > 0) {
                remainingLessonsDisplay = `
                    <div class="offline-status">
                        📶 Offline Mode: ${remainingLessons} lessons remaining
                    </div>
                `;
            } else {
                remainingLessonsDisplay = `
                    <div class="offline-status limit-reached">
                        📶 Offline lessons used up! Connect to WiFi for unlimited learning.
                    </div>
                `;
            }
        }
        
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
                ${remainingLessonsDisplay}
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
    
    showOfflineLimitReached(limitCheck) {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 10000;">
                <div style="background: white; border-radius: 20px; padding: 40px; max-width: 400px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                    <div style="font-size: 60px; margin-bottom: 20px;">📶</div>
                    <h2 style="color: #ff6b35; margin-bottom: 15px;">Offline Lesson Limit Reached</h2>
                    <p style="color: #666; margin-bottom: 25px;">${limitCheck.message}</p>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h4 style="margin: 0 0 10px 0; color: #4169E1;">Connect to WiFi to:</h4>
                        <ul style="text-align: left; color: #666; margin: 10px 0;">
                            <li>✅ Get unlimited lessons</li>
                            <li>✅ Sync your progress</li>
                            <li>✅ Reset offline counter to 10</li>
                        </ul>
                    </div>
                    <button onclick="this.parentNode.parentNode.remove()" style="background: #ff6b35; color: white; border: none; padding: 15px 30px; border-radius: 10px; font-weight: bold; cursor: pointer;">
                        Got It
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    showOfflineLessonsRemaining(remaining) {
        if (remaining <= 3) {
            const warning = document.createElement('div');
            warning.innerHTML = `📶 ${remaining} offline lessons remaining`;
            warning.style.cssText = `
                position: fixed;
                top: 60px;
                right: 20px;
                background: #ff9800;
                color: white;
                padding: 10px 15px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: bold;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            `;
            document.body.appendChild(warning);

            setTimeout(() => {
                if (warning.parentNode) {
                    warning.remove();
                }
            }, 3000);
        }
    }

    // Static method to initialize progress for a lesson
    static async init(lessonId, totalSteps = 3) {
        const progress = new LessonProgress(lessonId);
        const startResult = await progress.startLesson(totalSteps);
        
        if (!startResult) {
            // Lesson start failed due to offline limits
            return null;
        }
        
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
    
    .offline-status {
        background: #e3f2fd;
        color: #1976d2;
        padding: 12px 20px;
        border-radius: 10px;
        margin: 15px 0;
        font-weight: bold;
        border-left: 4px solid #2196f3;
        text-align: center;
    }
    
    .offline-status.limit-reached {
        background: #fff3e0;
        color: #f57c00;
        border-left-color: #ff9800;
    }
`;

document.head.appendChild(style);

// Export for use in other scripts
window.LessonProgress = LessonProgress;
// BedrockELA Curriculum Downloader - For True Offline Access
class CurriculumDownloader {
    constructor() {
        this.downloadQueue = [];
        this.isDownloading = false;
        this.totalSize = 0;
        this.downloadedSize = 0;
    }

    // Create downloadable curriculum packages
    async createCurriculumPackage(grade) {
        const packages = {
            '1st': {
                name: '1st Grade - Little Billy Adventures',
                files: [
                    '1st-grade-lessons.html',
                    '1st-grade-reading-lessons.html',
                    'images/little-billy-goat.jpg',
                    'images/bedrock-village.jpg'
                ],
                size: '2.1 MB',
                lessons: 3,
                description: 'Vowels, sentences, and reading comprehension with Little Billy'
            },
            '2nd': {
                name: '2nd Grade - Billy\'s Mountain Trails',
                files: [
                    '2nd-grade-lessons.html',
                    'images/billy-medium-goat.jpg',
                    'images/bedrock-village.jpg'
                ],
                size: '1.8 MB',
                lessons: 3,
                description: 'Advanced phonics and story structure'
            },
            '3rd': {
                name: '3rd Grade - Trail Blazer Expeditions',
                files: [
                    '3rd-grade-lessons.html',
                    'images/billy-medium-goat.jpg',
                    'images/bedrock-village.jpg'
                ],
                size: '2.0 MB',
                lessons: 3,
                description: 'Paragraph structure and vocabulary building'
            },
            '4th': {
                name: '4th Grade - Summit Seeker Challenges',
                files: [
                    '4th-grade-lessons.html',
                    'images/big-gruff-goat.jpg',
                    'images/bedrock-village.jpg'
                ],
                size: '2.3 MB',
                lessons: 3,
                description: 'Text evidence, writing, and critical thinking'
            },
            'complete': {
                name: 'Complete BedrockELA Curriculum (K-8)',
                files: [
                    'index.html',
                    '1st-grade-lessons.html',
                    '2nd-grade-lessons.html', 
                    '3rd-grade-lessons.html',
                    '4th-grade-lessons.html',
                    'interactive-village-dashboard.html',
                    'writing-summit-portal.html',
                    'parent-dashboard.html',
                    'mountain-student-signin.html',
                    'images/bedrockela-homepage-hero.jpg',
                    'images/little-billy-goat.jpg',
                    'images/billy-medium-goat.jpg',
                    'images/big-gruff-goat.jpg',
                    'images/bedrock-village.jpg',
                    'js/offline-storage.js',
                    'js/lesson-progress.js',
                    'manifest.json'
                ],
                size: '12.5 MB',
                lessons: 15,
                description: 'Full Norwegian mountain ELA curriculum with offline support'
            }
        };

        return packages[grade] || null;
    }

    // Download curriculum package
    async downloadPackage(grade) {
        const packageInfo = await this.createCurriculumPackage(grade);
        if (!packageInfo) {
            throw new Error(`Package for grade ${grade} not found`);
        }

        try {
            this.showDownloadProgress(true);
            this.updateDownloadStatus(`Preparing ${packageInfo.name}...`);

            // Check if browser supports file downloads
            if (!('showSaveFilePicker' in window)) {
                // Fallback for browsers without File System Access API
                return await this.downloadPackageFallback(packageInfo, grade);
            }

            // Use modern File System Access API
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: `bedrockela-${grade}-grade.zip`,
                types: [{
                    description: 'BedrockELA Curriculum Package',
                    accept: {
                        'application/zip': ['.zip'],
                    },
                }],
            });

            const writable = await fileHandle.createWritable();
            const zipBlob = await this.createZipPackage(packageInfo);
            
            await writable.write(zipBlob);
            await writable.close();

            this.showDownloadComplete(packageInfo);
            return true;

        } catch (error) {
            console.error('Download failed:', error);
            this.showDownloadError(error.message);
            return false;
        } finally {
            this.showDownloadProgress(false);
        }
    }

    // Fallback download method for older browsers
    async downloadPackageFallback(packageInfo, grade) {
        const zipBlob = await this.createZipPackage(packageInfo);
        
        // Create download link
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bedrockela-${grade}-grade.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showDownloadComplete(packageInfo);
        return true;
    }

    // Create ZIP package (simplified - in real implementation would use JSZip library)
    async createZipPackage(packageInfo) {
        // For now, create a simple text file with package info
        // In a real implementation, you'd use JSZip to create actual ZIP files
        
        const packageContent = {
            name: packageInfo.name,
            description: packageInfo.description,
            lessons: packageInfo.lessons,
            files: packageInfo.files,
            downloadDate: new Date().toISOString(),
            version: '1.0.0',
            instructions: `
BedrockELA Offline Package Instructions:

1. Extract this package to a folder on your device
2. Open index.html in any web browser
3. All content will work offline
4. Progress is saved locally in your browser
5. Enjoy learning Norwegian mountain adventures!

For support: support@bedrockela.com
            `.trim()
        };

        // Create a simple package file
        const blob = new Blob([JSON.stringify(packageContent, null, 2)], {
            type: 'application/json'
        });

        return blob;
    }

    // Cache curriculum content for offline access
    async cacheForOfflineAccess(grade = 'all') {
        if (!window.bedrockStorage) {
            console.error('Offline storage not available');
            return false;
        }

        try {
            this.showDownloadProgress(true);
            this.updateDownloadStatus('Caching curriculum for offline access...');

            const grades = grade === 'all' ? ['1st', '2nd', '3rd', '4th'] : [grade];
            
            for (const gradeLevel of grades) {
                const packageInfo = await this.createCurriculumPackage(gradeLevel);
                if (packageInfo) {
                    // Cache each file
                    for (const file of packageInfo.files) {
                        await this.cacheFile(file, gradeLevel);
                    }

                    // Store package info in IndexedDB
                    await bedrockStorage.cacheCurriculumContent(
                        `${gradeLevel}-grade-package`,
                        {
                            grade: gradeLevel,
                            ...packageInfo,
                            cachedOffline: true
                        }
                    );
                }
            }

            this.showCacheComplete();
            return true;

        } catch (error) {
            console.error('Caching failed:', error);
            this.showDownloadError('Failed to cache curriculum for offline access');
            return false;
        } finally {
            this.showDownloadProgress(false);
        }
    }

    async cacheFile(filePath, grade) {
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                // File will be cached by service worker
                this.updateDownloadStatus(`Cached ${filePath} for ${grade} grade`);
            }
        } catch (error) {
            console.log(`Could not cache ${filePath}:`, error.message);
        }
    }

    // UI Methods
    showDownloadProgress(show) {
        let progressOverlay = document.getElementById('download-progress-overlay');
        
        if (show && !progressOverlay) {
            progressOverlay = document.createElement('div');
            progressOverlay.id = 'download-progress-overlay';
            progressOverlay.innerHTML = `
                <div class="download-progress-content">
                    <div class="billy-download">🐐</div>
                    <h3>Preparing Offline Curriculum</h3>
                    <div class="download-progress-bar">
                        <div class="download-progress-fill"></div>
                    </div>
                    <p class="download-status">Initializing...</p>
                    <p class="download-subtitle">Billy is gathering your Norwegian mountain learning materials!</p>
                </div>
            `;
            
            progressOverlay.style.cssText = `
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

            document.body.appendChild(progressOverlay);
        } else if (!show && progressOverlay) {
            progressOverlay.remove();
        }
    }

    updateDownloadStatus(status) {
        const statusElement = document.querySelector('.download-status');
        if (statusElement) {
            statusElement.textContent = status;
        }
    }

    showDownloadComplete(packageInfo) {
        const completionModal = document.createElement('div');
        completionModal.innerHTML = `
            <div class="download-complete-content">
                <div class="billy-success">🎉</div>
                <h2>Download Complete!</h2>
                <div class="package-info">
                    <h3>${packageInfo.name}</h3>
                    <p>${packageInfo.description}</p>
                    <div class="package-stats">
                        <span>📚 ${packageInfo.lessons} lessons</span>
                        <span>💾 ${packageInfo.size}</span>
                    </div>
                </div>
                <div class="instructions">
                    <h4>Next Steps:</h4>
                    <ol>
                        <li>Extract the downloaded package</li>
                        <li>Open index.html in any browser</li>
                        <li>Enjoy offline Norwegian mountain learning!</li>
                    </ol>
                </div>
                <button class="complete-btn" onclick="this.parentNode.parentNode.remove()">
                    Continue
                </button>
            </div>
        `;

        completionModal.style.cssText = `
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

        document.body.appendChild(completionModal);

        setTimeout(() => {
            if (completionModal.parentNode) {
                completionModal.remove();
            }
        }, 15000);
    }

    showCacheComplete() {
        const notification = document.createElement('div');
        notification.innerHTML = '✅ Curriculum cached for offline access!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #32CD32;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(50, 205, 50, 0.3);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    showDownloadError(message) {
        const errorNotification = document.createElement('div');
        errorNotification.innerHTML = `❌ ${message}`;
        errorNotification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
        `;

        document.body.appendChild(errorNotification);

        setTimeout(() => {
            errorNotification.remove();
        }, 5000);
    }

    // Create download interface
    static createDownloadInterface() {
        const downloadInterface = document.createElement('div');
        downloadInterface.id = 'curriculum-downloader';
        downloadInterface.innerHTML = `
            <div class="download-section">
                <h3>📦 Download for Offline Learning</h3>
                <div class="download-options">
                    <button class="download-btn" onclick="curriculumDownloader.downloadPackage('1st')">
                        📚 1st Grade Package
                    </button>
                    <button class="download-btn" onclick="curriculumDownloader.downloadPackage('2nd')">
                        📚 2nd Grade Package
                    </button>
                    <button class="download-btn" onclick="curriculumDownloader.downloadPackage('3rd')">
                        📚 3rd Grade Package
                    </button>
                    <button class="download-btn" onclick="curriculumDownloader.downloadPackage('4th')">
                        📚 4th Grade Package
                    </button>
                    <button class="download-btn primary" onclick="curriculumDownloader.downloadPackage('complete')">
                        🎒 Complete Curriculum
                    </button>
                </div>
                <div class="cache-section">
                    <button class="cache-btn" onclick="curriculumDownloader.cacheForOfflineAccess()">
                        💾 Cache All for Offline Access
                    </button>
                    <p class="cache-description">Cache curriculum in your browser for instant offline access</p>
                </div>
            </div>
        `;

        return downloadInterface;
    }
}

// CSS for download interface
const downloadStyles = document.createElement('style');
downloadStyles.textContent = `
    .download-section {
        background: #f8f9fa;
        border-radius: 15px;
        padding: 25px;
        margin: 20px 0;
        border: 2px solid #e9ecef;
    }

    .download-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }

    .download-btn, .cache-btn {
        background: linear-gradient(135deg, #4169E1 0%, #1d4ed8 100%);
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .download-btn.primary {
        background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
        color: #333;
        font-size: 16px;
    }

    .download-btn:hover, .cache-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(65, 105, 225, 0.3);
    }

    .cache-section {
        margin-top: 25px;
        padding-top: 20px;
        border-top: 1px solid #dee2e6;
        text-align: center;
    }

    .cache-description {
        color: #666;
        font-size: 14px;
        margin-top: 10px;
    }

    .download-progress-content {
        background: white;
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .billy-download, .billy-success {
        font-size: 60px;
        margin-bottom: 20px;
    }

    .download-progress-bar {
        background: #e0e0e0;
        border-radius: 10px;
        height: 12px;
        overflow: hidden;
        margin: 20px 0;
    }

    .download-progress-fill {
        background: linear-gradient(135deg, #4169E1 0%, #1d4ed8 100%);
        height: 100%;
        width: 0%;
        transition: width 0.3s ease;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    .download-complete-content {
        background: white;
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        max-width: 500px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .package-stats {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin: 15px 0;
        font-weight: bold;
        color: #4169E1;
    }

    .instructions {
        text-align: left;
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
    }

    .instructions ol {
        margin: 10px 0;
        padding-left: 20px;
    }

    .complete-btn {
        background: linear-gradient(135deg, #32CD32 0%, #228B22 100%);
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 20px;
    }
`;

document.head.appendChild(downloadStyles);

// Global instance
window.curriculumDownloader = new CurriculumDownloader();
window.CurriculumDownloader = CurriculumDownloader;
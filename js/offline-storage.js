// BedrockELA Offline Storage - IndexedDB for Progress Tracking
class BedrockStorage {
    constructor() {
        this.dbName = 'BedrockELA';
        this.dbVersion = 1;
        this.db = null;
        this.initDB();
    }

    // Initialize IndexedDB
    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => {
                console.error('Failed to open BedrockELA database');
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                console.log('BedrockELA database ready for offline learning!');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Student progress store
                if (!db.objectStoreNames.contains('progress')) {
                    const progressStore = db.createObjectStore('progress', { 
                        keyPath: 'id', 
                        autoIncrement: true 
                    });
                    progressStore.createIndex('studentId', 'studentId', { unique: false });
                    progressStore.createIndex('lessonId', 'lessonId', { unique: false });
                    progressStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
                
                // Student profiles store
                if (!db.objectStoreNames.contains('students')) {
                    const studentsStore = db.createObjectStore('students', { 
                        keyPath: 'id' 
                    });
                    studentsStore.createIndex('username', 'username', { unique: true });
                }
                
                // Cached curriculum content
                if (!db.objectStoreNames.contains('curriculum')) {
                    const curriculumStore = db.createObjectStore('curriculum', { 
                        keyPath: 'lessonId' 
                    });
                    curriculumStore.createIndex('grade', 'grade', { unique: false });
                }
                
                // Sync queue for offline actions
                if (!db.objectStoreNames.contains('syncQueue')) {
                    const syncStore = db.createObjectStore('syncQueue', { 
                        keyPath: 'id', 
                        autoIncrement: true 
                    });
                    syncStore.createIndex('action', 'action', { unique: false });
                    syncStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
                
                console.log('BedrockELA database schema created!');
            };
        });
    }

    // Student Progress Methods
    async saveProgress(studentId, lessonId, progressData) {
        try {
            const transaction = this.db.transaction(['progress'], 'readwrite');
            const store = transaction.objectStore('progress');
            
            const progress = {
                studentId: studentId,
                lessonId: lessonId,
                progress: progressData,
                timestamp: new Date().toISOString(),
                synced: navigator.onLine
            };
            
            await store.add(progress);
            
            // Add to sync queue if offline
            if (!navigator.onLine) {
                await this.addToSyncQueue('saveProgress', progress);
            }
            
            console.log(`Progress saved for ${studentId} - ${lessonId}`);
            return true;
        } catch (error) {
            console.error('Failed to save progress:', error);
            return false;
        }
    }

    async getStudentProgress(studentId) {
        try {
            const transaction = this.db.transaction(['progress'], 'readonly');
            const store = transaction.objectStore('progress');
            const index = store.index('studentId');
            
            return new Promise((resolve, reject) => {
                const request = index.getAll(studentId);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Failed to get student progress:', error);
            return [];
        }
    }

    async getLessonProgress(studentId, lessonId) {
        try {
            const allProgress = await this.getStudentProgress(studentId);
            return allProgress.filter(p => p.lessonId === lessonId);
        } catch (error) {
            console.error('Failed to get lesson progress:', error);
            return [];
        }
    }

    // Student Profile Methods
    async saveStudentProfile(studentData) {
        try {
            const transaction = this.db.transaction(['students'], 'readwrite');
            const store = transaction.objectStore('students');
            
            const student = {
                ...studentData,
                lastActive: new Date().toISOString(),
                createdOffline: !navigator.onLine
            };
            
            await store.put(student);
            
            if (!navigator.onLine) {
                await this.addToSyncQueue('saveStudent', student);
            }
            
            console.log(`Student profile saved: ${student.username}`);
            return true;
        } catch (error) {
            console.error('Failed to save student profile:', error);
            return false;
        }
    }

    async getStudentProfile(studentId) {
        try {
            const transaction = this.db.transaction(['students'], 'readonly');
            const store = transaction.objectStore('students');
            
            return new Promise((resolve, reject) => {
                const request = store.get(studentId);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Failed to get student profile:', error);
            return null;
        }
    }

    async getAllStudents() {
        try {
            const transaction = this.db.transaction(['students'], 'readonly');
            const store = transaction.objectStore('students');
            
            return new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Failed to get all students:', error);
            return [];
        }
    }

    // Curriculum Caching Methods
    async cacheCurriculumContent(lessonId, content) {
        try {
            const transaction = this.db.transaction(['curriculum'], 'readwrite');
            const store = transaction.objectStore('curriculum');
            
            const curriculumData = {
                lessonId: lessonId,
                content: content,
                grade: content.grade || 'unknown',
                cachedAt: new Date().toISOString()
            };
            
            await store.put(curriculumData);
            console.log(`Curriculum cached: ${lessonId}`);
            return true;
        } catch (error) {
            console.error('Failed to cache curriculum:', error);
            return false;
        }
    }

    async getCachedCurriculum(lessonId) {
        try {
            const transaction = this.db.transaction(['curriculum'], 'readonly');
            const store = transaction.objectStore('curriculum');
            
            return new Promise((resolve, reject) => {
                const request = store.get(lessonId);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Failed to get cached curriculum:', error);
            return null;
        }
    }

    // Sync Queue Methods
    async addToSyncQueue(action, data) {
        try {
            const transaction = this.db.transaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            
            const syncItem = {
                action: action,
                data: data,
                timestamp: new Date().toISOString(),
                attempts: 0
            };
            
            await store.add(syncItem);
            console.log(`Added to sync queue: ${action}`);
            
            // Try to sync if online
            if (navigator.onLine) {
                this.processSyncQueue();
            }
            
            return true;
        } catch (error) {
            console.error('Failed to add to sync queue:', error);
            return false;
        }
    }

    async processSyncQueue() {
        try {
            const transaction = this.db.transaction(['syncQueue'], 'readonly');
            const store = transaction.objectStore('syncQueue');
            
            const syncItems = await new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
            
            for (const item of syncItems) {
                await this.syncItem(item);
            }
            
            console.log(`Processed ${syncItems.length} sync items`);
        } catch (error) {
            console.error('Failed to process sync queue:', error);
        }
    }

    async syncItem(item) {
        try {
            // Simulate API call for now
            console.log(`Syncing ${item.action}:`, item.data);
            
            // In a real implementation, this would make HTTP requests to your server
            // For now, we'll just mark as synced and remove from queue
            
            const transaction = this.db.transaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            await store.delete(item.id);
            
            return true;
        } catch (error) {
            console.error(`Failed to sync ${item.action}:`, error);
            
            // Update attempt count
            item.attempts = (item.attempts || 0) + 1;
            
            if (item.attempts < 3) {
                const transaction = this.db.transaction(['syncQueue'], 'readwrite');
                const store = transaction.objectStore('syncQueue');
                await store.put(item);
            } else {
                console.log(`Giving up on sync item after 3 attempts:`, item);
            }
            
            return false;
        }
    }

    // Utility Methods
    async clearAllData() {
        try {
            const stores = ['progress', 'students', 'curriculum', 'syncQueue'];
            const transaction = this.db.transaction(stores, 'readwrite');
            
            for (const storeName of stores) {
                const store = transaction.objectStore(storeName);
                await store.clear();
            }
            
            console.log('All BedrockELA data cleared');
            return true;
        } catch (error) {
            console.error('Failed to clear data:', error);
            return false;
        }
    }

    async getStorageSize() {
        try {
            if (!navigator.storage || !navigator.storage.estimate) {
                return { used: 'unknown', available: 'unknown' };
            }
            
            const estimate = await navigator.storage.estimate();
            return {
                used: this.formatBytes(estimate.usage || 0),
                available: this.formatBytes(estimate.quota || 0)
            };
        } catch (error) {
            console.error('Failed to get storage estimate:', error);
            return { used: 'unknown', available: 'unknown' };
        }
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Global instance
let bedrockStorage;

// Initialize storage when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    bedrockStorage = new BedrockStorage();
    
    // Process sync queue when coming back online
    window.addEventListener('online', () => {
        console.log('Back online! Processing sync queue...');
        if (bedrockStorage && bedrockStorage.db) {
            bedrockStorage.processSyncQueue();
        }
    });
});

// Export for use in other scripts
window.BedrockStorage = BedrockStorage;
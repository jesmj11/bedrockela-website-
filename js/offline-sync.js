/**
 * Offline Lesson Sync System
 * Allows students to complete up to 10 lessons offline
 * Syncs progress when back online
 */

class OfflineSync {
  constructor() {
    this.storageKey = 'bedrockela_offline_lessons';
    this.syncKey = 'bedrockela_pending_sync';
    this.maxOfflineLessons = 10;
    this.isOnline = navigator.onLine;
    
    // Listen for online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    this.init();
  }

  async init() {
    // Clear old cache metadata (from previous versions with wrong URLs)
    this.clearOldCache();
    
    // Show online/offline indicator
    this.createOnlineIndicator();
    
    // Try to sync any pending data
    if (this.isOnline) {
      await this.syncPendingProgress();
    }
    
    console.log(`📡 Offline sync initialized - ${this.isOnline ? 'ONLINE' : 'OFFLINE'}`);
  }

  // Clear old cache if it has wrong URL format
  clearOldCache() {
    const metadata = this.getCacheMetadata();
    if (metadata && metadata.gradeLevel && metadata.gradeLevel.includes(' ')) {
      // Old format detected - clear it
      console.log('🧹 Clearing old cache with wrong URL format...');
      localStorage.removeItem(this.storageKey);
      
      // Also clear the actual cache
      if ('caches' in window) {
        caches.delete('bedrockela-offline-lessons').then(() => {
          console.log('✅ Old cache cleared');
        });
      }
    }
  }

  // Pre-cache next 10 lessons for offline use
  async cacheLessonsAhead(currentLesson, gradeLevel) {
    if (!('caches' in window)) {
      console.warn('Cache API not supported');
      return;
    }

    const lessonsToCache = [];
    const maxLesson = Math.min(currentLesson + this.maxOfflineLessons, 180);
    
    // Generate URLs for next 10 lessons
    for (let i = currentLesson; i <= maxLesson; i++) {
      const url = this.getLessonUrl(i, gradeLevel);
      lessonsToCache.push(url);
    }

    try {
      const cache = await caches.open('bedrockela-offline-lessons');
      
      // Cache each lesson
      for (const url of lessonsToCache) {
        try {
          await cache.add(url);
          console.log(`✅ Cached lesson: ${url}`);
        } catch (error) {
          console.warn(`Failed to cache ${url}:`, error);
        }
      }
      
      // Also cache essential resources
      const essentialResources = [
        '/css/lesson-viewer.css',
        '/js/lesson-viewer.js',
        '/js/lesson-completion.js',
        '/js/lesson-autosave.js',
        '/js/text-to-speech.js',
        '/js/digital-book.js',
        '/firebase-config.js',
        '/student-dashboard.html'
      ];
      
      for (const resource of essentialResources) {
        try {
          await cache.add(resource);
        } catch (error) {
          console.warn(`Failed to cache ${resource}:`, error);
        }
      }
      
      console.log(`✅ Cached ${lessonsToCache.length} lessons for offline use`);
      
      // Save cache metadata
      this.saveCacheMetadata(currentLesson, maxLesson, gradeLevel);
      
    } catch (error) {
      console.error('Error caching lessons:', error);
    }
  }

  // Get lesson URL based on grade level
  getLessonUrl(lessonNum, gradeLevel) {
    // Normalize grade level (handle both "4th Grade" and "4th-grade")
    const normalizedGrade = gradeLevel.toLowerCase().replace(/\s+/g, '-');
    
    // All lessons now use the "day-X" format
    return `/${normalizedGrade}-day-${lessonNum}.html`;
  }

  // Save cache metadata
  saveCacheMetadata(startLesson, endLesson, gradeLevel) {
    const metadata = {
      startLesson,
      endLesson,
      gradeLevel,
      cachedAt: new Date().toISOString(),
      lessonsCached: endLesson - startLesson + 1
    };
    localStorage.setItem(this.storageKey, JSON.stringify(metadata));
  }

  // Get cache metadata
  getCacheMetadata() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  // Track lesson completion offline
  trackOfflineCompletion(studentId, lessonNumber, gradeLevel) {
    const pendingSync = this.getPendingSync();
    
    const completion = {
      studentId,
      lessonNumber,
      gradeLevel,
      completedAt: new Date().toISOString(),
      offline: true
    };
    
    pendingSync.push(completion);
    localStorage.setItem(this.syncKey, JSON.stringify(pendingSync));
    
    console.log(`📝 Tracked offline completion: Lesson ${lessonNumber}`);
    this.updateOfflineIndicator();
  }

  // Get pending sync items
  getPendingSync() {
    const data = localStorage.getItem(this.syncKey);
    return data ? JSON.parse(data) : [];
  }

  // Sync pending progress when back online
  async syncPendingProgress() {
    const pending = this.getPendingSync();
    
    if (pending.length === 0) {
      console.log('✅ No pending offline progress to sync');
      return;
    }

    console.log(`📤 Syncing ${pending.length} offline lesson completions...`);

    try {
      // Check if Firebase is available
      if (typeof firebase === 'undefined') {
        console.warn('Firebase not loaded - will retry sync later');
        return;
      }

      const db = firebase.firestore();
      
      // Group by student
      const byStudent = {};
      pending.forEach(item => {
        if (!byStudent[item.studentId]) {
          byStudent[item.studentId] = [];
        }
        byStudent[item.studentId].push(item.lessonNumber);
      });

      // Sync each student's progress
      for (const [studentId, lessons] of Object.entries(byStudent)) {
        const maxLesson = Math.max(...lessons);
        
        await db.collection('students').doc(studentId).update({
          currentLesson: maxLesson + 1,
          completedLessons: firebase.firestore.FieldValue.arrayUnion(...lessons),
          lastActive: new Date().toISOString(),
          lastSyncedAt: new Date().toISOString()
        });
        
        console.log(`✅ Synced ${lessons.length} lessons for student ${studentId}`);
      }

      // Clear pending sync after success
      localStorage.removeItem(this.syncKey);
      console.log('✅ All offline progress synced successfully!');
      
      // Show success message
      this.showSyncSuccess(pending.length);
      
      // Update cache for next lessons
      const studentData = JSON.parse(localStorage.getItem('bedrockela_student') || 'null');
      if (studentData) {
        const nextLesson = Math.max(...Object.values(byStudent).flat()) + 1;
        await this.cacheLessonsAhead(nextLesson, studentData.gradeLevel);
      }
      
    } catch (error) {
      console.error('Error syncing offline progress:', error);
      // Keep pending data for next attempt
    }
  }

  // Handle coming back online
  async handleOnline() {
    this.isOnline = true;
    console.log('📡 ONLINE - Syncing progress...');
    this.updateOfflineIndicator();
    
    // Wait a bit for network to stabilize
    setTimeout(() => {
      this.syncPendingProgress();
    }, 2000);
  }

  // Handle going offline
  handleOffline() {
    this.isOnline = false;
    console.log('📡 OFFLINE - Working offline');
    this.updateOfflineIndicator();
  }

  // Create online/offline indicator
  createOnlineIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'online-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(indicator);
    this.updateOfflineIndicator();
  }

  // Update online/offline indicator
  updateOfflineIndicator() {
    const indicator = document.getElementById('online-indicator');
    if (!indicator) return;

    const pending = this.getPendingSync();
    
    if (this.isOnline) {
      indicator.style.background = '#4CAF50';
      indicator.style.color = 'white';
      indicator.innerHTML = `
        <span style="width: 8px; height: 8px; background: white; border-radius: 50%;"></span>
        Online
      `;
      
      if (pending.length > 0) {
        indicator.innerHTML += ` - Syncing ${pending.length}...`;
      }
    } else {
      const cache = this.getCacheMetadata();
      const offlineLessons = cache ? cache.lessonsCached : 0;
      
      indicator.style.background = '#FF9800';
      indicator.style.color = 'white';
      indicator.innerHTML = `
        <span style="width: 8px; height: 8px; background: white; border-radius: 50%;"></span>
        Offline (${offlineLessons} lessons cached)
      `;
      
      if (pending.length > 0) {
        indicator.innerHTML += ` - ${pending.length} to sync`;
      }
    }
  }

  // Show sync success message
  showSyncSuccess(count) {
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 30px 40px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      z-index: 10001;
      text-align: center;
      animation: slideUp 0.4s ease;
    `;
    
    message.innerHTML = `
      <h2 style="color: #305853; margin-bottom: 10px;">Synced!</h2>
      <p style="color: #666;">${count} lesson${count > 1 ? 's' : ''} synced to the cloud</p>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }

  // Check if lesson is available offline
  async isLessonCached(lessonNumber, gradeLevel) {
    if (!('caches' in window)) return false;
    
    const cache = await caches.open('bedrockela-offline-lessons');
    const url = this.getLessonUrl(lessonNumber, gradeLevel);
    const response = await cache.match(url);
    
    return !!response;
  }
}

// Initialize offline sync when page loads
window.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for grade normalizer to run first
  setTimeout(() => {
    window.offlineSync = new OfflineSync();
    
    // Cache lessons when student logs in
    const studentData = JSON.parse(localStorage.getItem('bedrockela_student') || 'null');
    if (studentData?.id && studentData?.gradeLevel) {
      // Get current lesson from Firebase or localStorage
      const currentLesson = studentData.currentLesson || 1;
      
      // Grade should already be normalized by grade-normalizer.js
      // But double-check format
      let gradeLevel = studentData.gradeLevel;
      if (!gradeLevel.includes('-')) {
        // Still needs normalization (fallback)
        gradeLevel = gradeLevel.toLowerCase().replace(/\s+/g, '-');
        if (!gradeLevel.includes('grade')) {
          gradeLevel = gradeLevel + '-grade';
        }
      }
      
      console.log(`📦 Caching lessons for: ${gradeLevel}`);
      
      // Cache next 10 lessons
      window.offlineSync.cacheLessonsAhead(currentLesson, gradeLevel);
    }
  }, 100); // Wait 100ms for normalizer to fix localStorage
});

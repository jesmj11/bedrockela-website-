/**
 * Student Work Export Module
 * Exports student progress, answers, and scores to CSV/PDF
 */

import { getFirestore, collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/**
 * Export student work as CSV
 */
export async function exportStudentWorkCSV(db, studentId, studentName, dateRange = null) {
    try {
        // Get student data
        const studentRef = collection(db, 'students');
        const studentDoc = await getDocs(query(studentRef, where('__name__', '==', studentId)));
        
        if (studentDoc.empty) {
            throw new Error('Student not found');
        }
        
        const student = studentDoc.docs[0].data();
        
        // Get all lesson progress
        const progressRef = collection(db, 'students', studentId, 'lessonProgress');
        let progressQuery = query(progressRef);
        
        // Apply date range if specified
        if (dateRange && dateRange.start) {
            progressQuery = query(progressQuery, where('timestamp', '>=', dateRange.start));
        }
        if (dateRange && dateRange.end) {
            progressQuery = query(progressQuery, where('timestamp', '<=', dateRange.end));
        }
        
        const progressSnapshot = await getDocs(progressQuery);
        
        // Build CSV
        const csvRows = [];
        
        // Header
        csvRows.push([
            'Student Name',
            'Grade Level',
            'Lesson Number',
            'Lesson Title',
            'Date Completed',
            'Question',
            'Student Answer',
            'Correct Answer',
            'Score',
            'AI Feedback'
        ]);
        
        // Data rows
        progressSnapshot.forEach(doc => {
            const lesson = doc.data();
            const lessonNum = doc.id;
            const completedDate = lesson.completedAt ? new Date(lesson.completedAt.toDate()).toLocaleDateString() : 'In Progress';
            
            // If lesson has answers
            if (lesson.answers && Array.isArray(lesson.answers)) {
                lesson.answers.forEach((answer, idx) => {
                    csvRows.push([
                        studentName,
                        student.gradeLevel,
                        lessonNum,
                        lesson.title || `Lesson ${lessonNum}`,
                        completedDate,
                        answer.question || `Question ${idx + 1}`,
                        answer.studentAnswer || '',
                        answer.correctAnswer || '',
                        answer.score || '',
                        answer.feedback || ''
                    ]);
                });
            } else {
                // Lesson with no detailed answers, just completion
                csvRows.push([
                    studentName,
                    student.gradeLevel,
                    lessonNum,
                    lesson.title || `Lesson ${lessonNum}`,
                    completedDate,
                    'Lesson Completed',
                    '',
                    '',
                    lesson.overallScore || '100%',
                    ''
                ]);
            }
        });
        
        // Convert to CSV string
        const csvContent = csvRows.map(row => 
            row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        ).join('\n');
        
        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        const dateStr = new Date().toISOString().split('T')[0];
        link.setAttribute('href', url);
        link.setAttribute('download', `${studentName}_BedrockELA_Export_${dateStr}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return {
            success: true,
            recordCount: progressSnapshot.size,
            fileName: `${studentName}_BedrockELA_Export_${dateStr}.csv`
        };
        
    } catch (error) {
        console.error('Export error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Export all students for a parent
 */
export async function exportAllStudentsCSV(db, parentId) {
    try {
        // Get all students for this parent
        const studentsRef = collection(db, 'students');
        const studentsQuery = query(studentsRef, where('parentId', '==', parentId));
        const studentsSnapshot = await getDocs(studentsQuery);
        
        if (studentsSnapshot.empty) {
            throw new Error('No students found');
        }
        
        // Export each student and combine
        const allRows = [];
        
        // Header (only once)
        allRows.push([
            'Student Name',
            'Grade Level',
            'Lesson Number',
            'Lesson Title',
            'Date Completed',
            'Question',
            'Student Answer',
            'Correct Answer',
            'Score',
            'AI Feedback'
        ]);
        
        for (const studentDoc of studentsSnapshot.docs) {
            const student = studentDoc.data();
            const studentId = studentDoc.id;
            
            // Get lesson progress for this student
            const progressRef = collection(db, 'students', studentId, 'lessonProgress');
            const progressSnapshot = await getDocs(progressRef);
            
            progressSnapshot.forEach(doc => {
                const lesson = doc.data();
                const lessonNum = doc.id;
                const completedDate = lesson.completedAt ? new Date(lesson.completedAt.toDate()).toLocaleDateString() : 'In Progress';
                
                if (lesson.answers && Array.isArray(lesson.answers)) {
                    lesson.answers.forEach((answer, idx) => {
                        allRows.push([
                            student.name,
                            student.gradeLevel,
                            lessonNum,
                            lesson.title || `Lesson ${lessonNum}`,
                            completedDate,
                            answer.question || `Question ${idx + 1}`,
                            answer.studentAnswer || '',
                            answer.correctAnswer || '',
                            answer.score || '',
                            answer.feedback || ''
                        ]);
                    });
                } else {
                    allRows.push([
                        student.name,
                        student.gradeLevel,
                        lessonNum,
                        lesson.title || `Lesson ${lessonNum}`,
                        completedDate,
                        'Lesson Completed',
                        '',
                        '',
                        lesson.overallScore || '100%',
                        ''
                    ]);
                }
            });
        }
        
        // Convert to CSV
        const csvContent = allRows.map(row => 
            row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        ).join('\n');
        
        // Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        const dateStr = new Date().toISOString().split('T')[0];
        link.setAttribute('href', url);
        link.setAttribute('download', `BedrockELA_All_Students_${dateStr}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return {
            success: true,
            studentCount: studentsSnapshot.size,
            fileName: `BedrockELA_All_Students_${dateStr}.csv`
        };
        
    } catch (error) {
        console.error('Export error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Get summary statistics for export preview
 */
export async function getExportSummary(db, studentId, dateRange = null) {
    try {
        const progressRef = collection(db, 'students', studentId, 'lessonProgress');
        let progressQuery = query(progressRef);
        
        if (dateRange && dateRange.start) {
            progressQuery = query(progressQuery, where('timestamp', '>=', dateRange.start));
        }
        if (dateRange && dateRange.end) {
            progressQuery = query(progressQuery, where('timestamp', '<=', dateRange.end));
        }
        
        const progressSnapshot = await getDocs(progressQuery);
        
        let totalLessons = 0;
        let totalAnswers = 0;
        let completedLessons = 0;
        
        progressSnapshot.forEach(doc => {
            const lesson = doc.data();
            totalLessons++;
            if (lesson.completedAt) completedLessons++;
            if (lesson.answers) totalAnswers += lesson.answers.length;
        });
        
        return {
            totalLessons,
            completedLessons,
            totalAnswers,
            dateRange: dateRange || 'All time'
        };
        
    } catch (error) {
        console.error('Summary error:', error);
        return null;
    }
}

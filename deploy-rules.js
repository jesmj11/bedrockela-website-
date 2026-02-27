#!/usr/bin/env node

/**
 * Deploy Firestore Rules using Firebase REST API
 */

const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const https = require('https');

const PROJECT_ID = 'bedrockela-96dbd';
const RULES_FILE = './firestore.rules';

async function deployRules() {
  try {
    console.log('🐉 Deploying Firestore Rules...\n');
    
    // Read rules file
    const rulesContent = fs.readFileSync(RULES_FILE, 'utf8');
    console.log('📋 Rules file loaded');
    
    // Get auth client
    const auth = new GoogleAuth({
      keyFilename: './firebase-admin-key.json',
      scopes: ['https://www.googleapis.com/auth/firebase', 'https://www.googleapis.com/auth/cloud-platform']
    });
    
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    
    console.log('🔐 Authenticated with Firebase');
    
    // Prepare the request
    const url = `https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/rulesets`;
    
    const requestBody = JSON.stringify({
      source: {
        files: [
          {
            name: 'firestore.rules',
            content: rulesContent
          }
        ]
      }
    });
    
    // Create ruleset
    console.log('📤 Creating new ruleset...');
    
    const createRuleset = () => new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken.token}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody)
        }
      };
      
      const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      });
      
      req.on('error', reject);
      req.write(requestBody);
      req.end();
    });
    
    const rulesetResult = await createRuleset();
    const rulesetName = rulesetResult.name;
    console.log(`✅ Ruleset created: ${rulesetName}`);
    
    // Release the ruleset
    console.log('🚀 Releasing ruleset...');
    
    const releaseUrl = `https://firebaserules.googleapis.com/v1/projects/${PROJECT_ID}/releases?release_id=cloud.firestore`;
    const releaseBody = JSON.stringify({
      name: `projects/${PROJECT_ID}/releases/cloud.firestore`,
      rulesetName: rulesetName
    });
    
    const releaseRuleset = () => new Promise((resolve, reject) => {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken.token}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(releaseBody)
        }
      };
      
      const req = https.request(releaseUrl, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      });
      
      req.on('error', reject);
      req.write(releaseBody);
      req.end();
    });
    
    await releaseRuleset();
    
    console.log('\n✅ Firestore rules deployed successfully!\n');
    console.log('🎉 All done! The dashboard should work now.');
    console.log('   Try logging in at: https://bedrockela.com/student-login.html');
    
  } catch (error) {
    console.error('\n❌ Error deploying rules:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

deployRules();

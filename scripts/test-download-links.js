#!/usr/bin/env node

const https = require('https');

const GITHUB_API_BASE = 'https://api.github.com';
const REPO = 'koraysels/rekordbox-library-fixer';

// Platform configurations
const PLATFORMS = {
  mac: {
    name: 'macOS',
    patterns: ['.dmg', '-mac.zip']
  },
  windows: {
    name: 'Windows', 
    patterns: ['.exe', '-win.zip']
  },
  linux: {
    name: 'Linux',
    patterns: ['.appimage', '.deb']
  }
};

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'rekordbox-library-fixer-website-test'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else if (res.statusCode === 302 || res.statusCode === 301) {
          resolve({ redirect: res.headers.location });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', reject);
  });
}

function checkUrlExists(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'HEAD',
      headers: {
        'User-Agent': 'rekordbox-library-fixer-website-test'
      }
    };

    https.request(options, (res) => {
      resolve({
        exists: res.statusCode >= 200 && res.statusCode < 400,
        status: res.statusCode
      });
    }).on('error', () => {
      resolve({ exists: false, status: 0 });
    }).end();
  });
}

async function getLatestRelease() {
  try {
    // Try to get latest release
    try {
      const latest = await makeRequest(`${GITHUB_API_BASE}/repos/${REPO}/releases/latest`);
      return latest;
    } catch (e) {
      // If no latest release, get all releases and use first one
      const releases = await makeRequest(`${GITHUB_API_BASE}/repos/${REPO}/releases`);
      if (Array.isArray(releases) && releases.length > 0) {
        return releases[0];
      }
      throw new Error('No releases found');
    }
  } catch (error) {
    throw new Error(`Failed to fetch release: ${error.message}`);
  }
}

function findAssetForPlatform(assets, platform) {
  const patterns = PLATFORMS[platform].patterns;
  
  return assets.find(asset => {
    const name = asset.name.toLowerCase();
    return patterns.some(pattern => {
      if (pattern.startsWith('-')) {
        return name.includes(pattern);
      }
      return name.endsWith(pattern);
    });
  });
}

async function testDownloadLinks() {
  log('\n🔍 Testing Download Links for All Platforms', 'cyan');
  log('=' .repeat(50), 'cyan');

  try {
    // Fetch latest release
    log('\n📦 Fetching latest release information...', 'blue');
    const release = await getLatestRelease();
    
    log(`✅ Found release: ${release.tag_name}`, 'green');
    log(`📋 Total assets: ${release.assets.length}\n`, 'blue');
    
    // List all available assets
    log('Available assets:', 'yellow');
    release.assets.forEach(asset => {
      const sizeMB = (asset.size / 1024 / 1024).toFixed(2);
      console.log(`  - ${asset.name} (${sizeMB} MB)`);
    });
    
    // Test each platform
    log('\n🧪 Testing platform downloads...', 'cyan');
    log('-'.repeat(50));
    
    const results = [];
    
    for (const [platformKey, platformConfig] of Object.entries(PLATFORMS)) {
      const asset = findAssetForPlatform(release.assets, platformKey);
      
      if (!asset) {
        log(`\n❌ ${platformConfig.name}: No matching asset found`, 'red');
        results.push({ platform: platformKey, success: false, reason: 'No matching asset' });
        continue;
      }
      
      log(`\n📥 ${platformConfig.name}:`, 'yellow');
      console.log(`   File: ${asset.name}`);
      console.log(`   URL: ${asset.browser_download_url}`);
      
      // Check if URL is accessible
      process.stdout.write('   Checking URL... ');
      const { exists, status } = await checkUrlExists(asset.browser_download_url);
      
      if (exists) {
        log(`✅ Accessible (Status: ${status})`, 'green');
        results.push({ platform: platformKey, success: true, file: asset.name });
      } else {
        log(`❌ Not accessible (Status: ${status})`, 'red');
        results.push({ platform: platformKey, success: false, reason: `HTTP ${status}` });
      }
    }
    
    // Summary
    log('\n' + '='.repeat(50), 'cyan');
    log('📊 Test Summary', 'cyan');
    log('='.repeat(50), 'cyan');
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    results.forEach(result => {
      const icon = result.success ? '✅' : '❌';
      const platform = PLATFORMS[result.platform].name.padEnd(10);
      const status = result.success 
        ? `${result.file}` 
        : `Failed: ${result.reason}`;
      log(`${icon} ${platform} - ${status}`, result.success ? 'green' : 'red');
    });
    
    log('\n' + '-'.repeat(50));
    log(`Total platforms tested: ${results.length}`);
    log(`✅ Successful: ${successful}`, 'green');
    
    if (failed > 0) {
      log(`❌ Failed: ${failed}`, 'red');
      log('\n❌ Some download links are not working!', 'red');
      log('This will cause issues for users trying to download the application.', 'yellow');
      process.exit(1);
    } else {
      log('\n✅ All download links are working correctly!', 'green');
      process.exit(0);
    }
    
  } catch (error) {
    log(`\n❌ Test failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the tests
testDownloadLinks();
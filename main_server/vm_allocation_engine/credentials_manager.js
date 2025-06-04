/**
 * Credentials Manager
 * 
 * Loads and manages cloud provider credentials
 */

const fs = require('fs').promises;
const path = require('path');

// Path to credentials directory - Adjusted for new location
const CREDENTIALS_DIR = path.join(__dirname, '..', 'credentials');

/**
 * Load GCP credentials from file
 * @returns {Promise<Object>} GCP credentials object
 */
async function loadGcpCredentials() {
    try {
        const credentialsPath = path.join(CREDENTIALS_DIR, 'glassy-fort-416908-584e0066c012.json');
        const credentialsData = await fs.readFile(credentialsPath, 'utf8');
        return JSON.parse(credentialsData);
    } catch (error) {
        console.error('Error loading GCP credentials:', error);
        throw new Error(`Failed to load GCP credentials: ${error.message}`);
    }
}

/**
 * Load AWS credentials from file
 * @returns {Promise<Object>} AWS credentials object with accessKeyId and secretAccessKey
 */
async function loadAwsCredentials() {
    try {
        const credentialsPath = path.join(CREDENTIALS_DIR, 'aws.json');
        const credentialsData = await fs.readFile(credentialsPath, 'utf8');
        return JSON.parse(credentialsData);
    } catch (error) {
        console.error('Error loading AWS credentials:', error);
        throw new Error(`Failed to load AWS credentials: ${error.message}`);
    }
}

/**
 * Get credentials for a specific cloud provider
 * @param {string} provider - Cloud provider ('GCP' or 'AWS')
 * @returns {Promise<Object>} Provider-specific credentials
 */
async function getProviderCredentials(provider) {
    if (provider === 'GCP') {
        return loadGcpCredentials();
    } else if (provider === 'AWS') {
        return loadAwsCredentials();
    } else {
        throw new Error(`Unsupported provider: ${provider}`);
    }
}

module.exports = {
    loadGcpCredentials,
    loadAwsCredentials,
    getProviderCredentials
}; 
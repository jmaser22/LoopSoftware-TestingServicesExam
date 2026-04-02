require('dotenv').config();
const fs = require('fs');

const requiredVars = ['TEST_USERNAME', 'TEST_PASSWORD'];

function validateEnv() {
    // Check if .env exists
    if (!fs.existsSync('.env')) {
        throw new Error(
            ' .env file not found.\n' +
            'Create a .env file with TEST_USERNAME and TEST_PASSWORD'
        );
    }

    // Check required variables
    const missing = requiredVars.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(
            ` Missing required environment variables:\n` +
            missing.map((v) => ` - ${v}`).join('\n') +
            `\n\nCheck your .env file.`
        );
    }
}

function getEnvVar(name) {
    const value = process.env[name];

    if (!value) {
        throw new Error(` Missing environment variable: ${name}`);
    }

    return value;
}

module.exports = { validateEnv, getEnvVar };
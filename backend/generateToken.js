import { writeFile } from 'fs';
import { randomBytes } from 'crypto';

function generateJWTSecret(length) {
    // Generate random bytes
    const secretBytes = randomBytes(length);

    // Convert bytes to base64 string
    return secretBytes.toString('base64');
}

// Generate a 256-bit (32 bytes) JWT secret
const jwtSecret = generateJWTSecret(32);
console.log("JWT Secret:", jwtSecret);

// Write the JWT secret to .env file
const envContent = `JWT_SECRET=\"${jwtSecret}\"\n`;
writeFile('../.env', envContent, { flag: 'a' }, (err) => {
    if (err) {
        console.error("Error writing to .env file:", err);
    } else {
        console.log(".env file updated with JWT_SECRET");
    }
});

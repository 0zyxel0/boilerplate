import { createClient } from 'redis';

const client = createClient({ host: 'localhost', port: 9851, password:'your_strong_password'}); // Removed password
client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

async function getTile38Collections() {
    try {
        // Use the KEYS command with a wildcard (*) to get all keys (collections)
        const collections = await client.sendCommand(['KEYS', '*']);
        console.log('Tile38 Collections:', collections);
        return collections; // Return the collections if needed
    } catch (error) {
        console.error('Error fetching collections:', error);
        throw error; // Re-throw the error to be handled by the caller
    } finally {
        // await client.quit(); // Keep the client connection open for further commands
    }
}

async function sendRandomPoint() {
    try {
        const collection = 'my_points'; // Choose a collection name
        const id = `point:${Date.now()}`; // Generate a unique ID
        const latitude = Math.random() * 180 - 90; // Random latitude between -90 and 90
        const longitude = Math.random() * 360 - 180; // Random longitude between -180 and 180

        // Use the SET command to add a point to the specified collection
        const response = await client.sendCommand([
            'SET',
            collection,
            id,
            'POINT',
            longitude.toString(), // Convert longitude to string
            latitude.toString(),    // Convert latitude to string
        ]);

        console.log(`Random point sent: ${latitude}, ${longitude}  Response:`, response);
        return { collection, id, latitude, longitude }; // Return the data if needed
    } catch (error) {
        console.error('Error sending random point:', error);
        throw error;
    }
}

// Call the functions
await getTile38Collections(); // Get the collections
const pointData = await sendRandomPoint(); // Send a point
console.log(pointData);

await client.quit();

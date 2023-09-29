import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    try {
        // Read the existing data from the JSON file
        const dataFilePath = path.join('/Users/simon/dev/vs-code-projects/sitemate-backend-challenge/app/database/data.json');
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

        // Return the list of issues
        return Response.json(data.issues);
    } catch (error) {
        console.error('Error reading issues:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

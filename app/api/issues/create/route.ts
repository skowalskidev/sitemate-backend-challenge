import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        // Read the existing data from the JSON file
        const dataFilePath = path.join('/Users/simon/dev/vs-code-projects/sitemate-backend-challenge/app/database/data.json');
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

        // Generate a new unique ID (for simplicity, increment the last ID)
        const newId = data.issues.length > 0 ? data.issues[data.issues.length - 1].id + 1 : 1;

        // Extract the data from the request body
        const { title, description } = await request.json(); // Parse the JSON request body

        // Create a new issue object
        const newIssue = {
            id: newId,
            title,
            description,
        };

        // Add the new issue to the data
        data.issues.push(newIssue);

        // Write the updated data back to the JSON file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

        // Respond with the newly created issue
        return Response.json(newIssue, { status: 201 });
    } catch (error) {
        console.error('Error creating issue:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

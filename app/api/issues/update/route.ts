import fs from 'fs';
import path from 'path';

export async function PUT(request: Request) {
    try {
        // Read the existing data from the JSON file
        const dataFilePath = path.join('/Users/simon/dev/vs-code-projects/sitemate-backend-challenge/app/database/data.json');
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

        // Extract the data from the request body
        const { title, description } = await request.json(); // Parse the JSON request body

        // Check if there are any issues in the data
        if (data.issues.length === 0) {
            return Response.json({ error: 'No issues found to update' }, { status: 404 });
        }

        // Get the last issue in the list
        const lastIssue = data.issues[data.issues.length - 1];

        // Update the last issue's properties
        lastIssue.title = title;
        lastIssue.description = description;

        // Write the updated data back to the JSON file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

        // Respond with the updated last issue
        return Response.json(lastIssue, { status: 200 });
    } catch (error) {
        console.error('Error updating last issue:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

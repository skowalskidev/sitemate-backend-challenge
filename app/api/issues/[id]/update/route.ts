import fs from 'fs';
import path from 'path';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        // Extract the issue ID from the route parameters
        const issueId = parseInt(params.id, 10);

        // Read the existing data from the JSON file
        const dataFilePath = path.join(
            '/Users/simon/dev/vs-code-projects/sitemate-backend-challenge/app/database/data.json'
        );
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

        // Find the issue with the specified ID
        const issueToUpdate = data.issues.find((issue: any) => issue.id === issueId);

        // Check if the issue exists
        if (!issueToUpdate) {
            return new Response(
                JSON.stringify({ error: 'Issue not found' }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        // Extract the data from the request body
        const { title, description } = await request.json(); // Parse the JSON request body

        // Update the issue's properties
        issueToUpdate.title = title;
        issueToUpdate.description = description;

        // Write the updated data back to the JSON file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

        // Respond with the updated issue
        return new Response(
            JSON.stringify(issueToUpdate),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Error updating issue:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}

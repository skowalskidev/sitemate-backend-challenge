import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        // Extract the issue ID from the URL parameters
        const issueId = parseInt(params.id, 10);

        // Read the existing data from the JSON file
        const dataFilePath = path.join('/Users/simon/dev/vs-code-projects/sitemate-backend-challenge/app/database/data.json');
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

        // Find the index of the issue with the specified ID
        const issueIndex = data.issues.findIndex((issue: any) => issue.id === issueId);

        // Check if the issue exists
        if (issueIndex === -1) {
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

        // Remove the issue from the data array
        const deletedIssue = data.issues.splice(issueIndex, 1)[0];

        // Write the updated data back to the JSON file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

        // Respond with a success message and the deleted issue
        return new Response(
            JSON.stringify({ message: 'Issue deleted successfully', deletedIssue }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Error deleting issue:', error);
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

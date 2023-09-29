import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request) {
    try {
        // Read the existing data from the JSON file
        const dataFilePath = path.join('/Users/simon/dev/vs-code-projects/sitemate-backend-challenge/app/database/data.json');
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

        // Check if there are any issues to delete
        if (data.issues.length === 0) {
            return Response.json({ error: 'No issues to delete' }, { status: 404 });
        }

        // Delete the last issue
        const deletedIssue = data.issues.pop();

        // Write the updated data back to the JSON file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

        // Respond with a success message
        return Response.json({ message: 'Last issue deleted successfully', deletedIssue });
    } catch (error) {
        console.error('Error deleting issue:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

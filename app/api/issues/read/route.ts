export async function GET(request: Request) {
    // Implement the logic for the GET operation (Read)
    // Return a static JSON object
    return Response.json({ id: 1, title: "Sample Issue", description: "This is a sample issue." });
}
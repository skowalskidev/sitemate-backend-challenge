export async function PUT(request: Request) {
    // Implement the logic for the PUT operation (Update)
    // Accept a JSON object, log it, and return a response
    const requestBody = await request.json();
    console.log("Received PUT request:", requestBody);
    return Response.json(requestBody);
}
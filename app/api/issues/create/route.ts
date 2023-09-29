export async function POST(request: Request) {
    // Implement the logic for the POST operation (Create)
    // Accept a JSON object, log it, and return a response
    const requestBody = await request.json();
    console.log("Received POST request:", requestBody);
    return Response.json(requestBody);
}
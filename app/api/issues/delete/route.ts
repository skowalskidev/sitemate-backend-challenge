export async function DELETE(request: Request) {
    // Implement the logic for the DELETE operation
    // Log the request and return a response
    console.log("Received DELETE request");
    return Response.json({ message: "Issue deleted successfully" });
}
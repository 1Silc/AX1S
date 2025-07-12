function check() {
    const userId = request.headers.get('X-User-ID');
    if (!userId) {
        return new Response("Missing X-User-ID header", { status: 400 });
    }

    try {
        const fileContent = Deno.readTextFileSync('ban-list.txt');
        if (fileContent.includes(userId)) {
            const response = new Response('True', { status: 200 });
            response.headers.set('X-Is-Listed', 'True');
            return response;
        } else {
            const response = new Response('False', { status: 404 });
            response.headers.set('X-Is-Listed', 'False');
            return response;
        }
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            return new Response("ban-list.txt not found.", { status: 500 });
        }
        throw error; // rethrow if it's a different error
    }
}

const fs = require('fs');

function list() {
    try {
        const data = fs.readFileSync('ban-list.txt', 'utf8');
        const lines = data.split('\n').map(line => line.trim());
        const content = lines.join('\n');
        return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
    } catch (err) {
        if (err.code === 'ENOENT') {
            return new Response("ban-list.txt not found.", { headers: { 'Content-Type': 'text/plain' } });
        }
        throw err; // rethrow if it's a different error
    }
}

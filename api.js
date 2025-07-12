const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.get('/list', (req, res) => {
    fs.readFile('ban-list.txt', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).send("ban-list.txt not found.");
            }
            return res.status(500).send("Internal Server Error");
        }
        const lines = data.split('\n').map(line => line.trim());
        const content = lines.join('\n');
        res.type('text/plain').send(content);
    });
});

app.post('/check', (req, res) => {
    const userId = req.headers['X-User-ID'];
    
    fs.readFile('ban-list.txt', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(500).send("ban-list.txt not found.");
            }
            return res.status(500).send("Internal Server Error");
        }
        const isListed = data.includes(userId);
        res.set('Z-Is-Listed', isListed ? 'True' : 'False');
        res.status(isListed ? 200 : 404).send(isListed.toString());
    });
});

app.post('/add', (req, res) => {
    const token = req.headers['X-Admin-Token'];
    const userId = req.headers['X-User-ID'];

    const validToken = process.env.ADMINTOKEN;
    if (token === validToken) {
        fs.appendFile('ban-list.txt', userId + '\n', (err) => {
            if (err) {
                return res.status(500).send("Internal Server Error");
            }
            res.send("Added ID to ban-list.");
        });
    } else {
        res.status(403).send("Wrong token.");
    }
});

app.post('/remove', (req, res) => {
    const token = req.headers['X-Admin-Token'];
    const userId = req.headers['X-User-ID'];
    
    const apiKey = process.env.ADMINTOKEN;
    if (token === apiKey) {
        fs.readFile('ban-list.txt', 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    return res.status(500).send("ban-list.txt not found.");
                }
                return res.status(500).send("Internal Server Error");
            }
            const lines = data.split('\n').filter(line => line.trim() !== userId);
            fs.writeFile('ban-list.txt', lines.join('\n') + '\n', (err) => {
                if (err) {
                    return res.status(500).send("Internal Server Error");
                }
                res.send("Removed ID from ban-list.");
            });
        });
    } else {
        res.status(403).send("Wrong token.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

((context, keys) => {
    function logToTerminal(message) {
        try {
            const terminal = document.getElementById("term");
            if (terminal) {
                terminal.innerText += /<|>|function|error|"|'|\w+\(\)|\w+\.\w+/.test(message) 
                    ? context.fdc?.(message) 
                    : "\n" + message;
            }
        } catch {
            alert("An Error Occurred Writing To DOM");
        }
    }

    function extractParams() {
        const params = new URLSearchParams(window.location.search);
        const gamertag = params.get("F56A8B1V5L71H9M4K7") || "";
        const token = params.get("GK8JT6FV3AY5L2HY1FYj4gk7u") || "";
        if (token) localStorage.setItem(keys[1], token);
        if (gamertag) localStorage.setItem(keys[0], gamertag);
        
        if (token && gamertag) {
            fetch(`https://ax1s.vercel.app/api/xboxgttoxuid/?target_gamertag=${gamertag}&token=${token}`)
                .then(response => response.json())
                .then(data => {
                    if (data.xuid) {
                        localStorage.setItem(keys[2], data.xuid);
                        logToTerminal("Successfully Stored XUID");
                        // Wait 5 seconds before showing the success notification
                        setTimeout(() => {
                            showToast("Successfully Authenticated!");
                        }, 5000);
                        history.replaceState({}, "", window.location.pathname);
                    } else {
                        // If no XUID is found, show a failure notification after 5 seconds
                        setTimeout(() => {
                            showToast("Failed to Authenticate");
                        }, 5000);
                    }
                })
                .catch(() => {
                    logToTerminal("Failed To Retrieve XUID");
                    // On error, show a failure notification after 5 seconds
                    setTimeout(() => {
                        showToast("Failed to Authenticate");
                    }, 5000);
                });
        } else {
            // If token or gamertag is missing, show a failure notification after 5 seconds
            setTimeout(() => {
                showToast("Failed to Authenticate");
            }, 5000);
        }
    }
    

    function updateList(data) {
        const list = document.querySelector(".new.list.llist");
        if (!list) return;
        
        list.innerHTML = ""; 

        Object.entries(data).forEach(([key, value]) => {
            const li = document.createElement("li");
            const span = document.createElement("span");
            span.classList.add("value");
            span.textContent = `${key}: ${value}`;
            li.appendChild(span);
            list.appendChild(li);
        });
    }

    extractParams();

    window.core = window.core || {
        log: [],
        execute: (command, response, authority) => {
            window.core.log.push({ command, response, authority, timestamp: Date.now() });
        },
        sendAPICommand: (command) => {
            try {
                const xuid = localStorage.getItem(keys[2]);
                const token = localStorage.getItem(keys[1]);
                
                if (!xuid) {
                    logToTerminal("Error: Missing XUID");
                    return;
                }

                if (!token) {
                    logToTerminal("Error: Missing Token");
                    return;
                }

                fetch(`https://axis.vercel.app/api/${command}/?xuid=${xuid}&token=${token}`)
                    .then(response => response.json())
                    .then(data => {
                        window.core.execute(command, data, xuid);
                        logToTerminal(data.error 
                            ? `Error executing command: ${command}` 
                            : `Successfully executed command: ${command}`);
                        updateList(data);
                    })
                    .catch(error => {
                        console.error("Error sending API command", error);
                        logToTerminal("Failed to execute command");
                    });
            } catch (error) {
                console.error("Error sending API command", error);
            }
        }
    };

})(window, ["userGamertag", "authToken", "userXUID"]);

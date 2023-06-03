const conversationElement = document.getElementById("conversation");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const apiKeyInput = document.getElementById("api-key-input");
const saveApiKeyButton = document.getElementById("save-api-key-button");
let apiKey = "";

async function fetchData(message) {
    if (!apiKey) {
        displayMessage("Please enter an API key.", "assistant");
        return;
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: message
            }]
        })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content.trim();
    displayMessage(reply, "assistant");
}

function displayMessage(message, sender) {
    const messageElement = document.createElement("p");
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    conversationElement.appendChild(messageElement);
    conversationElement.scrollTop = conversationElement.scrollHeight;
}

function handleUserInput() {
    const message = userInput.value;
    userInput.value = "";
    displayMessage(message, "user");
    fetchData(message);
}

function saveApiKey() {
    apiKey = apiKeyInput.value;
    apiKeyInput.value = "";
    if (apiKey) {
        displayMessage("API key saved.", "assistant");
    } else {
        displayMessage("Please enter an API Key.", "assistant");
    }
}

saveApiKeyButton.addEventListener("click", saveApiKey);

sendButton.addEventListener("click", handleUserInput);

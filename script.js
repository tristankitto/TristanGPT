const conversationElement = document.getElementById("conversation");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const responseTypeSelect = document.getElementById("response-type");

async function fetchData(message) {
    const selectedResponseType = responseTypeSelect.value;
    let messageText = "";
    let messageImage = "";

    if (selectedResponseType === "text") {
        messageText = message;
    } else {
        messageImage = message;
    }

    const requestBody = {
        apiKey: "7566e368-ffdd-413d-9d72-630efa54b6c3",
        args: [messageImage, messageText],
    };

    const response = await fetch('https://prometheus-api.llm.llc/api/workflow/8BptUrnDrVQGZQQ6Ax9C', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log(data);
    let replyImage = data.outputs[0];
    let replyText = data.outputs[1];
    if (selectedResponseType === "text") {
        displayMessage(replyText, "assistant");
    } else {
        displayMessage(replyImage, "assistant"); // Update this line
    }
}

function displayMessage(message, sender) {
    const messageElement = document.createElement("p");
    messageElement.classList.add(sender);

    if (sender === "assistant") {
        if (message.startsWith("http")) {
            const imageElement = document.createElement("img");
            imageElement.src = message;
            messageElement.appendChild(imageElement);
        } else {
            messageElement.textContent = message;
        }
    } else {
        messageElement.textContent = message;
    }

    conversationElement.appendChild(messageElement);
    conversationElement.scrollTop = conversationElement.scrollHeight;
}

function handleUserInput() {
    const message = userInput.value;
    userInput.value = "";
    displayMessage(message, "user");
    fetchData(message);
}

sendButton.addEventListener("click", handleUserInput);

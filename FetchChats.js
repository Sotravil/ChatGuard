// fetchChats.js
// Function: fetchChats - Fetches the list of chats for the current user.

const API_BASE = 'http://localhost:2146';

export async function fetchChats(currentUser, chatsDiv, openChat) {
    console.log('Fetching user chats...');
    try {
        const res = await fetch(`${API_BASE}/get-chats/${currentUser}`);
        const chats = await res.json();

        // Clear the existing chats in the UI
        chatsDiv.innerHTML = '';
        
        // Render each chat as a new div in the chats list
        chats.forEach((chat) => {
            console.log(`Chat found with users: ${chat.users.join(', ')}`);
            const chatDiv = document.createElement('div');
            chatDiv.textContent = `Chat with ${chat.users.filter((u) => u !== currentUser).join(', ')}`;
            chatDiv.addEventListener('click', () => openChat(chat));
            chatsDiv.appendChild(chatDiv);
        });
    } catch (err) {
        console.error(`Error fetching chats: ${err}`);
    }
}

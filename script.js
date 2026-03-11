let peer;
let conn;

// 1. Логика входа (создаем твой ID в сети)
function initOnline(myUsername) {
    // Валидация: PeerJS не любит пробелы
    const cleanId = myUsername.replace(/\s+/g, '_').toLowerCase();
    
    peer = new Peer(cleanId);

    peer.on('open', (id) => {
        console.log('Вы в сети! Ваш ID:', id);
        alert('Вы онлайн под ником: ' + id);
    });

    // Слушаем входящие сообщения
    peer.on('connection', (connection) => {
        conn = connection;
        setupChatListeners();
    });
}

// 2. Логика отправки
function sendMessageToFriend(friendId, messageText) {
    if (!messageText) return;

    // Если еще не соединены — соединяемся
    if (!conn || conn.peer !== friendId) {
        conn = peer.connect(friendId);
        setupChatListeners();
    }

    // Ждем открытия канала и шлем
    conn.on('open', () => {
        conn.send(messageText);
        console.log("Отправлено:", messageText);
        // ТУТ ВЫЗОВИ СВОЮ ФУНКЦИЮ ОТРИСОВКИ СООБЩЕНИЯ НА ЭКРАНЕ
    });
}

// 3. Логика приема
function setupChatListeners() {
    conn.on('data', (data) => {
        console.log("Пришло сообщение:", data);
        // ТУТ ВЫЗОВИ СВОЮ ФУНКЦИЮ ДЛЯ ПОКАЗА ЧУЖОГО СООБЩЕНИЯ
        // Например: showReceivedMessage(data);
    });
}

const handleUpdateChat = (setChats, data, userEmail) => {
  setChats((prevChats) => {
    const updatedChats = prevChats.map((chat) => {
      if (chat.id === data.chatId) {
        return {
          ...chat,
          lastMessage: data.lastMessage,
          lastImage: data.lastImage,
          lastMessageAt: data.lastMessageAt,
          _count: {
            messages:
              data.senderEmail === userEmail
                ? chat._count?.messages || 0
                : (chat._count?.messages || 0) + 1,
          },
        };
      }
      return chat;
    });

    const updatedChat = updatedChats.find((chat) => chat.id === data.chatId);
    if (updatedChat) {
      return [
        updatedChat,
        ...updatedChats.filter((chat) => chat.id !== data.chatId),
      ];
    }

    return updatedChats;
  });
};

export default handleUpdateChat;

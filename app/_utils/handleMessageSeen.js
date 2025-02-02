const handleMessageSeen = (setChats, data) => {
  setChats((prevChats) =>
    prevChats.map((chat) => {
      if (chat.id === data.chatId) {
        return {
          ...chat,
          _count: {
            messages: 0,
          },
        };
      }
      return chat;
    })
  );
};

export default handleMessageSeen;

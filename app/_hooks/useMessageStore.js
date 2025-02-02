import { create } from 'zustand';

const useMessageStore = create((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  addOldMessages: (olderMessages) =>
    set((state) => ({ messages: [...olderMessages, ...state.messages] })),

  updateMessage: (messageId, newMessage) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId ? newMessage : msg
      ),
    })),

  updateSeenMessages: (data) =>
    set((state) => {
      const updatedMessages = state.messages.map((message) =>
        data.messages.some((msg) => msg.id === message.id)
          ? {
              ...message,
              seenIds: data.messages.find((msg) => msg.id === message.id)
                .seenIds,
            }
          : message
      );
      return { messages: updatedMessages };
    }),
}));

export default useMessageStore;

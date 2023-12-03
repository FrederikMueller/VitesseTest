import { defineStore } from 'pinia'
import { Message } from '~/types/Message';

export const useMessageStore = defineStore('messages', () => {
  const messages = ref([] as Message[]);
  const addMessage = (message: Message) => {
    messages.value.push(message)
  };
  const clearMessages = () => {
    messages.value = [] as Message[];
  };

  return {
    messages,
    addMessage,
    clearMessages
  }
});


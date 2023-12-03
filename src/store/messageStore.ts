import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messages', () => {
  const messages = ref([] as Message[]);
  const conversationStarted = computed(() => messages.value.length > 1);
  const addMessage = (message: Message) => {
    messages.value.push(message)
  };
  const clearMessages = () => {
    messages.value = [] as Message[];
  };

  return {
    messages,
    conversationStarted,
    addMessage,
    clearMessages
  }
});


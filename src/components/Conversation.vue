<script setup lang="ts">
import {EventStreamContentType, fetchEventSource} from '@microsoft/fetch-event-source'
import { useMessageStore } from '~/store/messageStore.js';


const store = useMessageStore()
const defaultSystemMessage = 'You are a helpful assistant.'
const fetchingResponse = ref(false)
const messageQueue:Message[] = []
const typeWriter = true
let isProcessingQueue = false

const createNewConversation = () => {
  console.log('createNewConversation')
  store.addMessage({TimeStamp:Date.now().toString(), Body: defaultSystemMessage, MessageType:'system'})
  store.addMessage({TimeStamp:Date.now().toString(), Body: "in TypeScript is typically used to declare global variables and types that may not be explicitly defined in your project but are expected to be available at runtime. It's a way to inform the TypeScript compiler about certain global entities that exist in your codebase but may not have type definitions.In general, shims in TypeScript are declarations that provide type information for entities that are not part of the TypeScript standard library or are not explicitly defined in your project. They help bridge the gap between the TypeScript type system and external JavaScript libraries or runtime environments.", MessageType:'assistant'})
  store.addMessage({TimeStamp:Date.now().toString(), Body: 'Lets get cracking!', MessageType:'user'})
}


onMounted(async () => {
    createNewConversation();
  }
)

const processMessageQueue = () => {
  if (isProcessingQueue || messageQueue.length === 0) {
    return
  }
  if (store.messages[store.messages.length - 1].MessageType === 'assistant') {
    store.messages.push({TimeStamp: 'Test', Body: 'Body Test', MessageType: 'arst?'})
  }
  isProcessingQueue = true
  const nextMessage = messageQueue.shift()
  if (typeWriter) {
    let wordIndex = 0;
    const intervalId = setInterval(() => {
      store.addMessage(nextMessage!)
      store.messages[store.messages.length - 1].Body += nextMessage?.Body[wordIndex]
      wordIndex++
      if (wordIndex === nextMessage?.Body?.length) {
        clearInterval(intervalId)
        isProcessingQueue = false
        processMessageQueue()
      }
    }, 50)
  } else {
    store.addMessage(nextMessage!)
    isProcessingQueue = false
    processMessageQueue()
  }
}

let ctrl:AbortController
const abortFetch = () => {
  if (ctrl) {
    ctrl.abort()
  }
  fetchingResponse.value = false
}

const fetchReply = async (message:Message[]) => {
  try {
    await fetchEventSource('/api/conversation/', {
      signal: ctrl.signal,
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
      openWhenHidden: true,
      onopen(response) {
        if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
          return;
        }
        throw new Error(`Failed to send message. HTTP ${response.status} - ${response.statusText}`);
      },
      onclose() {
        if (ctrl.signal.aborted === true) {
          return;
        }
        throw new Error(`Failed to send message. Server closed the connection unexpectedly.`);
      },
      onerror(err) {
        throw err;
      },
      async onmessage(message) {
        const event = message.event
        const data = JSON.parse(message.data)

        if (event === 'error') {
          abortFetch()
          showSnackbar(data.error)
          return;
        }

        if (event === 'userMessageId') {
          props.conversation.messages[props.conversation.messages.length - 1].id = data.userMessageId
          return;
        }

        if (event === 'done') {
          abortFetch()
          props.conversation.messages[props.conversation.messages.length - 1].id = data.messageId
          if (!props.conversation.id) {
            props.conversation.id = data.conversationId
            genTitle(props.conversation.id)
          }
          if (data.newDocId) {
            editor.value.refreshDocList()
          }
          return;
        }

        messageQueue.push(data.content)
        processMessageQueue()

        scrollChatWindow()
      },
    })
  } catch (err) {
    console.log(err)
    abortFetch()
    showSnackbar(err.message)
  }
}

const grab = ref<null | HTMLDivElement>(null)
const scrollChatWindow = () => {
  if (grab.value === null) {
    return;
  }
  grab.value.scrollIntoView({behavior: 'smooth'})
}

const send = (message:Message) => {
  fetchingResponse.value = true
  store.addMessage(message)
  fetchReply(store.messages)
  scrollChatWindow()
}

const snackbar = ref(false)
const snackbarText = ref('')
const showSnackbar = (text:string) => {
  snackbarText.value = text
  snackbar.value = true
}

const editor = ref(null)

</script>

<template>
  <div v-if="store.messages.length > 0">
    <div
        v-if="isProcessingQueue"
        class="text-center"
    >
      <v-progress-circular
          indeterminate
          color="primary"
      ></v-progress-circular>
    </div>
    <div v-else>
      <div
          v-if="store.messages"
          ref="chatWindow"
      >
        <v-container>
          <v-row>
            <v-col
                v-for="(message, index) in store.messages" :key="index"
                cols="12"
            >
              <div
                  class="d-flex align-center"
                  :class="message.MessageType === 'assistant' ? 'justify-start' : 'justify-end'"
              >
                <MessageActions
                    v-if="message.MessageType === 'user'"
                    :message="message"
                    :message-index="index"
                />
                <MsgContent
                  :message="message"
                  :index="index"
                />
                <MessageActions
                    v-if="message.MessageType === 'assistant'"
                    :message="message"
                    :message-index="index"
                />
              </div>
            </v-col>
          </v-row>
        </v-container>

        <div ref="grab" class="w-100" style="height: 200px;"></div>
      </div>
    </div>
  </div>
  <div class="px-md-16 w-100 d-flex flex-column">
    <div class="d-flex align-center">
      <v-btn
        v-show="fetchingResponse"
        icon="close"
        title="stop"
        class="mr-3"
      ></v-btn>
      <MsgEditor ref="editor" :send-message="send" :disabled="fetchingResponse" :loading="fetchingResponse" />
    </div>
  </div>

  <v-snackbar
      v-model="snackbar"
      multi-line
      location="top"
  >
    {{ snackbarText }}

    <template v-slot:actions>
      <v-btn
          color="red"
          variant="text"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>

</template>

<style scoped>
  .footer {
    width: 100%;
  }
</style>

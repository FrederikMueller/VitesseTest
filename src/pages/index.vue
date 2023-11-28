<script setup lang="ts">
import { getDefaultConversationData } from "~/utils/helper";

const route = useRoute();
const router = useRouter();
const conversation = ref(getDefaultConversationData());

// const loadConversation = async () => {
//   const { data, error } = await useAuthFetch('/api/chat/conversations/' + route.params.id)
//   if (!error.value) {
//     conversation.value = Object.assign(conversation.value, data.value)
//   }
// }

// const loadMessage = async () => {
//   const { data, error } = await useAuthFetch('/api/chat/messages/?conversationId=' + route.params.id)
//   if (!error.value) {
//     conversation.value.messages = data.value
//     conversation.value.id = route.params.id
//   }
// }

const createNewConversation = () => {
  console.log('createNewConversation')
  if (route.path !== '/') {
    return router.push('/?new')
  }
  conversation.value = Object.assign(getDefaultConversationData(), {
    topic: ('newConversation')
  })
}


// onMounted(async () => {
//   if (route.params.id) {
//     conversation.value.loadingMessages = true
//     await loadConversation()
//     await loadMessage()
//     conversation.value.loadingMessages = false
//   }
// })


const navTitle = computed(() => {
  if (conversation.value && conversation.value.topic !== null) {
    return conversation.value.topic === '' ?('defaultConversationTitle') : conversation.value.topic
  }
  return 'Test'
})

onActivated(async () => {
  console.log('onActivated')
  if (route.path === '/' && route.query.new !== undefined) {
    createNewConversation()
  }
})

</script>

<template>
    <v-app-bar :elevation="2" rounded>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>gkk Chatbot</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        variant="outlined"
        class="d-md-none ma-3"
        @click="toggleDark"
        >
        Tarst
      </v-btn>
      <v-btn
        variant="outlined"
        class="text-none d-none d-md-block"
        @click="toggleDark"
      >
        {{ $t('newConversation') }}
      </v-btn>

    </v-app-bar>

    <v-main>
      <Welcome v-if="!route.params.id && conversation.messages.length === 0" />
    </v-main>
</template>

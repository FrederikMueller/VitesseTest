<script setup lang="ts">

// const createNewConversation = () => {
//   console.log('createNewConversation')
//   if (route.path !== '/') {
//     return router.push('/?new')
//   }
//   conversation.value = Object.assign(getDefaultConversationData(), {
//     topic: ('newConversation')
//   })
// }


// onMounted(async () => {
//   if (route.params.id) {
//     conversation.value.loadingMessages = true
//     await loadConversation()
//     await loadMessage()
//     conversation.value.loadingMessages = false
//   }
// })


// const navTitle = computed(() => {
//   if (conversation.value && conversation.value.topic !== null) {
//     return conversation.value.topic === '' ?('defaultConversationTitle') : conversation.value.topic
//   }
//   return 'Test'
// })
//
// onActivated(async () => {
//   console.log('onActivated')
//   if (route.path === '/' && route.query.new !== undefined) {
//     createNewConversation()
//   }
// })

</script>

<template>
    <v-main v-if="true">
      <Welcome v-if="true"/>
      <Conversation/>
      <v-spacer></v-spacer>
    </v-main>
</template>

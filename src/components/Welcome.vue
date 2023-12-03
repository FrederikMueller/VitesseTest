<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-center">
          <h2 class="text-h2">{{ $t('welcomeTo') }} <span class="text-primary">gkk Chatbot</span></h2>
          <p class="text-caption my-5">
            {{ $t('welcomeScreen.introduction1') }}
            <br>
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <v-row>
          <v-col
              cols="12"
              md="4"
          >
            <v-row>
              <v-col>
                <div class="d-flex flex-column align-center">
                  <h3 class="text-h6">{{ $t('welcomeScreen.examples.title') }}</h3>
                </div>
              </v-col>
            </v-row>
            <WelcomeCard v-for="example in examples" :content="example" />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-row>
              <v-col>
                <div class="d-flex flex-column align-center">
                  <h3 class="text-h6">{{ $t('welcomeScreen.capabilities.title') }}</h3>
                </div>
              </v-col>
            </v-row>
            <WelcomeCard v-for="capability in capabilities" :content="capability" />
          </v-col>

          <v-col
              cols="12"
              md="4"
          >
            <v-row>
              <v-col>
                <div class="d-flex flex-column align-center">
                  <h3 class="text-h6">{{ $t('welcomeScreen.limitations.title') }}</h3>
                </div>
              </v-col>
            </v-row>
            <WelcomeCard v-for="limitation in limitations" :content="limitation" />
          </v-col>

        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const examples = ref([
  t('welcomeScreen.examples.item1'),
  t('welcomeScreen.examples.item2'),
  t('welcomeScreen.examples.item3')
])
const capabilities = ref([
  t('welcomeScreen.capabilities.item1'),
  t('welcomeScreen.capabilities.item2'),
  t('welcomeScreen.capabilities.item3')
])
const limitations = ref([
  t('welcomeScreen.limitations.item1'),
  t('welcomeScreen.limitations.item2'),
  t('welcomeScreen.limitations.item3')
])
</script>

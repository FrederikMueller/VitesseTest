<script setup lang="ts">
</script>

<template>
  <div class="footer">
    <nav mt-6 inline-flex gap-2 text-xl>
      <button icon-btn @click="toggleDark()">
        <div i-carbon-sun dark:i-carbon-moon />
      </button>

      <button icon-btn @click="$router.push('/testpage')">
        <div i-carbon-flag />
      </button>

      <button icon-btn @click="$router.push('/about')">
        <div i-carbon-star-review />
      </button>

      <a
        i-carbon-logo-github icon-btn
        rel="noreferrer"
        href="https://github.com/antfu/vitesse-lite"
        target="_blank"
        title="GitHub"
      />
    </nav>
  </div>
</template>

<style>
.footerLight {
  position: fixed;
  left: 0;
  bottom: 1rem;
  width: 100%;
  background: black;
  color: white;
  text-align: center;
}
</style>

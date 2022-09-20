<template>
  <div>
    <Header />
    <Content />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Header from '@/components/Header.vue'
import Content from '@/components/Content.vue'

export default defineComponent({
  components: { Header, Content },
  data() {
    return {}
  },
})
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background: #000; */
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>

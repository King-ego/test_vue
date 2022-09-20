<template>
  <div class="bitcoin__container"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Container',
})
</script>
<style scoped>
.bitcoin__container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>

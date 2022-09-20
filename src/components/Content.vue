<template>
  <div class="bitcoins__content">
    <Container>
      <div class="bitcoin__content__box">
        <Box />
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Container from '@/components/Container.vue'
import Box from '@/components/Box.vue'

export default defineComponent({
  name: 'Content',
  components: { Container, Box },
})
</script>

<style scoped>
.bitcoins__content {
  width: 100%;
  background: #1f1f1f;
  color: #fff;
}
.bitcoin__content__box {
  height: calc(100vh - 58px);
  width: 100%;
  padding: 20px;
}
</style>

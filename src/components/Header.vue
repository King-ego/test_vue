<template>
  <header>
    <div class="bitcoin__header">
      <Container>
        <div class="bitcoin__header__container">
          <p>Bitcoin</p>
          <!-- <img width="100" src="../assets/logo_aplication.png" alt="" /> -->
        </div>
      </Container>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Container from '@/components/Container.vue'

export default defineComponent({
  name: 'Header',
  components: { Container },
})
</script>

<style scoped>
.bitcoin__header {
  width: 100%;
  background: #000;
  box-shadow: inset -0.5px -1px 1px 1px #fff;
}
.bitcoin__header__container {
  width: 100%;
  padding: 20px;
  color: yellow;
}
</style>

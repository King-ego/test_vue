<template>
  <div v-if="ismodal" class="modal__container">
    <div class="modal__content">
      <img src="../assets/loading.gif" alt="Gif Carregando" />
      <span>Carregando ...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Modal',
  props: {
    ismodal: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
})
</script>

<style scoped>
.modal__container {
  width: 100%;
  height: 100vh;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
}

.modal__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

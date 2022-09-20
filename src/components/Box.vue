<template>
  <div>
    <div>
      <form class="bitcoins__form" @submit.prevent="submit">
        <div class="bitcoins__form__box">
          <input
            id="seach"
            class="form__input__seach"
            type="date"
            v-model="seach"
          />
          <button type="submit" class="form__buttom__seach">
            <img
              class="form__image__seach"
              src="../assets/seach_orange.png"
              alt=""
            />
          </button>
        </div>
      </form>
    </div>
    <div class="bitcoins__box__container">
      <div v-if="priceCoin" class="bitcoin__box__coin">
        <img class="bitcoin__box__image" src="../assets/bitcoin.png" alt="" />
        <p class="bitcoin__box__coin--title">{{ priceCoin }}</p>
      </div>
      <span class="box__state__empty" v-else>Empty</span>
    </div>
  </div>
  <div>
    <select name="" id="" @change="(e) => select(e.target.value)">
      <option value="brl">Real Brasileiro</option>
      <option value="usd">Dolar Amaricano</option>
      <option value="eth">Etherio</option>
    </select>
  </div>
  <!-- <Modal :ismodal="loading" /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

import api from '@/services/api'

export default defineComponent({
  name: 'Box',
  data() {
    return {
      loading: false,
      path: '/simple/price?ids=bitcoin&vs_currencies=brl',
      seach: '',
      priceCoin: '',
      setTime: 0,
      currencies: 'brl',
    }
  },
  components: {},
  methods: {
    async getFullCoins() {
      this.loading = true

      try {
        const data = await api.get(this.path)
        const AnyPriceCoin = data.data.bitcoin

        if (this.currencies === 'brl')
          this.priceCoin = `R$: ${AnyPriceCoin.brl},00`
        if (this.currencies === 'usd')
          this.priceCoin = `$: ${AnyPriceCoin.usd},00`
        if (this.currencies === 'eth')
          this.priceCoin = `eth: ${AnyPriceCoin.eth},00`
      } catch (err) {
        console.log({ err })
      } finally {
        this.loading = false
        // clearTimeout(this.setTime)
        // this.setTime = setTimeout(() => {
        //   this.getFullCoins()
        // }, 2000)
      }
    },
    submit() {
      const date = moment(String(this.seach)).format('DD/MM/YYYY')

      const regex = new RegExp(
        '^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$'
      )
      const validatedDate = date.match(regex)

      if (!validatedDate?.length) return

      if (!this.seach) {
        this.path = `/simple/price?ids=bitcoin&vs_currencies=${this.currencies}`
      } else {
        this.path = `/simple/price?ids=bitcoin&vs_currencies=${this.currencies}&date=${date}`
      }
      this.getFullCoins()
    },
    select(value: string) {
      this.currencies = value
      this.seach = ''
      ;(this.path = `/simple/price?ids=bitcoin&vs_currencies=${value}`),
        console.log(value)
      this.getFullCoins()
    },
  },
  mounted() {
    this.getFullCoins()
  },
})
</script>

<style scoped>
.bitcoins__box__container {
  width: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
}
.box__state__empty {
  color: #1f1f1f;
}
.bitcoin__box__coin {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.bitcoin__box__image {
  width: 104px;
  height: 116px;
}

.bitcoin__box__coin--title {
  color: #000;
  font-weight: 700;
}

.bitcoins__form {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.bitcoins__form__box {
  border: 1px solid #fff;
  display: flex;
  border-radius: 10px;
}
.form__image__seach {
  width: 20px;
  height: 20px;
}
.form__input__seach {
  border-radius: 10px 0 0 10px;
  outline: none;
  width: 152px;
  padding: 0 15px;
  font-size: 16px;
  font-weight: 700;
}
.form__buttom__seach {
  background: #000;
  /* border: 1px solid #fff; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 0 10px 10px 0;
}
</style>

<template>
  <div>
    <div>
      <form class="bitcoins__form" @submit.prevent="submit">
        <div class="bitcoins__form__box" title="Busque por data">
          <input
            id="search"
            class="form__input__search"
            type="date"
            v-model="search"
          />
          <button type="submit" class="form__buttom__search">
            <img
              class="form__image__search"
              src="../assets/search_orange.png"
              alt="search"
            />
          </button>
        </div>
      </form>
    </div>
    <div class="bitcoins__box__container">
      <div v-if="priceCoin" class="bitcoin__box__coin">
        <img
          class="bitcoin__box__image rotation180x"
          src="../assets/bitcoin.png"
          alt="Image Coin"
        />
        <p class="bitcoin__box__coin__title isExistAnimation">
          {{ priceCoin }}
        </p>
      </div>
      <span class="box__state__empty" v-else>Empty</span>
    </div>
  </div>
  <div>
    <select class="bitcoin__select" @change="(e) => select(e.target.value)">
      <option class="bitcoin__select__option" value="brl">
        Real Brasileiro
      </option>
      <option class="bitcoin__select__option" value="usd">
        Dolar Amaricano
      </option>
      <option class="bitcoin__select__option" value="eth">Ethereum</option>
      <option class="bitcoin__select__option" value="ltc">Litecoin</option>
    </select>
  </div>
  <Modal :ismodal="loading" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'

import api from '@/services/api'

import Modal from '@/components/Modal.vue'

export default defineComponent({
  name: 'Box',
  data() {
    return {
      loading: false,
      path: '/coins/bitcoin/history',
      search: '',
      priceCoin: '',
      setTime: 0,
      currencies: 'brl',
    }
  },
  components: { Modal },
  methods: {
    async getFullCoins(loading?: boolean): Promise<void> {
      this.loading = !loading

      try {
        const url = this.getUrl()

        const data = await api.get(url)
        const AnyPriceCoin = data.data.market_data.current_price

        const coin = {
          brl: `${AnyPriceCoin.brl}`,
          usd: `${AnyPriceCoin.usd}`,
          eth: `${AnyPriceCoin.eth} ETH`,
          ltc: `${AnyPriceCoin.ltc} ETH`,
        }

        this.priceCoin = this.formatString(
          coin[this.currencies as 'brl'],
          this.currencies
        )
      } catch (err) {
        console.log({ err })
      } finally {
        this.loading = false
        clearTimeout(this.setTime)
        this.setTime = setTimeout(() => {
          this.getFullCoins(true)
        }, 2000)
      }
    },
    formatString(value: string, coin?: string): string {
      let [whole, broke] = value.split('.')

      if (!broke) {
        broke = '00'
      } else {
        broke = broke.slice(0, 2)
      }

      const localMoney = parseFloat(`${whole}.${broke}`).toLocaleString('pt-BR')

      const isCoin = coin ? coin : ''

      const coinVirtual = ['eth', 'ltc'].includes(isCoin)
        ? coin?.toUpperCase()
        : ''

      const moneySign = isCoin === 'brl' ? 'R$' : isCoin === 'usd' ? '$' : ''

      return `BTC = ${moneySign} ${localMoney} ${coinVirtual}`
    },

    getUrl(): string {
      const now = moment()
      const dateNow = moment(now).format('DD-MM-YYYY')
      const searchNow = moment(this.search).format('DD-MM-YYYY')

      const url = this.search
        ? `${this.path}?date=${searchNow}`
        : `${this.path}?date=${dateNow}`

      return url
    },

    validatedInput(
      date: string,
      dataAtual: moment.Moment
    ): [number | undefined, boolean] {
      const regex = new RegExp(
        '^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$'
      )

      const dateAfter = dataAtual.isAfter(date, 'day')

      const isDate = date.match(regex)

      return [isDate?.length, dateAfter]
    },

    submit(): void {
      const date = moment(String(this.search)).format('DD-MM-YYYY')
      const dataAtual = moment()

      const [validatedDate, dateAfter] = this.validatedInput(date, dataAtual)

      if (!validatedDate || !dateAfter) {
        alert('formato de data invalido')
        return
      }
      this.getFullCoins()
    },
    select(value: string): void {
      this.currencies = value
      this.search = ''
      this.path = `/coins/bitcoin/history`
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

.bitcoin__box__coin__title {
  color: #000;
  font-family: 'Montserrat Bold';
  font-weight: 700;
  font-size: 25px;
}

@media (min-width: 380px) {
  .bitcoin__box__coin__title {
    font-size: 30px;
  }
}

@media (min-width: 530px) {
  .bitcoin__box__coin__title {
    font-size: 40px;
  }
}

@media (min-width: 640px) {
  .bitcoin__box__coin__title {
    font-size: 56px;
  }
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
.form__image__search {
  width: 20px;
  height: 20px;
}
.form__input__search {
  border-radius: 10px 0 0 10px;
  outline: none;
  width: 152px;
  padding: 0 15px;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Roboto';
}
.form__buttom__search {
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 0 10px 10px 0;
}

.form__buttom__search:hover {
  background: rgba(0, 0, 0, 0.1);
}

.bitcoin__select__option,
.bitcoin__select {
  font-family: 'Roboto Bold';
  font-weight: 700;
  font-size: 18px;
  color: gold;
  background: #1f1f1f;
}

.bitcoin__select {
  width: 100%;
  max-width: 200px;
  height: 50px;
  margin-top: 20px;
  border: 2px solid #fff;
  padding: 10px;
  border-radius: 10px;
}
</style>

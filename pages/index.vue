<template>
  <div class="container">
    <h1 class="title">Pokemon list</h1>
    <input
      v-model="pokeSearch"
      type="text"
      placeholder="Search for a pokemon"
    />
    <div class="poke-list">
      <poke-card
        v-for="pokemon in pokeListFiltered"
        :key="pokemon.name"
        v-lazyload
        :pokemon="pokemon"
        :lazyload="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PokeCard from '../components/PokelistCard.vue'
import LazyLoadDirective from '../directives/lazyload'

type Pokemon = {
  id: number
  name: string
  spriteURL: string
}

export default Vue.extend({
  directives: {
    lazyload: LazyLoadDirective,
  },
  components: {
    PokeCard,
  },
  data() {
    return {
      pokeSearch: '',
      pokeList: [] as Pokemon[],
    }
  },
  computed: {
    pokeListFiltered(): Pokemon[] {
      return this.pokeList.filter((pokemon: Pokemon) => {
        if (
          this.pokeSearch.length > 2 &&
          !pokemon.name.includes(this.pokeSearch.toLowerCase())
        )
          return false
        return true
      })
    },
  },
  async mounted() {
    await this.$store.dispatch('fetchPokemons')
    this.pokeList = this.$store.getters.pokeList
  },
})
</script>

<style scoped>
h1 {
  margin-bottom: 0;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.poke-list {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 90%;
}
</style>

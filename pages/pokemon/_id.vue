<template>
  <div v-if="Object.keys(pokeDetails).length > 0">
    <h1 class="title">Pokemon details</h1>
    <div class="card center-card">
      <h2 class="title">{{ pokeDetails.name | capitalize }}</h2>
      <div class="details-container">
        <poke-recap :pokemon="pokeDetails" />
        <poke-stats :stats="pokeDetails.stats" />
      </div>
      <button v-if="!message" @click="addToTeam">Add to team</button>
      <p v-if="message" :class="addTeamSuccess ? 'success' : 'error'">
        {{ message }}
      </p>
    </div>
    <div class="card center-card">
      <h2 class="title">Moves {{ pokeDetails.name | capitalize }} can learn</h2>
      <ul>
        <li v-for="move in pokeDetails.moves" :key="move" class="card">
          {{ move }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PokeRecap from '../../components/PokemonDetails/PokeRecap.vue'
import PokeStats from '../../components/PokemonDetails/PokeStats.vue'

interface Stats {
  hp: number
  attack: number
  'special-attack': number
  defense: number
  'special-defense': number
  speed: number
}

interface PokeDetails {
  id: number
  name: string
  spriteURL: string
  types: string[]
  moves: string[]
  height: number
  weight: number
  stats: Stats
}

export default Vue.extend({
  components: {
    PokeRecap,
    PokeStats,
  },
  filters: {
    capitalize: (value: string) => value.replace(/^\w/, (c) => c.toUpperCase()),
  },
  data() {
    return {
      pokeDetails: {} as PokeDetails,
      message: '',
      addTeamSuccess: false,
    }
  },
  async mounted() {
    await this.$store.dispatch(
      'pokeDetails/fetchPokeDetails',
      this.$route.params.id
    )
    this.pokeDetails = this.$store.getters['pokeDetails/pokeDetails'](
      this.$route.params.id
    )
  },
  methods: {
    async addToTeam() {
      this.message = ''
      const { id, name, spriteURL } = this.pokeDetails
      const result = await this.$store.dispatch('pokeTeam/addPokemonToTeam', {
        id,
        name,
        spriteURL,
      })
      if (result.includes('successfully')) this.addTeamSuccess = true
      else this.addTeamSuccess = false
      this.message = result
      setTimeout(() => {
        this.message = ''
      }, 1500)
    },
  },
})
</script>

<style scoped>
h1,
h2,
h3 {
  text-align: center;
  margin: 10px;
}
.center-wrapper {
  display: flex;
  justify-content: center;
}
.details-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.center-card {
  padding: 0.7rem 1rem;
  max-width: 700px;
  width: 90%;
  margin: auto;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  padding: 0;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  flex-wrap: wrap;
  gap: 10px;
}
li {
  padding: 0.5rem 1rem;
  font-weight: bold;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>

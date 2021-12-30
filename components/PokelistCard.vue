<template>
  <div class="poke-card card" @click="goToPokemonPage">
    <p>{{ pokemon.id }}</p>
    <img
      :src="lazyload ? '' : pokemon.spriteURL"
      :data-url="pokemon.spriteURL"
      alt=""
    />
    <p>{{ pokemon.name }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Pokemon = {
  id: number
  name: string
  url: string
  spriteURL: string
}

export default Vue.extend({
  props: {
    pokemon: {
      type: Object as () => Pokemon,
      default: null,
    },
    lazyload: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goToPokemonPage() {
      this.$router.push(`/pokemon/${this.pokemon.id}`)
      this.$emit('clicked')
    },
  },
})
</script>

<style scoped>
.poke-card {
  display: flex;
  align-items: center;
  width: 200px;
  padding: 0.2rem 0.6rem;
  margin-bottom: 5px;
  cursor: pointer;
}
.poke-card:hover {
  background-color: #eee;
}
img {
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
p {
  text-transform: capitalize;
}
</style>

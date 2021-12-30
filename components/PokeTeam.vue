<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h1 class="title">Your team</h1>
      <div class="flex-container">
        <div
          v-for="(pokemon, index) in pokeTeam"
          :key="index"
          v-sortable
          class="poke-row"
        >
          <poke-list-card
            :pokemon="pokemon"
            :lazyload="false"
            @clicked="closeModal"
          />
          <span class="close" @click="() => removePokeFromTeam(index)"
            >&times;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PokeListCard from './PokelistCard.vue'

interface Pokemon {
  id: number
  name: string
  spriteURL: string
}

export default Vue.extend({
  components: {
    PokeListCard,
  },
  data() {
    return {
      pokeTeam: this.$store.getters['pokeTeam/pokeTeam'] as Pokemon[],
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    removePokeFromTeam(index: number) {
      this.$store.dispatch('pokeTeam/removePokemonFromTeam', index)
      this.pokeTeam = this.$store.getters['pokeTeam/pokeTeam']
    },
  },
})
</script>

<style>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 300px;
  max-width: 90%;
}
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.poke-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>

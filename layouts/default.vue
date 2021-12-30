<template>
  <div>
    <nav>
      <button @click="goToPreviousPage">Pokemon list</button>
      <button @click="togglePokeTeam">Team</button>
    </nav>
    <poke-team v-if="showPokeTeam" @close="togglePokeTeam" />
    <Nuxt id="content" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PokeTeam from '../components/PokeTeam.vue'

export default Vue.extend({
  components: {
    PokeTeam,
  },
  data() {
    return {
      showPokeTeam: false,
    }
  },
  mounted() {
    if (!localStorage.getItem('pokeTeam')) return
    const pokeTeam = JSON.parse(localStorage.getItem('pokeTeam') as string)
    this.$store.commit('pokeTeam/INIT_TEAM', pokeTeam)
  },
  methods: {
    goToPreviousPage() {
      this.$router.push('/')
    },
    togglePokeTeam() {
      this.showPokeTeam = !this.showPokeTeam
    },
  },
})
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
button {
  cursor: pointer;
  background-color: #83cdd5;
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
nav button {
  width: 120px;
  border-radius: 0;
}
button:active {
  background-color: #4d8e95;
}

.card {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  color: #35495e;
  letter-spacing: 1px;
}

#content {
  margin-top: 20px;
}

@media screen and (max-width: 500px) {
  nav {
    bottom: 0;
    top: auto;
    border-bottom: none;
    border-top: 1px solid #efefef;
    z-index: 1;
    justify-content: stretch;
    align-items: stretch;
    padding: 0;
    margin: 0;
    width: 100%;
  }
  nav button {
    width: 50%;
  }
  nav button:first-child {
    border-right: 1px solid white;
  }
  nav button:last-child {
    border-right: 1px solid white;
    flex-grow: 1;
  }
  #content {
    margin-bottom: 50px;
  }
}
</style>

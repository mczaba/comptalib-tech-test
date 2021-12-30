<template>
  <div v-if="pokemon" class="recap">
    <img :src="pokemon.spriteURL" alt="" />
    <h3>Types</h3>
    <div class="types">
      <div
        v-for="type in pokemon.types"
        :key="type"
        class="type-card"
        :class="type"
      >
        {{ type }}
      </div>
    </div>
    <p>Weight: {{ pokemon.weight }}</p>
    <p>Height: {{ pokemon.height }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
type PokeRecap = {
  id: number
  name: string
  spriteURL: string
  types: string[]
  height: number
  weight: number
}

export default Vue.extend({
  props: {
    pokemon: {
      type: Object as () => PokeRecap,
      default: null,
    },
  },
})
</script>

<style scoped>
.recap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 200px;
  padding: 1rem 0.6rem;
  margin-bottom: 5px;
  text-transform: capitalize;
}

img {
  border-radius: 100%;
  height: 100px;
}

.types {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.type-card {
  border-radius: 2px;
  background-color: gray;
  padding: 0.3rem 0.8rem;
  text-transform: capitalize;
  font-size: 0.8rem;
  font-weight: bold;
}
.grass {
  background-color: #9bcc50;
  color: #212121;
}
.poison {
  background-color: #b97fc9;
  color: #fff;
}
.fire {
  background-color: #fd7d24;
  color: #fff;
}
.flying {
  background-color: #3dc7ef;
  color: #212121;
}
.water {
  background-color: #4592c4;
  color: #fff;
}
.bug {
  background-color: #729f3f;
  color: #fff;
}
.normal {
  background-color: #a4acaf;
  color: #212121;
}
.electric {
  background-color: #eed535;
  color: #212121;
}
.ground {
  background-color: #ab9842;
  color: #fff;
}
.fairy {
  background-color: #fdb9e9;
  color: #212121;
}
.fighting {
  background-color: #d56723;
  color: #fff;
}
.psychic {
  background-color: #f366b9;
  color: #fff;
}
.rock {
  background-color: #73641d;
  color: #fff;
}
.steel {
  background-color: #9eb7b8;
  color: #212121;
}
.ice {
  background-color: #51c4e7;
  color: #212121;
}
.ghost {
  background-color: #7b62a3;
  color: #fff;
}
.dragon {
  background-color: #f16e57;
  color: #fff;
}
</style>

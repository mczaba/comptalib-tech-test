<template>
  <div v-if="stats" class="stats">
    <div v-for="(statValue, stat) in stats" :key="stat" class="stat-line">
      <span>{{ stat | formatStatName }} {{ statValue }}</span>
      <div class="bar-container">
        <div
          class="bar"
          :style="{ width: `${(statValue * 100) / 154}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Stats {
  hp: number
  attack: number
  'special-attack': number
  defense: number
  'special-defense': number
  speed: number
}

export default Vue.extend({
  filters: {
    formatStatName: (value: string) => value.replace('special-', 'sp'),
  },
  props: {
    stats: {
      type: Object as () => Stats,
      default: null,
    },
  },
})
</script>

<style scoped>
.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 300px;
  padding: 1rem 0.6rem;
  margin-bottom: 5px;
  text-transform: capitalize;
}
.stat-line {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
h2 {
  margin-bottom: 10px;
}
.bar-container {
  border: 1px solid #83cdd5;
  width: 100px;
  height: 16px;
  border-radius: 8px;
}
.bar {
  height: 100%;
  background-color: #83cdd5;
  border-radius: 8px;
}
</style>

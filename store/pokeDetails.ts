// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'

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

interface StatsRow {
  // eslint-disable-next-line camelcase
  base_stat: number
  stat: {
    name:
      | 'hp'
      | 'attack'
      | 'special-attack'
      | 'defense'
      | 'special-defense'
      | 'speed'
  }
}

export const state = () => ({
  pokeDetailsMap: new Map<Number, PokeDetails>(),
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  pokeDetails: (state) => (id: number) =>
    state.pokeDetailsMap.has(id) ? state.pokeDetailsMap.get(id) : null,
}

export const mutations: MutationTree<RootState> = {
  POPULATE_POKEDETAILS: (state, details: PokeDetails) => {
    if (state.pokeDetailsMap.has(details.id)) return
    state.pokeDetailsMap.set(details.id, details)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchPokeDetails({ commit, state }, id) {
    if (state.pokeDetailsMap.has(id)) return
    const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokeResponseBody = await pokeResponse.json()
    const firstGenMoves = [] as string[]
    pokeResponseBody.moves.forEach((moveRow: any) => {
      const gens = moveRow.version_group_details.map(
        (vgdRow: any) => vgdRow.version_group.name
      )
      if (gens.includes('red-blue')) firstGenMoves.push(moveRow.move.name)
    })
    const stats = {} as Stats
    pokeResponseBody.stats.forEach((statsRow: StatsRow) => {
      stats[statsRow.stat.name] = statsRow.base_stat
    })
    const pokeDetails = {
      id,
      name: pokeResponseBody.name,
      spriteURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      types: pokeResponseBody.types.map((type: any) => type.type.name),
      moves: firstGenMoves,
      height: pokeResponseBody.height,
      weight: pokeResponseBody.weight,
      stats,
    }
    commit('POPULATE_POKEDETAILS', pokeDetails)
  },
}

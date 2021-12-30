// eslint-disable-next-line import/named
import { GetterTree, MutationTree, ActionTree } from 'vuex'

interface Pokemon {
  id: number
  name: string
  spriteURL: string
}

export const state = () => ({
  pokeTeam: [] as Pokemon[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  pokeTeam: (state) => state.pokeTeam,
}

export const mutations: MutationTree<RootState> = {
  INIT_TEAM: (state, pokeList: Pokemon[]) => {
    state.pokeTeam.push(...pokeList)
  },
  ADD_POKEMON_TO_TEAM: (state, pokemon: Pokemon) => {
    state.pokeTeam.push(pokemon)
  },
  REMOVE_POKEMON_FROM_TEAM: (state, index: number) => {
    state.pokeTeam.splice(index, 1)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  addPokemonToTeam({ commit, state }, pokemon: Pokemon) {
    if (state.pokeTeam.length >= 6) return 'Your team is already full !'
    commit('ADD_POKEMON_TO_TEAM', pokemon)
    localStorage.setItem('pokeTeam', JSON.stringify(state.pokeTeam))
    return `${pokemon.name} has successfully been added to your team !`
  },
  removePokemonFromTeam({ commit, state }, index: number) {
    if (state.pokeTeam.length < index)
      return "Couldn't remove this pokemon from your team"
    const pokeName = state.pokeTeam[index].name
    commit('REMOVE_POKEMON_FROM_TEAM', index)
    localStorage.setItem('pokeTeam', JSON.stringify(state.pokeTeam))
    return `${pokeName} has successfully been removed from your team !`
  },
}

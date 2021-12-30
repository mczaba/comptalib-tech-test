// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface Pokemon {
  id: number
  name: string
  spriteURL: string
}

export const state = () => ({
  pokeList: [] as Pokemon[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  pokeList: (state) => state.pokeList,
}

export const mutations: MutationTree<RootState> = {
  POPULATE_POKELIST: (state, list: Pokemon[]) => {
    if (state.pokeList.length > 0) return
    state.pokeList.push(...list)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchPokemons({ commit, state }) {
    if (state.pokeList.length > 0) return
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
    const responseBody = await response.json()
    const pokeList = responseBody.results.map((pokemon: any) => {
      const pokeId = pokemon.url.split('pokemon/')[1].split('/')[0]
      const spriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`
      return {
        spriteURL,
        name: pokemon.name,
        id: Number(pokeId),
      }
    })
    commit('POPULATE_POKELIST', pokeList)
  },
}

import Api from "../../common/Api/Api";
import { setMessage } from "../../common/Utils/Message";

const state = {
  items: [],
  loading: { getItems: false },
  success: { getItems: undefined },
};

const getters = {
  items: (state) => {
    return state.items;
  },
  loading: (state) => {
    return state.loading;
  },
  success: (state) => {
    return state.success;
  },
};

const actions = {
  getPokemons({ commit }) {
    commit("loading", true);
    Api.get(
      "pokemon",
      async (functions) => {
        const response = await functions;
        commit("getPokemonsResponse", { response });
        commit("loading", false);
      },
      async (functions) => {
        const response = await functions;
        setMessage(
          "Error",
          `Ha sucedido un error en la transacción ${response}`,
          "error"
        );
      }
    );
  },
  searchAllPokemons({ commit }) {
    commit("searchAllPokemons");
  },
  deletPokemon({ commit }, payload) {
    commit("loading", true);
    Api.get(`pokemon/delete/${payload._id}`, async (functions) => {
      const response = await functions;
      if (response.status == 200) {
        commit("loading", false);
      }
    });
    commit("loading", false);
  },
  async addPokemon({ commit }, payload) {
    await Api.post(
      payload,
      "pokemon/add",
      async (functions) => {
        const resp = await functions;
        if (resp.status == 200) {
          commit("loading", false);
        }
      },
      async (functions) => {
        const response = await functions;
        setMessage(
          "Error",
          `Ha sucedido un error en la transacción ${response}`,
          "error"
        );
      }
    );
  },
  async updatePokemon({ commit }, payload) {
    await Api.post(
      payload,
      `pokemon/update/${payload.id}`,
      async (functions) => {
        const resp = await functions;
        if (resp.status == 200) {
          commit("loading", false);
        }
      },
      async (functions) => {
        const response = await functions;
        setMessage(
          "Error",
          `Ha sucedido un error en la transacción ${response}`,
          "error"
        );
      }
    );
  },
};

const mutations = {
  searchAllPokemons(state) {
    state.allPokemons = !state.allPokemons;
    state.favoritePokemons = !state.favoritePokemons;
  },
  loading(state, data) {
    state.loading.getItems = data;
    state.success.getItems = !data;
  },
  getPokemonsResponse(state, data) {
    state.items = data.response.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

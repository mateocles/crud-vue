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
    try {
      commit("loading", true);
      Api.get("pokemon", async (functions) => {
        const response = await functions;
        commit("getPokemonsResponse", { response });
        commit("loading", false);
      });
    } catch (error) {
      commit("loading", true);
      setMessage("Error", "Ha sucedido un error en la transacción", "error");
    }
  },
  searchAllPokemons({ commit }) {
    commit("searchAllPokemons");
  },
  deletPokemon({ commit }, payload) {
    try {
      commit("loading", true);
      console.log(payload);
      Api.get(`pokemon/delete/${payload._id}`, async (functions) => {
        const response = await functions;
        if (response.status == 200) {
          commit("loading", false);
        }
      });
      commit("loading", false);
    } catch (error) {
      commit("loading", true);
      setMessage("Error", "Ha sucedido un error en la transacción", "error");
    }
  },
  addPokemon({ commit }, payload) {
    console.log(payload)
    try {
      Api.post(payload, "pokemon/add", async (functions) => {
        const resp = await functions;
        if (resp.status == 200) {
          commit("loading", false);
        }
      });
    } catch (error) {
      commit("loading", true);
      setMessage("Error", "Ha sucedido un error en la transacción", "error");
    }
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

<template>
  <div class="contend fixed-bottom">
    <div class="row">
      <div class="col all">
        <b-button pill variant="success" @click="addPokemons()">
          <span> <img src="@/assets/all.svg" class="icon" alt="arrow" /></span>
          Agregar Pokemon</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "Filter",
  computed: {
    ...mapGetters("Pokemons", ["allPokemons", "favoritePokemons"]),
  },
  methods: {
    ...mapActions("Pokemons", ["addPokemon", "getPokemons"]),
    addPokemons() {
      Swal.fire({
        title: "Agregar un pokemon",
        html: `<input type="text" id="name" class="swal2-input" placeholder="name">
  <input type="number" id="power"  class="swal2-input" placeholder="power">`,
        confirmButtonText: "Agregar",
        focusConfirm: false,
        preConfirm: () => {
          const name = Swal.getPopup().querySelector("#name").value;
          const power = Swal.getPopup().querySelector("#power").value;
          if (!name || !power) {
            Swal.showValidationMessage(`Por favor ingresar los datos`);
          }
          return { name: name, power: power };
        },
      }).then((result) => {
        const payload = { name: result.value.name, power: result.value.power };
        this.addPokemon(payload);
        this.getPokemons();
        Swal.fire("Se ha agregado!", "El pekomon se ha agregado.", "success");
      });
    },
  },
};
</script>

<style scoped>
.icon {
  width: 22px;
  padding-bottom: 4px;
}
.contend {
  background: #ffffff;
  box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
  height: 80px;
  padding: 20px;
}
.all {
  text-align: center;
}
</style>

<template>
  <b-card class="card">
    <div class="row">
      <div class="col">
        <div class="row">
          <div class="col">
            <p class="p">Name: {{ item.name }}</p>
          </div>
          <div class="col">
            <p class="p">Power: {{ item.power }}</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col contend-btn">
            <b-button pill variant="warning">Editar</b-button>
          </div>
          <div class="col contend-btn">
            <b-button pill variant="danger" @click="delet(item)"
              >Eliminar</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "card",
  props: {
    item: Object,
  },
  methods: {
    ...mapActions("Pokemons", ["deletPokemon", "getPokemons"]),
    delet(item) {
      Swal.fire({
        title: "Estas seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, bórralo!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletPokemon(item);
          this.getPokemons();
          Swal.fire("Eliminado!", "El pekomon se ha eliminado.", "success");
        }
      });
    },
  },
};
</script>

<style scoped>
.button {
  text-align: end;
}
.card-row {
  padding-top: 10px;
}
.p {
  padding-top: 10px;
}
.contend-btn {
  padding-top: 5px;

  text-align: center;
}
.card {
  min-width: 0;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
</style>

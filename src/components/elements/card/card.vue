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
            <b-button pill variant="warning" @click="update(item)"
              >Editar</b-button
            >
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
    ...mapActions("Pokemons", ["deletPokemon", "getPokemons", "updatePokemon"]),
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
    async update(item) {
      await Swal.fire({
        title: "Actulizar el pokemon",
        html:
          `<input id="name" value="${item.name}" class="swal2-input">` +
          `<input id="power" value="${item.power}" type="number" class="swal2-input">`,
        confirmButtonText: "Actulizar",
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
        const payload = {
          id: item._id,
          name: result.value.name,
          power: result.value.power,
        };
        this.updatePokemon(payload);
        setTimeout(
          function () {
            this.getPokemons();
          }.bind(this),
          500
        );
        Swal.fire(
          "Se ha actulizado!",
          "El pekomon se ha actulizado.",
          "success"
        );
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

<template>
  <div>
      <h1>Peliculas</h1>
      <b-button variant="primary" class="float-right mb-3" to="/agregar_pelicula">Agregar Pelicula</b-button>
      <Tabla :fields="campos" :items="allPeliculas">
          <template slot="actions" slot-scope="{ item } ">
                <b-button
                size="sm"
                variant="outline-primary"
                @click="onEditar(item)"
                >
                Editar
                </b-button>

                <b-button
                size="sm"
                class="ml-2"
                variant="outline-danger"
                @click="onEliminar(item)"
                >
                Eliminar
                </b-button>
            </template>
      </Tabla>
  </div>
</template>

<script>
import{mapActions,mapGetters} from 'vuex'
import Tabla from '../components/Tabla.vue'
export default {
    name: 'Peliculas',
    components:{
        Tabla
    },
    data(){
        return{
            campos:[
                {key: 'id',label:'Clave'},
                {key: 'titulo',label:'Titulo'},
                {key: 'director',label:'Director'},
                {key: 'anio',label:'Año'},
                {key: 'genero',label:'Genero'},
                {key: 'actions',label:'Acciones'}

            ]
        }
    },
    methods:{
        ...mapActions(['setPelicula','eliminarPelicula']),
        onEditar(item) {
      console.log(item);
      this.$router.push({
        name: 'EditarPelicula',
        params: {
          id: item.item.id
        }
      })
    },
        onEliminar(item) {
      console.log(item);

      this.$bvModal.msgBoxConfirm('Esta opción no se puede deshacer', {
          title: '¿Esta seguro que desea eliminar?',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Aceptar',
          cancelTitle: 'Cancelar',
          centered: true
        })
          .then(value => {
            if(value) {

              this.eliminarPelicula({
                id: item.item.id,
                onComplete: (response) => {
                  this.$notify({
                    type: 'success',
                    title: response.data.mensaje
                  })
                  setTimeout(() => this.setPelicula(), 1000)
                },
                onError: (error) => {
                  this.$notify({
                    type: 'error',
                    title: error.response.data.mensaje
                  })
                }
              })
            }
          })
          .catch(err => {
            // An error occurred
          })

    }
    },
    created(){
        this.setPelicula();
    },
    computed:{
        ...mapGetters(['allPeliculas'])
    }

}
</script>

<style>

</style>
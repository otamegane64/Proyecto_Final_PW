<template>
  <div>
      <h1>Generos</h1>
      <b-button variant="primary" class="float-right mb-3" to="/agregar_genero">Agregar Genero</b-button>
      <Tabla :fields="campos" :items="allGeneros">
          <template slot="actions" slot-scope="{ item }">
      <b-button size="sm" variant="danger" 
      @click="onEliminar(item)">
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
    name: 'Generos',
    components:{
        Tabla
    },
     data(){
        return{
            campos:[
                {key: 'id',label:'Clave'},
                {key: 'genero',label:'Genero'},
                {key: 'actions',label:'Acciones'}

            ]
        }
    },
     methods:{
        ...mapActions(['setGenero', 'eliminarGenero']),
        onEliminar(item){
            this.$bvModal.msgBoxConfirm('Esta opción es de forma permanente.', {
          title: '¿Seguro de eliminar el genero?',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Aceptar',
          cancelTitle: 'Cancelar',
          centered: true
        })
          .then(value => {
            if(value){
                 this.eliminarGenero({
                id: item.item.id,
                onComplete:(response)=>{
                    this.$notify({
                        type: 'success',
                        title: response.data.mensaje
                    })
                    this.setGenero();
                },
                onError:(error)=>{
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
        this.setGenero();
    },
    computed:{
        ...mapGetters(['allGeneros'])
    }


}
</script>

<style>

</style>
<template>
  <div>
      <h1>Peliculas</h1>
      <b-button variant="primary" class="float-right mb-3" to="/agregar_pelicula">Agregar Pelicula</b-button>
      <Tabla :fields="campos" :items="allPeliculas"/>
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
        ...mapActions(['setPelicula'])
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
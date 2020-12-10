<template>
  <div class="home">
    <h1>Inicio</h1>
    <b-form>
      <Input
                v-model="genero"
                label="Filtro por genero"
                id="id"
                placeholder="Buscar por genero"
                mensajeError="Genero no valido"
                class="mb-2"
              />
    </b-form>
    <div v-for="peliculas in buscarGenero" :key="peliculas.id">
    <Tarjeta :id="peliculas.id" :titulo="peliculas.titulo" :genero="peliculas.genero"
             :anio="peliculas.anio" :director="peliculas.director"
             />
    </div>
  </div>
</template>

<script>
import Tarjeta from '../components/Tarjeta'
import {mapGetters,mapActions} from 'vuex'
import Input from '../components/Input'

export default {
  name: 'Home',
  data(){
    return{
      genero:''

    }
  },
  components: {
    Tarjeta,
    Input
  },
  computed:{
    ...mapGetters(['allPeliculas', 'allGeneros']),
    buscarGenero: function(){
      return this.allPeliculas.filter((peliculas)=>peliculas.genero.includes(this.genero));
    }

  },
  methods:{
    ...mapActions(['setPelicula', 'setGenero'])
  },
  created(){
      this.setPelicula();
      this.setGenero();
  }

}
</script>


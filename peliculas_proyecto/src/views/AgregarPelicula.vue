<template>
  <div>
      <h1>Agregar una pelicula</h1>
      <b-form @submit.prevent="guardarPelicula">
          <Input
          v-model="pelicula.titulo"
          label="Titulo"
          id="titulo"
          placeholder="Ingrese el titulo de la pelicula"
          mensajeError="El titulo es obligatorio"
          maxlength="120"
          :error="erroresValidacion && !validacionTitulo"
          class="mb-2"/>
           <Input
           v-model="pelicula.director"
          label="Director"
          id="director"
          maxlength="100"
          placeholder="Ingrese el nombre del director"
          mensajeError="El autor es obligatorio"
          :error="erroresValidacion && !validacionDirector"
          class="mb-2"/>
           <Input
           v-model="pelicula.anio"
          label="Año"
          id="anio"
          maxlength="4"
          placeholder="Ingrese el año de lanzamiento"
          mensajeError="El año es obligatorio"
          :error="erroresValidacion && !validacionAnio"
          class="mb-2"/>
          <Input
        v-model="pelicula.genero"
          label="Genero"
          id="genero"
          placeholder="Ingrese el ID del genero"
          mensajeError="El genero es obligatorio"
          :error="erroresValidacion && !validacionGenero"
          class="mb-2"/>
          <b-button type="submit" variant="success" class="float-right mt-3">Guardar</b-button>
      </b-form>
      <Tabla :fields="campos" :items="allGeneros"/>
       
  </div>
</template>

<script>
import Input from '../components/Input'
import {mapActions, mapGetters} from 'vuex'
import Tabla from '../components/Tabla.vue'
export default {
    name: 'AgregarPelicula',
    components:{
        Input,
        Tabla
    },
    data(){
        return{
            pelicula:{
                titulo: '',
                director: '',
                anio: '',
                genero: '',
            },
            erroresValidacion: false,
             campos:[
                {key: 'id',label:'Clave'},
                {key: 'genero',label:'Genero'}

            ]
        }
    },
    computed:{
        validacionTitulo(){
            return(
                this.pelicula.titulo !== undefined &&
                this.pelicula.titulo.trim() !== ''
            )
        },
        validacionDirector(){
            return(
                this.pelicula.director !== undefined &&
                this.pelicula.director.trim() !== ''
            )
        },
        validacionAnio(){
            return(
                this.pelicula.anio !== undefined &&
                this.pelicula.anio.trim() !== '' &&
                this.pelicula.anio.length == 4
            )
        },
        validacionGenero(){
            return(
                this.pelicula.genero !== undefined &&
                this.pelicula.genero.trim() !== ''
            )
        },
        ...mapGetters(['allGeneros'])
        
    },
    methods:{
        ...mapActions(['agregarPelicula','setGenero']),
        guardarPelicula(){
            if(this.validacionTitulo && this.validacionDirector 
            && this.validacionAnio && this.validacionGenero){
             this.erroresValidacion = false
             this.agregarPelicula({
                 params: this.pelicula,
                 onComplete: (response)=>{
                     this.$notify({
                        type:'success',
                        title: response.data.mensaje
                    });
                    this.$router.push({
                        name: 'Peliculas'
                    })
                 },
                 onError:(error)=>{
                   this.$notify({
                        type:'error',
                        title: error.response.data.mensaje
                    });  
                 }
             })   
            } else{
                this.erroresValidacion = true
            }
        }
    },
    created(){
        this.setGenero();
    }

}
</script>

<style>

</style>
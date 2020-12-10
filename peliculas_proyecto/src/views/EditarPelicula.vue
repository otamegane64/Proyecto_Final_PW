<template>
  <div>
      <h1>Editar pelicula</h1>
      <b-form @submit.prevent="guardarPelicula">
             <Input
               v-model="peliculas.id"
               label="Clave"
               id="clave"
               disabled
               class="mb-2"
            />
            <Input
               v-model="peliculas.titulo"
               label="Titulo"
               id="titulo"
               maxlength="120"
               placeholder="Ingrese titulo de la pelicula"
               mensajeError="El titulo es obligatorio"
               :error="erroresValidacion && !validacionTitulo"
               class="mb-2"
            />
             <Input
               v-model="peliculas.director"
               label="Director"
               id="director"
               maxlength="100"
               placeholder="Ingrese director de la pelicula"
               mensajeError="El director es obligatorio"
               :error="erroresValidacion && !validacionDirector"
               class="mb-2"
            />
             <Input
               v-model="peliculas.anio"
               label="Año"
               id="anio"
               maxlength="4"
               placeholder="Ingrese el año de la pelicula"
               mensajeError="El año debe de ser de 4 digitos"
               class="mb-2"
            />
            <Input
               v-model="peliculas.genero"
               label="Genero"
               id="genero"
               disabled
            />

            <b-button type="submit" variant="success" class="float-right mt-3">Guardar</b-button>
        </b-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Input from '../components/Input'
import { mapActions } from 'vuex'

export default {
  name: 'Editar',
  components: {
        Input
    },
    data() {
        return {
            peliculas: {
                id: 0,
                titulo: '',
                director: '',
                anio: '',
                genero: ''
            },
            erroresValidacion: false
        }
    },
    computed: {
        validacionTitulo() {
            return (
                this.peliculas.titulo !== undefined &&
                this.peliculas.titulo.trim() !== ''
            )    
        },
        validacionDirector() {
            return (
                this.peliculas.director !== undefined &&
                this.peliculas.director.trim() !== ''
            )    
        }
    }, 
    methods: {
        ...mapActions(['obtenerPelicula', 'editarPelicula']),
        guardarPelicula() {
            if(this.validacionTitulo && this.validacionDirector) {
                this.erroresValidacion = false
                console.log(this.peliculas);
              this.editarPelicula({
                id: this.peliculas.id,
                params: this.peliculas,
                onComplete: (response) => {
                  this.$notify({
                    type: 'success',
                    title: response.data.mensaje,
                  });
                  this.$router.push({
                    name: 'Peliculas'
                  })
                },
                onError: (error) => {
                  this.$notify({
                    type: 'error',
                    title: error.response.data.mensaje,
                  })
                }
              })
            } else {
                this.erroresValidacion = true
            }
        }
    },
    created(){
      this.obtenerPelicula({
        id: this.$route.params.id,
        onComplete: (response) => {
            console.log("info", response.data.data[0])
            Vue.set(this, 'peliculas', response.data.data[0])
        }
      })
    }
}
</script>

<style>

</style>
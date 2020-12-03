<template>
  <div>
      <h1>Agregar un genero</h1>
      <b-form @submit.prevent="guardarGenero">
          <Input
          v-model="genero.genero"
          label="Nombre del genero"
          id="genero"
          placeholder="Ingrese el nuevo genero"
          mensajeError="El nombre del genero es obligatorio"
          :error="erroresValidacion && !validacionGenero"
          class="mb-2"
          />
          <b-button type="submit" variant="success" class="float-right mt-3">Guardar</b-button>
      </b-form>
  </div>
</template>

<script>
import Input from '../components/Input'
import {mapActions} from 'vuex'
export default {
    name: 'AgregarGenero',
    components:{
      Input
    },
    data(){
      return{
        genero:{
          genero: ''
        },
        erroresValidacion: false
      }
    },
    computed:{
        validacionGenero(){
            return (
                this.genero.genero !== undefined &&
                this.genero.genero.trim() !== ''
            )
        }
    },
       methods:{
        ...mapActions(['agregarGenero']),
        guardarGenero(){
            if(this.validacionGenero){
             this.erroresValidacion = false
             this.agregarGenero({
                 params: this.genero,
                 onComplete: (response)=>{
                     this.$notify({
                        type:'success',
                        title: response.data.mensaje
                    });
                    this.$router.push({
                        name: 'Generos'
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
    }

}
</script>

<style>

</style>
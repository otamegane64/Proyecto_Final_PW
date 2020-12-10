<template>
  <div class="contenedor">
      <h3>{{titulo}}</h3>
       <h3>ID: {{id}}</h3>
      <h3>Director: {{director}}</h3>
      <h3>Año: {{anio}}</h3>
      <h3>Género: {{genero}}</h3>


  </div>
</template>

<script>
export default {
    name: 'Tarjeta',
    props:{
        id: Number,
        titulo: String,
        director: String,
        anio: Number,
        genero: String
    }
}
</script>

<style>
.contenedor
{
    border: 2px solid black;
    margin: 20px 50px;
    padding: 0px 15px;
    background: #fff7f7;
}
img{
    border-radius: 70px;
}
img:hover{
    width: 200px;
}
</style>
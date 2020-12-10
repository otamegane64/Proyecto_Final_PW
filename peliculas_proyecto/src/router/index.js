import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Peliculas from '../views/Peliculas.vue'
import Generos from '../views/Generos.vue'
import AgregarGenero from '../views/AgregarGenero.vue'
import AgregarPelicula from '../views/AgregarPelicula.vue'
import EditarPelicula from '../views/EditarPelicula.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pelicula',
    name: 'Peliculas',
    component: Peliculas
  },
  {
    path: '/genero',
    name: 'Generos',
    component: Generos
  },
  {
    path: '/agregar_genero',
    name: 'AgregarGenero',
    component: AgregarGenero
  },
  {
    path: '/agregar_pelicula',
    name: 'AgregarPelicula',
    component: AgregarPelicula
  },
  {
    path: '/editar-pelicula/:id',
    name: 'EditarPelicula',
    component: EditarPelicula
  }

 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

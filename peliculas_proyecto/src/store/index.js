import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    peliculas:[],
    generos:[]
  },
  mutations: {
    SET_PELICULAS(state,peliculas){
      state.peliculas = peliculas
    },
    SET_GENEROS(state, generos){
      state.generos = generos
    }
  },
  actions: {
    setPelicula({commit}){
      axios.get('http://localhost:3000/pelicula')
      .then(response=>{
        commit('SET_PELICULAS',response.data)
      })
    },
    setGenero({commit}){
      axios.get('http://localhost:3000/genero')
      .then(response=>{
        commit('SET_GENEROS',response.data)
      })
    },
    agregarPelicula({commit},{params,onComplete,onError}){
      axios.post('http://localhost:3000/pelicula',params)
      .then(onComplete)
      .then(onError)
    },
    agregarGenero({commit},{params,onComplete,onError}){
      axios.post('http://localhost:3000/genero',params)
      .then(onComplete)
      .then(onError)
    },
    eliminarGenero({commit},{id,onComplete,onError}){
      axios.delete(`http://localhost:3000/genero/${id}`)
      .then(onComplete)
      .catch(onError)

    },
    editarPelicula({commit}, {id, params, onComplete, onError}) {
      axios.put(`http://localhost:3000/pelicula/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarPelicula({commit}, {id, onComplete, onError}) {
      axios.delete(`http://localhost:3000/pelicula/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    obtenerPelicula({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/pelicula/${id}`)
      .then(onComplete)
      .catch(onError)
    }
  },
  getters:{
    allPeliculas: state=>{
      return state.peliculas
    },
    allGeneros: state =>{
      return state.generos
    }
  }
  
})

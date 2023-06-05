<script setup>

// graphql queris to fetch data
import getMovies from '@/graphql/movies/query/getMovies.gql'
import query from '@/composables/query.js'
import {useStore} from "~/stores/index"
const store  = useStore()

// refs 
let movies = ref([])
let isloading = ref(false)
const serverError = reactive({
    error: false,
    message: ''
})

// function to set movies, this function is called from serach and filter functions 
function setMovies(result){
    movies.value = []
    result.data.movies.forEach(movie => {
        movies.value.push(movie)
    });
}

// function to set Error 
function setError(error){
    serverError.error = true
    serverError.message = error.message
    console.log(error)
}

// excute query to load movies  
function loadMovies(variables){
    let { onResult, loading, onError, refetch } = query(getMovies, variables)
    isloading = loading
    onResult((result) => { setMovies(result)})
    onError((error) => {setError(error);  })
}



// select by which movies are filtered or searched
if(store.getDirectorSearch != ''){
    console.log('There is director search')
    searchMovieByDirector(store.getDirectorSearch)
    store.setDirectorSearch('')

}else if(store.getFilterByGenere != ''){
    console.log('There is genere search')
    filterByGenere(store.getFilterByGenere)
    store.setFilterByGenere('')
}else if(store.getFilterByActor != ''){
    console.log('There is actor search')
    filterByActor(store.getFilterByActor)
    store.setFilterByActor('')
}else{
    console.log('There is refresh search'    )
    refresh()
}


// getters
// Serach and filter by director
const getDirectorSearch = ()=>{
    return store.getDirectorSearch
}
// fitler by genere
function getFilterByGenere(){
    return store.getFilterByGenere
}
// filter by actor
function getFilterByActor(){
    return store.getFilterByActor
}
// filter by keyWord
const getKeyWord = ()=>{
    return store.getKeySearch
}

// Watchers
// this watcher is used to watch the change of the store and call the function
watch(getFilterByGenere, (newValue, oldValue) => {
    if(newValue == ''){
        return
    }
    filterByGenere(newValue)
})
watch(getDirectorSearch, (newValue, oldValue) => {
    if(newValue == ''){
        return
    }
    searchMovieByDirector(newValue)
})
watch(getFilterByActor, (newValue, oldValue) => {
    if(newValue == ''){
        return
    }
    console.log('watcher is called', newValue, oldValue)
    filterByActor(newValue)
})
watch(getKeyWord, (newValue, oldValue) => {
    if(newValue == ''){
        return
    }
    keyWordSearch(newValue)
})

// functions to load movies 
//1. Refresh if there is no search or filter, this function is called to refresh the movies
function refresh(){
    const variables = {
        query: {
            status: {
                _eq: 'active'
            }
        }
    }
    loadMovies(variables)
}

//2. search movie by director first name and last name
function searchMovieByDirector(name){
    const variables = searchbydirector(name)
    loadMovies(variables)
}

//3. filter movie by actor
function filterByActor(actorId){
    const variables = filterbyactor(actorId)
    loadMovies(variables)
}

// 4. filter movie by genere
function filterByGenere(genereId){
    const variables = filterbygenere(genereId)
    loadMovies(variables)
}
// 5. key word search

function keyWordSearch(keyWord){
    const variables = keywordsearch(keyWord)
    loadMovies(variables)
}

// Listen to the search director input event and call search by director function
function setDirectorSearch(event){
    searchMovieByDirector(event.target.value)
}


definePageMeta({
    layout: "movies",
});
</script>
<template>

    <div class="app">
        <!-- Body Header -->
        <MoviesHeader/>
        <!-- Movies Body -->
        <section  id="body-container"  class=" z-10  relative  py-40   bg-no-repeat bg-center  bg-cover ">
        <!-- Back ground Image -->
            <div  id="inner-bg" class=" z-20 opacity-95  bg-primary3 absolute top-0 left-0 right-0 bg-no-repeat bg-center  bg-cover  h-full  w-full" >
            </div>
            <BaseDialog :show="!!serverError.error" :title="serverError.message" @close="serverError.error =false">
                Please check your internet connection and try again
            </BaseDialog>
            <BasePopup v-if="isloading">
                <div class=" fixed z-50 top-48 ">
                    <img   src="@/assets/img/preloader.svg" alt="">
                </div>
            </BasePopup>
           
            <!-- Search Movie by director and Header -->
            <div id="movieslist" v-if="!serverError.error"  class=" px-4 flex flex-col justify-center items-center z-50  lg:flex-row lg:justify-between relative container mx-auto">
                <div>
                    <h3  @click="refresh" class="text-4xl font-bold cursor-pointer text-white py-8">This Week Movies</h3>
                </div>
                <div class=" pb-8">
                    <input @input="setDirectorSearch" placeholder="search by director" class="py-3 px-12  border-4 border-solid border-yellow-bright   bg-gray-dark focus:bg-white    rounded-full">
                </div>
            </div>
            <!-- Movie List Container -->
            <div  v-if="!isloading && !serverError.error" class="container mx-auto z-50 px-4  relative">
                <MoviesList :movies="movies"/>
                <!-- <MoviesList :movies="movies"/> -->
            </div> 
        </section>
        <OthersAdvert></OthersAdvert>

    </div>
</template>

  <style scoped>
  
  #body-container{
      background-image: url(../assets/img/ucm_bg.jpg);
  }
  #inner-bg{
    background-image: url(../assets/img/ucm_bg_shape.png);
  }
  </style>
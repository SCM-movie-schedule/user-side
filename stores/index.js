
import { defineStore } from 'pinia'
export const useStore = defineStore({   
    id: 'store',

    state: () => ({ 
        keySearch:'',
        directorSearch: '',
        filterByGenere: '',
        filterByActor: '',
    }),

    getters: {

        getKeySearch() {
            return this.keySearch
        },
        getDirectorSearch() {
            return this.directorSearch
        },
        getFilterByActor() {
            return this.filterByActor
        },

        getFilterByGenere(){
            return this.filterByGenere
        }
    },

    actions: {
       setKeySearch(word){
        this.keySearch = word
        

       },
       setDirectorSearch(id){
        this.directorSearch = id

       },
       setFilterByActor(id){
        this.filterByActor = id
       },
       setFilterByGenere(id){

        this.filterByGenere = id
       }
    
    }
})



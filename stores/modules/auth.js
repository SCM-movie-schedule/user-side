import { defineStore } from 'pinia'
const userToken = useCookie('user-token')
import jwt_decode from 'jwt-decode';
import getUser from '@/graphql/auth/getUser.gql'
import authQuery  from '@/composables/authQuery'
import { ref } from 'vue';
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user_id: null,
    user:null,
    token: null
  }),
  getters:{
    
    getToken(state){
        return this.token
    },
    isLoggedIn(state){
      return !!state.token
    },
    getUser(state){
      return this.user
    },
   
    getUserId(state){
      return this.user_id
    }
  },
  actions: {
    setUserId(id){
      this.user_id = id
      this.setUser(id)
    },
    // This function is called when the user has valid tokin, it may be token from backend
    //  or from cookie
    setUser(id){
      const { onResult, loading, onError, refetch } = authQuery(getUser, {id})
      onResult((result) => {
        this.user =  {...result.data.users_by_pk} 
      })
      onError((error) => {
        console.log(error)
      })
    },
    setToken(token){
      this.token = token
    },
    logout(){
      userToken.value = null
      this.token = null
      this.user = null
    },
    // This function checks the token in cookie and if it is valid then it sets the token
      autoLogin(){
      let decoded = {}
      if(userToken.value){
        decoded = jwt_decode(userToken.value);
        if(decoded.exp * 1000 > Date.now()){
          const decoded = jwt_decode(userToken.value);
          const id = decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
          this.setUserId(id)   
          this.setToken(userToken.value)
        }
      } 
    },
    removeBooking(booking_id){
      const bookings = this.user.bookings.filter(booking => booking.id != booking_id)
      this.user.bookings = bookings
    },
    addBooking(booking){
      const newBookings = [booking, ...this.user.bookings]
      this.user.bookings = newBookings
    },
    addTicket(ticket){
      const newTickets = [ticket, ...this.user.tickets]
      this.user.tickets = newTickets
    },
    removeNotification(notification_id){
      const notifications = this.user.users_notifications.filter(notification => notification.id != notification_id)
      this.user.users_notifications = notifications
    }
  }
})
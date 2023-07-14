<script setup>
import {useStore} from "~/stores/index"
const router = useRouter()
const store  = useStore()
function searchByKey(event){
  store.setKeySearch(event.target.value)
}
function gotoMovieList() {
  router.push({
    path: '/',
    hash: '#movieslist'
  })
}
</script>

<template>
    <footer>
      <div class="footer-1 bg-cover bg-center py-10">
                  <div class="container mx-auto p-4">
                      <div class="footer-menu-wrap">
                          <div class=" flex flex-col justify-between items-center lg:flex-row">
                              <div class="my-8">
                                  <div class="footer-logo">
                                      <a href="index.html"><img src="../../assets/img/logo.png" alt=""></a>
                                  </div>
                              </div>
                              <div class="">
                                  <div class="">
                                      <nav class=" flex  flex-col space-y-6 lg:flex-row lg:space-y-0 ">
                                          <ul class=" uppercase flex flex-nowrap justify-center items-center">
                                            <li><NuxtLink active-class=" text-yellow-bright" class=" mx-4 text-white hover:text-yellow-bright font-bold"  to="/">Home</NuxtLink></li>
                                            <li><NuxtLink active-class=" text-yellow-bright" class=" mx-4 text-white hover:text-yellow-bright font-bold"  to="/pricing">Pricing</NuxtLink></li>
                                            <li><NuxtLink active-class=" text-yellow-bright" class=" mx-4 text-white hover:text-yellow-bright font-bold"  to="/contactus">Contact</NuxtLink></li>
                                            <li><NuxtLink active-class=" text-yellow-bright" class=" mx-4 text-white hover:text-yellow-bright font-bold" ></NuxtLink></li>
                                          </ul>
                                          <div  class="py-6 ">    
                                                <router-link class="text-white  w-full bg-primary2 font-bold rounded-full border-4 
                                                    border-solid border-yellow-bright py-3  px-20 lg:px-8 text-center hover:bg-yellow-bright hover:text-gray-dark  " 
                                                    to="/auth/signup">Register Now
                                                </router-link>
                                            </div>
                                      </nav>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <!-- The saparotor --> 
                      
                      <div class="mt-10">
                        <h1 class="w-full bg-primary2 h-0.5" ></h1>
                      </div>
                      <div class=" py-16">
                          <div class=" space-y-6 flex flex-col justify-center  lg:space-y-0 lg:justify-between lg:flex-row">
                              <div class="col-md-7">
                                  <div class="quick-link-list">
                                      <ul class=" text-primary5 flex justify-center space-x-2 uppercase">
                                        <li><NuxtLink active-class=" text-yellow-bright" class=" mx-4 text-white hover:text-yellow-bright "  to="/faq">FAQ and Help Center</NuxtLink></li>
                                        <li><NuxtLink active-class=" text-yellow-bright" class=" mx-4 text-white hover:text-yellow-bright "  to="/privacy">Terms of Use and Privacy</NuxtLink></li>
                                      </ul>
                                  </div>
                              </div>
                              <div class="col-md-5">
                                  <div class="footer-social">
                                      <ul class=" flex justify-center space-x-2">
                                          <a href="http://facebook.com">
                                              <img src="@/assets/img/icon-facebook.svg" alt="">
                                          </a>
                                            <a href="http://youtube.com">
                                                <img src="@/assets/img/icon-youtube.svg" alt="">
                                            </a>
                                            <a href="http://twitter.com">
                                                <img src="@/assets/img/icon-twitter.svg" alt="">
                                            </a>
                                            <a href="http://pinterest.com">
                                                <img src="@/assets/img/icon-pinterest.svg" alt="">
                                            </a>
                                            <a href="http://instagram.com">
                                                <img src="@/assets/img/icon-instagram.svg" alt="">
                                            </a>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class=" bg-primary1  text-primary5">
                <div class="  flex justify-center items-center">
                    <p class="text-center py-10">Copyright © 2023. All Rights Reserved By <a class=" text-yellow-bright" href="/">SolFlx</a></p>
                </div>
              </div>  
    </footer>
  </template>
  
  <style scoped>
  
  header {
    position: relative;
    height: 96px;
  }
  
  .footer-1 {
    background-image: url(@/assets/img/footer_bg.jpg);

  }
  
  
  
  </style>
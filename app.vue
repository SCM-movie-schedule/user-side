<template>
    <div>
      <NuxtLayout>
        <NuxtPage  />
      </NuxtLayout>
    </div>
</template>
<style >
*{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
      outline: none;
      list-style: none;
      text-decoration: none;
      transition: all 0.3s ease;
  }
  body, html{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
  }
  .custom-shadow{
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
}


.page-enter-from{
  opacity: 0;
  /* transform: translateX(-40px); */
}
.page-enter-to, .page-leave-from{
  opacity: 1;
  /* transform: translateX(0); */
}
.page-enter-active{
  transition: all 0.3s linear;
}

.page-leave-active{
  transition: all 0.3s linear;
}
.page-leave-to{
  opacity: 0;
  /* transform: translateX(-40px); */
}
</style>

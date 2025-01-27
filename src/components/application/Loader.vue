<template>
     <div class="loader">
          <ProgressSpinner style="width: 50px; height: 50px" aria-label="data Loading" fill="transparent"/>
     </div>
</template>
<script setup>
import ProgressSpinner from 'primevue/progressspinner';

</script>
<style>
.loader {
     position: absolute;
     height: 100vh;
     width: 100vw;
     left:0;
     top:0;
     display: flex;
     align-items: center;
     justify-content: center;
     background: rgba(1,1,0,0.3);
     z-index: 999;
}
</style>
<template>
     <div class="loader">
          <ProgressSpinner style="width: 50px; height: 50px" aria-label="data Loading"/>
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
     display: flex;
     align-items: center;
     justify-content: center;
}
</style>
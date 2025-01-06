<template>
  <div class="layout-sidebar">
    <component :is="component"/>
    <!-- <app-menu></app-menu> -->
  </div>
</template>
<script setup>
import AppMenu from "@/components/AppMenu.vue";
import Glossary from "@/components/application/sidenav/Glossary.vue";
import { computed, ref } from "vue";
import {useGlossaryStore} from "@/store";

const store= useGlossaryStore();
const component= computed(()=> {
  if(store.currentPage.toLowerCase()==='glossary') {
    return Glossary;
  }
})
</script>
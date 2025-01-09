<template>
  <div class="layout-wrapper" :class="containerClass" v-if="isReady">
    <app-topbar></app-topbar>
    <app-sidebar></app-sidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>
    <!-- <div class="layout-mask animate-fadein"></div> -->
  </div>
  <!-- <Toast /> -->
</template>
<script setup>
import { useGlossaryStore } from "@/store";
// import Button from "primevue/button";
// import Dialog from "primevue/dialog";
import AppTopbar from "@/components/AppTopbar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import { computed, nextTick, onMounted, ref } from "vue";
import { useLayout } from "@/composables/layout";

const { layoutConfig, layoutState } = useLayout();

const store = useGlossaryStore();

const containerClass = computed(() => {
  return {
    "layout-overlay": layoutConfig.menuMode === "overlay",
    "layout-static": layoutConfig.menuMode === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive &&
      layoutConfig.menuMode === "static",
    "layout-overlay-active": layoutState.overlayMenuActive,
    "layout-mobile-active": layoutState.staticMenuMobileActive,
  };
});
const isReady=ref(false);
onMounted(async () => {
  console.log('before fertching glossary')
  await store.fetchGlossaryItems();
  console.log('fertching glossary')
  nextTick(() => {
    console.log('inside nexttick glossary')
    isReady.value = true; // Only render child components after glossaryItems are fetched
  });
});
</script>
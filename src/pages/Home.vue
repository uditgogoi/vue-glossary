<template>
  <div>
    <div class="grid grid-cols-10 gap-8 mb-10">
      <div class="col-span-2 lg:col-span-2 xl:col-span-2">
        <div
          class="card flex items-center justify-center h-40 mb-0 create-card"
        >
          <Button
            type="button"
            label="Create new"
            icon="pi pi-plus"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          />
          <Menu ref="menu" id="overlay_menu" :model="createItems" :popup="true">
            <template #item="{ item }">
              <Button
                class="cursor-pointer pt-7"
                @click="onSelectMenu(item)"
                variant="text"
              >
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </Button>
            </template>
          </Menu>
        </div>
      </div>
      <div
        class="col-span-2 lg:col-span-2 xl:col-span-2"
        v-for="item in draftItems"
        :key="item.id"
      >
        <GlossaryItem :item="item" />
      </div>
    </div>

    <Divider align="left" type="dotted" :pt="{ content: 'divider-content' }">
      <b>Published</b>
    </Divider>
    <div class="grid grid-cols-12 gap-8 mt-10 mb-10">
      <div
        class="col-span-2 lg:col-span-2 xl:col-span-2"
        v-for="item in publishedGlossaryItems"
        :key="item.id"
      >
        <GlossaryItem :item="item" />
      </div>
    </div>
    <Divider align="left" type="dotted" :pt="{ content: 'divider-content' }">
      <b>Shared with you</b>
    </Divider>
    <div class="grid grid-cols-12 gap-8 mt-10">
      <div
        class="col-span-2 lg:col-span-2 xl:col-span-2"
        v-for="item in sharedGlossaryItems"
        :key="item.id"
      >
        <GlossaryItem :item="item" />
      </div>
    </div>
    <CreateModalDialog v-if="showModal" @onCloseDialog="onCloseDialog" />
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";

import Divider from "primevue/divider";
import Menu from "primevue/menu";
import CreateModalDialog from "@/components/modals/CreateModal.vue";
import { useGlossaryStore } from "@/store";
import { useAuthStore } from "@/store/user";
import GlossaryItem from "@/components/application/GlossaryItem.vue";
import { createGlossaryItem } from "@/composables/GlossaryDataModel";

const router = useRouter();
const store = useGlossaryStore();
const user= useAuthStore();
const menu = ref();
const showModal = ref(false);
const createItems = ref([
  {
    id: "glossary",
    label: "Glossary",
    icon: "pi pi-list",
  },
  {
    id: "document",
    label: "Document",
    icon: "pi pi-file",
  },
]);
const draftItems = computed(() => store.draftGlossaryItems);
const publishedGlossaryItems = computed(() => store.publishedGlossaryItems);
const sharedGlossaryItems = computed(() => store.sharedGlossaryItems);


store.setCurrentPage('home');

const toggle = (event) => {
  menu.value.toggle(event);
};

const createNewDoc = (e) => {
  console.log(e.target.value);
};

const onSelectMenu = (type) => {
  if (type.id === "document") {
    router.push("/document/create");
  } else {
    showModal.value = true;
  }
};

const onCloseDialog = (name) => {
  showModal.value = false;
  if (name) {
    const currentUser= user.loggedInUser.$id;
    const newGlossary = createGlossaryItem({ title: name,owner:currentUser  });
    store.addNewGlossary(newGlossary);
  }
};
</script>
<style scoped>
.create-card {
  border: 1px dashed var(--text-color-secondary);
  background: none;
}
</style>
<template>
  <div>
    <Loader v-if="loading"/>
    <div class="grid grid-cols-10 gap-8 mb-10">
      <div class="col-span-2 lg:col-span-2 xl:col-span-2">
        <div
          class="card flex items-center justify-center h-30 mb-0 create-card"
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
        <GlossaryItem :item="item" @delete="onGlossaryDelete" :key="item.id"/>
      </div>
    </div>

    <Divider
      align="left"
      type="dotted"
      :pt="{ content: 'divider-content' }"
      v-if="publishedGlossaryItems.length > 0"
    >
      <b>Published</b>
    </Divider>
    <div class="grid grid-cols-12 gap-8 mt-10 mb-10">
      <div
        class="col-span-2 lg:col-span-2 xl:col-span-2"
        v-for="item in publishedGlossaryItems"
        :key="item.$id"
      >
        <GlossaryItem :item="item" />
      </div>
    </div>
    <Divider
      align="left"
      type="dotted"
      :pt="{ content: 'divider-content' }"
      v-if="sharedGlossaryItems.length > 0"
    >
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
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import Divider from "primevue/divider";
import Menu from "primevue/menu";
import CreateModalDialog from "@/components/modals/CreateModal.vue";
import { useGlossaryStore } from "@/store";
import { useAuthStore } from "@/store/user";
import GlossaryItem from "@/components/application/GlossaryItem.vue";
import { createGlossaryItem } from "@/composables/GlossaryDataModel";
import { useToastNotification } from "@/utils/useToastNotification";
import { useConfirm } from "primevue/useconfirm";
import Loader from "@/components/application/Loader.vue";

const confirm = useConfirm();
const router = useRouter();
const store = useGlossaryStore();
const user = useAuthStore();
const { showToast } = useToastNotification();

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
const loading = ref(false);

store.setCurrentPage("home");

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

const onCloseDialog = async (name) => {
  showModal.value = false;
  if (!name) {
    return;
  }
  try {
    loading.value=true;
    const currentUser = user.loggedInUser.$id;
    const newGlossary = createGlossaryItem({ title: name, owner: currentUser });
    const result = await store.addNewGlossary(newGlossary);
    if (result) {
      const success = {
        type: "success",
        title: "Successfully created",
        message: "Glossary created successfully",
      };
      showToastMessage(success);
    }
  } catch (e) {
    const error = { type: "error", title: "Error found", message: e.message };
    showToastMessage(error);
  } finally {
    loading.value=false;
  }
};

const onGlossaryDelete = (id) => {
  confirm.require({
    message: "Do you want to delete this record?",
    header: "Delete record",
    icon: "pi pi-info-circle",
    rejectLabel: "Cancel",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: async () => {
      try {
        loading.value=true;
        await store.deleteGlossaryItem(id);
        const success = {
          type: "success",
          title: "Successfully deleted",
          message: "Glossary deleted successfully",
        };
        showToastMessage(success);
      } catch (e) {
        const error = {
          type: "error",
          title: "Error found",
          message: `${e.message}`,
        };
        showToastMessage(error);
      } finally{
        loading.value=false;
      }
    },
  });
};

const showToastMessage = (obj) => {
  showToast({
    type: obj.type,
    title: obj.title,
    message: obj.message,
    time: obj.time || 3000,
  });
};
</script>
<style scoped>
.create-card {
  border: 1px dashed var(--text-color-secondary);
  background: none;
}
</style>
<template>
  <div>
    <div v-if="isLoading" class="flex items-center h-[80vh]">
      <Loader />
    </div>
    <div v-else>
      <div
        class="flex items-center justify-center h-[80vh]"
        v-if="documentCollections.length == 0"
      >
        <div class="text-center">
          <p class="text-2xl text-gray-400 mb-8">No documents found !!</p>
          <Button
            label="Create new Document"
            icon="pi pi-plus"
            @click="onCreateDocumemt"
          />
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4" v-else>
        <!-- <div v-if="document.content && !editMode" class="content col-span-9 p-8 rounded bg-white">
          <h4 class="text-3xl font-normal text-black">{{ document.title }}</h4>
          <div
            class="mt-8"
            v-html="document.content"
          ></div>
        </div>

        <div class="col-span-9 p-10 rounded bg-white" v-else>
          <CreateDocument :documentContent="editDocumentContent" />
        </div> -->

        <div class="col-span-3 bg-white p-10 rounded">
          <div class="mt-4">
            <Button
              icon="pi pi-plus"
              label="Create New"
              variant="text"
              size="small"
              severity="contrast"
              @click="onClickCreate"
            />
          </div>
          <div class="mt-4">
            <Button
              icon="pi pi-pencil"
              label="Edit"
              variant="text"
              severity="info"
              size="small"
              @click="onClickEdit"
            />
          </div>
          <div class="mt-4">
            <Button
              icon="pi pi-trash"
              label="Remove"
              variant="text"
              size="small"
              severity="danger"
            />
          </div>
          <div class="mt-4">
            <Button label="Save Changes" severity="primary" size="small" @click="onSaveChanges"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// import {alphabet} from '@/composables/constants';
import Button from "primevue/button";
import { computed, onMounted, ref, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useGlossaryStore } from "@/store";
import {useAuthStore} from "@/store/user";
import Loader from "@/components/application/Loader.vue";
import CreateDocument from "@/components/application/CreateDocument.vue";

const router = useRouter();
const route = useRoute();
const store = useGlossaryStore();
const user= useAuthStore();
const documentCollections = ref([]);
const isLoading = ref(true);
const editDocumentContent = ref({});

const editMode = computed(() => store.getPageEditMode);
const document = computed(() => store.getActiveDocument);


store.setCurrentPage('glossary');

const onCreateDocumemt = () => {
  router.push({ name: "createDocument" });
};

onMounted(() => {
  fetchAllDocuments();
});

const fetchAllDocuments = async() => {
  const glossaryId = route.params.id;
  const userId= user.currentUser?.$id;
  try{
    documentCollections.value = await store.fetchAllDocuments(userId,glossaryId);
  } catch(e){

  }
  
  isLoading.value = false;
};

const onClickCreate = () => {
  store.updatePageEditStatus(true);
  editDocumentContent.value = {};
};

const onClickEdit = () => {
  store.updatePageEditStatus(true);
  editDocumentContent.value = {
    title: getDocumentById(),
    content: document.value.content,
    selectedGlossary: {
      name: getGlossaryNameById(route.params.id),
      code: route.params.id,
    },
  };
};

const getGlossaryNameById = (glossaryId) => {
  const glossary = store.getGlossaryItems.find(
    (glossary) => glossary.id === glossaryId
  );
  return glossary.title;
};

const getDocumentById = () => {
  const pages = store.getGlossaryItems.find(
    (glossary) => glossary.id === route.params.id
  )?.pages;
  let currentDocument;
  if (pages.length > 0) {
    currentDocument = pages.find((page) => page.id === document.value.id);
  }
  // console.log(document)
  return currentDocument.title;
};

const onSaveChanges=()=> {
  
}
</script>
<style scoped>
</style>
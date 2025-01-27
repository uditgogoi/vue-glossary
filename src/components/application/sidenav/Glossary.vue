<template>
  <div class="flex h-auto justify-end items-center">
    <InputText
      v-model="documentSearchText"
      type="text"
      size="small"
      placeholder="Search"
      v-if="documentSearch"
    />
    <Button
      icon="pi pi-search"
      severity="success"
      variant="text"
      rounded
      aria-label="Search"
      size="small"
      @click="documentSearch = !documentSearch"
    />
  </div>
  <Divider type="solid" />
  <div class="flex h-auto">
    <div class="w-1/5 h-auto border-r border-gray-100 alphabets">
      <div
        v-for="(letter, i) in alphabets"
        :key="i"
        class="mb-1 flex items-center justify-center"
      >
        <Button
          :label="letter.toUpperCase()"
          variant="text"
          :aria-label="letter"
          size="large"
          @click="onChangeAlphabet(letter)"
        />
      </div>
    </div>
    <div class="w-4/5 pages h-auto">
      <div
        v-for="document in documentList"
        :key="document.id"
        class="overflow-hidden"
      >
        <Button
          :label="getTrimCharacters(document.title)"
          severity="secondary"
          variant="link"
          size="small"
          v-tooltip="getTooltipValue(document.title)"
          @click="getDocumentContent(document.id)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useGlossaryStore } from "@/store";
import Button from "primevue/button";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import {trimCharacter,showTooltipValue} from "@/utils/helper";


const store = useGlossaryStore();
const documentSearchText = ref("");
const documentSearch = ref(false);
const { selectedGlossaryItem } = storeToRefs(store);
const route = useRoute();
const documentList= computed(()=> store.getDocumentList)
const alphabets= ref([]);

onMounted(() => {
  // getAlphabets();
  // setDefaultSelectedGlossary();
});

watch(selectedGlossaryItem, () => {
  getSelectedPages();
  // getDocumentContent();
});

watch(documentList,()=> {
  getAlphabets();
  setDefaultSelectedGlossary();
})

function getAlphabets() {
  alphabets.value = store.getExistingAlphabets();
}

function setDefaultSelectedGlossary() {
  const document = store.defaultGlossaryPageContent(
    route.params.id,
    alphabets.value[0]
  );
  const params = {
    glossaryId: route.params.id,
    selectedAlphabet: alphabets.value.length > 0 ? alphabets.value[0] : "",
    selectedDocument: document,
  };
  store.updateSelectedGlossaryItem(params);
}

function getSelectedPages() {
  const pages = store.getSelectedPagesByAlphabet(route.params.id);
  documentList.value = pages.length > 0 ? pages : [];
}

const onChangeAlphabet = (letter) => {
  const document = store.defaultGlossaryPageContent(
    route.params.id,
    letter.toUpperCase()
  );
  const params = {
    glossaryId: route.params.id,
    selectedAlphabet: letter.toUpperCase(),
    selectedDocument: document,
  };
  store.updateSelectedGlossaryItem(params);
  updatePageEditMode();
};

const getDocumentContent = (pageid) => {
  store.currentGlossaryPageContent(route.params.id, pageid);
  updatePageEditMode();
};

const updatePageEditMode = (status = false) => {
  store.updatePageEditStatus(status);
};

const getTrimCharacters=(word)=> {
    return trimCharacter(word,24)
}

const getTooltipValue=(tooltipValue)=> {
    return showTooltipValue(tooltipValue,24);
}
</script>
<style scoped>
.alphabets {
}
</style>
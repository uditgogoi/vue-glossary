<template>
  <div>
    <div class="grid grid-cols-10 gap-4 p-4">
      <div class="col-span-10 md:col-span-8 mb-8">
        <InputText v-model="title" class="w-full" placeholder="Title" />
      </div>
      <!-- Editor -->
      <div class="col-span-10 md:col-span-8">
        <Editor @content-output="onContentChange" />
      </div>
      <div class="col-span-10 md:col-span-8">
        <Select
          v-model="selectedGlossary"
          :options="glossaries"
          optionLabel="name"
          placeholder="Select a Glossary"
          class="w-full"
        >
          <template #option="slotProps">
            <div class="flex items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
          <template #footer>
            <div class="p-3">
              <Button
                label="Add New"
                fluid
                severity="primary"
                text
                size="small"
                icon="pi pi-plus"
                @click="onAddNewGlossary"
              />
            </div>
          </template>
        </Select>
      </div>
      <div class="col-span-10 md:col-span-8 mb-10">
        <Button label="Save" severity="success" @click="onSubmitDocument" />
      </div>
    </div>
    <CreateModalDialog
      v-if="showCreateGlossaryModal"
      @onCloseDialog="onCloseCreateModal"
    />
  </div>
</template>
<script setup>
import InputText from "primevue/inputtext";
import Editor from "@/components/application/Editor.vue";
import Button from "primevue/button";
import Select from "primevue/select";
import { computed, ref } from "vue";
import { useGlossaryStore } from "@/store";
import CreateModalDialog from "@/components/modals/CreateModal.vue";
import {createGlossaryItem,createDocument} from "@/composables/GlossaryDataModel";

const title = ref("");
const editorContent = ref("");
const selectedGlossary = ref("");
const store = useGlossaryStore();
const showCreateGlossaryModal = ref(false);

store.setCurrentPage('document');

const onContentChange = (value) => {
  editorContent.value = value;
};

const glossaries = computed(() =>
  store.getGlossaryItems.map((item) => {
    return { name: item.title, code: item.id };
  })
);

const onAddNewGlossary = () => {
  showCreateGlossaryModal.value = true;
};

const onCloseCreateModal = (name) => {
  if (name) {
    const newGlossaryItem = createGlossaryItem({ title: name });
    store.addNewGlossaryItem(newGlossaryItem);
    selectedGlossary.value= {name:newGlossaryItem.title, code:newGlossaryItem.id }
  }
  showCreateGlossaryModal.value = false;

  // add the glossary to the list
};

const onSubmitDocument = () => {
  if (!title || !editorContent) {
    // show eeror message
    return;
  }
  const newDoc= createDocument({title:title.value,content:editorContent.value});
  store.addDocumentToGlossary(newDoc,selectedGlossary.value.code)
};
</script>
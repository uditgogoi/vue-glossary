<template>
  <div>
    <div class="grid grid-cols-10 gap-4 p-4">
      <div class="col-span-10 md:col-span-8 mb-8">
        <InputText
          v-model="title"
          class="w-full"
          placeholder="Title"
          @update:modelValue="onValueChange"
        />
      </div>
      <!-- Editor -->
      <div class="col-span-10 md:col-span-8">
        <Editor @content-output="onContentChange" :document="editorContent" />
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
      <!-- <div class="col-span-10 md:col-span-8 mb-10">
        <Button label="Save" severity="success" @click="onSubmitDocument" />
      </div> -->
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
import { computed, onMounted, ref, watch } from "vue";
import { useGlossaryStore } from "@/store";
import CreateModalDialog from "@/components/modals/CreateModal.vue";
import {
  createGlossaryItem,
  createDocument,
} from "@/composables/GlossaryDataModel";
const props = defineProps(["documentContent"]);
const title = ref("");
const editorContent = ref("");
const selectedGlossary = ref({});
const store = useGlossaryStore();
const showCreateGlossaryModal = ref(false);

// onMounted(() => {
//   if (props.documentContent) {
//     title.value = props.documentContent.title;
//     selectedGlossary.value = props.documentContent.selectedGlossary;
//   }
//   console.log(editorContent.value);
// });

watch(
  () => props.documentContent,
  () => {
    if (props.documentContent && Object.keys(props.documentContent).length > 0) {
      title.value = props.documentContent.title;
      selectedGlossary.value = props.documentContent.selectedGlossary;
      editorContent.value = props.documentContent.content;
    }
  },
  { immediate: true },
  { deep: true } // Ensures it listens to nested changes
);

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
    selectedGlossary.value = {
      name: newGlossaryItem.title,
      code: newGlossaryItem.id,
    };
  }
  showCreateGlossaryModal.value = false;

  // add the glossary to the list
};

const onSubmitDocument = () => {
  if (!title || !editorContent) {
    // show eeror message
    return;
  }
  const newDoc = createDocument({
    title: title.value,
    content: editorContent.value,
  });
  store.addDocumentToGlossary(newDoc, selectedGlossary.value.code);
};
const onValueChange = async (e) => {
  // try {
  //   const generatedtext= fetchText(e);
  //   console.log(generatedtext)
  // } catch(e){
  // }
};
</script>
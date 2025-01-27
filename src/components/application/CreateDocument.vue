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
          @change="onGlossaryValueChange"
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
import { computed, onMounted, ref, watch,reactive } from "vue";
import { useGlossaryStore } from "@/store";
import {useAuthStore} from "@/store/user";
import CreateModalDialog from "@/components/modals/CreateModal.vue";
import {
  createGlossaryItem,
  createDocument,
} from "@/composables/GlossaryDataModel";
import {authServices} from '@/service/authServices';

const props = defineProps(["documentContent"]);
const emits= defineEmits(['change'])
const title = ref("");
const editorContent = ref("");
const selectedGlossary = ref({});
const store = useGlossaryStore();
const user= useAuthStore.loggedInUser;
const showCreateGlossaryModal = ref(false);
const document= reactive({
  title:null,
  content:null,
  glossary:null
})

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
    if (props.documentContent) {
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
  document.content=  editorContent.value;
  emits('change',document)
};

const glossaries = computed(() =>
  store.getGlossaryItems.map((item) => {
    return { name: item.title, code: item.id };
  })
);

const onAddNewGlossary = () => {
  showCreateGlossaryModal.value = true;
};

const onCloseCreateModal = async(name) => {
  if (name) {
    // const currentUser= user;
    // const newGlossaryItem = createGlossaryItem({ title: name, owner: currentUser });
    // console.log(newGlossaryItem)
    // store.addNewGlossaryItem(newGlossaryItem);
    // selectedGlossary.value = {
    //   name: newGlossaryItem.title,
    //   code: newGlossaryItem.id,
    // };
  }
  showCreateGlossaryModal.value = false;

  // add the glossary to the list
};


const onValueChange = async (e) => {
  document.title= title.value;
  emits('change',document);
};

const onGlossaryValueChange=()=> {
  document.glossary= selectedGlossary.value;
  emits('change',document);
}
</script>
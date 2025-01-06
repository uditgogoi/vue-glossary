<template>
  <div>
    <Editor
      name="content"
      editorStyle="height: 400px"
      v-model="editorContent"
      @value-change="onEditorValueChange"
    />
  </div>
</template>
<script setup>
import Editor from "primevue/editor";

import { useToast } from "primevue/usetoast";
import { onMounted, ref, watch } from "vue";

const emits = defineEmits(["content-output"]);
const props = defineProps(["document"]);
const toast = useToast();
const editorContent = ref("");

const onEditorValueChange = (e) => {
  emits("content-output", e);
};

// console.log(props.content)


watch(
  ()=>props.document,
  ()  => {
    editorContent.value = props.document;
  },
  { immediate: true } // Ensures it runs initially as well
);
</script>
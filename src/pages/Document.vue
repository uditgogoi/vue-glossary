<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-9 p-10 rounded bg-white">
      <CreateDocument
        :documentContent="editDocumentContent"
        @change="onValueChange"
      />
    </div>

    <div class="col-span-3 bg-white p-10 rounded">
      <div>
        <Button
          label="Save Changes"
          severity="primary"
          size="small"
          :loading="loadingButton"
          @click="onSaveChanges"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from "primevue/button";
import CreateDocument from "@/components/application/CreateDocument.vue";
import { createDocument } from "@/composables/GlossaryDataModel";
import { ref } from "vue";
import { useGlossaryStore } from "@/store";
import { showToastMessage } from "@/utils/useToastNotification";
import { useAuthStore } from "@/store/user";
import {useToast} from "primevue/usetoast";

const toast= useToast();
const document = ref({});
const editDocumentContent= ref({});
const store = useGlossaryStore();
const user = useAuthStore();
const loadingButton= ref(false);

const onValueChange = (value) => {
  const documentValue = value;
  documentValue.glossaryId = documentValue.glossary?.code;
  document.value = createDocument(documentValue);
};

const onSaveChanges = async () => {
  const currentUser = user.loggedInUser.$id;
  loadingButton.value=true;
  try {
    await store.addDocumentToGlossary({...document.value,owner:currentUser});
    const success = {
      type: "success",
      title: "Successfully created",
      message: "Document created successfully",
    };
    showToastMessage(toast,success);
    editDocumentContent.value={}
  } catch (e) {
    const error = {
      type: "error",
      title: "Error found",
      message: `${e.message}`,
    };
    showToastMessage(toast,error);
  } finally {
    loadingButton.value=false;
  }
};
</script>
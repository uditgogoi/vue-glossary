<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-9 p-10 rounded bg-white">
      <CreateDocument :documentContent="editDocumentContent" />
    </div>

    <div class="col-span-3 bg-white p-10 rounded">
      <div>
        <Button
          label="Save Changes"
          severity="primary"
          size="small"
          @click="onSaveChanges"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from "primevue/button";
import CreateDocument from "@/components/application/CreateDocument.vue";
</script>
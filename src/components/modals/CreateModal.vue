<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Add Glossary Name"
    :style="{ width: '25rem' }"
    :closable="false"
  >
   
    <div class="flex items-center gap-4 mb-4">
      <InputText id="glossaryName" class="flex-auto" autocomplete="off" v-model="glossaryName"/>
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="danger"
        variant="text"
        @click="onClose('cancel')"
      ></Button>
      <Button type="button" label="Save" @click="onClose('save')" severity="success"></Button>
    </div>
  </Dialog>
</template>
<script setup>
import Dialog from "primevue/dialog";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from "vue";

const emits= defineEmits(['onCloseDialog']);
const glossaryName= ref('');
const visible= ref(true)
const onClose= (type)=> {
    const emittedValue= type==='save'? glossaryName.value:'';
    emits('onCloseDialog',emittedValue);
}
</script>
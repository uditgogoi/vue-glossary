<template>
  <div class="card flex items-center justify-between h-30 mb-0">
    <div class="text-center">
      <!-- <Avatar label="D" class="mr-2" size="small" /> -->
      <Button
        as="router-link"
        :to="constructLink"
        variant="text"
        :title="item.title"
        v-tooltip="getTooltipValue(item.title)"
      >
        {{ trimCharacter(item.title, 12) }}
      </Button>
    </div>
    <div>
      <Button
        icon="pi pi-ellipsis-v"
        severity="contrast"
        variant="text"
        rounded
        aria-label="User"
        @click="openOptions"
      />
    </div>
    <Popover ref="popOver">
      <div class="flex flex-col gap-4">
        <div>
          <ul class="list-none p-0 m-0 flex flex-col">
            <li
              @click="deleteGlossary"
              class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
            >
              <div>
                <i class="pi pi-trash" style="color: red"></i>
                <span class="font-medium pl-3">Delete</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Popover>
  </div>
</template>
<script setup>
// import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Popover from "primevue/popover";
import { computed, ref } from "vue";
import { trimCharacter, showTooltipValue } from "@/utils/helper";

const props = defineProps(["item"]);
const emits= defineEmits(['delete'])
const popOver = ref();

const constructLink = computed(() => `/glossary/${props.item.id}`);

const openOptions = (event) => {
  popOver.value.toggle(event);
};

const getTooltipValue = (tooltipValue) => {
  return showTooltipValue(tooltipValue, 9);
};

const deleteGlossary = () => {
  emits('delete',props.item.id);
  
};
</script>
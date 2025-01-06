<template>
  <div class="card flex items-center justify-center h-40 mb-0">
    <div class="text-center">
      <!-- <Avatar label="D" class="mr-2" size="small" /> -->
      <Button
        as="router-link"
        :to="constructLink"
        variant="text"
        :title="item.title"
        v-tooltip="getTooltipValue(item.title)"
      >
        {{ trimCharacter(item.title, 9) }}
      </Button>
    </div>
  </div>
</template>
<script setup>
// import Avatar from "primevue/avatar";
import Button from "primevue/button";
import { computed } from "vue";
import { trimCharacter,showTooltipValue } from "@/utils/helper";

const props = defineProps(["item"]);

const constructLink = computed(() => `/glossary/${props.item.id}`);

const getTooltipValue=(tooltipValue)=> {
  return showTooltipValue(tooltipValue,9);
}
</script>
<template>
  <div>
    <Skeleton height="2rem" class="mb-2" width="90%"></Skeleton>
    <div class="mt-12">
      <div class="flex mt-4">
        <Skeleton shape="square" size="4rem" class="mr-2"></Skeleton>
        <div class="self-center" style="flex: 1">
          <Skeleton width="90%" class="mb-2"></Skeleton>
          <Skeleton width="100%"></Skeleton>
        </div>
      </div>
      <Skeleton height="1rem" width="82%" class="mt-4"></Skeleton>
      <Skeleton height="1rem" width="98%" class="mt-4"></Skeleton>
      <Skeleton height="1rem" width="78%" class="mt-4"></Skeleton>
      <div class="mt-4">
        <Skeleton height="50vh"></Skeleton>
      </div>
    </div>
  </div>
</template>
<script setup>
import Skeleton from "primevue/skeleton";
</script>
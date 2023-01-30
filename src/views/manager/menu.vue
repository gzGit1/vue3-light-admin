<template>
  <div>
    <h1>嵌套菜单</h1>
    <div>菜单地址：{{route.path}}</div>
  </div>
</template>
<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
const route = useRoute();
const router = useRouter();
</script>
<style lang="scss" scoped></style>

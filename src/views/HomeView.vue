<template>
  <main>
    <div>用户信息:{{userInfo.userName}}</div>
    <TheWelcome />
  </main>
</template>

<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { useUserStore } from '@/stores/modules/user';
const { userInfo } = useUserStore();
</script>

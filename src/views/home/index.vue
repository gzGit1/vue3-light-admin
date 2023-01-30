<template>
  <div>
    <div>
      <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/manager/backstage/processIndex">后台管理</router-link>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="move" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style>

</style>

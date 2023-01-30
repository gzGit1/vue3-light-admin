<template>
  <div class="layout-head-con clearfix">
    <div class="fl clearfix" @click="backHome">
      <span class="fl sys-title-con">后台管理</span>
    </div>
    <div class="fl">
      <router-link
        class="layout-link-con"
        v-for="(item, index) in menuList"
        :key="index"
        :to="item.path"
        >{{ item.meta.resourceName }}</router-link
      >
    </div>
    <div class="fr user-info-con">
      <span class="sp-user-name">admin</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
let menuList = ref<any>([]);
const emit = defineEmits(["toggle-menu"]);
let isToggle = ref(false);
menuList = router.getRoutes().filter((val) => val.meta.resourceName);
function toggleSidebar() {
  isToggle.value = !isToggle.value;
  emit("toggle-menu", isToggle.value);
}
const backHome = () => {
  router.push('/home');
}
</script>

<style lang="scss" scoped>
.side-menu-toggle {
  margin: 25px 15px 0 0;
  font-size: 20px;
}
.layout-head-con {
  padding: 0 20px;
  background-color: var(--vt-c-black-mute);
  color:var(--vt-c-white);
  .sys-title-con {
    margin-right: 20px;
    height: 70px;
    line-height: 70px;
    font-weight: bold;
    font-size: 22px;
    cursor: pointer;
  }
  .school-logo {
    margin: 16px 10px 0 0;
  }
}
.layout-link-con {
  margin-right: 20px;
  display: inline-block;
  height: 70px;
  line-height: 70px;
  color: var(--vt-c-white);
}
.router-link-active {
  color: var(--menu-active);
}
.user-info-con {
  height: 70px;
  line-height: 70px;
  .sp-user-name {
    margin-right: 10px;
    vertical-align: 2px;
  }
}
</style>
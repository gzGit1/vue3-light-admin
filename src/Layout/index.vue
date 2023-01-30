<template>
  <div class="layout-wrapper">
    <Menu></Menu>
    <div class="clearfix layout-main">
      <div class="sidebar-menu-con fl" :class="{ 'hide-menu': isToggle }">
        <SideBarIndex></SideBarIndex>
      </div>
      <div class="layout-view-con" :class="{ 'expand-width': isToggle }">
        <div class="layout-container">
          <el-scrollbar>
            <div v-if="!isShowIframe" style="height: 100%">
              <router-view v-slot="{ Component }">
                <transition name="move" mode="out-in">
                    <component :is="Component" :key="key"/>
                </transition>
              </router-view>
            </div>
            <iframe
              v-else
              :src="iframeUrl"
              frameborder="0"
              height="100%"
              width="100%"
            ></iframe>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "./components/menu.vue";
import SideBarIndex from "./components/sideBarIndex.vue";
import router from "@/router";
import {
  watch,
  ref,
  onMounted,
  computed
} from "vue";
import { useRoute } from "vue-router";
const isShowIframe = ref(false);
const route = useRoute();
const iframeUrl = ref("");
let isToggle = ref(false);
let cachedViews = ref([]);
onMounted(() => {
  showIframe(route.meta);
});
watch(
  () => route.fullPath,
  (n, o) => {
    showIframe(route.meta);
  }
);
function showIframe(meta) {
  const { isIframe, frameUrl } = meta;
  if (isIframe && frameUrl) {
    isShowIframe.value = true;
    iframeUrl.value = frameUrl;
  } else {
    isShowIframe.value = false;
  }
}
function toggleMenu(val) {
  isToggle.value = val;
}
const key = computed(() => {
  return route.path;
});

</script>

<style lang="scss">
.layout-wrapper {
  height: 100%;
  .layout-main {
    height: calc(100% - 71px);
  }
  .sidebar-menu-con,
  .layout-view-con {
    height: 100%;
    transition: all 0.3s;
  }
  .sidebar-menu-con {
    width: 200px;
  }
  .layout-view-con {
    padding: 8px;
    margin-left: 200px;
    box-sizing: border-box;
    background-color: #e7eaf1;
  }
  .layout-container {
    padding: 10px;
    height: 100%;
    background: #fff;
    border-radius: 6px;
  }
  .hide-menu {
    width: 60px;
  }
  .expand-width {
    margin-left: 60px;
  }
}
</style>
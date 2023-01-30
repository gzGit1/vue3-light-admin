<template>
  <div class="sidebar-wrapper">
    <div class="resource-title">{{currentResource.resourceName}}</div>
    <el-menu
      :collapse="isToggle"
      class="left-sider-menu"
      :default-active="activePath"
      :collapse-transition="false"
      :unique-opened="false"
      :router="true"
    >
      <SideBarItem v-for="(item,index) in currentRouter" :key="index" :item="item"></SideBarItem>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { computed} from "vue";
import { useRoute } from "vue-router";
import SideBarItem from './sideBarItem.vue';
const route = useRoute();
defineProps({
  isToggle: {
    type: Boolean,
    default: false,
  },
});
let currentResource = computed(() => {
  let routes = menuList.value.filter((val) =>
    route.path.includes(val.path.split('/')[2])
  );
  return routes[0].meta;
});
let activePath = computed(() => {
    const { meta, path } = route;
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
});

let menuList = computed(() => {
  let menu = router.getRoutes().filter((val) => val.meta.resourceName);
  return menu;
});
let currentRouter = computed(() => {
  let routes = menuList.value.filter((val) =>
    route.path.includes(val.path.split('/')[2])
  );
  return routes[0].children;
});

</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  height: 100%;
  width: 200px;
  .resource-title {
    padding: 10px;
  }
  .el-menu {
    height: calc(100% - 40px);
    .out-link {
      display: block;
      padding-left: 20px;
      height: 56px;
      line-height: 56px;
      color: var(--vt-c-black);
    }
    :deep .el-menu-item {
      a {
        color:#000;
      }
    }
    :deep .el-menu-item.is-active {
      background-color: #337ecc;
      color: #fff;
      a {
        color: #fff;
      }
    }
  }
}
</style>

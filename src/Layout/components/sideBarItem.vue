<template>
  <div>
    <el-sub-menu
      :index="item.path"
      :key="item.path"
      v-if="isHasChildRouter(item)"
    >
      <template #title>
        <el-icon>
          <i v-if="item.meta.icon" :class="item.meta.icon"></i>
          <el-icon v-else><document /></el-icon>
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <SideBarItem
        v-for="(item, index) in childrenMenu"
        :key="index"
        :item="item"
      ></SideBarItem>
    </el-sub-menu>
    <el-menu-item
      v-if="!isHasChildRouter(item) && !item.meta.hidden"
      :index="item.path"
      :key="item.path"
    >
      <el-icon>
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        <el-icon v-else><document /></el-icon>
      </el-icon>
      <template #title>
        <Link :to="item.path">{{ item.meta.name }}</Link>
      </template>
    </el-menu-item>
  </div>
</template>

<script setup lang="ts">
import Link from "./Link.vue";
import { computed } from "vue";
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const childrenMenu = computed(() => {
  return props.item?.children?.length > 0 ? props.item?.children : [];
});
function isHasChildRouter(item):boolean {
  return item?.children?.length > 0 ? true : false;
}
</script>

<style lang="scss" scoped></style>

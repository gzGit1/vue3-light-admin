<template>
  <div class="data-page-con">
    <el-pagination
      v-model:currentPage="current"
      v-model:page-size="size"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  current: {
    type: Number,
    default: 1,
  },
  size: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
});
const pageEmit = defineEmits(["update:current", "update:size", "pagination"]);
const handleSizeChange = (val: number) => {
  pageEmit("update:size", val);
  pageEmit("pagination");
};
const handleCurrentChange = (val: number) => {
  pageEmit("update:current", val);
  pageEmit("pagination");
};
</script>

<style lang="scss" scoped>
.data-page-con {
  margin-top: 20px;
}
</style>

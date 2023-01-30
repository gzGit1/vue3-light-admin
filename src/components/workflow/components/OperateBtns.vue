<template>
  <el-popover ref="popover" placement="right" :width="220" trigger="click">
    <div>
      <el-button size="small" type="primary" @click="addApprovalPerson">
        审批人</el-button
      >
      <el-button size="small" type="primary" @click="addNotifierPerson">
        抄送人</el-button
      >
      <el-button size="small" type="primary" @click="addBranchBtn">
        分支</el-button
      >
    </div>
    <template #reference>
      <div class="add-node-btn">+</div>
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import nodeOperate from "../composition/nodeOperate";
const prop = defineProps(["index", "item", "list","pList"]);
const {
  nodeList,
  createBranchNodeItem,
  createApprovalNodeItem,
  createNotifierNodeItem,
} = nodeOperate();
const addApprovalPerson = () => {
  createApprovalNodeItem(prop.item, prop.list);
};
// 添加抄送
const addNotifierPerson = () => {
  createNotifierNodeItem(prop.item, prop.list);
};
// 添加分支
const addBranchBtn = () => {
  createBranchNodeItem(prop.item, prop.list);
};
</script>

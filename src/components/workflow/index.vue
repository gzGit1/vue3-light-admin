<template>
  <div class="work-flow-node-wrapper">
    <div class="node-list">
      <div class="node-wrapper" v-for="(item, index) in nodeList" :key="index">
        <NodeType
          :item="item"
          :list="nodeList"
          :key="index"
          :index="index">
        </NodeType>
      </div>
      <div class="node-wrapper">
        <div class="node-result-end">流程结束</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NodeType from "./components/NodeType.vue";
import nodeOperate from "./composition/nodeOperate";
const {
  nodeList
} = nodeOperate();

</script>

<style lang="scss">
@import "./css/index.scss";
.work-flow-node-wrapper {
  height: 100%;
  overflow: auto;
}
</style>
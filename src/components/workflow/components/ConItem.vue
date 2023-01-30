<template>
  <div class="node-item" :class="`node-type-${item.nodeType}`">
    <div class="node-item-con">
      <div class="node-info">
        <div class="n-title">
          条件分支 {{ item.title }}
          <span class="sp-delete-node" @click="deleteConditionBtn">x</span>
        </div>
        <div class="n-content" @click="openSetNodeContent">{{ item.approvalName }}</div>
      </div>
      <div class="node-operate">
        <div class="operate-center-line"></div>
        <OperateBtns
          :index="index"
          :item="item"
          :list="list"
          :pList="pList"
        ></OperateBtns>
        <div class="down-arrow" v-if="item.childrenNode.length > 0"></div>
      </div>
    </div>
    <div class="node-item" v-if="item.childrenNode.length > 0">
      <NodeType
        v-for="(cItem, cIndex) in item.childrenNode"
        :key="cIndex"
        :pIndex="index"
        :list="item.childrenNode"
        :pList="pList"
        :totalAccount="item.childrenNode.length"
        :item="cItem"
        :index="cIndex"
      ></NodeType>
    </div>
    <!-- 节点内容设置 -->
    <SetNodeContent
      :index="index"
      :item="item"
      :list="list"
      :pList="pList"
      ref="nodeContent"
    >
    </SetNodeContent>
  </div>
</template>
    
<script setup lang="ts">
import { ref } from "vue";
import NodeType from "./NodeType.vue";
import OperateBtns from "./OperateBtns.vue";
import SetNodeContent from "./setNodeContent.vue";
import nodeOperate from "../composition/nodeOperate";
const { deleteConditionItem } = nodeOperate();
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {};
    },
  },
  index: {
    type: Number,
    default: 0,
  },
  totalAccount: {
    type: Number,
    default: 0,
  },
  pIndex: {
    type: Number,
    default: 0,
  },
  list: {
    type: Array,
    default: [],
  },
  pList: {
    type: Array,
    default: [],
  },
});
const nodeContent = ref(null);
const deleteConditionBtn = () => {
  deleteConditionItem(props.item, props.list, props.pList);
}
const openSetNodeContent = () => {
  nodeContent.value.openDrawer();
};
</script>
    
<style lang="scss" scoped>
.node-item {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  -webkit-box-flex: 1;
  align-items: center;
}

.node-item-con {
  display: inline-flex;
  flex-direction: column;
  -webkit-box-flex: 1;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  position: relative;
}

.node-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}
.node-branch-main {
  position: relative;
  border-top: 2px solid #cacaca;
  border-bottom: 2px solid #cacaca;

  .node-item-con {
    position: relative;
    padding-top: 30px;
    padding-right: 50px;
    padding-left: 50px;
  }
}

.node-branch-wrapper {
  .node-banch-line-wrapper {
    position: relative;

    .operate-center-line {
      margin: auto;
      width: 2px;
      height: 90px;
      background-color: #cacaca;
    }

    .down-arrow {
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 4px;
      border-style: solid;
      border-width: 8px 6px 4px;
      border-color: #cacaca transparent transparent;
      background: #f5f5f7;
    }
  }
}
</style>
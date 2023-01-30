<template>
  <div class="node">
    <!-- 开始节点、中间节点 -->
    <NodeItem
      :item="item"
      :index="index"
      :totalAccount="item.childrenNode.length"
      :list="list"
      :pList="pList"
      v-if="
        item.nodeType == 'approval' ||
        item.nodeType == 'notifier' ||
        item.nodeType == 'start'
      "
    ></NodeItem>
    <!-- 条件分支节点 -->
    <BranchNodeItem
      :item="item"
      :index="index"
      :list="list"
      :totalAccount="item.childrenNode.length"
      v-if="item.nodeType == 'branch'"
    ></BranchNodeItem>
    <!-- 条件节点 -->
    <ConItem
      :item="item"
      :index="index"
      :list="list"
      :pList="pList"
      :totalAccount="item.childrenNode.length"
      v-if="item.nodeType == 'condition'"
    ></ConItem>
  </div>
</template>
  
<script setup lang="ts">
import NodeItem from "./NodeItem.vue";
import BranchNodeItem from "./BranchNodeItem.vue";
import ConItem from "./ConItem.vue";
name: "NodeType";
defineProps({
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
  list: {
    type: Array,
    default: [],
  },
  pList:{
    type: Array,
    default: [],
  }
});
</script>
  
<style lang="scss" scoped>
.node-item {
  display: inline-flex;
  flex-direction: column;
  -webkit-box-flex: 1;
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

.node-item {
  position: relative;

  .branch-hidden-line {
    position: absolute;
    height: 3px;
    width: 50%;
    background-color: #fff;
  }

  .lt-hidden-line {
    top: -2px;
  }

  .lb-hidden-linie {
    bottom: -2px;
  }

  .rt-hidden-line {
    right: 0;
    top: -2px;
  }

  .rb-hidden-linie {
    right: 0;
    bottom: -2px;
  }
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

.node-item-con::before {
}

.node-item-con::before {
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
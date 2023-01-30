<template>
  <div class="node-item" :class="`node-type-${item.nodeType}`">
    <div class="node-item-con">
      <div class="node-info">
        <div class="n-title">
          {{ item.title }}
          <span
            class="sp-delete-node"
            v-if="item.nodeType != 'start'"
            @click="deleteNodeBtn"
            >x</span
          >
        </div>
        <div class="n-content" @click="openSetNodeContent">
          {{ item.approvalName }}
        </div>
      </div>
      <div class="node-operate">
        <div class="operate-center-line"></div>
        <OperateBtns :index="index" :item="item" :list="list"></OperateBtns>
        <div class="down-arrow" v-if="index != list.length - 1"></div>
      </div>
    </div>
    <NodeType
      v-for="(cItem, cIndex) in item.childrenNode"
      :pIndex="index"
      :totalAccount="item.childrenNode.length"
      :item="cItem"
      :list="item.childrenNode"
      :index="cIndex"
      :key="cIndex"
    ></NodeType>
    <!-- 节点内容设置 -->
    <SetNodeContent
      :index="index"
      :item="item"
      :list="list"
      ref="nodeContent"
    ></SetNodeContent>
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from "vue";
import NodeType from "./NodeType.vue";
import OperateBtns from "./OperateBtns.vue";
import SetNodeContent from "./setNodeContent.vue";
import nodeOperate from "../composition/nodeOperate";
const { deleteNodeItem } = nodeOperate();
name: "NodeItem";
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
onMounted(() => {});
const deleteNodeBtn = () => {
  deleteNodeItem(props.item, props.list);
};
const openSetNodeContent = () => {
  nodeContent.value.openDrawer();
};
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
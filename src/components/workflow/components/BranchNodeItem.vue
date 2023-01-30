<template>
  <div class="node-branch-wrapper">
    <div class="node-branch-main">
      <div class="add-candition-btn" @click="addConditionBtn(item,item.childrenNode)">  添加条件</div>
      <div
        class="node-item"
        v-for="(cItem, cIndex) in item.childrenNode"
        :key="cIndex"
      >
        <div class="branch-hidden-line lt-hidden-line" v-if="cIndex == 0"></div>
        <div
          class="branch-hidden-line lb-hidden-linie"
          v-if="cIndex == 0"
        ></div>
        <div
          class="branch-hidden-line rt-hidden-line"
          v-if="cIndex == totalAccount - 1"
        ></div>
        <div
          class="branch-hidden-line rb-hidden-linie"
          v-if="cIndex == totalAccount - 1"
        ></div>
        <NodeType
          :pIndex="index"
          :list="item.childrenNode"
          :totalAccount="item.childrenNode.length"
          :item="cItem"
          :pList="list"
          :index="cIndex"
        >
        </NodeType>
      </div>
    </div>
    <div class="node-banch-line-wrapper">
      <div class="operate-center-line"></div>
      <div class="down-arrow" v-if="index != list.length - 1"></div>
      <div class="node-operate branch-add-btns">
        <OperateBtns
          :index="index"
          :item="item"
          :list="list"
        ></OperateBtns>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import NodeType from "./NodeType.vue";
import OperateBtns from "./OperateBtns.vue";
import nodeOperate from "../composition/nodeOperate";
const {
  createConditionNodeItem
} = nodeOperate();
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
});
// 分支添加条件
const addConditionBtn = (item,list) => {
  createConditionNodeItem(item,list);
}

</script>
  
<style lang="scss" scoped>
.node-item {
  display: inline-flex;
  flex-direction: column;
  -webkit-box-flex: 1;
  border-left: 2px solid #fff;
  border-right: 2px solid #fff;
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
  .add-candition-btn {
    position: absolute;
    left: 50%;
    width: 100px;
    margin-left: -50px;
    z-index: 100;
    top: -17px;
    background: #3296fa;
    text-align: center;
    height: 29px;
    line-height: 28px;
    color: #fff;
    border-radius: 18px;
    font-size: 14px;
    cursor: pointer;
  }
}
.node-branch-main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #fff;
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
    .branch-add-btns {
      position: absolute;
      margin-left: -16px;
      left: 50%;
      top: 0%;
      z-index: 10;
    }
  }
}
</style>
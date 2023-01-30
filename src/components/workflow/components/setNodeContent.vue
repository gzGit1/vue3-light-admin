<template>
  <div>
    <el-drawer
      v-model="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
     <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">节点内容设置</h4>
      </template>
      <template #default>
        <div v-if="item.nodeType == 'start'">
          <el-tabs v-model="startInfo.activeName">
            <el-tab-pane label="设置发起人" name="start">
              <h3>谁有提交权限</h3>
              <div>
                <el-checkbox v-model="startInfo.isAllPerson" label="所有人" />
              </div>
              <div
                class="select-person-con"
                :class="{ 'is-noCan-select': startInfo.isAllPerson }"
              >
                <span>请选择可提交部门或人员</span>
                <el-button size="small" :disabled="startInfo.isAllPerson"
                  >添加</el-button
                >
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-if="item.nodeType == 'approval'">
          <el-tabs v-model="approvalInfo.activeName">
            <el-tab-pane label="设置审批人" name="approval">
              <el-radio-group v-model="approvalInfo.approvalRoleType">
                <el-radio :label="1">发起人自己</el-radio>
                <el-radio :label="2">角色</el-radio>
                <el-radio :label="3">指定成员</el-radio>
                <el-radio :label="4">发起人自选</el-radio>
              </el-radio-group>
              <div
                class="select-approval-way"
                v-if="approvalInfo.approvalRoleType != 1"
              >
                <p>多人审批时审批方式选择</p>
                <el-radio-group
                  class="radio-group-block"
                  v-model="approvalInfo.approvalWay"
                >
                  <div v-for="item in approverDataType" :key="item.id">
                    <el-radio :label="item.id">{{ item.name }}</el-radio>
                  </div>
                </el-radio-group>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-if="item.nodeType == 'notifier'">
          <el-tabs v-model="notifierInfo.activeName">
            <el-tab-pane label="设置抄送人" name="notifier">
              <div>
                <el-button type="primary">添加成员</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div v-if="item.nodeType == 'condition'">
          <el-tabs v-model="conditionInfo.activeName">
            <el-tab-pane label="设置条件节点" name="condition">
              <div>
                <el-button type="primary">添加成员</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
      <template #footer>
        <div class="footer-btns">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import setNodeContent from "../composition/setNodeContent";
const {
  setStartNodeContent,
  setApprovalNodeContent,
  setNotifierNodeContent,
  setConditionNodeContent,
} = setNodeContent();
const props = defineProps(["index", "item", "list", "pList"]);
const direction = ref("rtl");
let drawer = ref(false);
const handleClose = () => {
  drawer.value = false;
};
const openDrawer = () => {
  drawer.value = true;
};
let startInfo = reactive({
  activeName: "start",
  isAllPerson: true,
});
let approvalInfo = reactive({
  activeName: "approval",
  approvalRoleType: 1,
  approvalWay: "1",
});
let approverDataType = ref([
  { id: "1", name: "依次审批" },
  { id: "2", name: "会签(需所有审批人同意)" },
  { id: "3", name: "或签(一名审批人同意或拒绝即可)" },
]);
let notifierInfo = reactive({
  activeName: "notifier",
});
let conditionInfo = reactive({
  activeName: "condition",
});
const cancelClick = () => {
  handleClose();
};
const confirmClick = () => {
  if (props.item.nodeType == "start") {
    setStartNodeContent(props.item, "所有人");
  }
  if (props.item.nodeType == "approval") {
    setApprovalNodeContent(props.item, "发起人自己");
  }
  if (props.item.nodeType == "notifier") {
    setNotifierNodeContent(props.item, "测试成员");
  }
  if (props.item.nodeType == "condition") {
    setConditionNodeContent(props.item, "测试条件内容");
  }
  handleClose();
};
defineExpose({
  handleClose,
  openDrawer,
});
</script>

<style lang="scss" scoped>
.select-person-con {
  .el-button {
    margin-left: 10px;
  }
}
.is-noCan-select {
  color: #a8abb2;
}
.select-approval-way {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  .radio-group-block {
    display: block;
  }
}

.footer-btns {
  text-align: center;
  .el-button {
    margin: 0 20px;
  }
}
</style>
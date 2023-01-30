<template>
  <div>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="流程名称">
        <el-input v-model="formInline.name" placeholder="请输入流程名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="流程名称"></el-table-column>
      <el-table-column prop="code" label="流程编码"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="240">
        <template #default="scoped">
          <el-button
            type="primary"
            size="small"
            @click="editProgress(scoped.row.id)"
            >编辑</el-button
          >
          <el-button type="primary" size="small" @click="deployProgress"
            >部署</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Page
      class="page-con"
      v-model:current="searchForm.current"
      v-model:size="searchForm.size"
      v-model:total="searchForm.total"
      @pagination="getList"
    ></Page>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import router from "@/router";
import { reactive } from "vue";

const formInline = reactive({
  name: "",
});
const searchForm = reactive({
  user: "",
  region: "",
  current: 1,
  size: 10,
  total: 100,
});
const onSubmit = () => {
  console.log("submit!");
};
const tableData = [
  {
    id: "DXHDSQ",
    name: "大型活动申请",
    content: "大型活动申请",
    createTime: "2022-08-13 08:10:09",
    code: "DXHDSQ",
  },
  {
    id: "JTJJKNXXRDSQ",
    name: "家庭经济困难学生认定申请",
    content: "家庭经济困难学生认定申请",
    createTime: "2022-08-15 08:10:09",
    code: "JTJJKNXXRDSQ",
  },
  {
    id: "XNDDSQ",
    name: "校内调动申请",
    content: "校内调动申请",
    createTime: "2022-08-17 08:10:09",
    code: "XNDDSQ",
  },
  {
    id: "SXXXSQ",
    name: "学生休学申请",
    content: "学生休学申请",
    createTime: "2022-08-19 08:10:09",
    code: "SXXXSQ",
  },
];

const editProgress = (id: string) => {
  router.push(`/manager/backstage/editProgress/${id}`);
};
const getList = () => {};
const deployProgress = () => {
  ElMessage({
    message: "部署成功!",
    type: "success",
  });
};
</script>

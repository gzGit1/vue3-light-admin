<template>
  <div class="v-form-wrapper">
    <el-scrollbar>
      <v-form-designer
        ref="formDesigner"
        :designerConfig="designerConfig"
        :bannedWidgets="bannedWidgets"
      ></v-form-designer>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
const designerConfig = {
  languageMenu: false, //是否显示语言切换菜单
  externalLink: false, //是否显示GitHub、文档等外部链接
  formTemplates: true, //是否显示表单模板
  eventCollapse: true, //是否显示组件事件属性折叠面板
  widgetNameReadonly: false, //禁止修改组件名称
  clearDesignerButton: true, //是否显示清空设计器按钮
  previewFormButton: true, //是否显示预览表单按钮
  importJsonButton: true, //是否显示导入JSON按钮
  exportJsonButton: true, //是否显示导出JSON器按钮
  exportCodeButton: false, //是否显示导出代码按钮
  generateSFCButton: false, //是否显示生成SFC按钮
  presetCssCode: "", //设计器预设CSS样式代码
  resetFormJson: false, //是否在设计器初始化时将表单内容重置为空
};
const bannedWidgets = [];
</script>
<style lang="scss" scoped>
.v-form-wrapper {
  height: 100%;
}
</style>

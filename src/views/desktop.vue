<template>
  <div class="desktop-wrapper">
    <h1 class="head-title">浏览器网站导航桌面</h1>
    <div class="link-list" ref="linkTarget">
      <div class="a-link-item" @click="addHref">
        <div class="img-con add-icon">
          <el-icon>
            <CirclePlus />
          </el-icon>
        </div>
        <p>新增</p>
      </div>
      <a class="a-link-item" @contextmenu.prevent.native="openMenu(item, $event,index)" :href="item.href"
        v-for="(item, index) in realList" :key="index" target="_blank">
        <div class="img-con text-ico" v-if="item.icoName && item.color" :style="{'backgroundColor':item.color}">
          {{item.icoName}}
        </div>
        <div class="img-con" v-else>
          <el-image style="width: 100%; height: 100%" :src="item.ico" fit="contain" />
        </div>
        <p>{{ item.name }}</p>
      </a>
    </div>
    <!-- 新增弹框 -->
    <el-dialog v-model="dialogVisible" width="740px" @close="resetForm(ruleFormRef)">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4>
            <span>{{formType == 'add' ? '新增网站' : '编辑'}}</span>
            <span class="parse-net" v-if="isParse">
              (
              <el-icon class="is-loading">
                <Loading />
              </el-icon>
              <span>网站解析中....</span>
              )
            </span>
          </h4>
        </div>
      </template>
      <el-row :gutter="10">
        <el-col :span="15">
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="90px" class="demo-ruleForm">
            <el-form-item label="网站地址" prop="href">
              <el-input placeholder="请输入网站地址" v-model="ruleForm.href" />
            </el-form-item>
            <el-form-item label="网站名称" prop="name">
              <el-input maxlength="10" placeholder="请输入网站名称" show-word-limit v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="*网址格式">
              <p style="color:#F56C6C;">https://www.baidu.com/(有的网站图标和标题会解析失败，可以手动添加)</p>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9">
          <div class="icn-change">
            <div class="ico-item-tab" @click="isHiddenSelfIco = false;">
              <div class="ico-img-con">
                <img v-if="ruleForm.ico" :src="ruleForm.ico" alt="">
              </div>
              <p>官网图标</p>
            </div>
            <div class="ico-item-tab" @click="isHiddenSelfIco = true;">
              <div :style="bgColor" class="custom-icn">
                {{ruleForm.icoName}}
              </div>
              <p>自定义图标</p>
            </div>
          </div>
          <el-form class="ico-form" v-if="isHiddenSelfIco">
            <el-form-item label="图标名称" prop="name">
              <el-input maxlength="6" placeholder="请输入图标名称" show-word-limit v-model="ruleForm.icoName" />
            </el-form-item>
            <el-form-item label="图标颜色" prop="name">
              <el-input type="color" v-model="ruleForm.color" @change="getSelectColor" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 右键菜单 -->
    <div v-if="visibleMenu" :style="menuPosition" class="link-operate">
      <div class="btn-item" @click="editLink">
        <el-icon>
          <Edit />
        </el-icon> 编辑
      </div>
      <div class="btn-item" @click="deleteLink">
        <el-icon>
          <Delete />
        </el-icon> 删除
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onBeforeMount, reactive, computed } from "vue";
import { getDataInfo } from "@/api/http";
import linkList from "./data/linkList.js";
import { setLocalStorage, getLocalStorage } from "@/utils/storage";
import { type FormInstance, type FormRules, ElMessage, ElMessageBox } from "element-plus";
import { onClickOutside } from '@vueuse/core';
import { Picture as IconPicture } from '@element-plus/icons-vue'
const ruleFormRef = ref<FormInstance>()
let list = ref(linkList);
let dialogVisible = ref(false);
let realList = ref([]);
const validateHref = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入网址！'))
  } else if (!value.includes('http') || !value.includes('https')) {
    callback(new Error("网址格式不正确!"))
  } else {
    getHrefData()
    callback()
  }
}
let menuPosition = computed(() => {
  return `left:${position.left}px;top:${position.top}px;`;
});
let position = reactive({
  left: 0,
  top: 0
});
let visibleMenu = ref(false);
interface itemLink {
  name: string,
  href: string,
  ico: string,
}
let isHiddenSelfIco = ref(false);
let rules = reactive<FormRules>({
  href: [{ validator: validateHref, trigger: "blur" }],
  name: [{ required: true, message: "请输入网站名称", trigger: "blur" },
  { min: 0, max: 10, message: '长度不能大于10', trigger: 'blur' },],
});
const ruleForm = reactive({
  name: "",
  href: "",
  ico: "",
  color: '#30cde8',
  icoName: ''
});
let bgColor = computed(() => {
  return `background-color:${ruleForm.color};`;
});
let currentLinkIndex = ref(0);
let formType = ref('add');
let isParse = ref(false);
onBeforeMount(() => {
  setLinkListData();;
});
onMounted(() => {
});

const getHrefData = async () => {
  isParse.value = true;
  let res = await getDataInfo("/url", {
    href: ruleForm.href,
  }).catch(err => {
    isParse.value = false;
  }) as any;
  if (res.code == 200 && res.data) {
    let body = res.data;
    let allTitle = body.match(/>.*?<\/title>/g);
    let titleReg = />([^<]+)<\/title>/.exec(allTitle);
    let hostHref = ruleForm.href.split('/');
    let fullHref = `${hostHref[0]}//${hostHref[2]}`;
    // 如果解析失败手动添加图标颜色和标题
    if (titleReg) {
      ruleForm.name = titleReg[1];
      ruleForm.ico = `${fullHref}/favicon.ico`;
    }
    isParse.value = false;
  }
};
const addHref = () => {
  formType.value = 'add';
  dialogVisible.value = true;
};
const setLinkListData = () => {
  let arr = getLocalStorage("linkList");
  if (!arr) {
    setLocalStorage("linkList", list.value);
  }
  realList.value = getLocalStorage("linkList");
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (formType.value == 'add') {
        realList.value.push({
          ...ruleForm
        })
      }
      if (formType.value == 'edit') {
        realList.value[currentLinkIndex.value] = ruleForm;
      }
      setLocalStorage("linkList", realList.value);
      realList.value = getLocalStorage("linkList");
      resetForm(formEl);
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  ruleForm.ico = '';
  ruleForm.icoName = '';
  ruleForm.href = '';
  ruleForm.name = '';
  isHiddenSelfIco.value = false;
  dialogVisible.value = false;
};

const openMenu = (item: itemLink, e: MouseEvent, index: number) => {
  const left = e.clientX + 15;
  const top = e.clientY;
  position.left = left;
  position.top = top;
  currentLinkIndex.value = index;
  visibleMenu.value = true;
}
let linkTarget = ref(null);
onClickOutside(linkTarget, (event) => visibleMenu.value = false);
const editLink = () => {
  formType.value = 'edit';
  Object.assign(ruleForm, realList.value[currentLinkIndex.value]);
  dialogVisible.value = true;
}
const deleteLink = () => {
  ElMessageBox.confirm(
    '删除无可恢复，只能重新添加?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      realList.value.splice(currentLinkIndex.value, 1);
      setLocalStorage("linkList", realList.value);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
const getSelectColor = () => {
  console.log(ruleForm.color);

}
</script>
<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.desktop-wrapper {
  height: 100%;
  background-image: url(../assets/images/desktop.png);
  background-size: cover;
  overflow: auto;

  .head-title {
    padding-top: vw(90);
    text-align: center;
    color: #fff;
    font-size: vw(36);
  }

  .link-list {
    margin: vh(40) auto 0;
    width: 1200px;
  }

  .a-link-item {
    margin: 18px 24px 0 0;
    margin-right: 24px;
    display: inline-block;
    text-align: center;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s;
    vertical-align: top;
    width: 70px;

    p {
      // white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 24px
    }
  }

  .a-link-item:hover {
    transform: scale(1.2);
  }

  .a-link-item:nth-child(13n) {
    margin-right: 0;
  }

  .add-icon {
    color: #409eff;
    text-align: center;
    line-height: 77px;
    cursor: pointer;

    i {
      font-size: 36px;
    }
  }

  .img-con {
    padding: vw(5);
    border-radius: 10px;
    background: #fff;
    width: 70px;
    height: 70px;
  }

  .text-ico {
    line-height: 63px;
    text-align: center;
  }
}

.link-operate {
  position: fixed;
  background: #000;
  padding: 10px;
  border-radius: 6px;
  color: #fff;
  font-size: 13px;

  .btn-item {
    padding: 6px 0;
    cursor: pointer;

    i {
      vertical-align: -2px;
    }
  }
}

.ico-form {
  margin-top: 20px;
}

.icn-change {
  display: flex;

  .ico-item-tab {
    margin-right: 20px;
    cursor: pointer;
  }

  .custom-icn,
  .ico-img-con {
    width: 66px;
    height: 66px;
    border-radius: 6px;
    text-align: center;
    line-height: 66px;
    color: #fff;
    border: 1px solid #d0d0d0;
  }

  .ico-img-con {
    overflow: hidden;


    img {
      width: 100%;
      height: 100%;
    }
  }

  .el-image {
    margin-right: 20px;
    border: 1px solid #d0d0d0;
    border-radius: 6px;
  }

  :deep .image-slot {
    text-align: center;
    // line-height: 78px;

    i {
      font-size: 24px;
    }
  }
}

.parse-net {
  margin-left: 10px;
  color: red;
}
</style>

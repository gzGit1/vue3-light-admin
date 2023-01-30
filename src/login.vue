<template>
  <div class="login-wapper">
    <div class="login-form">
      <div class="login-title">用户登录</div>
      <el-form
        :model="form"
        :rules="rules"
        label-width="120px"
        ref="ruleFormRef"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="beian-con">
      <a href="https://beian.miit.gov.cn/#/Integrated/index"
        >备案号：皖ICP备16004392号</a
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/modules/user";
import { type FormInstance,type FormRules,ElMessage } from "element-plus";
const { userLogin } = useUserStore();

const ruleFormRef = ref();
let form = reactive({
  username: "",
  password: "",
});
const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      toLogin();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const toLogin = async () => {
  router.push('/manager/backstage/processIndex');
  // return ElMessage({ type:'warning', message: "账号密码错误！" });
  // router.push("/home");
  // let res = await userLogin(form.username, form.password);
  // if (res && res.access_token) {
  //   router.push("/home");
  // }
};
</script>

<style lang="scss" scoped>
.login-wapper {
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .login-form {
    margin: 0 auto;
    padding-top: 300px;
    width: 500px;
    // :deep(.el-form-item__label) {
    //   color: #fff;
    // }
  }
  .login-title {
    margin-bottom: 60px;
    text-align: center;
    // color: #fff;
    font-size: 26px;
    font-weight: bold;
  }
}
.beian-con {
  text-align: center;
  color: #333;
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 40px;
}
</style>

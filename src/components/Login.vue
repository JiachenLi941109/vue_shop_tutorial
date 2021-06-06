<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img src="../assets/logo.png" alt="" />
      </div>

      <!--登录区域-->
      <div>
        <el-form
          ref="loginFormRef"
          :model="login"
          :rules="loginRules"
          label-width="0px"
          class="login-form"
        >
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user"
              v-model="login.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="login.password"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="loginSubmit">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
            <el-button type="primary" @click="getUser">测试</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: {
        username: 'admin',
        password: 'admin'
      },

      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度应在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度应在 3 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },

    loginSubmit () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.login)
        if (res.meta.status !== 200) {
          return this.$message.error('用户名或密码错误')
        }
        this.$message.success('登录成功')
        console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },

    async getUser () {
      const { data: res } = await this.$http.get('/user')
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px 10px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>

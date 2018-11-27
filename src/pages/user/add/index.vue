<template>
  <div class="add--wrapper both--100 flex--bcenter">
     <div class="box auto--margin">
       <h2 class="form--title">{{title}}</h2>
       <el-form :model="models" status-icon :rules="rules" ref="form" class="add--form">
        <el-form-item prop="id" class="width--100">
          <el-input  v-model="models.id" auto-complete="off" placeholder="管理员编号">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
        </el-form-item>
        <el-form-item prop="name" class="width--100">
          <el-input  v-model="models.name" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
        </el-form-item>
        <el-form-item prop="password" class="width--100">
          <el-input  v-model="models.password" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
        </el-form-item>
        <el-form-item prop="phone" class="width--100">
          <el-input  v-model="models.phone" auto-complete="off" placeholder="手机号">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
        </el-form-item>
        <el-form-item prop="idCardNo" class="width--100">
          <el-input  v-model="models.idCardNo" auto-complete="off" placeholder="管理员信息">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
        </el-form-item>
          <el-form-item prop="extraInfo" class="width--100">
          <el-input  v-model="models.extraInfo" auto-complete="off" placeholder="其他信息">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
        </el-form-item>
        
        <el-form-item  class="width--100 flex--space--around">
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
          <el-button type="normal" @click="cancel()">取消</el-button>
          <el-button type="danger" @click="reset('form')">清空</el-button>
        </el-form-item>
      </el-form>
     </div>
    </div>
</template>

<script>
import { addAdmin } from 'services'
import { get } from 'storage'
import { ADMIN_KEY } from 'storage/keys'
import { AdminTypes } from 'enum'
export default {
    created() {
      this.types = Object.keys(AdminTypes).map(item => AdminTypes[item])
    },
    data() {
      // const validateAccount = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入账号'));
      //   } else {
      //     callback();
      //   }
      // };
      return {
        models: {
          id: '',
          name: '',
          password: '',
          balance: '',
          idCardNo: '',
          info: '',
          extraInfo: ''
        },
        types: [],
        rules: {
          account: [
            { trigger: 'blur', required: true, message: '账号不能为空' }
          ],
          phone: [
            { trigger: 'blur', required: true, message: '手机号不能为空' }
          ],
          name: [
            { trigger: 'blur', required: true, message: '姓名不能为空' }
          ],
          password: [
            { trigger: 'blur', required: true, message: '密码不能为空' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const admin = get(ADMIN_KEY, window.sessionStorage)
            const { name } = admin
            addAdmin({
              ...this.models,
              creator: name,
            }).then(res => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.reset('form')
            }).catch(err => {
              this.$message.error(err.message || err || '添加失败')
            })
          } else {
            this.$message.error('提交错误')
            return false;
          }
        });
      },
      reset(val) {
        this.$refs[val].resetFields();
      },
      cancel() {
        this.$router.go(-1)
      }
    },
    computed: {
      title() {
        return '添加管理员'
      }
    }
  }
</script>

<style lang="stylus" scoped>
.box {
  width 400px
  .form--title {
    font-size 30px
    text-align center
    margin-bottom 30px
  }
}
</style>
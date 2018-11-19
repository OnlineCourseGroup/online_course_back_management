<template>
  <div class="add--wrapper both--100 flex--bcenter">
     <div class="box">
       <h2 class="form--title">{{title}}</h2>
       <el-form :model="models" status-icon :rules="rules" ref="form" class="add--form">
        <el-form-item prop="id" class="width--100"> 
          <el-input v-model="models.id" auto-complete="off" placeholder="编号">
            <i slot="prefix" class="el-input__icon el-icon-news"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone" class="width--100"> 
          <el-input v-model="models.phone" auto-complete="off" placeholder="手机号">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="width--100"> 
          <el-input type="password" v-model="models.password" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="balance" class="width--100"> 
          <el-input  v-model="models.balance" auto-complete="off" placeholder="余额">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="bankCardNo" class="width--100"> 
          <el-input  v-model="models.bankCardNo" auto-complete="off" placeholder="银行编号">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="idCardNo" class="width--100"> 
          <el-input  v-model="models.idCardNo" auto-complete="off" placeholder="身份证编号">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </el-form-item> 
        <el-form-item prop="professionNo" class="width--100"> 
          <el-input  v-model="models.professionNo" auto-complete="off" placeholder="职业编号">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </el-form-item> 
        <el-form-item prop="status" class="width--100"> 
          <el-input v-model="models.status" auto-complete="off" placeholder="状态">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="Info" class="width--100"> 
          <el-input  v-model="models.Info" auto-complete="off" placeholder="信息">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
          </el-input>
        </el-form-item>   
        <el-form-item prop="extraInfo" class="width--100"> 
          <el-input  v-model="models.extraInfo" auto-complete="off" placeholder="其他信息">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
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
import { updateManager, singleManager } from 'services'
import { AdminTypes } from 'enum'
export default {
    created() {
      const { id } = this.$route.query
      this.refreshModels(id)
      this.types = Object.keys(AdminTypes).map(item => AdminTypes[item])
    },
    data() {
      const validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      return {
        models: {
          id: '',
          password: '',
          phone: '',
          balance: '',
          bankCardNo: '',
          idCardNo: '',
          professionNo: '',
          status: '',
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
      refreshModels(id) {
        singleAdmin({id}).then(res => {
          this.models = res
        }).catch(err => {
          this.$message.error(err.message || err || '网络异常')
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateAdmin({
              ...this.models,
            }).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$refs[formName].clearValidate()
              const { id } = this.$route.query
              this.refreshModels(id)
            }).catch(
              err => {
              this.$message.error(err.message || err || '添加失败')
            })
          } else {
            this.$message.error('提交错误')
            return false;
          }
        });
      },
      reset() {
        const params = {
          ...this.models,
          password: '123456'
        }

        const ok = () => {
          updateAdmin(params).then(res => {
            this.$message({
              message: '重置成功',
              type: 'success'
            })
            const { id } = this.$route.query
            this.refreshModels(id)
          }).catch(err => {
            this.$message.error(err.message || err || '添加失败')
          })
        }
        this.$confirm('确定要重置吗？').then(_ => {
          ok();
        }).catch(_ => this.$message('取消操作'));
      },
      cancel() {
        this.$router.go(-1)
      }
    },
    computed: {
      title() {
        return '修改管理员'
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

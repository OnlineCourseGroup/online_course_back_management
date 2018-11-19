<template>
  <div class="add--wrapper both--100 flex--bcenter">
     <div class="box">
       <h2 class="form--title">{{title}}</h2>
        <el-form :model="models" status-icon :rules="rules" ref="form" class="add--form">
        <el-form-item prop="id" class="width--100"> 
          <el-input v-model="models.id" auto-complete="off" placeholder="编号">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="amount" class="width--100"> 
          <el-input v-model="models.amount" auto-complete="off" placeholder="总额">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="eranerId" class="width--100"> 
          <el-input v-model="models.eranerId" auto-complete="off" placeholder="收入编号">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item> 
        <el-form-item prop="cosumerId" class="width--100"> 
          <el-input v-model="models.cosumerId" auto-complete="off" placeholder="消费者编号">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="timestampCreateTime" class="width--100"> 
          <el-input v-model="models.timestampCreateTime" auto-complete="off" placeholder="时间戳">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item> 
        <el-form-item prop="gmtCreateTime" class="width--100"> 
          <el-input v-model="models.gmtCreateTime" auto-complete="off" placeholder="创建时间">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="status" class="width--100"> 
          <el-input v-model="models.status" auto-complete="off" placeholder="状态">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="progress" class="width--100"> 
          <el-input v-model="models.progress" auto-complete="off" placeholder="发展">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="extraInfo" class="width--100"> 
          <el-input v-model="models.extraInfo" auto-complete="off" placeholder="其他信息">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
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
import { updateOrder, singleOrder } from 'services'
export default {
    created() {
      const { id } = this.$route.query
      this.refreshModels(id)
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
          amount: '',
          eranerId: '',
          cosumerId: '',
          timestampCreateTime: '',
          progress: '',
          extraInfo: ''
        },
        types: [],
        rules: {
         userId: [
            { trigger: 'blur', required: true, message: '用户编号不能为空' }
          ],
          guiderId: [
            { trigger: 'blur', required: true, message: '向导编号不能为空' }
          ],
          totalMoney: [
            { trigger: 'blur', required: true, message: '总金额不能为空' }
          ],
        }
      };
    },
    methods: {
      refreshModels(id) {
        singleOrder({id}).then(res => {
          this.models = res
        }).catch(err => {
          this.$message.error(err.message || err || '网络异常')
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updateOrder({
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
      // reset() {
      //   const params = {
      //     ...this.models,
      //     password: '123456'
      //   }
      //   const ok = () => {
      //     updateOrder(params).then(res => {
      //       this.$message({
      //         message: '重置成功',
      //         type: 'success'
      //       })
      //       const { id } = this.$route.query
      //       this.refreshModels(id)
      //     }).catch(err => {
      //       this.$message.error(err.message || err || '添加失败')
      //     })
      //   }
      //   this.$confirm('确定要重置吗？').then(_ => {
      //     ok();
      //   }).catch(_ => this.$message('取消操作'));
      // },
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

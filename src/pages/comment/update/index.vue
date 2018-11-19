<template>
  <div class="add--wrapper both--100 flex--bcenter">
     <div class="box">
       <h2 class="form--title">{{title}}</h2>

       
       <el-form :model="models" status-icon :rules="rules" ref="form" class="add--form">
         <el-form-item prop="adminEmployeeNo" class="width--100">
          <el-input  v-model="models.adminEmployeeNo" auto-complete="off" placeholder="管理员编号">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
         </el-form-item>
         <el-form-item prop="amount" class="width--100">
          <el-input  v-model="models.amount" auto-complete="off" placeholder="数额">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
         </el-form-item>
         <el-form-item prop="courseId" class="width--100">
          <el-input  v-model="models.courseId" auto-complete="off" placeholder="课程编号">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
         </el-form-item>  
         <el-form-item prop="content" class="width--100">
          <el-input  v-model="models.content" auto-complete="off" placeholder="内容">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
         </el-form-item>
         <el-form-item prop="starLevel" class="width--100">
          <el-input  v-model="models.starLevel" auto-complete="off" placeholder="开始等级">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
         </el-form-item>
         <el-form-item prop="extraInfo" class="width--100">
          <el-input  v-model="models.extraInfo" auto-complete="off" placeholder="其他信息">
            <i slot="prefix" class="el-input__icon el-icon-info"></i>
            </el-input>
         </el-form-item>     
        <el-form-item  class="width--100 flex flex--space--around">
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
          <el-button type="normal" @click="cancel()">取消</el-button>
          <el-button type="danger" @click="reset()">重置密码</el-button>
        </el-form-item>
      </el-form>
     </div>
    </div>
</template>

<script>
import { updateComment, singleComment } from 'services'
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
          amount: '',
          ownerId: '',
          commenterId: '',
          courseId: '',
          content: '',
          starLevel: '',
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
        singleAdmin({ id }).then(res => {
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
        return '修改评论'
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

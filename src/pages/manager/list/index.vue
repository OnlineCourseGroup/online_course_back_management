<template>
  <div class="list--wrapper both--100">
     <el-table
      :data="guiders"
      height="100%"
      style="width: 100%">
      <!-- address
      id
      password
      phone
      balance
      bankCardNo
      idCardNo
      professionNo
      gmtCreateTime
      status 
      info
      extraInfo
      -->

      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="编号：">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="密码：">
            <span>{{ props.row.password }}</span>
          </el-form-item>
          <el-form-item label="手机：">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="余额：">
            <span>{{ props.row.balance | filterPassword}}</span>
          </el-form-item>
          <el-form-item label="银行号码：">
            <span>{{ props.row.bankCardNo }}</span>
          </el-form-item>
          <el-form-item label="身份证号：">
            <span>{{ props.row.idCardNo | filterMoney }}</span>
          </el-form-item>
          <el-form-item label="从业编号">
            <span>{{ props.row.professionNo | filterCarNo }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ props.row.gmtCreateTime | filterCarNo }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ props.row.status | filterCarNo }}</span>
          </el-form-item>
          <el-form-item label="信息">
            <span>{{ props.row.info | filterCarNo }}</span>
          </el-form-item>
          <el-form-item label="其他信息">
            <span>{{ props.row.extraInfo | filterCarNo }}</span>
          </el-form-item> 
        </el-form>
      </template>
    </el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
       <el-table-column
        prop="bankCardNo"
        label="银行号码："
        width="180">
      </el-table-column>
       <el-table-column
        prop="balance"
        label="余额"
        width="180">
      </el-table-column>
       <el-table-column
        prop="info"
        label="信息"
        width="180">
      </el-table-column>
     
      <el-table-column
      label="操作"
      width="230">
      <template slot-scope="scope">
        <div class="flex">
          <!-- <el-button @click="handleEdit(scope.row, 'detail')" type="text" size="small" class="text--success">查看</el-button> -->
          <el-button type="text" size="small" @click="handleEdit(scope.row, 'edit')" class="text--primary">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)" class="text--danger">删除</el-button>
        </div>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllManagers, deleteManagerById } from 'services'
import { filterMoney, filterPassword, filterCarNo } from 'tool/filters'
export default {
  name: 'adminList',
  data() {
    return {
      managers: []
    }
  },
  created() {
    this.refreshManagers()
  },
  methods: {
    refreshManagers() {
      getAllManagers().then(res => {
        this.guiders = res
      }).catch(err => {
        this.$message.error(err.message || err || '网络异常')
      })
    },
    handleEdit(row, type) {
      if (type === 'edit') {
        this.$router.push({name: 'updatea', query: { id: row.id }})
      }
    },
    handleDelete(row) {
      const ok = () => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        deleteManagerById({
          id: row.id
        }).then(res => {
          this.refreshManagers()
        }).catch(err => {
          this.$message.error(err.message || err || '删除失败')
        })
      }
      this.$confirm('确定要删除吗？')
      .then(_ => {
        ok();
      })
      .catch(_ => this.$message('取消操作'));
    }
  },
  filters: {
    filterPassword,
    filterMoney,
    filterCarNo,
  }
}
</script>

<style lang="stylus" scoped>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

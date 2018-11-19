<template>
  <div class="list--wrapper both--100">
    <el-table
      :data="orders"
      height="100%"
      style="width: 100%">
     <el-table-column type="expand">
       <template slot-scope="props">
         <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="编号：">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="总额：">
            <span>{{ props.row.amount }}</span>
          </el-form-item>
          <el-form-item label="收款编号：">
            <span>{{ props.row.eranerId }}</span>
          </el-form-item>
          <el-form-item label="课程编号：">
            <span>{{ props.row.courseId }}</span>
          </el-form-item>
          <el-form-item label="时间戳：">
            <span>{{ props.row.timestampCreateTime }}</span>
          </el-form-item>
          <el-form-item label="创建时间：">
            <span>{{ props.row.gmtCreateTime }}</span>
          </el-form-item>
          <el-form-item label="状态：">
            <span>{{ props.row.status }}</span>
          </el-form-item>
          <el-form-item label="发展：">
            <span>{{ props.row.progress }}</span>
          </el-form-item>
          <el-form-item label="其他信息：">
            <span>{{ props.row.extraInfo }}</span>
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
        prop="amount"
        label="总额"
        width="180">
      </el-table-column>
      <el-table-column
        prop="timestampCreateTime"
        label="订单时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column> 
      <el-table-column
        prop="extraInfo"
        label="其他信息">
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
import { getAllOrders, deleteOrderById } from 'services'
import { filterMoney } from 'tool/filters'
export default {
  name: 'OrderList',
  data() {
    return {
      orders: []
    }
  },
  created() {
    this.refreshOrders()
  },
  methods: {
    refreshOrders() {
      getAllOrders().then(res => {
        this.orders = res
      }).catch(err => {
        this.$message.error(err.message || err || '网络异常')
      })
    },
    handleEdit(row, type) {
      if (type === 'edit') {
        this.$router.push({name: 'updateo', query: { id: row.id }})
      }
    },
    handleDelete(row) {
      const ok = () => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
        deleteOrderById({
          id: row.id
        }).then(res => {
          this.refreshOrders()
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
    filterMoney,
  },
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

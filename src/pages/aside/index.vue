<template>
  <el-menu 
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="activeRoute" 
    class="el-menu-vertical-demo"  
    :collapse="slide.isCollapse" 
    :router="true" 
    :show-timeout="100" 
    :hide-timeout="100"
  >
    <template v-for="item in list">
      <el-menu-item v-if="!item.children" :key="item.name" :index="item.name" >
         <i :class="'el-icon-'+item.icon"></i>
         <span slot="title">{{item.text}}</span>
      </el-menu-item>
      <el-submenu v-else :key="item.name" :index="item.name">
        <template slot="title">
          <i :class="'el-icon-'+item.icon"></i>
          <span slot="title">{{item.text}}</span>
        </template>
          <el-menu-item v-for="(child) in item.children" :key="child.name" :index="child.name" >
            {{child.text}}
          </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
import { mapState } from "vuex";
import { get } from "storage";
import { ADMIN_KEY } from "storage/keys";
import { AdminTypes } from "enum";
export default {
  data() {
    return {
      sliderList: [
        {
          name: "dashboard",
          text: "首页",
          path: "dashboard",
          icon: "menu"
        },
        {
          name: "admin",
          text: "管理员模块",
          icon: "news",
          children: [
            {
              name: "alist",
              text: "管理员列表",
              path: "alist"
            },
            {
              name: "adda",
              text: "新添管理员",
              path: "adda"
            }
            //  {
            //   name: 'updatea',
            //   text: '修改管理员',
            //   path: 'updatea',
            // },
          ]
        },
        {
          name: "manager",
          text: "讲师模块",
          icon: "service",
          children: [
            {
              name: "mlist",
              text: "讲师列表",
              path: "mlist"
            },
            {
              name: "addm",
              text: "新添讲师",
              path: "addm"
            }
          ]
        },
        {
          name: "order",
          text: "订单模块",
          icon: "tickets",
          children: [
            {
              name: "olist",
              text: "订单列表",
              path: "olist"
            },
            {
              name: "addo",
              text: "新添订单",
              path: "addo"
            }
          ]
        },
        {
          name: "user",
          text: "用户模块",
          icon: "share",
          children: [
            {
              name: "ulist",
              text: "用户列表",
              path: "ulist"
            },
            {
              name: "addu",
              text: "新建用户",
              path: "addu"
            } 
          ]
        },
        {
          name: "subject",
          text: "题目模块",
          icon: "date",
          children: [
            {
              name: "slist",
              text: "题目列表",
              path: "slist"
            },
            {
              name: "adds",
              text: "新添讲师",
              path: "adds"
            }
          ]
        },
        {
          name: "commenet",
          text: "评论模块",
          icon: "message",
          children: [
            {
              name: "clist",
              text: "评论列表",
              path: "clist"
            },
            {
              name: "addc",
              text: "新建评论",
              path: "addc"
            }          
          ]
        },
      ]
    };
  },
  computed: {
    activeRoute() {
      return this.$route.name;
    },
    ...mapState(["slide"]),
    list() {
      const admin = get(ADMIN_KEY, window.sessionStorage);
      const { type } = admin;
      if (type === AdminTypes.NORMAL.value)
        return this.sliderList.filter((item, index) => item.name !== "admin");
      else return this.sliderList;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/colors.styl'

.el-menu-vertical-demo {
  height: 100%;
  // .element-item 
  color: white;
  border: none;
  background-color: themecolor;
}
</style>

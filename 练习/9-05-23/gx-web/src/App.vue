<template>
  <div id="app">
    
    <Table :headList="headList" :dataList="dataList" @goApp="goAppFn"/>
    {{goApp}}
    <br />
    <Button type="success" size="md">
      <Icon type="icon_fabu" :size="18" color="#fff" />
      发布
    </Button>

  </div>
</template>

<script>
import Icon from "./components/Icon"
import Button from "./components/Button"
import Table from "./components/Table"
export default {
  name: 'app',
  components: {
    Icon,
    Button,
    Table
  },
  methods: {
    goAppFn(item){
      this.goApp = item;
    }
  },
  data(){
    return {
      goApp: '',
      headList: [
        {
            key: 'id',
            title: 'ID'
        },
        {
            key: 'name',
            title: 'Username'
        },
        {
            key: 'email',
            title: 'E-mail'
        },
        {
            key: 'phone',
            title: 'Phone'
        }
    ],
    dataList: [
        {
            id: '001',
            name: '宫鑫',
            email: '1462807687@qq.com',
            phone: '183****8916'
        },
        {
            id: '002',
            name: '小美',
            email: '98385945@qq.com',
            phone: '156****3246'
        }
    ],
    }
  }
}
</script>

<style lang="less">

</style>

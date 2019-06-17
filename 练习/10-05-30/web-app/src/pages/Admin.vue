<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider :collapsed-width="78" >
                <Menu theme="dark" width="auto" accordion>
                    <Submenu 
                        v-for="item in menuList"
                        :name="item.menuId"
                        :key="item.menuId"
                        >
                        <template slot="title">
                            <Icon type="ios-paper" />
                            {{item.name}}
                        </template>
                        <MenuItem 
                            v-for="child in item.children"
                            :name="child.menuId"
                            :key="child.menuId"
                            >
                            <div @click="goto(child.url)">
                                {{child.name}}
                            </div>
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <router-view></router-view>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import getMenuList from '../api/getMenuList'
    import deepMenu from '../urils/deepMenu'
    export default {
        data(){
            return {
                menu: []
            }
        },
        beforeCreate(){
            getMenuList().then((response)=>{
                this.menu = response.data;
            })
        },
        computed: {
            menuList() {
                return deepMenu(this.menu, 0);
            }
        },
        methods: {
            goto(url){
                this.$router.push({
                    path: `/${url}`
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.layout-con{
    height: 100%;
    width: 100%;
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}

</style>
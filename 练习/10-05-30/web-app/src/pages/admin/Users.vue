<template>
    <div>
        <div class="header">
            <Input 
                clearable 
                class="search"
                placeholder="请输入管理员名称"
                search
                @on-search="headleSearch"
                />
            <Button @click="modalShow = true, modalTitle='添加管理员'">添加管理员</Button>
        </div>

        <Table 
            :loading="loading"
            :columns="userHead" 
            :data="userList"
            @on-selection-change="handleSelectionChange"
        >
        </Table>

        <div class="pager">
            <Button type="error" @click="deleteMoreItem">批量删除</Button>
            <Page 
                :total="totalCount" 
                :current.sync = "currPage"
                show-sizer
                :page-size="pageSize"
                :page-size-opts="[2, 5, 10, 20]"
                @on-page-size-change="handlePageSizeChange"
                />
        </div>
        <Modal
            v-model="modalShow"
            :title="modalTitle"
            @on-cancel="modalClose"
            @on-ok="modalSubmit"
        >
            <Form
                :label-width="60"
                label-position="left"
                :rules="modalRules"
                :model="modalForm"
                ref="modalForm"
            >
                <FormItem 
                    label="账号"
                    prop="username"
                >
                    <Input placeholder="username" v-model="modalForm.username" /> 
                </FormItem>

                <FormItem
                    label="密码"
                    prop="password"
                >
                    <Input type="password" placeholder="password" v-model="modalForm.password"/>
                </FormItem>

                <FormItem
                    label="邮箱"
                    prop="email"
                >
                    <Input placeholder="email" v-model="modalForm.email"/>
                </FormItem>

                <FormItem
                    label="手机"
                    prop="mobile"
                >
                    <Input placeholder="mobile" v-model="modalForm.mobile"/>
                </FormItem>

                <FormItem
                    label="状态"
                >
                    <i-switch 
                        size="large"
                        :true-value="1"
                        :false-value="0"
                        v-model="modalForm.status"
                    >
                        <span slot="open">启用</span>
                        <span slot="close">锁定</span>
                    </i-switch>
                </FormItem>

            </Form>
        </Modal>
    </div>
</template>

<script>
    import getUserList from '../../api/getUserList'
    import userToolsBtn from '../../components/UserTools.vue'
    import validator from 'validator'

    import addUser from '../../api/addUser'
    import updateUser from '../../api/updateUser'
    import deleteUser from '../../api/deleteUser'

    export default {
        data(){
            return {
                // 选中 的项目
                selectedTableItem: [],
                // 加载状态
                loading: false,
                // 表体数据
                userList: [],
                // 表头数据
                userHead: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed: 'left',
                    },
                    {
                        title: 'ID',
                        key: 'userId',
                        align: 'center',
                        minWidth: 100,
                    },
                    {
                        title: '姓名',
                        key: 'username',
                        align: 'center',
                        minWidth: 100,
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        align: 'center',
                        minWidth: 160,
                    },
                    {
                        title: '手机号',
                        key: 'mobile',
                        align: 'center',
                        minWidth: 160,
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center',
                        minWidth: 160,
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 140,
                        fixed: 'right',
                        // 根据 render函数来生成表体行里操作列的数据
                        render: (h, params) => h(userToolsBtn, {
                            on: {
                                edit: (ev)=> {
                                    this.modalTitle = '编辑管理员';
                                    this.modalShow = true;
                                    const {username, password, email, mobile, status, userId, roleIdList} = params.row;
                                    this.modalForm = {
                                        username, 
                                        password: '', 
                                        email, 
                                        mobile, 
                                        status, 
                                        userId, 
                                        roleIdList
                                    }
                                },
                                del: (ev)=> {
                                    const userId = params.row.userId

                                    this.$Modal.confirm({
                                        title: '删除',
                                        content: '<p>您确认要删除本用户吗？</p>',
                                        onOk: () => {
                                            deleteUser([userId]).then((response)=>{
                                                if(response.data.code === 0){
                                                    this.$Message.success('删除成功');
                                                    this.getList();
                                                }else{
                                                    this.$Message.error('删除失败：'+ response.data.msg);
                                                }
                                            })
                                        },
                                        onCancel: () => {
                                            this.$Message.info('取消删除');
                                        }
                                    });

                                    
                                }
                            }
                        })
                    }
                ],
                // 当前页码
                currPage: 1,
                // 每页多少条
                pageSize: 10,
                // 总条数
                totalCount: 1,
                // 总页数
                totalPage: 1,
                // 搜索的用户名
                username: '',
                
                // 模态框是否显示
                modalShow: false,
                // 模态框标题
                modalTitle: '添加管理员',
                // 模态框 表单
                modalForm: {
                    userId: 0,
                    username: '',
                    password: '',
                    email: '',
                    mobile: '',
                    status: 1,
                    roleIdList: []
                },
                // 模态框表单的数据验证
                modalRules: {
                    username: [
                        {required: true, message: '账号不能为空'}
                    ],
                    email: [
                        {required: true, message: '邮箱不能为空'},
                        {type: 'email', message: '邮箱格式不正确'},
                    ],
                    mobile: [
                        {required: true, message: '手机号不能为空'},
                        {
                            validator: (rule, value, callback)=>{
                                /**
                                 * value            用户输入的值
                                 * callback(new Error('手机号码格式不正确'))   检测失败，显示 error的内容
                                 * callback()       检测成功
                                 */
                                /**
                                 * 使用 validator配合使用
                                 * validator.isMobilePhone(value, 'zh-CN')
                                 */
                                if(validator.isMobilePhone(value, 'zh-CN')){
                                    callback()
                                }else{
                                    callback(new Error('手机号码格式不正确'))
                                }
                            },
                        }
                    ]
                },
            }
        },
        created(){
            this.getList();
        },
        methods:{
            /**
             * 处理搜索
             */
            headleSearch(e){
                this.username = e;
                this.getList();
            },
            /**
             * 处理页码改变
             */
            handlePageSizeChange(e){
                this.pageSize = e;
                this.getList();
            },
            /**
             * 获取用户列表
             */
            getList(){
                this.loading = true;
                getUserList({
                    page: this.currPage,
                    limit: this.pageSize,
                    sidx: 'username',
                    order: 'desc',
                    username: this.username
                }).then((response)=>{
                    const {page, msg, code} = response.data;
                    this.loading = false;
                    if(code === 0){
                        const {list, currPage, pageSize, totalCount, totalPage} = page;
                        this.userList = list;
                        this.currPage = currPage;
                        this.pageSize = pageSize;
                        this.totalCount = totalCount;
                        this.totalPage = totalPage;
                    }else {
                        this.$Message.error(msg);
                    }
                })
            },
            /**
             * 模态框 取消/关闭按钮 点击事件
             * 关闭对话框
             */
            modalClose(){
                this.$refs.modalForm.resetFields(); 
            },
            /**
             * 模态框 确认按钮点击事件
             * 提交数据
             */
            modalSubmit(){
                if(this.modalTitle == '添加管理员'){
                    this.$refs.modalForm.validate((result)=>{
                        if(result){
                            addUser({
                                ...this.modalForm
                            }).then((response)=>{
                                if(response.data.code === 0){
                                    this.$Message.success('添加成功');
                                    this.getList();
                                }else{
                                    this.$Message.error('添加失败：'+response.data.msg)
                                }
                            })
                        }
                    })
                    
                }else{
                    this.$refs.modalForm.validate((result)=>{
                        if(result){
                            updateUser({
                                ...this.modalForm
                            }).then((response)=>{
                                if(response.data.code === 0){
                                    this.$Message.success('修改成功');
                                    this.getList();
                                }
                            })
                        }
                    })
                }
            },
            /**
             * 处理表格多选
             */
            handleSelectionChange(selection){
                const arr = selection.map((item, index, arr)=>{
                    return item.userId;
                })
                this.selectedTableItem = arr;
            },
            /**
             * 批量删除
             */
            deleteMoreItem(){
                if(this.selectedTableItem.length > 0){
                    this.$Modal.confirm({
                        title: '删除',
                        content: '<p>您确认要删除选中的用户吗？</p>',
                        onOk: () => {
                            deleteUser([
                                ...this.selectedTableItem
                            ]).then((response)=>{
                                if(response.data.code === 0){
                                    this.$Message.success('删除成功');
                                    this.getList();
                                }else{
                                    this.$Message.error('删除失败：'+ response.data.msg);
                                }
                            })
                        },
                        onCancel: () => {
                            this.$Message.info('取消删除');
                        }
                    });
                }else{
                    this.$Message.error('未选中数据');
                }
                
            }
        },
        watch:{
            currPage(){
                this.getList();
            }
        }

    }
</script>

<style lang="less" scoped>

.header {
    padding: 15px 0;
    .search{
        width: 200px;
        margin-right: 15px;
    }
}
.pager {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
}
</style>
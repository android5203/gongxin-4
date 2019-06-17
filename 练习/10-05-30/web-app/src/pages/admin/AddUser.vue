<template>
    <Form 
        :model="userInfo"
        :label-width="100"
        label-position="left"
        :rules="rulesInfo"
        ref="addUserForm"
    >
        <FormItem
            label="username"
            prop="username"
        >
            <Input v-model="userInfo.username" />
        </FormItem>

        <FormItem
            label="password"
            prop="password"
        >
            <Input type="password" v-model="userInfo.password"/>
        </FormItem>

        <FormItem
            label="email"
            prop="email"
        >
            <Input v-model="userInfo.email"/>
        </FormItem>

        <FormItem
            label="mobile"
            prop="mobile"
        >
            <Input v-model="userInfo.mobile"/>
        </FormItem>

        <FormItem>
            <Button @click="add">添加</Button>
            &nbsp;&nbsp;&nbsp;
            <Button to="/sys/user">取消</Button>
        </FormItem>

    </Form>
</template>

<script>
    import addUser from '../../api/addUser'
    export default {
        data(){
            return {
                userInfo: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                rulesInfo: {
                    username: [
                        {required: true, message: '请输入管理员名称'}
                    ],
                    password: [
                        {required: true, message: '请输入密码'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱'},
                        {type: 'email', message: '邮箱格式不对'}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号码'},
                        {min: 5,max: 12, message: '手机号码格式不对'}
                    ]
                }
            }
        },
        methods: {
            add(){
                this.$refs['addUserForm'].validate((val)=>{
                    if(val) {
                        addUser({
                            userId: 0,
                            ...this.userInfo,
                            status: 1,
                            roleIdList: []
                        }).then((response)=>{
                            const {msg, code} = response.data;
                            if(code === 0){
                                this.$Message.success(msg)
                                this.$router.push({
                                    path: '/sys/user'
                                })
                            }else{
                                this.$Message.error(msg)
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
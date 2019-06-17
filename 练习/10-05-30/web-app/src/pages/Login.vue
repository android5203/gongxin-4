<template>
    <div class="login">
        <div class="loginForm">
            <h2>Login</h2>
            <Form 
                :model="userInfo" 
                :label-width="80"
                label-position="left"
                :rules="rulesForm"
                ref="loginForm"
                >
                
                <FormItem 
                    label="username"
                    prop="username"
                >
                    <Input placeholder="请输入用户名" v-model="userInfo.username"/>
                </FormItem>

                <FormItem
                    label="password"
                    prop="password"
                >
                    <Input placeholder="请输入密码" type="password" v-model="userInfo.password"/>
                </FormItem>

                <FormItem
                    label="captcha"
                    prop="captcha"
                >
                    <Input placeholder="验证码" class="captcha" v-model="userInfo.captcha"/>
                    <img 
                        :src="captchaUrl" 
                        alt="验证码" 
                        class="captchaImg" 
                        @click="updateCaptcha"
                        >
                </FormItem>

                <FormItem>
                    <Button @click="loginSubmit" long>Login</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import uuid from 'uuid'
    import login from '../api/login'
    export default {
        data(){
            return {
                userInfo: {
                    username: '',
                    password: '',
                    captcha: ''
                },
                uid: uuid(),
                rulesForm: {
                    username: [
                        {required: true, message: '用户名不能为空'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空'}
                    ],
                    captcha: [
                        {required: true, message: '验证码不能为空'}
                    ]
                }
            }
        },
        computed:{
            captchaUrl(){
                return "/api/captcha.jpg?uuid="+ this.uid;
            }
        },
        methods:{
            updateCaptcha(){
                this.uid = uuid();
            },
            loginSubmit(){
                this.$refs.loginForm.validate((result)=>{
                    if(result){
                        login({
                            ...this.userInfo,
                            uuid: this.uid
                        }).then((response)=>{
                            const { msg, code, token } = response.data;
                            if(code === 0){
                                localStorage.setItem('token', token);
                                this.$router.push('/sys')
                            }else{
                                this.$Message.error('登陆失败：' + msg)
                                this.uid = uuid();
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #f4f6f9;
    .loginForm {
        width: 400px;
        height: 300px;
        background-color: #fff;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        box-shadow: 0 0 5px 5px rgba(0,0,0,.05);
        border-radius: 5px;
        padding: 20px;
        box-sizing: border-box;
        h2{
            font-size: 24px;
            text-align: center;
            line-height: 30px;
            padding-bottom: 20px;
            color: #343434;
        }
        .captcha {
            width: 120px;
        }
        .captchaImg {
            height: 32px;
            float: right;
        }
    }
}
</style>
<template>
    <div class="notFind">
        <div class="winNot">
            <h1>404</h1>
            <h2><Icon type="ios-paw" /> NOT FOUND</h2>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.notFind{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(54, 144, 59);
    .winNot {
        width: 500px;
        height: 350px;
        background-color: rgb(62, 163, 87);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        box-shadow: 0 0 5px 5px rgba(0,0,0,.1);
        border-radius: 5px;
        color: #fff;
        text-align: center;
        h1{
            font-size: 80px;
            font-weight: normal;
            line-height: 100px;
            margin-top: 100px;
        }
        h2{
            font-size: 24px;
            font-weight: normal;
        }
    }
}
</style>
<template>
    <table class="default md">
        <thead>
            <tr>
                <th v-for="item in iHeadList">{{item.title}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in iDataList" @click="goApp(item)">
                <td v-for="it in iHeadList">{{item[it.key]}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        data(){
            return {
                iHeadList: [...this.headList],
                iDataList: [...this.dataList]
            }
        },
        watch: {
            headList: {
                header(val){
                    this.iHeadList= [...this.headList]
                },
                deep: true
            },
            dataList: {
                header(val){
                    this.iDataList= [...this.dataList]
                },
                deep: true
            },
        },
        methods: {
            goApp(item){
                this.$emit('goApp', item);
            }
        },
        props: {
            headList: Array,
            dataList: Array,
            row: {
                type: String,
                default: 'default'
            },
            size: {
                type: String,
                default: 'md'
            }
        }
    }
</script>

<style lang="less" scoped>
@default: #fff;
@success: rgb(190, 255, 188);
@info: rgb(187, 191, 255);
@error: rgba(252, 196, 196, 0.87);
@warning: rgb(255, 223, 187);

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    tr {
        border: 1px solid #ccc;
        border-left: 0;
        border-right: 0;
        &:hover {
            background-color: darken(@default, 5%);
        }
    }
    td,
    th {
        padding: 10px 10px 10px 20px;
        box-sizing: border-box;
        font-size: 14px;
        text-align: left;
    }
    &.xs {
        td,
        th {
            padding: 3px 3px 3px 10px;
            font-size: 12px;
        }
    }
    &.sm {
        td,
        th {
            padding: 6px 6px 6px 15px;
            font-size: 12px;
        }
    }
    &.md {
        td,
        th {
            padding: 10px 10px 10px 20px;
            font-size: 14px;
        }
    }
    &.lg {
        td,
        th {
            padding: 15px 15px 15px 20px;
            font-size: 16px;
        }
    }
    &.default {
        tr:hover{
            background-color: darken(@default, 5%);
        }
    }
    &.success {
        tr:hover{
            background-color: @success;
        }
    }
    &.info {
        tr:hover{
            background-color: @info;
        }
    }
    &.error {
        tr:hover{
            background-color: @error;
        }
    }
    &.warning {
        tr:hover{
            background-color: @warning;
        }
    }
}

</style>
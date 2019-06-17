<template>
    <div>
        <Button @click="$emit('edit')" size="small" type="info">编辑</Button>
        <Button @click="$emit('del')" size="small" type="warning">删除</Button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
Button{
    margin: 0 3px;
}
</style>
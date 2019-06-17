<template>
        <button :class="['gx-btn', type, size]">
            <slot>按钮</slot>
        </button>
</template>

<script>

    export default {
        props: {
            type: {
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
@success: rgb(80, 197, 76);
@info: rgb(81, 93, 255);
@error: rgb(250, 90, 90);
@warning: rgb(255, 157, 45);

.border(@color){
    border: 1px solid @color;
}
.gx-btn {
    padding: 3px 10px;
    font-size: 16px;
    .border(#ccc);
    background-color: @default;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
    transition: all .3s;
    &.xs {
        padding: 1px 5px;
        font-size: 12px;
    }
    &.sm {
        padding: 2px 10px;
        font-size: 14px;
    }
    &.md {
        padding: 3px 15px;
        font-size: 16px;
    }
    &.lg {
        padding: 5px 20px;
        font-size: 18px;
    }
    &.success {
        background-color: @success;
        .border(@success);
        color: #fff;
        &:hover {
            background-color: darken(@success, 10%);
        }
    }
    &.info {
        background-color: @info;
        .border(@info);
        color: #fff;
        &:hover {
            background-color: darken(@info, 10%);
        }
    }
    &.error {
        background-color: @error;
        .border(@error);
        color: #fff;
        &:hover {
            background-color: darken(@error, 10%);
        }
    }
    &.warning {
        background-color: @warning;
        .border(@warning);
        color: #fff;
        &:hover {
            background-color: darken(@warning, 10%);
        }
    }
    &:hover {
        background-color: darken(@default, 10%);
    }
}
</style>
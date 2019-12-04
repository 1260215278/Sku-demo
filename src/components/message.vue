<template>
    <div v-show="isShow" class="wrap flex_content">
        <div class="content flex_content"> 
            测试js组件
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isShow:false
        }
    },
    created(){
        // console.log('我是内部的this',this)
        this.setTime()
    },
    methods:{
        setTime(){
            var _this=this
            setTimeout(() => {
            //   this.isShow=false    
            //   这里更推荐把他从DOM 里面移除
            _this.$destroy(true)
            _this.$el.parentNode.removeChild(this.$el)
            }, 3000);
        }
    }
}
</script>
<style  scoped>
.wrap{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, .5);
}
.content{
    height: 200px;
    width: 400px;
    background-color: white;
}
.flex_content{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
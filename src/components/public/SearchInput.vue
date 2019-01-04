<template>
    <div>
       <form >
        <van-search   v-model="keyword" :background="'#fff'" :placeholder="place"   @search="handleSearchKeyword" />
       </form>
    </div>
</template>
<script>
export default {
    data(){
      return{
           keyword:''
      }
    },
    props:{
       place:{
           type:String,
           defualt:'请输入项目名称aa'
       }
    },
    methods:{
        handleSearchKeyword(){
            this.$emit('handleSearchKeyword',this.keyword)
        }
    },
}
</script>
<style>

</style>
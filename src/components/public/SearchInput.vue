<template>
    <div>
        <input class="component-input" :type="type" :style="{fontSize:fontSize + 'rem',width:width,background:background,height:'32px'}" 
        :placeholder="placeholder" @change="handleSearchKeyword" v-model="Searchvalue">
    </div>
</template>
<script>
export default {
    data(){
      return{
           fontSize: 0.8,
        //    background:'#F0F0F0',
           Searchvalue:''
      }
    },
    methods:{
        handleSearchKeyword(val){
            this.$emit('handleSearchKeyword',this.Searchvalue)
        }
    },
    props:{
       type:{
           type:String,
           default:''
       },
       width:{
           type:String,
           default:'' 
       },
       placeholder:{
          type:String,
           default:''  
       },
       background:{
          type:String,
           default:'#F0F0F0'  
       },
    }
}
</script>
<style>
.component-input{
    border:none;
    border-radius: 5px;
    padding: 0 8px;
    outline: none;
}
.component-input::placeholder{
  color: #909090;
  text-align: center !important;
}
</style>
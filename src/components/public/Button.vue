<template>
    <div>
        <x-button :disabled="showLoading" :show-loading="showLoading" :style="{color:color,fontSize:fontSize + 'rem',width:width,background:background,height:height}" @click.native="handleClick">{{text}}</x-button>
    </div>
</template>
<script>
export default {
    data(){
      return{
           
      }
    },
    methods:{
        handleClick(){
            this.$emit('handleClick','')
        }
    },
    props:{
       type:{
           type:String,
           default:''
       },
       fontSize:{
           type:String,
           default:'0.8'
       },
       width:{
           type:String,
           default:'' 
       },
       height:{
           type:String,
           default:'' 
       },
       background:{
           type:String,
           default:'' 
       },
       color:{
           type:String,
           default:'' 
       },  
       text:{
          type:String,
          default:'确定'
       },
       showLoading:{
           type:Boolean,
           default:false
       }
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
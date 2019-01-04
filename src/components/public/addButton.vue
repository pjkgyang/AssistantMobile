<template>
 <div>
     <div class="add_button" :style="{bottom:bottom}">
      <mu-button fab  color="primary" class="btnBlue" @click="handleAdd">
        <mu-icon value="add"></mu-icon>
      </mu-button>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   props:{
     bottom:{
       type:String,
       default:'14vw'
     }
   },
   methods:{
       handleAdd(){
           this.$emit('handleAdd','')
       }
   },
   components: {}
 }
</script>

<style  scoped>
.add_button {
  position: fixed;
  right:2vw;
  font-size:1rem;
}
</style>

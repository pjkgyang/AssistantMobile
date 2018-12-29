<template>
 <div>
     <div class="add_button" >
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
  bottom: 14vw;
  right:2vw;
  font-size:1rem;
}
</style>

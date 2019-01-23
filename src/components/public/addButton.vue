<template>
 <div >
     <div class="add_button" >
      <mu-button fab id="moveDiv" color="primary" class="btnBlue" @click="handleAdd" :style="{bottom:bottom}"
        @mousedown="down" @touchstart="down"
        @mousemove="move" @touchmove="move"
        @mouseup="end" @touchend="end"
      >
        <mu-icon value="add"></mu-icon>
      </mu-button>
    </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
       flags: false,
       position: { x: 0, y: 0 },
       nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
     }
   },
   props:{
     bottom:{
       type:String,
       default:'14vw'
     }
   },
   mounted(){
   
   },
   methods:{
       handleAdd(){
           this.$emit('handleAdd','')
       },
       down(){
          this.flags = true;
          var touch;
          if(event.touches){
              touch = event.touches[0];
          }else {
              touch = event;
          }
          this.position.x = touch.clientX;
          this.position.y = touch.clientY;
          this.dx = moveDiv.offsetLeft;
          this.dy = moveDiv.offsetTop;


      },
      move(){
        if(this.flags){
          var touch ;
          if(event.touches){
              touch = event.touches[0];
          }else {
              touch = event;
          }
          this.nx = touch.clientX - this.position.x;
          this.ny = touch.clientY - this.position.y;
          this.xPum = this.dx+this.nx;
          this.yPum = this.dy+this.ny;


         if(this.xPum <= 0 && this.yPum >0 && this.yPum < document.body.scrollHeight - 56){
            moveDiv.style.left = 0;
            moveDiv.style.top = this.yPum +"px";
         }else if(this.xPum > document.body.scrollWidth - 56 && this.yPum > 0 && this.yPum < document.body.scrollHeight-56){
            moveDiv.style.left = (document.body.scrollWidth - 56) +"px"; 
            moveDiv.style.top = this.yPum + 'px';
         }else if(this.yPum <= 0 && this.xPum > 0 && this.xPum < document.body.scrollWidth - 56){
            moveDiv.style.left = this.xPum+"px";
            moveDiv.style.top = 0;
         }else if(this.yPum > document.body.scrollHeight - 56 && this.xPum > 0 && this.xPum < document.body.scrollWidth-56){
            moveDiv.style.left = this.xPum+"px";
            moveDiv.style.top = (document.body.scrollHeight - 56) + "px";
         }else if(this.xPum <= 0 && this.yPum <= 0){
            moveDiv.style.left = 0;
            moveDiv.style.top = 0;
         }else if(this.xPum > document.body.scrollWidth-56 && this.yPum <= 0){
            moveDiv.style.left = (document.body.scrollWidth-56)+'px';
            moveDiv.style.top = 0;
         }else if(this.xPum <= 0 && this.yPum > document.body.scrollHeight -  56){
            moveDiv.style.left = 0;
            moveDiv.style.top = (document.body.scrollHeight -  56)+ 'px';
         }else if(this.xPum > document.body.scrollWidth - 56 && this.yPum > document.body.scrollHeight - 56){
           moveDiv.style.left = (document.body.scrollWidth - 56) + "px";
            moveDiv.style.top = (document.body.scrollHeight - 56) + 'px';
         }else{
            moveDiv.style.left = this.xPum+"px";
            moveDiv.style.top = this.yPum +"px";
         }

        // //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        //   document.addEventListener("touchmove",function(event){
        //    // 判断默认行为是否可以被禁用
        //       if (event.cancelable) {
        //           // 判断默认行为是否已经被禁用
        //           if (!event.defaultPrevented) {
        //               event.preventDefault();
        //           }
        //       }
        //   },{ passive: false });
        }
      },
  //鼠标释放时候的函数
    end(){
      this.flags = false;
    },
   },
   components: {}
 }
</script>

<style  scoped>
.add_button {
  font-size:1rem;
  
}
 .add_button button{
    position: fixed;
    right:2vw;
  z-index:100002;
  }
</style>

<template>
    <div class="uploadImg">
        <!--照片区域-->
        <div v-for="(urls, index) in imgs " class="imgs">
            <div class="img-del"  v-on:click="deleteImg(index)">×</div>
            <div class="img-area" @click="handleCheckimgs(index)">
                <img :src="urls" />
            </div>
        </div>
        <div class="img-upload" >
             <van-uploader :after-read="onRead" accept="image/*" multiple>
                 <van-icon name="photograph" color="#fff" size="1.5em"/>
             </van-uploader>
        </div>
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
      imgs: [],
    };
  },
  methods: {
    onRead(file){
       if(!!file.length){
           file.forEach(ele=>{
             this.imgs.push(ele.content);    
           })
       }else{
            this.imgs.push(file.content);
       }
       this.$emit(this.imgs);
    },
    handleCheckimgs(index){
       ImagePreview({images:this.imgs,startPosition:index});
    },
    //删除图片
    deleteImg: function(index) {
      this.imgs.splice(index, 1);
    },
  },
  mounted() {},
  created() {},
  components: {}
};
</script>

<style lang="less" scoped>
@import '../../index.less';
.uploadImg {
  .flex(@col:center);
  flex-wrap: wrap;
  .imgs {
    margin:0 0.6rem 0 0;
    border: 1px solid #ccc;
    position: relative;
    .img-area{
      width: 16vw;
      height:16vw;
      img {
        display:block;
        width: 100%;
        height: 100%;
       }
    }
    .img-del{
        text-align: right; 
        position: absolute;
        right: 0;
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        background: #f00;
        color: #fff;
        border-radius: 50px;
    }
  }
    .img-upload{
         width:  16vw;
         height:  16vw; 
         background-color: rgb(185, 184, 184); 
         border:1px solid rgb(185, 184, 184); 
         float: left;  
        //  margin:0 0 0.8rem 0 ;
         display: flex;
         justify-content: center;
         align-items: center;
    }
}
</style>

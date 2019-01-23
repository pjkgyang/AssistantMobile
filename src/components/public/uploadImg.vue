<template>
  <div class="uploadImg">
    <input @change="readLocalFile($event)" type="file" accept="image/*" 
     id="upload_file" multiple style="display: none" />

    <!--照片区域-->
    <div v-for="(urls, index) in imgs " class="imgs">
      <div class="img-del" v-on:click="deleteImg(index)">×</div>
      <div class="img-area" @click="handleCheckimgs(index)">
        <img :src="urls" />
      </div>
    </div>

    <!-- @click="imgClick" -->
    <div class="img-upload"  @click="imgClick">
       <!-- <van-uploader :after-read="onRead" accept="image/*" multiple>
            <van-icon name="photograph" color="#fff" size="1.5em"/>
       </van-uploader> -->
      <div class="add">
        <div class="add-image" align="center">
          <i class="icon-camera"></i>
          <p class="font13">
             <mu-icon value="photo_camera"></mu-icon>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      imgs: [],
      imgArr: []
    };
  },
  methods: {
    // 点击上传图片
    imgClick: function() {
      document.getElementById("upload_file").click();
    },
    //点击选中图片
    readLocalFile: function() {
      var localFile = document.getElementById("upload_file").files[0];
      var reader = new FileReader();
      var content;
      var _this = this;
      reader.onload = function(event) {
        content = event.target.result;
        _this.uploadBase64(content);

        // _this.imgs.push(content); //获取图片base64代码
      };
      reader.onerror = function(event) {
        _this.$toast('图片上传失败，请稍后再试~')
      };
      content = reader.readAsDataURL(localFile, "UTF-8");
    },

    // onRead(file){
    //    if(!!file.length){
    //        file.forEach(ele=>{
    //           // this.imgs.push(ele.content);
    //           this.uploadBase64(ele.content);
    //        })
    //    }else{
    //       this.uploadBase64(file.content);
    //       // this.imgs.push(file.content);
    //    }
    // },
    handleCheckimgs(index) {
      ImagePreview({ images: this.imgs, startPosition: index });
    },
    //删除图片
    deleteImg: function(index) {
      this.imgs.splice(index, 1);
      this.$emit("handleOnReadImgs", this.imgs);
    },

    // 上传图片
    uploadBase64(content) {
      this.$post(this.API.uploadBase64, {
        base64: content
      }).then(res => {
        if (res.state == "success") {
          this.imgs.push(res.data);
          this.$emit('handleOnReadImgs',this.imgs);
        } else {
          this.$toast("图片上传失败，请稍后再试~");
        }
      });
    },

    getIos(){
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('iphone') != -1 || (ua.indexOf('ipad') != -1)) {
                return true;
            } else {
                return false;
        }
     }
  },
  mounted() {
    // capture="camera"
     if(this.getIos()){
        document.getElementById("upload_file").removeAttribute('capture');
     }
  },
  created() {},
  components: {}
};
</script>

<style lang="less" scoped>
@import "../../index.less";
.uploadImg {
  .flex(@col:center);
  flex-wrap: wrap;
  .imgs {
    margin: 0 0.6rem 0 0;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    .img-area {
      width: 16vw;
      height: 16vw;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .img-del {
      text-align: right;
      position: absolute;
      right: 0;
      width: 16px;
      height: 16px;
      line-height: 15px;
      text-align: center;
      background: rgba(117, 117, 117, 0.3);
      color: #fff;
      border-radius: 50px;
    }
  }
  .img-upload {
    width: 16vw;
    height: 16vw;
    background-color: rgb(185, 184, 184);
    border: 1px solid rgb(185, 184, 184);
    float: left;
    //  margin:0 0 0.8rem 0 ;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

<template>
    <div id="signature-pad" class="signature-pad">
      <div class="description tc">签名区域</div>
      <div class="signature-pad--body">
        <canvas id="signature-canvas"></canvas>
        <i class="leftup lefta"></i>
        <i class="leftup rightup"></i>
        <i class="leftup leftdown"></i>
        <i class="leftup rightdown"></i>
      </div>
      <div class="signature-pad--footer">
        <button type="button" class="buttonclear clear" id="clear" data-action="clear" @click="handleClear">重签</button>
        <button type="button" class="buttonclear commit" id="save" data-action="clear" @click="handleCommit">确定</button>
      </div>
    </div>
</template>

<script>
  export default{
    data(){
      return{
        canvas:null,
        signaturePad:null,
        qrxqData:{}
      }
    },
    mounted() {
      this.qrxqData = this.$route.params.data;
      if(JSON.stringify(this.qrxqData) == '{}'){
        this.$router.back(-1);
        return;
      }
      let _this = this;//赋值vue的this
      this.canvas = document.getElementById('signature-canvas');
      // this.canvas.fillStyle = "#fff";
      this.signaturePad = new SignaturePad(this.canvas, { backgroundColor: 'rgba(255, 255, 255, 1)', penColor: 'rgb(0, 0, 0)' });
      this.resizeCanvas();
    },
    methods:{
        handleCommit(){
          var data = this.signaturePad.toDataURL('image/png');
          if(!this.signaturePad.toData().length){
             this.$toast("请签名");
             return;
          }
          this.$post(this.API.uploadBase64,{
            base64:data,
            fileName:'签名'+ Math.ceil(Math.random()*1000000)
          }).then(res=>{
            if(res.state == 'success'){
              let params = this.qrxqData;
              params.nr = this.qrxqData.nr+'<br><img  style="width:110px !important;height:46px !important;" src="'+res.data+'"/>'
              this.$post(this.API.confirmRequirement, params).then(res => {
                    if (res.state == "success") {
                         this.$toast("提交成功");
                         setTimeout(()=>{
                          this.$router.back(-1);
                        },500);
                    } else {
                        this.$toast(res.msg);
                    }
              });
            }
          })
        },

        handleClear(){
          this.signaturePad.clear();
        },

        resizeCanvas() {
        	var ratio = 1;//Math.max(window.devicePixelRatio || 1, 1); // 清除画布
        	this.canvas.width = this.canvas.offsetWidth * ratio;
        	this.canvas.height = this.canvas.offsetHeight * ratio;
        	this.canvas.getContext("2d").scale(ratio, ratio);
        	this.signaturePad.clear();
        }
    },
    components:{}
  }
</script>

<style scoped>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  .signature-pad,.signature-pad--body {
  	height: 90%;
  }
  .signature-pad {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    font-size: 10px;
    width: 100%;
    height:100vh;
    max-height: 480px;
    background-color: #fff;
    padding: 16px;
  }

  .signature-pad::before,
  .signature-pad::after {
    position: absolute;
    z-index: -1;
    content: "";
    width: 40%;
    height: 10px;
    bottom: 10px;
    background: transparent;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
  }

  .signature-pad::before {
    left: 20px;
    -webkit-transform: skew(-3deg) rotate(-3deg);
            transform: skew(-3deg) rotate(-3deg);
  }

  .signature-pad::after {
    right: 20px;
    -webkit-transform: skew(3deg) rotate(3deg);
            transform: skew(3deg) rotate(3deg);
  }

  .signature-pad--body {
    position: relative;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
  }

  .signature-pad--body
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.02) inset;
  }

  .signature-pad--footer {
    color: #fff;
    text-align: center;
    font-size: 1.2em;
    margin-top: 8px;
  }

  .signature-pad--actions {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    margin-top: 8px;
  }

  .tc{text-align:center;}
  .description{
    font-size: 16px;
    color:#000;
    padding:15px;
  }
  .leftup{
    position:absolute;
    right:20px;
    bottom:20px;
    display:block;
    width:15px;
    height:40px;
    border-top:3px solid #333;
    border-left:3px solid #333;
  }
  .lefta{left:15px;top:15px;}
  .leftup.rightup{
    right:15px!important;
    top:15px;
    transform: rotateY(180deg);
  }
  .leftup.rightdown{
    right:15px!important;
    bottom:15px;
    transform: rotate(180deg);
  }
  .leftup.leftdown{
    left:15px;
    bottom:15px;
    transform: rotateX(180deg);
  }

  .hide{display:none;}
  .newbottom{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      height: 1.344605rem;
      border-top: 1px solid #ccc;
      background:#fff!important;
      text-align:center;
  }
  .newbottom>div{
      width: 9.557166rem;
      height: 1.022544rem;
      background-image: -webkit-linear-gradient(277deg, #fc6a37, #e93c6d);
      background-image: -o-linear-gradient(277deg, #fc6a37, #e93c6d);
      background-image: linear-gradient(173deg, #fc6a37, #e93c6d);
      margin: 0.161031rem auto;
      color: #fff;
      font-size: 0.41868rem;
      text-align: center;
      line-height: 1.022544rem;
      border-radius: 0.144928rem;
      letter-spacing: 0.161031rem;
  }
  .signature-pad{padding:15px 0!important;}
  .signature-pad--body{padding:15px;}
  .buttonclear{
      border-radius:5px;
      border:0;
      height: 30px;
      line-height:30px;
      padding: 0 20px;
      font-size: 0.5rem;
      background-color:#d3d3d3;
  }
  .commit{
      background-color:#5555ff;
  }

</style>

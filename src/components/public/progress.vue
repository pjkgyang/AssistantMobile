<template>
    <div class="assistant-progress">
        <div class="progress">
            <span class="progress_activebar" :style="{'width':width+'%'}"> </span>
        </div>&#x3000;
        <div>
            {{width}}%
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    width: {
      type: Number,
      default: 50
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.assistant-progress {
  display: flex;
  align-items: center;
  color: #29be1e;
  font-weight: 700;
  .progress {
    height: 0.7rem;
    width: 100%;
    border-radius: 0.7rem;
    background: #d8d8d8;
    position: relative;
    span.progress_activebar {
      display: inline-block;
      height: 100%;
      position: absolute;
      border-radius: 0.7rem;
      color: #fff;
      font-size: 0.66666rem;
      text-align: center;
      background: #29be1e;
    }
  }
}
</style>

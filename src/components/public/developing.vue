<template>
    <div class="developing">
        <h3>
           开发中。。。
        </h3>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped>
.developing {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
h3 span {
  float: left;
  position: relative;
}
/* 
h3 span:nth-child(1) {
  animation: jump 1s linear 0s infinite alternate;
}

h3 span:nth-child(2) {
  animation: jump 1s linear 0.2s infinite alternate;
}

h3 span:nth-child(3) {
  animation: jump 1s linear 0.4s infinite alternate;
}

h3 span:nth-child(4) {
  animation: jump 1s linear 0.6s infinite alternate;
}

h3 span:nth-child(5) {
  animation: jump 1s linear 0.8s infinite alternate;
}
h3 span:nth-child(6) {
  animation: jump 1s linear 0.8s infinite alternate;
}

@keyframes jump {
  0% {
    top: 0px;
    color: rgb(253, 250, 249);
  }
  50% {
    top: -8px;
    color: rgb(219, 109, 76);
  }
  100% {
    top: 8px;
    color: rgb(129, 36, 12);
  }
} */
</style>

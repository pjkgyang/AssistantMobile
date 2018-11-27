<template>
    <div>
        <mu-container>
            <mu-flex wrap="wrap">
                <mu-paper :z-depth="1" class="demo-date-picker">
                    <mu-date-picker type="month" :date.sync="date" @change="handleChangeDatePicker"></mu-date-picker>
                </mu-paper>
            </mu-flex>
        </mu-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
        date:undefined
    };
  },
  methods:{
      handleChangeDatePicker(date){
          this.$emit('handleChangeDatePicker',date)
      }
  },
  components: {}
};
</script>

<style scoped>
</style>

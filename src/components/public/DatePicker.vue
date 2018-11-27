<template>
    <div>
        <mu-container>
            <mu-flex justify-content="between" align-items="end" wrap="wrap">
                <mu-paper :z-depth="1" class="demo-date-picker">
                    <mu-date-picker :date.sync="date" @change="handleChangeDatePicker"></mu-date-picker>
                </mu-paper>
            </mu-flex>
        </mu-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      date: undefined,
    };
  },
  props: {
    
  },
  methods: {
    handleChangeDatePicker(date) {
      this.$emit("handleChangeDatePicker", date);
    }
  },
  components: {}
};
</script>

<style scoped>
</style>

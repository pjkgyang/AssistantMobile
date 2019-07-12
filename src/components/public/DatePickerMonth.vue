<template>
    <div>
      <!--  <mu-container>
            <mu-flex wrap="wrap">
                <mu-paper :z-depth="1" class="demo-date-picker">
                    <mu-date-picker type="month" :date.sync="date" @change="handleChangeDatePicker"></mu-date-picker>
                </mu-paper>
            </mu-flex>
        </mu-container> -->
		<van-datetime-picker
		  v-model="currentDate"
		  type="year-month"
		  @confirm="handleConfirm"
		  @cancel="handleClose"
		/>
    </div>
</template>

<script>
import { GetNextDate } from '@/utils/util';
export default {
  data() {
    return {
        currentDate:new Date()
    };
  },
  methods:{
      handleConfirm(val){
		  // let year = val.getFullYear();
		  // let month = val.getMonth()+1;
		  // month = month<10?'0'+month:month;
          this.$emit('handleChangeDatePicker',val);
      },
	  handleClose(){
		  this.$emit('handleClose','');
	  }
  },
  components: {}
};
</script>

<style scoped>
</style>

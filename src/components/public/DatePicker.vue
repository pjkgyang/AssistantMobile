<template>
    <div class="dete-pick">
			    <div class="date-time-item">
							<date-time ref="dateTime"
							:min="minDates()"
							:max="maxDates()"
							:showTodayButton='false'
							@confirm="select"></date-time>
						</div>
      <!-- <mu-date-picker :should-disable-date="dateDisable?allowedDates:''" :date.sync="date" @change="handleChangeDatePicker"></mu-date-picker> -->
    </div>
</template>

<script>
import { GetNextDate } from '@/utils/util';
import DateTime from 'vue-date-time-m';
export default {
  data() {
    return {
				data: ''
    };
  },
  props: {
    dateDisable:{
      type:Boolean,
      default:false
    },
    beforeDisabled:{
      type:Boolean,
      default:false
    },
    cphs:{
      type:Number,
      default:0
    }
  },
	mounted(){
		this.$refs.dateTime.show();
	},
  methods: {
			// 日期组件回调
		select (val) {
				this.data = val;
				this.$emit("handleChangeDatePicker", val);
    },
		minDates(){
			if(!!this.dateDisable){
				return GetNextDate(new Date(),0);
			}else{
				return ''
			}
		},
		maxDates(){
			let laterDate = GetNextDate(new Date(),this.cphs+1);
			if(!!this.dateDisable){
					 if(!this.beforeDisabled){
					      return laterDate;
					}else{
						return ''
					}
			}else{
				return ''
			}
		}
		
    // handleChangeDatePicker(date) {
    //   this.$emit("handleChangeDatePicker", date);
    // },
    // allowedDates(date){
    //       let laterDate = GetNextDate(new Date(),this.cphs+1);
    //       let beforeDate = GetNextDate(new Date(),0);
    //     if(!this.beforeDisabled){
    //        return new Date(date) < new Date(beforeDate) || new Date(date) >= new Date(laterDate);
    //     }else{
    //        return new Date(date) < new Date(beforeDate);
    //     }
    // },
  },
  components: {DateTime}
};
</script>

<style scoped>
	.dete-pick{
		  width: 316px;
			height: 378px;
	}
</style>

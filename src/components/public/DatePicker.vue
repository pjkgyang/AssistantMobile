<template>
	<div>
		 <van-actionsheet v-model="show" title=""  :close-on-click-overlay="false">
		 	<van-datetime-picker
			  v-model="currentDate"
			  type="date"
			  :min-date="minDates()"
			  :max-date="maxDates()"
			  @cancel="handleClose"
			  @confirm="handleConfirm"
			/>
		  </van-actionsheet>
	</div>
</template>

<script>
import { GetNextDate } from '@/utils/util';

export default {
	data() {
		return {
			date:undefined,
			minDate:'',
			maxDate:'',
		    currentDate: new Date(),
		};
	},
	props: {
		dateDisable: {
			type: Boolean,
			default: false
		},
		beforeDisabled: {
			type: Boolean,
			default: false
		},
		cphs: {
			type: Number,
			default: 0
		},
		show:{
			type:Boolean,
			default:false
		}
	},
	mounted() {
		// let laterDate = GetNextDate(new Date(),this.cphs+1); 
		// let beforeDate = GetNextDate(new Date(),0);
	},
	methods: {
		minDates() {
			if (!!this.dateDisable) {
				return new Date(GetNextDate(new Date(), 0));
			} else {
				return new Date(GetNextDate(new Date(), -3650));
			}
		},
		maxDates() {
			let laterDate = GetNextDate(new Date(), this.cphs + 1);
			if (!!this.dateDisable) {
				if (!this.beforeDisabled) {
					return new Date(laterDate);
				} else {
					return new Date(GetNextDate(new Date(), 3650));
				}
			} else {
				return new Date(GetNextDate(new Date(), 3650));
			}
		},

		handleClose(){
			this.$emit('handleClose','')
		},
		handleConfirm(val){
			this.$emit("handleChangeDatePicker", GetNextDate(val, 0));
		},
	},
	components: {  }
};
</script>

<style scoped>

</style>

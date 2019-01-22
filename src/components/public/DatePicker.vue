<template>
    <div>
        <mu-container>
            <mu-flex justify-content="between" align-items="end" wrap="wrap">
                <mu-paper :z-depth="1" class="demo-date-picker">
                    <mu-date-picker :should-disable-date="dateDisable?allowedDates:''" :date.sync="date" @change="handleChangeDatePicker"></mu-date-picker>
                </mu-paper>
            </mu-flex>
        </mu-container>
    </div>
</template>

<script>
import { GetNextDate } from '@/utils/util'
export default {
  data() {
    return {
      date: undefined,
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
  methods: {
    handleChangeDatePicker(date) {
      this.$emit("handleChangeDatePicker", date);
    },
    allowedDates(date){
          let laterDate = GetNextDate(new Date(),this.cphs+1);
          let beforeDate = GetNextDate(new Date(),0);
        if(!this.beforeDisabled){
           return new Date(date) < new Date(beforeDate) || new Date(date) >= new Date(laterDate);
        }else{
           return new Date(date) < new Date(beforeDate);
        }
    },
  },
  components: {}
};
</script>

<style scoped>
</style>

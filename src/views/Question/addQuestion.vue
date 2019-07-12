<template>
	<div>
		<div>
			<van-cell-group>
				<!--query.sl == 1 （受理）userInfo.unitType == 1（学校用户） -->
				<van-field required v-model="questionData.xmmc" type="textarea" label="项目名称" placeholder="请选择项目" is-link rows="1" autosize @click="onClick('xm')" />
				<van-field v-model="xmzt" type="textarea" label="项目状态" placeholder="请选择项目" rows="1" autosize readonly />
				<van-field required v-model="questionmcData.wtly" type="textarea" label="问题来源" placeholder="请选择" is-link rows="1" autosize @click="onClick('wtly')" />
				<van-field
					v-if="$store.state.userInfo.unitType != 1"
					required
					v-model="questionmcData.wtlb"
					type="textarea"
					label="问题类型"
					placeholder="请选择"
					is-link
					rows="1"
					autosize
					@click="onClick('wtlb')"
				/>
				<van-field
					v-if="$store.state.userInfo.unitType != 1"
					required
					v-model="questionmcData.wtjb"
					type="textarea"
					label="问题级别"
					placeholder="请选择"
					is-link
					rows="1"
					autosize
					@click="onClick('wtjb')"
				/>
				<van-field required v-model="questionmcData.sfjj" type="textarea" label="是否紧急" placeholder="请选择" is-link rows="1" autosize @click="onClick('sfjj')" />
				<van-field
					v-if="$store.state.userInfo.unitType != 1"
					required
					v-model="questionmcData.sfbug"
					type="textarea"
					label="是否bug"
					placeholder="请选择"
					is-link
					rows="1"
					autosize
					@click="onClick('sfbug')"
				/>
				<van-field required v-model="questionmcData.cpmc" type="textarea" label="产品" placeholder="请选择" is-link rows="1" autosize @click="onClick('cp')" />
				<van-field
					v-if="$store.state.userInfo.unitType != 1"
					required
					v-model="questionmcData.yxfw"
					type="textarea"
					label="影响范围"
					placeholder="请选择"
					is-link
					rows="1"
					autosize
					@click="onClick('yxfw')"
				/>
				<van-field
					required
					v-model="questionData.qwjjrq"
					type="textarea"
					label="期望结束日期"
					placeholder="请选择"
					:disabled="!!$route.query.wid ? true : false"
					:is-link="!!$route.query.wid ? false : true"
					rows="1"
					autosize
					@click="onClick('qwjjrq')"
				/>
				<van-field
					v-if="!!$route.query.wid"
					required
					v-model="questionData.cnjsrq"
					type="textarea"
					label="承诺解决日期"
					placeholder="请选择"
					is-link
					rows="1"
					autosize
					@click="onClick('cnjsrq')"
				/>
				<van-field v-if="$store.state.userInfo.unitType != 1" required v-model="questionData.bbh" type="textarea" label="版本号" placeholder="请输入" rows="1" autosize />
				<van-field v-if="!$route.query.wid" required v-model="questionData.bt" type="textarea" label="标题" placeholder="请输入" rows="2" autosize />
				<van-field v-if="!$route.query.wid" required v-model="questionData.nr" type="textarea" label="详情" placeholder="请输入" rows="5" clearable />
			</van-cell-group>

			<div class="addquestion-detail" v-if="!$route.query.wid">
				<div class="detail-label"><span>上传图片</span></div>
				<div class="detail-content"><uploadImg @handleOnReadImgs="handleOnReadImgs"></uploadImg></div>
			</div>
		</div>

		<footer>
			<van-button size="normal" type="default" @click="handleClose">取消</van-button>
			<van-button class="commitButton" size="normal" type="primary" @click="handleCommit">提交</van-button>
		</footer>

		<!-- 选择项目 -->
		<van-popup v-model="projectlistShow" position="right"><projectList @handleClose="handleCloseXMPop" @handleChooseItem="handleChooseItem"></projectList></van-popup>

		<!-- <div class="datePop"> -->
		<!-- <van-popup v-model="show"> -->
		<datePicker
			:show.sync="show"
			@handleChangeDatePicker="handleChangeDate"
			:dateDisable="dateDisable"
			:beforeDisabled="beforeDisabled"
			:cphs="cphs"
			@handleClose="handleCloseDatePicker"
		></datePicker>
		<!-- </van-popup> -->
		<!-- </div> -->
		<!-- <van-actionsheet v-model="wtlxShow" :actions="actions" @select="onSelect"/> -->
		<van-actionsheet v-model="wtlxShow" :title="'选择' + actionSheetTitle">
			<ul :class="{ actionsheet_list: true, height40: type == 'wtlb' || type == 'cp', height20: type != 'wtlb' && type != 'cp' }">
				<li v-for="(value, key) in optionList" @click="handleOnSelect(key, value)">{{ value }}</li>
			</ul>
		</van-actionsheet>
	</div>
</template>

<script>
import projectList from '@/components/question/projectList.vue';
import datePicker from '@/components/public/DatePicker.vue';
import { getMenu, getSession, getMyDate } from '@/utils/util.js';
import uploadImg from '@/components/public/uploadImg';

export default {
	data() {
		return {
			projectlistShow: false,
			show: false,
			wtlxShow: false,
			dateDisable: false, //日期选择范围禁用
			beforeDisabled: false, //期望解决日期小于当前不能用
			actionSheetTitle: '',
			actions: [
				{
					name: '选项'
				},
				{
					name: '选项',
					subname: '描述信息'
				}
			],
			questionData: {
				xmmc: '',
				xmbh: '',
				wtlb: '', //问题类型
				sfjj: '', //是否紧急
				sfbug: '',
				wtjb: '', //问题级别
				cpbh: '',
				yxfw: '',
				bbh: '',
				qwjjrq: '',
				cnjsrq: '',
				nr: '',
				bt: '',
				wtly: '' //问题来源
			},
			questionmcData: {}, //显示字段
			xmzt: '', //项目状态
			type: '', //记录选择cell
			optionList: {}, //列表数据
			cpList: {}, //产品
			wtlxList: {}, //问题类型
			wtlyList: {}, //问题来源
			wtjbList: { 0: '不严重', 1: '一般', 2: '严重' }, //问题级别
			sfjjList: { 0: '否', 1: '是' }, //是否紧急
			yxfwList: { 0: '影响局部', 1: '影响整体' }, //影响范围
			sgbugList: { 0: '否', 1: '是' }, //是否bug

			xmInfo: {},
			imgStr: '',
			cphs: 0
		};
	},
	mounted() {
		this.getDictEnum();
	},
	activated() {
		if (!!this.$route.query.wid) {
			this.queryQuestion();
// 			this.cphs = Number(res.data.cphs);
// 			this.questionData.cpbh = res.data.cpbh;
// 
// 			this.questionData.wtlb = res.data.wtlb; //问题类别
// 			this.questionData.wtjb = res.data.wtjb; //问题级别
// 			this.questionData.yxfw = res.data.yxfw; //影响范围
// 
// 			this.questionData.qwjjrq = res.data.qwjjrq;
// 			this.questionData.cnjsrq = res.data.cnjsrq;
// 			this.questionData.bbh = res.data.bbh;
// 			this.questionData.sfjj = res.data.jjyf;
// 			this.questionData.sfbug = res.data.sfbg;
// 
// 			this.questionmcData.cpmc = res.data.cpmc;
// 			this.questionmcData.sfjj = res.data.jjyf == '0' ? '否' : res.data.jjyf == '1' ? '是' : '';
// 			this.questionmcData.sfbug = res.data.sfbg == '0' ? '否' : res.data.sfbg == '1' ? '是' : '';
// 
// 			this.queryResponsibleProduct(res.data.xmbh); //获取产品
// 
// 			if (!res.data.xmmc) {
// 				this.xmzt = '在建';
// 				this.questionData.xmmc = '内部项目';
// 			} else {
// 				this.xmzt = res.data.xmzt;
// 				this.questionData.xmmc = res.data.xmmc;
// 				this.questionData.xmbh = res.data.xmbh;
// 			}
// 
// 			this.exchangeDictEnum('ProblemType', res.data.wtlb, data => {
// 				this.$set(this.questionmcData, 'wtlb', data);
// 			});
// 			this.exchangeDictEnum('ProblemLevel', res.data.wtjb, data => {
// 				this.$set(this.questionmcData, 'wtjb', data);
// 			});
// 			this.exchangeDictEnum('ProblemEffectScope', res.data.yxfw, data => {
// 				this.$set(this.questionmcData, 'yxfw', data);
// 			});
		} else {
			this.xmzt = '';
			this.questionData = {};
			this.questionmcData = {};
		}
		this.imgStr = '';
		this.questionData.wtly = this.$store.state.userInfo.unitType == 0 ? '2' : '1';
		this.questionmcData.wtly = this.$store.state.userInfo.unitType == 0 ? '项目团队' : '用户';
	},
	methods: {
		handleCommit() {
			let wtnr = '<p>' + this.questionData.nr + '</p>' + this.imgStr;
			let paramsData = {
				wtly: !this.questionData.wtly ? '' : this.questionData.wtly, //问题来源
				wtlb: !this.questionData.wtlb ? '' : this.questionData.wtlb,
				wtjb: !this.questionData.wtjb ? '' : this.questionData.wtjb,
				jjyf: this.questionData.sfjj,
				cpbh: this.questionData.cpbh,
				yxfw: !this.questionData.yxfw ? '' : this.questionData.yxfw,
				sfbg: this.questionData.sfbug,
				bbh: !this.questionData.bbh ? '' : this.questionData.bbh,
				bt: this.questionData.bt,
				qwjjrq: this.questionData.qwjjrq,
				cnjsrq: this.questionData.cnjsrq,
				xmmc: !this.xmInfo ? '' : this.questionData.xmmc,
				xmbh: !this.xmInfo ? '' : this.questionData.xmbh,
				internalProject: !this.xmInfo ? true : '',
				nr: wtnr
			};
			if (this.$store.state.userInfo.unitType == 1) {
				// 老师
				delete paramsData.wtlb;
				delete paramsData.wtjb;
				delete paramsData.yxfw;
				delete paramsData.bbh;
				delete paramsData.sfbg;
				delete paramsData.internalProject;
			} else if (this.$route.query.wid) {
				// 受理
				delete paramsData.nr;
				delete paramsData.bt;
				delete paramsData.internalProject;
				paramsData.wid = this.$route.query.wid;
			} else {
				delete paramsData.cnjsrq;
			}
			if (!this.validDate()) return;
			this.$post(this.$route.query.wid || this.$store.state.userInfo.unitType == 1 ? this.API.customerQuestion : this.API.saveQuestion, paramsData).then(res => {
				if (res.state == 'success') {
					this.$toast.clear();
					this.$toast(this.$route.query.wid ? '受理成功~' : '提交成功~');
					this.$router.go(-1);
				} else {
					this.$toast.clear();
					this.$toast(!res.msg ? '系统超时，请稍后再试~' : res.msg);
				}
			});
		},
		// 选择图片
		handleOnReadImgs(params) {
			this.imgStr = '';
			if (!!params.length) {
				params.forEach(ele => {
					this.imgStr += '<img src=' + ele + '>';
				});
			}
		},

		onClick(params, e) {
			document.activeElement.blur();
			if (params == 'xm') {
				this.projectlistShow = true;
			} else if (params == 'cnjsrq' || params == 'qwjjrq') {
				this.dateDisable = true;
				if (params == 'qwjjrq') {
					this.beforeDisabled = true;
				} else {
					this.beforeDisabled = false;
				}
				this.show = true;
			} else {
				this.wtlxShow = true;
			}
			this.type = params;
		},

		//  关闭项目弹出层
		handleCloseXMPop() {
			this.projectlistShow = false;
		},
		//  选择项目
		handleChooseItem(data) {
			this.xmInfo = data;
			if (!!data) {
				this.xmzt = data.xmzt;
				this.questionData.xmmc = data.xmmc;
				this.questionData.xmbh = data.xmbh;
				this.queryResponsibleProduct(data.xmbh);
			} else {
				this.queryResponsibleProduct('', true);
				this.xmzt = '在建';
				this.questionData.xmmc = '内部项目';
			}
			this.projectlistShow = false;
		},
		queryResponsibleProduct(xmbh, inter) {
			this.cpList = [];
			this.$get(this.API.queryResponsibleProduct, {
				xmbh: xmbh,
				internalProject: !inter ? '' : inter
			}).then(res => {
				if (res.state == 'success') {
					// 2018.12.18 修改
					if (JSON.stringify(res.data) == '{}') {
						this.$toast(' 您选择的项目没有可提问产品，请联系项目经理 ( ' + this.xmInfo.yfzrrxm + ')添加负责业务。');
					} else {
						this.cpList = res.data;
					}
				}
			});
		},
		handleCloseDatePicker() {
			this.show = false;
		},
		//  选择日期
		handleChangeDate(data) {
			if (this.type == 'qwjjrq') {
				this.questionData.qwjjrq = getMyDate(data);
			} else {
				this.questionData.cnjsrq = getMyDate(data);
			}
			if ((this.type == 'qwjjrq' && !!this.questionData.qwjjrq) || (this.type != 'qwjjrq' && !!this.questionData.cnjsrq)) {
				this.show = false;
			}
		},
		// 返回
		handleClose() {
			this.$store.dispatch('chnageMark', true);
			this.$router.go(-1);
		},
		// 选择
		handleOnSelect(key, value) {
			switch (this.type) {
				case 'wtlb':
					this.questionmcData.wtlb = value;
					this.questionData.wtlb = key;
					break;
				case 'wtly':
					this.questionmcData.wtly = value;
					this.questionData.wtly = key;
					break;
				case 'wtjb':
					this.questionmcData.wtjb = value;
					this.questionData.wtjb = key;
					break;
				case 'sfjj':
					this.questionmcData.sfjj = value;
					this.questionData.sfjj = key;
					break;
				case 'sfbug':
					this.questionmcData.sfbug = value;
					this.questionData.sfbug = key;
					break;
				case 'yxfw':
					this.questionmcData.yxfw = value;
					this.questionData.yxfw = key;
					break;
				case 'cp':
					this.questionmcData.cpmc = value;
					this.questionData.cpbh = key;
					break;
				default:
					break;
			}
			this.wtlxShow = false;
		},

		// 获取枚举
		getDictEnum() {
			if (!getSession('ProblemType')) {
				getMenu('ProblemType', '').then(data => {
					this.wtlxList = data;
				});
			} else {
				this.wtlxList = getSession('ProblemType');
			}

			// 问题来源
			if (!getSession('ProblemSource')) {
				getMenu('ProblemSource', '').then(data => {
					this.wtlyList = data;
				});
			} else {
				this.wtlyList = getSession('ProblemSource');
			}

			// 问题级别
			if (!getSession('ProblemLevel')) {
				getMenu('ProblemLevel', '').then(data => {
					this.wtjbList = data;
				});
			} else {
				this.wtjbList = getSession('ProblemLevel');
			}

			// 影响范围
			if (!getSession('ProblemEffectScope')) {
				getMenu('ProblemEffectScope', '').then(data => {
					this.yxfwList = data;
				});
			} else {
				this.yxfwList = getSession('ProblemEffectScope');
			}
		},

		// 获取单个问题
		queryQuestion() {
			this.$get(this.API.queryQuestion, {
				wid: this.$route.query.wid
			}).then(res => {
				if (res.state == 'success') {
					this.cphs = Number(res.data.cphs);
					this.questionData.cpbh = res.data.cpbh;

					this.questionData.wtlb = res.data.wtlb; //问题类别
					this.questionData.wtjb = res.data.wtjb; //问题级别
					this.questionData.yxfw = res.data.yxfw; //影响范围

					this.questionData.qwjjrq = res.data.qwjjrq;
					this.questionData.cnjsrq = res.data.cnjsrq;
					this.questionData.bbh = res.data.bbh;
					this.questionData.sfjj = res.data.jjyf;
					this.questionData.sfbug = res.data.sfbg;

					this.questionmcData.cpmc = res.data.cpmc;
					this.questionmcData.sfjj = res.data.jjyf == '0' ? '否' : res.data.jjyf == '1' ? '是' : '';
					this.questionmcData.sfbug = res.data.sfbg == '0' ? '否' : res.data.sfbg == '1' ? '是' : '';
					// this.questionmcData.yxfw = res.data.yxfw == '1'?'整体影响':res.data.yxfw == '0' ? '影响局部':'';
				  this.questionmcData.wtlb = !res.data.wtlb_Display?'':res.data.wtlb_Display;
					this.questionmcData.wtjb = !res.data.wtjb_Display?'':res.data.wtjb_Display;
					this.questionmcData.yxfw = !res.data.yxfw_Display?'':res.data.yxfw_Display;
					
					this.queryResponsibleProduct(res.data.xmbh); //获取产品

					if (!res.data.xmmc) {
						this.xmzt = '在建';
						this.questionData.xmmc = '内部项目';
					} else {
						this.xmzt = res.data.xmzt;
						this.questionData.xmmc = res.data.xmmc;
						this.questionData.xmbh = res.data.xmbh;
					}
					
					// this.exchangeDictEnum('ProblemType', res.data.wtlb, data => {
					// 	this.$set(this.questionmcData, 'wtlb', data);
					// });
					// this.exchangeDictEnum('ProblemLevel', res.data.wtjb, data => {
					// 	this.$set(this.questionmcData, 'wtjb', data);
					// });
					// this.exchangeDictEnum('ProblemEffectScope', res.data.yxfw, data => {
					// 	this.$set(this.questionmcData, 'yxfw', data);
					// });
					
				} else {
					this.$toast(!res.msg ? '系统超时，请稍后再试~' : res.msg);
				}
			});
		},

		// 提交校验
		validDate() {
			if (!this.questionData.xmmc && !!this.xmInfo) {
				this.$toast('请选择项目名称');
				return false;
			}
			if (!this.questionData.wtlb && this.$store.state.userInfo.unitType != 1) {
				this.$toast('请选择问题类型');
				return false;
			}
			if (!this.questionData.wtjb && this.$store.state.userInfo.unitType != 1) {
				this.$toast('请选择问题级别');
				return false;
			}
			if (!this.questionData.sfjj) {
				this.$toast('请选择是否紧急');
				return false;
			}
			if (!this.questionData.sfbug && this.$store.state.userInfo.unitType != 1) {
				this.$toast('请选择是否bug');
				return false;
			}
			if (!this.questionData.cpbh) {
				this.$toast('请选择产品');
				return false;
			}
			if (!this.questionData.yxfw && this.$store.state.userInfo.unitType != 1) {
				this.$toast('请选择影响范围');
				return false;
			}
			if (!this.questionData.qwjjrq) {
				this.$toast('请选择期望结束日期');
				return false;
			}
			if (!this.questionData.cnjsrq && this.$route.query.wid) {
				this.$toast('请选择承诺解决日期');
				return false;
			}
			if (!this.questionData.bbh && this.$store.state.userInfo.unitType != 1) {
				this.$toast('请输入版本号');
				return false;
			}
			if (!this.questionData.bt && !this.$route.query.wid) {
				// 非受理
				this.$toast('请输入问题标题');
				return false;
			}
			if (!this.questionData.nr && !this.$route.query.wid) {
				// 非受理
				this.$toast('请输入问题详情');
				return false;
			}
			return true;
		},

		// 更换枚举
		exchangeDictEnum(name, code, doSuccess) {
			this.$get(this.API.getDictEnum, {
				name: name,
				code: code
			}).then(res => {
				if (res.state == 'success') {
					doSuccess(res.data);
				} else {}
			});
		}
	},

	watch: {
		type(n, o) {
			switch (n) {
				case 'wtlb':
					this.actionSheetTitle = '问题类型';
					this.optionList = this.wtlxList;
					break;
				case 'wtly':
					this.actionSheetTitle = '问题来源';
					this.optionList = this.wtlyList;
					break;
				case 'wtjb':
					this.actionSheetTitle = '问题级别';
					this.optionList = this.wtjbList;
					break;
				case 'sfjj':
					this.actionSheetTitle = '是否紧急';
					this.optionList = this.sfjjList;
					break;
				case 'sfbug':
					this.actionSheetTitle = '是否bug';
					this.optionList = this.sfjjList;
					break;
				case 'yxfw':
					this.actionSheetTitle = '影响范围';
					this.optionList = this.yxfwList;
					break;
				case 'cp':
					this.actionSheetTitle = '产品';
					this.optionList = this.cpList;
					break;
				default:
					break;
			}
		}
	},
	components: { projectList, getMenu, datePicker, uploadImg }
};
</script>

<style lang="less" scoped>
.actionsheet_list {
	overflow-y: auto;
	li {
		color: #575656;
		text-align: center;
		padding: 0.45555rem 0;
		font-size: 0.85rem;
	}
}
.addquestion-detail {
	display: flex;
	background: #fff;
	padding: 10px 15px;
	.detail-label {
		width: 90px;
		color: #333;
		font-size: 14px;
		font-weight: 700;
	}
}

.height40 {
	height: 35vh;
}
.height20 {
	height: 20vh;
}
.datePop {
	z-index: 5000;
}
</style>

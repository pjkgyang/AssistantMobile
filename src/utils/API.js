

export default {
    // 系统
    sendCode:WINDOW_CONFIG__BASEURL +'verify/sendCode.do',//发送验证码
    verifyCode:WINDOW_CONFIG__BASEURL +'verify/verifyCode.do',//校验验证码
    getDictEnum:WINDOW_CONFIG__BASEURL +'dict/getDictEnum.do',//获取枚举

    getLoginUser:WINDOW_CONFIG__BASEURL +'sys/getLoginUser.do',
    wxLogin:WINDOW_CONFIG__BASEURL +'wx/wxLogin.do',  //微信登录
    queryLogTaskProcess:WINDOW_CONFIG__BASEURL +'process/queryLogTaskProcess.do',//日报过程
    addOrUpdateTaskProcess:WINDOW_CONFIG__BASEURL +'process/addOrUpdateTaskProcess.do',//编辑提交日报
    commentLog:WINDOW_CONFIG__BASEURL +'process/commentLog.do', //保存日报批注
    deleteTaskProcess:WINDOW_CONFIG__BASEURL +'process/deleteTaskProcess.do',//删除日报
    addOrUpdateTaskProcess:WINDOW_CONFIG__BASEURL +'process/addOrUpdateTaskProcess.do',//添加 编辑日报  
    readLog:WINDOW_CONFIG__BASEURL +'process/readLog.do',// 已阅 日报
    getLogComment:WINDOW_CONFIG__BASEURL +'process/getLogComment.do',//获取日报批注（单个）
    getLogComments:WINDOW_CONFIG__BASEURL +'process/getLogComments.do',//获取日报批注（列表）

    queryXbxm:WINDOW_CONFIG__BASEURL +'project/queryXbxm.do',//星标项目
    queryGfxxm:WINDOW_CONFIG__BASEURL +'project/queryGfxxm.do',//高风险项目
    queryWyyxm:WINDOW_CONFIG__BASEURL +'project/queryWyyxm.do',//我拥有项目
    queryWcyxm:WINDOW_CONFIG__BASEURL +'project/queryWcyxm.do',//我参与项目
    queryGbxm:WINDOW_CONFIG__BASEURL +'project/queryGbxm.do',//关闭项目
    queryAllxm:WINDOW_CONFIG__BASEURL +'project/queryAllxm.do',//  获取所有项目
    getProjects:WINDOW_CONFIG__BASEURL +'project/getProjects.do',//  获取所有项目(getProjects)
    getMyProjects:WINDOW_CONFIG__BASEURL +'project/getMyProjects.do',//  获取我的项目( 分类 )
    getProjectCatalog:WINDOW_CONFIG__BASEURL +'project/getProjectCatalog.do',//  获取所有产品
    getMilestoneCatalog:WINDOW_CONFIG__BASEURL +'milestone/getMilestoneCatalog.do',//  获取里程碑任务

    // 周报
    pageWeekPlanPerson:WINDOW_CONFIG__BASEURL +'plan/pageWeekPlanPerson.do',//获取周报人员列表
    mapLcbxxForWeekPlan:WINDOW_CONFIG__BASEURL +'plan/mapLcbxxForWeekPlan.do',// 获取周报里程碑列表(新增)
    pageQuestionForWeekPlan:WINDOW_CONFIG__BASEURL +'plan/pageQuestionForWeekPlan.do',// 获取周报问题列表(新增)
    addWeekQuestionPlan:WINDOW_CONFIG__BASEURL +'plan/addWeekQuestionPlan.do',//新增问题（确定）
    addWeekWorkPlan:WINDOW_CONFIG__BASEURL +'plan/addWeekWorkPlan.do',//新增里程碑（确定）
    saveWeeklyReport:WINDOW_CONFIG__BASEURL +'plan/saveWeeklyReport.do',//保存进度
    batchUpdateWeekWorkAll:WINDOW_CONFIG__BASEURL +'plan/batchUpdateWeekWorkAll.do',// 未完成原因，后续措施，工作内容(里程碑)
    batchUpdateWeekWorkGznr:WINDOW_CONFIG__BASEURL +'plan/batchUpdateWeekWorkGznr.do',// 工作内容(里程碑)
    batchUpdateWeekQuestionAll:WINDOW_CONFIG__BASEURL +'plan/batchUpdateWeekQuestionAll.do',//未完成原因，后续措施，处理计划(问题)
    batchUpdateWeekQuestionCljh:WINDOW_CONFIG__BASEURL +'plan/batchUpdateWeekQuestionCljh.do',//处理计划(问题)
    pageWeekWork:WINDOW_CONFIG__BASEURL +'plan/pageWeekWork.do',//获取里程碑列表
    pageWeekQuestion:WINDOW_CONFIG__BASEURL +'plan/pageWeekQuestion.do',//获取问题列表
    pageWeeklyReport:WINDOW_CONFIG__BASEURL +'plan/pageWeeklyReport.do',//获取进度列表
    deleteWeeklyReport:WINDOW_CONFIG__BASEURL +'plan/deleteWeeklyReport.do',//删除进度任务
    deleteWeekWork:WINDOW_CONFIG__BASEURL +'plan/deleteWeekWork.do',//删除里程碑
    deleteWeekQuestion:WINDOW_CONFIG__BASEURL +'plan/deleteWeekQuestion.do',//删除问题
    isWeekPlanBlocked:WINDOW_CONFIG__BASEURL +'plan/isWeekPlanBlocked.do',//是否封存

    // 问题
    queryAllQuestions:WINDOW_CONFIG__BASEURL +'question/queryAllQuestions.do',//获取问题列表
    showQuestionCondition:WINDOW_CONFIG__BASEURL +'question/showQuestionCondition.do',//问题展示条件
    queryQuestion:WINDOW_CONFIG__BASEURL +'question/queryQuestion.do',//获取单个问题
    queryAnswers:WINDOW_CONFIG__BASEURL +'question/queryAnswers.do',//获取回复列表
    saveQuestion:WINDOW_CONFIG__BASEURL +'question/saveQuestion.do',//保存问题
    closeQuestion:WINDOW_CONFIG__BASEURL +'question/closeQuestion.do',//关闭问题
    queryrReferenceHour:WINDOW_CONFIG__BASEURL +'question/queryrReferenceHour.do',//获取工时
    queryrHfHour:WINDOW_CONFIG__BASEURL +'question/queryrHfHour.do',//获取回复工时
    queryContributionPeople:WINDOW_CONFIG__BASEURL +'question/queryContributionPeople.do',//获取问题贡献人
    queryBtnAuth:WINDOW_CONFIG__BASEURL +'question/queryBtnAuth.do',//获取按钮权限
    queryProcess:WINDOW_CONFIG__BASEURL +'question/queryProcess.do',//获取问题进度
    saveAnswer:WINDOW_CONFIG__BASEURL +'question/saveAnswer.do',//回复/催办问题
    showCbCondition:WINDOW_CONFIG__BASEURL +'question/showCbCondition.do',//获取催办条件
    queryCbRy:WINDOW_CONFIG__BASEURL +'question/queryCbRy.do',//获取催办人员
    changeCommitmentDate:WINDOW_CONFIG__BASEURL +'question/changeCommitmentDate.do',//修改承诺结束时间
    customerQuestion:WINDOW_CONFIG__BASEURL +'question/customerQuestion.do',//受理
    canSubmitQuestion:WINDOW_CONFIG__BASEURL +'question/canSubmitQuestion.do',//是否可以提问
    canApplyClose:WINDOW_CONFIG__BASEURL +'question/canApplyClose.do',//是否可以申请关闭
    canClose:WINDOW_CONFIG__BASEURL +'question/canClose.do',//问题是否可以关闭
    forwardLabel:WINDOW_CONFIG__BASEURL +'question/forwardLabel.do',//获取转发对象
    applyDismiss:WINDOW_CONFIG__BASEURL +'question/applyDismiss.do',//驳回申请关闭
    isgcXmtdbyWt:WINDOW_CONFIG__BASEURL +'personnel/isgcXmtdbyWt.do',//
}
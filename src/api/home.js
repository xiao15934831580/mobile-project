import http from './request'
/**
 * 修改密码
 * @param {*} data 
 * @returns 
 */
export const updatePassword = (data) => {
    return http({
        url: '/updatePassword',
        method: 'POST',
        data
    })
}

/**
 * 首页 - 获取任务统计
 */
 export const getTaskCount = () => {
    return http({
        url: '/getTaskCount',
        method: 'POST',
    })
}
/**
 * 报修单/保养单 新建 -- 获取故障分类等下拉菜单
 */
 export const getBillCodeAndDropDowns = (billType ) => {
    return http({
        url: '/getBillCodeAndDropDowns'+'?billType='+billType,
        method: 'POST',
    })
}

/**
 * 报修单/保养单 查询
 */
 export const queryBill = (data) => {
    return http({
        url: '/queryBill',
        method: 'POST',
        data
    })
}
/**
 * 报修单/保养单 获取审批状态
 */
 export const getBillDropDowns = () => {
    return http({
        url: '/getBillDropDowns',
        method: 'POST',
    })
}
/**
 * 报修单/保养单 获取单据详情
 */
 export const getBillData = (id) => {
    return http({
        url: '/getBillData'+'?billId='+id,
        method: 'POST',
    })
}
/**
 * 报修单保存
 */
 export const saveNewBill = (data) => {
    return http({
        url: '/saveNewBill',
        method: 'POST',
        data
    })
}
/**
 * 派修提交
 * @param {*} data 
 * @returns 
 */
 export const dispatchRepBill= (params) => {
    return http({
        url: '/dispatchRepBill?billId='+params.billId+'&repUserName='+params.repUserName,
        method: 'POST',
    })
}
/**
 * 报修单提交
 */
 export const commitNewRepBill = (data) => {
    return http({
        url: '/commitNewRepBill',
        method: 'POST',
        data
    })
}
/**
 * 外来人员保存
 */
 export const queryVisRecord= (data) => {
    return http({
        url: '/queryVisRecord',
        method: 'POST',
        data
    })
}
/**
 * 外来人员查询
 */
 export const saveVisitorRecord= (data) => {
    return http({
        url: '/saveVisitorRecord',
        method: 'POST',
        data
    })
}
/**
 * 外来人员数据详情
 */
 export const getVisRecordById= (id) => {
    return http({
        url: '/getVisRecordById'+'?id='+id,
        method: 'POST',
    })
}
/***----------------------违规记录------------------------------ */
/**
 * 违规记录保存
 */
 export const saveViolationRecord= (data) => {
    return http({
        url: '/saveViolationRecord',
        method: 'POST',
        data
    })
}
/**
 * 违规记录查询
 */
 export const queryVioRecord= (data) => {
    return http({
        url: '/queryVioRecord',
        method: 'POST',
        data
    })
}
/**
 * 获取违规项目
 */
 export const getViolationDropDowns= () => {
    return http({
        url: '/getViolationDropDowns',
        method: 'POST',
    })
}
/**
 * 违规记录数据详情
 */
 export const getVioRecordById= (id) => {
    return http({
        url: '/getVioRecordById'+'?id='+id,
        method: 'POST',
    })
}
/**-------------------------任务----------------------------- */
/**
 * 获取所有的任务
 */
 export const getTaskDataByBillType = (data) => {
    return http({
        url: 'getTaskDataByBillType',
        method: 'POST',
        data
    })
}

/**
 * 任务查询
 */
 export const queryTask= (data) => {
    return http({
        url: '/queryTask',
        method: 'POST',
        data
    })
}
/**
 * 任务删除
 */
 export const deleteBill= (params) => {
    return http({
        url: '/deleteBill?billId='+params.billId+'&billType='+params.billType,
        method: 'POST',
    })
}
/**
 * 任务派修
 */
 export const dispatchNewMatBill= (params) => {
    return http({
        url: '/dispatchNewMatBill?billId='+params.billId+'&repUserName='+params.repUserName,
        method: 'POST',
    })
}
/**
 * 任务退回
 */
 export const returnRepNode= (params) => {
    return http({
        url: '/returnRepNode?billId='+params.billId+'&desc='+params.desc,
        method: 'POST',
    })
}
/**
 * 任务完成验收
 */
 export const completeCheckNode= (params) => {
    return http({
        url: '/completeCheckNode?billId='+params.billId,
        method: 'POST',
    })
}
/**
 * 任务开始维保
 */
 export const startRepNode= (params) => {
    return http({
        url: '/startRepNode?billId='+params.billId,
        method: 'POST',
    })
}
/**
 * 任务结束维保
 */
 export const endRepNode= (params) => {
    return http({
        url: '/endRepNode?billId='+params.billId,
        method: 'POST',
    })
}
/**
 * 分配点检员
 */
 export const note= () => {
    return http({
        url: '/note',
        method: 'POST',
    })
}
/**
 * 获取维修人员
 */
 export const getRepMan= () => {
    return http({
        url: '/getRepMan',
        method: 'POST',
    })
}

/**
 * 获取点检员
 */
 export const getInspector= () => {
    return http({
        url: '/getInspector',
        method: 'POST',
    })
}
/**
 * 选择点检员后保存
 */
 export const startInspect= (params) => {
    return http({
        url: '/startInspect?billId='+params.billId+'&inspector='+params.inspector,
        method: 'POST',
    })
}
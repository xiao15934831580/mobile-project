import http from './request'
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
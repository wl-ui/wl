/**
 * @author weilan
 * @time 2020.04.22
 * @description 时间操作类filter
 */

import dayjs from "dayjs"

/**
 * 日期格式化
 * @param {*} date 
 */
const dateFormat = {
  name: 'date',
  rule: (date) => {
    return date ? dayjs(date).format('YYYY-MM-DD') : null
  }
}

/**
 * 日期时间格式化
 * @param {*} dateTime
 */
const dateTimeFormat = {
  name: 'dateTime',
  rule: (date) => {
    return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : null
  }
}

export default [dateFormat, dateTimeFormat]
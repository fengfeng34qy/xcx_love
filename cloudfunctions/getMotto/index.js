// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (data, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const result = await db.collection('motto').where({}).get()
  return result
}
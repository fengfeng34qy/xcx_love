// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (data, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  console.log(data)
  let seqNo = Number(data.seqNo)
  const result = await db.collection('love').where({seqNo}).get()
  console.log(result)
  return result
}
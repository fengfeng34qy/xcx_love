// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  let seqNo = 1000
  // 获取表白列表
  let biaobaiList = await db.collection('love').where({}).get()
  if (biaobaiList.data.length < 1) {
    // seqNo += 13
  } else {
    // 找到最大的seqNo
    for (let i = 0; i < biaobaiList.data.length; i++) {
      if (biaobaiList.data[i].seqNo > seqNo) {
        seqNo = biaobaiList.data[i].seqNo
      }
    }
  }

  // 最终使用seqNo
  seqNo += 13
  
  const result = await db.collection('love')
  .add({
    data: {
      ...event,
      seqNo,
      createTime: db.serverDate(),
      timestamp: +new Date()
    }
  })
  return {
    data: Object.assign(result, {seqNo})
  }
}
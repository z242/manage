// 获取中国时间
export function gettime(creattime){
    let newdate=typeof creattime=='string' ? new Date(creattime):creattime
    return newdate.getFullYear()+'-'+addzero(newdate.getMonth()+1)+'-'+addzero(newdate.getDate())+' '+addzero(newdate.getHours())+':'+addzero(newdate.getMinutes())+':'+addzero(newdate.getSeconds())
}

//补0
function addzero(num){
    return num<10?'0'+num:num
}
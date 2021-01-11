import request from '@/utils/request'
import { getRefer, getBeautifulSnowUser } from '@/utils/utils'

interface Action {
  a_1: string
}

// 发送弹幕
export async function postLog(action: Action) {
  let header: any = await getRefer('get', '/terminal_log/push_info_for_pc.json');
  let info: any = await getBeautifulSnowUser();

  return request({
    url: '/terminal_log/push_info_for_pc.json',
    method: 'post',
    headers: {},
    params: {},
    data: {
      t: {
        "t_1": header.platform, //terminal_category,终端类型,1:iPad，2:iphone, 3:aph 4::atv,5:aphpad, 6: pc不能够为空
        "t_2": header.device_info, //device_info,IOS获取IFDA,APH获取IMEI,ATV获取MAC地址
        "t_3": header.platform_name, //device_type,设备产商,iPhone-iphone4等,Android-如Huawei mate8,Tv-一体机或盒子型号i171s
        "t_4": header.device_info, //os_version,操作系统,iOS或Android系统版本信息,如:iOS-9.2.1,Android-4.4.0
        "t_5": header.channel, //channel_id,渠道标识,如:ATV....,不能够为空
        "t_6": header.device_id, //uid,用户id 用户id
        "t_7": info.user_phone,//user_phone,用户手机号,如果不为登录,则可为空
        "t_8": info.user_vip_state, //user_status,会员状态,4-未登录 2-已登录会员3-已登录过期会员0-已登录无效会员
        "t_9": header.app_version, //app_version,应用版本,南瓜app的版本号,不可为空
        "t_10": '',//device_version,设备版本,精确到设备厂商 Windows or Mac
        "t_11": navigator.userAgent.toLowerCase(),//box_number,盒子串号,如果是TV,则获取此值,可为空
        "t_12": header.user_id
      },
      a: {
        "a_t":"2", //log_type = operate 操作日志,行为日志
        "a_0": (new Date()).valueOf(),//log_record_time,日志记录到设备的时间
        "a_1": action.a_1,//action_detail,动作细节, A|B|click|return
        "a_2": (new Date()).valueOf(),//action_start_time,动作点击时间
        "a_3": (new Date()).valueOf(),//action_end_time,动作加载完时间
        "a_4":"0"//action_status,动作执行状态,0:成功,1:失败,当无法获取到服务器内容时,则为失败
      }
    }
  })
}
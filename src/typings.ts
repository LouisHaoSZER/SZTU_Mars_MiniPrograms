// 全局要用的类型放到这里

type IResData<T> = {
  code: number
  msg: string
  data: T
}

type WeatherData = {
  code: number
  fxLink: string
  now: Record<string, any>
  refer: Record<string, Array<string> | string>
  updateTime: string
}
/**
 * 天气预报数据
 * @param cloud 云量，单位是百分比
 * @param fxDate 预测日期
 * @param humidity 湿度，单位是百分比
 * @param iconDay 白天天气图标编码
 * @param iconNight 夜晚天气图标编码
 * @param moonPhase 月相描述
 * @param moonPhaseIcon 月相图标编码
 * @param moonrise 月亮升起时间
 * @param moonset 月亮落下时间
 * @param precip 降水量，单位是毫米
 * @param pressure 大气压，单位是百帕
 * @param sunrise 日出时间
 * @param sunset 日落时间
 * @param tempMax 最高温度，单位是摄氏度
 * @param tempMin 最低温度，单位是摄氏度
 * @param textDay 白天天气描述
 * @param textNight 夜晚天气描述
 * @param uvIndex 紫外线指数
 * @param vis 能见度，单位是公里
 * @param wind360Day 白天风向角度
 * @param wind360Night 夜晚风向角度
 * @param windDirDay 白天风向
 * @param windDirNight 夜晚风向
 * @param windScaleDay 白天风力等级
 * @param windScaleNight 夜晚风力等级
 * @param windSpeedDay 白天风速，单位是公里/小时
 * @param windSpeedNight 夜晚风速，单位是公里/小时
 */
type fData = {
  cloud: string // 云量，单位是百分比
  fxDate: string // 预测日期
  humidity: string // 湿度，单位是百分比
  iconDay: string // 白天天气图标编码
  iconNight: string // 夜晚天气图标编码
  moonPhase: string // 月相描述
  moonPhaseIcon: string // 月相图标编码
  moonrise: string // 月亮升起时间
  moonset: string // 月亮落下时间
  precip: string // 降水量，单位是毫米
  pressure: string // 大气压，单位是百帕
  sunrise: string // 日出时间
  sunset: string // 日落时间
  tempMax: string // 最高温度，单位是摄氏度
  tempMin: string // 最低温度，单位是摄氏度
  textDay: string // 白天天气描述
  textNight: string // 夜晚天气描述
  uvIndex: string // 紫外线指数
  vis: string // 能见度，单位是公里
  wind360Day: string // 白天风向角度
  wind360Night: string // 夜晚风向角度
  windDirDay: string // 白天风向
  windDirNight: string // 夜晚风向
  windScaleDay: string // 白天风力等级
  windScaleNight: string // 夜晚风力等级
  windSpeedDay: string // 白天风速，单位是公里/小时
  windSpeedNight: string // 夜晚风速，单位是公里/小时
}

type FutureWeatherData = {
  daily: fData[]
} & Omit<WeatherData, 'now'>

// uni.uploadFile文件上传参数
type IUniUploadFileOptions = {
  file?: File
  files?: UniApp.UploadFileOptionFiles[]
  filePath?: string
  name?: string
  formData?: any
}

type IUserInfo = {
  nickname?: string
  avatar?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
}

enum TestEnum {
  A = 'a',
  B = 'b',
}

export interface WeatherData {
  /** 接口调用状态码，例如 "200" 表示成功 */
  code: string

  /** 数据的更新时间，ISO 8601 格式，包含时区信息 */
  updateTime: string

  /** 指向更多天气信息的链接 */
  fxLink: string

  now: {
    /** 观测数据的时间，ISO 8601 格式，包含时区信息 */
    obsTime: string

    /** 当前温度，单位为摄氏度 */
    temp: string

    /** 体感温度，单位为摄氏度 */
    feelsLike: string

    /** 天气状况图标的代码 */
    icon: string

    /** 当前天气描述，如 "多云" */
    text: string

    /** 风向的角度，0-360 度 */
    wind360: string

    /** 风向的文字描述，例如 "东南风" */
    windDir: string

    /** 风力等级，使用国际标准表示 */
    windScale: string

    /** 风速，单位为公里/小时 */
    windSpeed: string

    /** 空气湿度，百分比表示 */
    humidity: string

    /** 降水量，单位为毫米 */
    precip: string

    /** 大气压强，单位为百帕 */
    pressure: string

    /** 能见度，单位为公里 */
    vis: string

    /** 云量，百分比表示 */
    cloud: string

    /** 露点温度，单位为摄氏度 */
    dew: string
  }

  refer: {
    /** 数据来源列表，例如 "QWeather"、"NMC" 等 */
    sources: string[]

    /** 许可证信息，通常与开发者授权相关 */
    license: string[]
  }
}

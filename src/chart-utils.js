import colorLib from '@kurkle/color'
import { DateTime } from 'luxon'

const ChartUtils = (() => {
  const settings = {
    MONTHS: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    COLORS: [
      '#4dc9f6',
      '#f67019',
      '#f53794',
      '#537bc4',
      '#acc236',
      '#166a8f',
      '#00a950',
      '#58595b',
      '#8549ba'
    ],
    CHART_COLORS: {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    }
  }

  class Utils {
    constructor (settings) {
      this._seed = Date.now()
      this.MONTHS = settings.MONTHS
      this.COLORS = settings.COLORS
      this.CHART_COLORS = settings.CHART_COLORS

      this.NAMED_COLORS = [
        this.CHART_COLORS.red,
        this.CHART_COLORS.orange,
        this.CHART_COLORS.yellow,
        this.CHART_COLORS.green,
        this.CHART_COLORS.blue,
        this.CHART_COLORS.purple,
        this.CHART_COLORS.grey
      ]
    }

    valueOrDefault (value, defaultValue) {
      return typeof value === 'undefined' ? defaultValue : value
    }

    srand (seed) {
      this._seed = seed
    }

    rand (min, max) {
      min = this.valueOrDefault(min, 0)
      max = this.valueOrDefault(max, 0)
      this._seed = (this._seed * 9301 + 49297) % 233280
      return min + (this._seed / 233280) * (max - min)
    }

    numbers (config) {
      const cfg = config || {}
      const min = this.valueOrDefault(cfg.min, 0)
      const max = this.valueOrDefault(cfg.max, 100)
      const from = this.valueOrDefault(cfg.from, [])
      const count = this.valueOrDefault(cfg.count, 8)
      const decimals = this.valueOrDefault(cfg.decimals, 8)
      const continuity = this.valueOrDefault(cfg.continuity, 1)
      const dfactor = Math.pow(10, decimals) || 0
      const data = []
      let i, value

      for (i = 0; i < count; ++i) {
        value = (from[i] || 0) + this.rand(min, max)
        if (this.rand() <= continuity) {
          data.push(Math.round(dfactor * value) / dfactor)
        } else {
          data.push(null)
        }
      }

      return data
    }

    points (config) {
      const xs = this.numbers(config)
      const ys = this.numbers(config)
      return xs.map((x, i) => ({ x, y: ys[i] }))
    }

    bubbles (config) {
      return this.points(config).map(pt => {
        pt.r = this.rand(config.rmin, config.rmax)
        return pt
      })
    }

    labels (config) {
      const cfg = config || {}
      const min = cfg.min || 0
      const max = cfg.max || 100
      const count = cfg.count || 8
      const step = (max - min) / count
      const decimals = cfg.decimals || 8
      const dfactor = Math.pow(10, decimals) || 0
      const prefix = cfg.prefix || ''
      const values = []
      let i

      for (i = min; i < max; i += step) {
        values.push(prefix + Math.round(dfactor * i) / dfactor)
      }

      return values
    }

    months (config) {
      const cfg = config || {}
      const count = cfg.count || 12
      const section = cfg.section
      const values = []
      let i, value

      for (i = 0; i < count; ++i) {
        value = this.MONTHS[Math.ceil(i) % 12]
        values.push(value.substring(0, section))
      }

      return values
    }

    color (index) {
      return this.COLORS[index % this.COLORS.length]
    }

    transparentize (value, opacity) {
      const alpha = opacity === undefined ? 0.5 : 1 - opacity
      return colorLib(value).alpha(alpha).rgbString()
    }

    namedColor (index) {
      return this.NAMED_COLORS[index % this.NAMED_COLORS.length]
    }

    newDate (days) {
      return DateTime.now().plus({ days }).toJSDate()
    }

    newDateString (days) {
      return DateTime.now().plus({ days }).toISO()
    }

    parseISODate (str) {
      return DateTime.fromISO(str)
    }
  }
  const init = config => {
    const options = Object.assign({}, settings, config)
    const utils = new Utils(options)
    return utils
  }
  return { init }
})()

export { ChartUtils }
window.ChartUtils = ChartUtils

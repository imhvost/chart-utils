# chart-utils
Utils Object from Chart.js

## Usage

### Include Scripts
```html
<script src="js/chart-utils.min.js"></script>
<script src="js/chart.min.js"></script>
```
## Initialization
```js
const Utils = ChartUtils.init()
```

## Use with Chart.js Samples
### html
```html
<canvas id="myChart" width="400" height="400"></canvas>
```
### js
```js
const Utils = ChartUtils.init()

const DATA_COUNT = 7
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 }

const labels = Utils.months({ count: 7 })
const data = {
  labels,
  datasets: [
    {
      label: 'Fully Rounded',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      borderWidth: 2,
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false
    },
    {
      label: 'Small Radius',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      borderWidth: 2,
      borderRadius: 5,
      borderSkipped: false
    }
  ]
}

console.log(JSON.stringify(data, null, 2))

const config = {
  type: 'bar',
  data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    }
  }
}

const ctx = document.getElementById('myChart').getContext('2d')
const chart = new Chart(ctx, config)
```
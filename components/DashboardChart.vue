<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { LineChart, BarChart, PieChart, AreaChart } from 'lucide-vue-next'

interface ChartType {
  id: string;
  name: string;
  icon: any;
}

interface DataPoint {
  name: string;
  value: number;
}

// Chart type options
const chartTypes: ChartType[] = [
  { id: 'area', name: 'Area', icon: AreaChart },
  { id: 'bar', name: 'Bar', icon: BarChart },
  { id: 'line', name: 'Line', icon: LineChart },
  { id: 'pie', name: 'Pie', icon: PieChart }
]

// Current active chart
const activeChart = ref<string>('area')

// Chart data
const revenueData: DataPoint[] = [
  { name: 'Jan', value: 18500 },
  { name: 'Feb', value: 21300 },
  { name: 'Mar', value: 19800 },
  { name: 'Apr', value: 23600 },
  { name: 'May', value: 25400 },
  { name: 'Jun', value: 28900 },
  { name: 'Jul', value: 25100 },
  { name: 'Aug', value: 27500 },
  { name: 'Sep', value: 32100 },
  { name: 'Oct', value: 35600 },
  { name: 'Nov', value: 33800 },
  { name: 'Dec', value: 39200 }
]

const usersData: DataPoint[] = [
  { name: 'Jan', value: 550 },
  { name: 'Feb', value: 620 },
  { name: 'Mar', value: 680 },
  { name: 'Apr', value: 750 },
  { name: 'May', value: 830 },
  { name: 'Jun', value: 920 },
  { name: 'Jul', value: 980 },
  { name: 'Aug', value: 1050 },
  { name: 'Sep', value: 1150 },
  { name: 'Oct', value: 1230 },
  { name: 'Nov', value: 1310 },
  { name: 'Dec', value: 1450 }
]

const projectsData: DataPoint[] = [
  { name: 'Completed', value: 63 },
  { name: 'In Progress', value: 27 },
  { name: 'Planning', value: 10 }
]

// Chart canvas and rendering logic
const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: any = null

// Format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Function to draw area chart
const drawAreaChart = (canvas: HTMLCanvasElement, data: DataPoint[]): void => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Find max value for scaling
  const maxValue = Math.max(...data.map(item => item.value))

  // Draw axes
  ctx.beginPath()
  ctx.strokeStyle = '#e2e8f0'
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)
  ctx.lineTo(width - padding, height - padding)
  ctx.stroke()

  // Draw area
  ctx.beginPath()
  const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
  gradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)')
  gradient.addColorStop(1, 'rgba(99, 102, 241, 0.01)')

  ctx.fillStyle = gradient

  // Start point
  ctx.moveTo(padding, height - padding)

  // Draw points
  data.forEach((point, index) => {
    const x = padding + (index * (chartWidth / (data.length - 1)))
    const y = height - padding - (point.value / maxValue) * chartHeight
    ctx.lineTo(x, y)
  })

  // Complete the area
  ctx.lineTo(width - padding, height - padding)
  ctx.closePath()
  ctx.fill()

  // Draw the line on top
  ctx.beginPath()
  ctx.strokeStyle = '#6366f1'
  ctx.lineWidth = 2
  data.forEach((point, index) => {
    const x = padding + (index * (chartWidth / (data.length - 1)))
    const y = height - padding - (point.value / maxValue) * chartHeight

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()

  // Draw data points
  data.forEach((point, index) => {
    const x = padding + (index * (chartWidth / (data.length - 1)))
    const y = height - padding - (point.value / maxValue) * chartHeight

    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#6366f1'
    ctx.lineWidth = 2
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  })

  // Draw x-axis labels
  ctx.fillStyle = '#64748b'
  ctx.font = '10px sans-serif'
  ctx.textAlign = 'center'
  data.forEach((point, index) => {
    const x = padding + (index * (chartWidth / (data.length - 1)))
    if (index % 2 === 0 || data.length <= 6) { // Skip every other label if many points
      ctx.fillText(point.name, x, height - padding + 15)
    }
  })

  // Draw y-axis labels
  ctx.textAlign = 'right'
  const ySteps = 5
  for (let i = 0; i <= ySteps; i++) {
    const value = maxValue * (i / ySteps)
    const y = height - padding - (i / ySteps) * chartHeight
    ctx.fillText(formatCurrency(value), padding - 10, y + 3)
  }
}

// Function to draw bar chart
const drawBarChart = (canvas: HTMLCanvasElement, data: DataPoint[]): void => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Find max value for scaling
  const maxValue = Math.max(...data.map(item => item.value))

  // Draw axes
  ctx.beginPath()
  ctx.strokeStyle = '#e2e8f0'
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)
  ctx.lineTo(width - padding, height - padding)
  ctx.stroke()

  // Bar width with some space between bars
  const barWidth = (chartWidth / data.length) * 0.7
  const barSpacing = (chartWidth / data.length) * 0.3

  // Draw bars
  data.forEach((point, index) => {
    const x = padding + (index * (chartWidth / data.length)) + barSpacing / 2
    const barHeight = (point.value / maxValue) * chartHeight
    const y = height - padding - barHeight

    // Draw bar with rounded corners
    ctx.beginPath()
    ctx.fillStyle = '#6366f1'

    // Use roundRect method directly as it's supported in modern browsers
    ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0])
    ctx.fill()

    // Add label below bar
    ctx.fillStyle = '#64748b'
    ctx.font = '10px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(point.name, x + barWidth / 2, height - padding + 15)
  })

  // Draw y-axis labels
  ctx.textAlign = 'right'
  ctx.fillStyle = '#64748b'
  const ySteps = 5
  for (let i = 0; i <= ySteps; i++) {
    const value = maxValue * (i / ySteps)
    const y = height - padding - (i / ySteps) * chartHeight
    ctx.fillText(formatCurrency(value), padding - 10, y + 3)
  }
}

// Function to draw line chart 
const drawLineChart = (canvas: HTMLCanvasElement, data: DataPoint[]): void => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Find max value for scaling
  const maxValue = Math.max(...data.map(item => item.value))

  // Draw axes
  ctx.beginPath()
  ctx.strokeStyle = '#e2e8f0'
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)
  ctx.lineTo(width - padding, height - padding)
  ctx.stroke()

  // Draw the grid lines
  ctx.beginPath()
  ctx.setLineDash([2, 2])
  ctx.strokeStyle = '#e2e8f0'

  // Horizontal grid lines
  const ySteps = 5
  for (let i = 1; i <= ySteps; i++) {
    const y = height - padding - (i / ySteps) * chartHeight
    ctx.moveTo(padding, y)
    ctx.lineTo(width - padding, y)
  }
  ctx.stroke()
  ctx.setLineDash([])

  // Draw the line
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = '#10b981' // Green color

  data.forEach((point, index) => {
    const x = padding + (index * (chartWidth / (data.length - 1)))
    const y = height - padding - (point.value / maxValue) * chartHeight

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()

  // Draw data points
  data.forEach((point, index) => {
    const x = padding + (index * (chartWidth / (data.length - 1)))
    const y = height - padding - (point.value / maxValue) * chartHeight

    // Draw outer circle
    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#10b981'
    ctx.lineWidth = 2
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    // Draw active point with fill
    if (index === data.length - 1) {
      ctx.beginPath()
      ctx.fillStyle = '#10b981'
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
    }
  })

  // Draw x-axis labels
  ctx.fillStyle = '#64748b'
  ctx.font = '10px sans-serif'
  ctx.textAlign = 'center'
  data.forEach((point, index) => {
    const x = padding + (index * (chartWidth / (data.length - 1)))
    if (index % 2 === 0 || data.length <= 6) {
      ctx.fillText(point.name, x, height - padding + 15)
    }
  })

  // Draw y-axis labels
  ctx.textAlign = 'right'
  for (let i = 0; i <= ySteps; i++) {
    const value = maxValue * (i / ySteps)
    const y = height - padding - (i / ySteps) * chartHeight
    ctx.fillText(value.toLocaleString(), padding - 10, y + 3)
  }
}

// Function to draw pie chart
const drawPieChart = (canvas: HTMLCanvasElement, data: DataPoint[]): void => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Center of pie chart
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) / 2 - 40

  // Colors for pie slices
  const colors = ['#10b981', '#6366f1', '#f59e0b', '#ef4444']

  // Draw pie slices
  let startAngle = 0

  data.forEach((item, index) => {
    // Calculate slice angle
    const sliceAngle = (2 * Math.PI * item.value) / total

    // Draw slice
    ctx.beginPath()
    ctx.fillStyle = colors[index % colors.length]
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
    ctx.closePath()
    ctx.fill()

    // Calculate midpoint angle for label positioning
    const midAngle = startAngle + sliceAngle / 2

    // Draw label line
    const labelRadius = radius + 20
    const labelX = centerX + Math.cos(midAngle) * labelRadius
    const labelY = centerY + Math.sin(midAngle) * labelRadius

    ctx.beginPath()
    ctx.strokeStyle = '#64748b'
    ctx.moveTo(centerX + Math.cos(midAngle) * radius, centerY + Math.sin(midAngle) * radius)
    ctx.lineTo(labelX, labelY)
    ctx.stroke()

    // Draw label
    ctx.fillStyle = '#64748b'
    ctx.font = '12px sans-serif'
    ctx.textAlign = labelX > centerX ? 'left' : 'right'
    ctx.textBaseline = 'middle'
    const percentage = Math.round((item.value / total) * 100)
    ctx.fillText(`${item.name} (${percentage}%)`, labelX + (labelX > centerX ? 5 : -5), labelY)

    // Update start angle for next slice
    startAngle += sliceAngle
  })
}

// Function to update chart based on active type
const updateChart = (): void => {
  if (!chartCanvas.value) return

  // Adjust canvas for high DPI displays
  const canvas = chartCanvas.value
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.scale(dpr, dpr)

  // Draw different chart types
  switch (activeChart.value) {
    case 'area':
      drawAreaChart(canvas, revenueData)
      break
    case 'bar':
      drawBarChart(canvas, revenueData)
      break
    case 'line':
      drawLineChart(canvas, usersData)
      break
    case 'pie':
      drawPieChart(canvas, projectsData)
      break
  }
}

// Update chart on mount and when chart type changes
onMounted(() => {
  window.addEventListener('resize', updateChart)
  updateChart()

  // Add cleanup to remove event listener when component is unmounted
  return () => {
    window.removeEventListener('resize', updateChart)
  }
})

// Update chart when active chart changes
const setActiveChart = (chartId: string): void => {
  activeChart.value = chartId
  // Use nextTick to ensure DOM updates before redrawing
  // In the full component, import nextTick from Vue
  setTimeout(updateChart, 0)
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-2">
        {{ activeChart === 'area' ? 'Revenue Overview' :
          activeChart === 'bar' ? 'Revenue by Month' :
            activeChart === 'line' ? 'User Growth' :
              'Project Status' }}
      </h2>
      <div class="flex space-x-2">
        <button v-for="type in chartTypes" :key="type.id" @click="setActiveChart(type.id)"
          class="px-3 py-1 rounded flex items-center gap-1 transition-colors"
          :class="activeChart === type.id
            ? 'bg-primary text-primary-foreground font-medium shadow-sm'
            : 'bg-muted hover:bg-muted/90 text-foreground dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'">
          <component :is="type.icon" class="h-4 w-4" />
          <span>{{ type.name }}</span>
        </button>
      </div>
    </div>

    <div class="h-80">
      <canvas ref="chartCanvas" class="w-full h-full"></canvas>
    </div>

    <div class="mt-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-3 border rounded-lg bg-muted/25">
          <div class="text-muted-foreground text-sm">Total Revenue</div>
          <div class="text-lg font-bold">$298,500</div>
          <div class="text-green-500 text-xs">+12.5% from last year</div>
        </div>

        <div class="p-3 border rounded-lg bg-muted/25">
          <div class="text-muted-foreground text-sm">Active Users</div>
          <div class="text-lg font-bold">1,450</div>
          <div class="text-green-500 text-xs">+18.2% from last year</div>
        </div>

        <div class="p-3 border rounded-lg bg-muted/25">
          <div class="text-muted-foreground text-sm">Avg. Response Time</div>
          <div class="text-lg font-bold">1.8h</div>
          <div class="text-green-500 text-xs">-0.3h from last month</div>
        </div>

        <div class="p-3 border rounded-lg bg-muted/25">
          <div class="text-muted-foreground text-sm">Completion Rate</div>
          <div class="text-lg font-bold">63%</div>
          <div class="text-green-500 text-xs">+5.8% from last quarter</div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <div class="stat-cards">
      <div class="stat-card" v-for="card in statCards" :key="card.label">
        <div class="card-icon" :style="{ background: card.bg }">
          <el-icon :size="24"><component :is="card.icon" /></el-icon>
        </div>
        <div class="card-info">
          <span class="card-label">{{ card.label }}</span>
          <span class="card-value" :ref="setCountUpRef(card.key)">
            {{ card.prefix }}{{ card.displayValue }}{{ card.suffix }}
          </span>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="chart-area">
      <div class="chart-card">
        <h3 class="chart-title">各分类商品数量</h3>
        <div ref="barChartRef" class="chart-box"></div>
      </div>
      <div class="chart-card">
        <h3 class="chart-title">商品状态分布</h3>
        <div ref="pieChartRef" class="chart-box"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'
import { CountUp } from 'countup.js'
import { Goods, Grid, Check, Close, Box, Money } from '@element-plus/icons-vue'
import request from '@/service'
import { useMenuStore } from '@/stores/menu'

interface DashboardStats {
  totalProducts: number
  totalCategories: number
  onSaleCount: number
  offSaleCount: number
  totalStock: number
  totalValue: number
  categoryProductCount: { name: string; value: number }[]
  categoryStats: { name: string; count: number; stockValue: number }[]
}

const stats = ref<DashboardStats>({
  totalProducts: 0,
  totalCategories: 0,
  onSaleCount: 0,
  offSaleCount: 0,
  totalStock: 0,
  totalValue: 0,
  categoryProductCount: [],
  categoryStats: [],
})

const barChartRef = ref<HTMLElement>()
const pieChartRef = ref<HTMLElement>()
let barChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null
const countupRefs: Record<string, HTMLElement | null> = {}
const countupInstances: CountUp[] = []

const setCountUpRef = (key: string) => (el: unknown) => {
  countupRefs[key] = el as HTMLElement | null
}

const statCards = ref([
  {
    key: 'totalProducts',
    label: '商品总数',
    icon: Goods,
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    prefix: '',
    suffix: '',
    displayValue: 0,
  },
  {
    key: 'totalCategories',
    label: '商品分类',
    icon: Grid,
    bg: 'linear-gradient(135deg, #f093fb, #f5576c)',
    prefix: '',
    suffix: '',
    displayValue: 0,
  },
  {
    key: 'onSaleCount',
    label: '在售商品',
    icon: Check,
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    prefix: '',
    suffix: '',
    displayValue: 0,
  },
  {
    key: 'offSaleCount',
    label: '下架商品',
    icon: Close,
    bg: 'linear-gradient(135deg, #fa709a, #fee140)',
    prefix: '',
    suffix: '',
    displayValue: 0,
  },
  {
    key: 'totalStock',
    label: '库存总量',
    icon: Box,
    bg: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    prefix: '',
    suffix: '',
    displayValue: 0,
  },
  {
    key: 'totalValue',
    label: '库存总值',
    icon: Money,
    bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    prefix: '¥',
    suffix: '',
    displayValue: 0,
  },
])

const fetchStats = async () => {
  const res = await request.get<DashboardStats>('/api/dashboard/stats')
  stats.value = res
  updateCardValues()
}

const updateCardValues = async () => {
  const s = stats.value
  const values: Record<string, number> = {
    totalProducts: s.totalProducts,
    totalCategories: s.totalCategories,
    onSaleCount: s.onSaleCount,
    offSaleCount: s.offSaleCount,
    totalStock: s.totalStock,
    totalValue: s.totalValue,
  }

  statCards.value.forEach((card) => {
    card.displayValue = values[card.key] || 0
  })

  await nextTick()
  startCountUp(values)
}

const startCountUp = (values: Record<string, number>) => {
  countupInstances.forEach((c) => c.reset())
  countupInstances.length = 0

  Object.entries(values).forEach(([key, endVal]) => {
    const el = countupRefs[key]
    if (!el) return
    const instance = new CountUp(el, endVal, {
      duration: 1.5,
      enableScrollSpy: false,
      useEasing: true,
    })
    if (!instance.error) {
      instance.start()
      countupInstances.push(instance)
    }
  })
}

const initBarChart = () => {
  if (!barChartRef.value) return
  barChart = echarts.init(barChartRef.value)
  updateBarChart()
}

const updateBarChart = () => {
  if (!barChart) return
  const data = stats.value.categoryProductCount
  barChart.setOption({
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '8%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLabel: { color: '#909399' },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLabel: { color: '#909399' },
    },
    series: [
      {
        data: data.map((d) => d.value),
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#667eea' },
            { offset: 1, color: '#764ba2' },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#764ba2' },
              { offset: 1, color: '#667eea' },
            ]),
          },
        },
      },
    ],
  })
}

const initPieChart = () => {
  if (!pieChartRef.value) return
  pieChart = echarts.init(pieChartRef.value)
  updatePieChart()
}

const updatePieChart = () => {
  if (!pieChart) return
  const s = stats.value
  pieChart.setOption({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: '#909399' } },
    series: [
      {
        name: '商品状态',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 6, borderColor: 'transparent', borderWidth: 3 },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 16, fontWeight: 'bold' },
        },
        data: [
          { value: s.onSaleCount, name: '在售', itemStyle: { color: '#4facfe' } },
          { value: s.offSaleCount, name: '下架', itemStyle: { color: '#fa709a' } },
        ],
      },
    ],
  })
}

const handleResize = () => {
  barChart?.resize()
  pieChart?.resize()
}

const menuStore = useMenuStore()

watch(
  () => menuStore.menuList,
  () => {
    nextTick(() => {
      initBarChart()
      initPieChart()
      updateBarChart()
      updatePieChart()
    })
  },
)

onMounted(async () => {
  await fetchStats()
  nextTick(() => {
    initBarChart()
    initPieChart()
  })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  barChart?.dispose()
  pieChart?.dispose()
  countupInstances.forEach((c) => c.reset())
})
</script>

<style lang="less" scoped>
.dashboard {
  padding: 24px;
  height: 100%;
  overflow-y: auto;

  .stat-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 24px;

    .stat-card {
      background: var(--bg-card);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-card);
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition:
        background-color var(--transition),
        box-shadow var(--transition),
        transform 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-hover);
      }

      .card-icon {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        flex-shrink: 0;
      }

      .card-info {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;

        .card-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .card-value {
          font-size: 28px;
          font-weight: 700;
          color: var(--text-primary);
          transition: color var(--transition);
          white-space: nowrap;
        }
      }
    }
  }

  .chart-area {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 20px;

    .chart-card {
      background: var(--bg-card);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-card);
      padding: 24px;
      transition:
        background-color var(--transition),
        box-shadow var(--transition);

      .chart-title {
        margin: 0 0 16px;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-primary);
        transition: color var(--transition);
      }

      .chart-box {
        width: 100%;
        height: 320px;
      }
    }
  }
}

@media (max-width: 1200px) {
  .dashboard {
    .stat-cards {
      grid-template-columns: repeat(2, 1fr);
    }
    .chart-area {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
    .stat-cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>

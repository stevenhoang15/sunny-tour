'use client'

import {
  SearchCacThuongHieuDashboard,
  ThuongHieuDashboardDto,
} from '@/interface/thuongHieu/thuongHieu'
import { thuongHieuService } from '@/services/thuongHieu/thuongHieu.service'
import { useEffect, useRef, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5index from '@amcharts/amcharts5/index'
import { Button, Col, DatePicker, Divider, Row, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const PhanAnhTheoThuongHieuChart: React.FC = () => {
  const chartRefPhanAnh = useRef<am5.Root | null>(null)
  const [chartData, setChartData] = useState<
    { country: string; year2004: number; year2005: number }[]
  >([])
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const years = [
    'Tất cả',
    ...Array.from({ length: 10 }, (_, i) => currentYear - i),
  ]

  const fetchData = async () => {
    try {
      const formSearch: SearchCacThuongHieuDashboard = {
        nam: selectedYear,
      }
      const response = await thuongHieuService.PhanAnhTheoCacThungHieu(
        formSearch
      )
      if (response?.data) {
        const data = response.data.map((item: ThuongHieuDashboardDto) => ({
          country: item.tenThuongHieu,
          year2004: item.website,
          year2005: item.sanPham,
        }))

        setChartData(data)
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    if (typeof window === 'undefined') return // Đảm bảo chỉ chạy trên client

    // Kiểm tra và hủy Root cũ trước khi tạo mới
    if (chartRefPhanAnh.current) {
      chartRefPhanAnh.current.dispose()
      chartRefPhanAnh.current = null // Xóa tham chiếu cũ
    }

    // Tạo Root mới
    const root = am5.Root.new('chartdivcacPhanAnh')
    chartRefPhanAnh.current = root // Lưu lại tham chiếu Root mới
    root.setThemes([am5themes_Animated.new(root)])
    root._logo!.dispose() // Ẩn logo của amCharts
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        paddingLeft: 0,
        layout: root.verticalLayout,
      })
    )

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set("scrollbarX", am5.Scrollbar.new(root, {
    //   orientation: "horizontal"
    // }));

    const data = chartData

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 70,
      minorGridEnabled: true,
    })

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'country',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {
          themeTags: ['axis'],
          animationDuration: 200,
        }),
      })
    )

    xRenderer.grid.template.setAll({
      location: 1,
    })

    xAxis.data.setAll(data)

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    )

    const customColors = {
      series0: am5.color(0x4cc9fe),
      series1: am5.color(0xf5f0cd),
    }

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    const series0 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Income',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'year2004',
        categoryXField: 'country',
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          labelText: 'Website: {valueY}',
        }),
      })
    )

    series0.columns.template.setAll({
      width: am5.percent(80),
      tooltipY: 0,
      strokeOpacity: 0,
    })

    series0.columns.template.adapters.add('fill', () => customColors.series0)
    series0.columns.template.adapters.add('stroke', () => customColors.series0)
    series0.data.setAll(data)

    const series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Income',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'year2005',
        categoryXField: 'country',
        clustered: false,
        tooltip: am5.Tooltip.new(root, {
          labelText: 'Sản phẩm: {valueY}',
        }),
      })
    )

    series1.columns.template.setAll({
      width: am5.percent(50),
      tooltipY: 0,
      strokeOpacity: 0,
    })

    series1.columns.template.adapters.add('fill', () => customColors.series1)
    series1.columns.template.adapters.add('stroke', () => customColors.series1)
    series1.data.setAll(data)

    const cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}))

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100)
    series0.appear()
    series1.appear()
  }, [chartData])

  return (
    <>
      <Row gutter={16} justify="end">
        <Col span={5}>
          <Select
            style={{ width: '100%' }}
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
          >
            {years.map((year) => (
              <Select.Option key={year} value={year === 'Tất cả' ? null : year}>
                {year}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={5}>
          <Select
            style={{ width: '100%' }}
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
          >
            {years.map((year) => (
              <Select.Option key={year} value={year === 'Tất cả' ? null : year}>
                {year}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={3}>
          <Button type="primary" style={{ width: '100%' }} onClick={fetchData}>
            <SearchOutlined /> Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Divider />
      <div
        id="chartdivcacPhanAnh"
        style={{ width: '100%', height: '500px' }}
      ></div>
    </>
  )
}

export default PhanAnhTheoThuongHieuChart

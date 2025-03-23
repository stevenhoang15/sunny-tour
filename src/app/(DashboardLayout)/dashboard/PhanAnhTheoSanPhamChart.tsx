'use client'

import { useEffect, useRef, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { Button, Col, DatePicker, Divider, Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { khieuNaiPhanAnhService } from '@/services/khieuNaiPhanAnh/khieuNaiPhanAnh.service'
import dayjs from 'dayjs'

const PhanAnhTheoSanPhamChart: React.FC = () => {
  const [dates, setDates] = useState<[string, string] | null>(null)
  const [data, setData] = useState<
    { category: string; percent: number; quantity: number }[]
  >([])
  const chartRef = useRef<am5.Root | null>(null)
  const seriesRef = useRef<am5percent.PieSeries | null>(null)

  const fetchData = async () => {
    const startDate = dates?.[0]
    const endDate = dates?.[1]

    const response = await khieuNaiPhanAnhService.GetComplaintsPieChart(
      startDate,
      endDate
    )
    if (response.status) {
      setData(response.data)
    }
  }

  useEffect(() => {
    const root = am5.Root.new('pieChartDiv')
    root.setThemes([am5themes_Animated.new(root)])
    root._logo!.dispose(); // Ẩn logo của amCharts
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    )

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'percent',
        categoryField: 'category',
      })
    )

     // Định nghĩa bảng màu tùy chỉnh
    const customColors = [
      am5.color(0xff5733), // Màu đỏ cam
      am5.color(0x33ff57), // Màu xanh lá
      am5.color(0x3357ff), // Màu xanh dương
      am5.color(0xff33ff), // Màu hồng
      am5.color(0xffff33), // Màu vàng
      am5.color(0x33ffff), // Màu xanh ngọc
    ]

    // Cập nhật màu của các phần trong biểu đồ
    series.slices.template.adapters.add('fill', (fill, target) => {
      const dataItem = target.dataItem as am5.DataItem<am5percent.IPieSeriesDataItem> | undefined
      if (dataItem) {
        const index = series.dataItems.indexOf(dataItem)
        return customColors[index % customColors.length] // Xoay vòng màu
      }
      return fill
    })

    series.slices.template.setAll({
      stroke: am5.color(0xffffff),
      strokeWidth: 2,
      strokeOpacity: 1,
    })

    series.slices.template.adapters.add('fill', (fill, target) => {
      const dataItem = target.dataItem as
        | am5.DataItem<am5percent.IPieSeriesDataItem>
        | undefined
      if (dataItem) {
        return (
          chart.get('colors')?.getIndex(series.dataItems.indexOf(dataItem)) ||
          fill
        )
      }
      return fill
    })

    series.slices.template.set(
      'tooltipText',
      '{category}: {percent}%\n (Số lượng phản ánh: {quantity})'
    )

    chartRef.current = root
    seriesRef.current = series
    fetchData()
    return () => {
      root.dispose()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [])

  useEffect(() => {
    if (seriesRef.current) {
      seriesRef.current.data.setAll(data)
    }
  }, [data])

  return (
    <div>
      <Row gutter={16}>
        <Col span={20}>
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            format={'DD/MM/YYYY'}
            onChange={(dates) => {
              if (dates) {
                const startDate = dayjs(dates[0]).toDate()
                const endDate = dayjs(dates[1]).toDate()
                startDate.setHours(startDate.getHours() + 7)
                endDate.setHours(endDate.getHours() + 7)
                setDates([startDate.toISOString(), endDate.toISOString()])
              } else {
                setDates(null)
              }
            }}
          />
        </Col>
        <Col span={4}>
          <Button type="primary" style={{ width: '100%' }} onClick={fetchData}>
            <SearchOutlined /> Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Divider />
      <div id="pieChartDiv" style={{ width: '100%', height: '500px' }}></div>
    </div>
  )
}

export default PhanAnhTheoSanPhamChart

'use client'
import { useEffect, useState } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import { Button, Col, DatePicker, Divider, Row, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { khieuNaiPhanAnhService } from '@/services/khieuNaiPhanAnh/khieuNaiPhanAnh.service'
import { DropdownOption } from '@/interface/general'
import { DaiDienThuongHieuDashboardDto } from '@/interface/Dashboard/dashboard'
import { daiDienThuongHieuService } from '@/services/daiDienThuongHieu/daiDienThuongHieu.service'
import dayjs from 'dayjs'

const PhanAnhTheoDaiDienThuongHieuChart: React.FC = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [brandRepresentativeId, setBrandRepresentativeId] = useState<string>()
  const [brandRepresentatives, setBrandRepresentatives] = useState<
    DropdownOption[]
  >([])
  const [data, setData] = useState<DaiDienThuongHieuDashboardDto | null>()

  const fetchData = async () => {
    const response =
      await khieuNaiPhanAnhService.GetBrandRepresentativeComplaintsPieChart(
        brandRepresentativeId,
        year
      )
    if (response.status) {
      setData(response.data)
    }
  }

  useEffect(() => {
    fetchData()
    daiDienThuongHieuService
      .getDropdown()
      .then((res) => {
        if (res.status) {
          setBrandRepresentatives(res.data)
          setBrandRepresentativeId(res?.data[0]?.value as string | undefined)
        }
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    if (!data) return

    const root = am5.Root.new('brandpiechartdiv')
    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    )

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'percent',
        categoryField: 'type',
        tooltip: am5.Tooltip.new(root, {}),
      })
    )

    series.data.setAll([
      {
        type: 'Sản phẩm',
        percent: data.productPercent,
        tooltipText: `Phản ánh sản phẩm: ${data.product}`,
      },
      {
        type: 'Website',
        percent: data.websitePercent,
        tooltipText: `Phản ánh website: ${data.website}`,
      },
    ])

    series.slices.template.setAll({
      tooltipText: '{tooltipText}',
    })

    return () => {
      root.dispose()
    }
  }, [data])

  if (!data) {
    return <p className="text-center">Đang tải dữ liệu...</p>
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={10}>
          <Select
            style={{ width: '100%' }}
            placeholder="Chọn thương hiệu "
            showSearch
            optionFilterProp="children"
            onChange={(value) => {
              setBrandRepresentativeId(value)
            }}
            value={brandRepresentativeId}
          >
            {brandRepresentatives.map((item, index) => (
              <Select.Option key={`brand${index}`} value={item.value}>
                {item.text}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={10}>
          <DatePicker
            style={{ width: '100%' }}
            onChange={(value) => {
              const date = value.toDate()
              setYear(date.getFullYear())
            }}
            defaultValue={dayjs(new Date().toISOString(), 'YYYY')}
            picker="year"
          />
        </Col>
        <Col span={4}>
          <Button type="primary" style={{ width: '100%' }} onClick={fetchData}>
            <SearchOutlined /> Tìm kiếm
          </Button>
        </Col>
      </Row>
      <Divider />
      <div
        id="brandpiechartdiv"
        style={{ width: '100%', height: '400px' }}
      ></div>
    </div>
  )
}

export default PhanAnhTheoDaiDienThuongHieuChart

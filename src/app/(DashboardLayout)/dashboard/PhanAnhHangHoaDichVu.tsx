
'use client'
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { KhieuNaiDashboard } from "@/interface/khieuNaiPhanAnh/khieuNaiPhanAnh";
import { SearchCacThuongHieuDashboard } from "@/interface/thuongHieu/thuongHieu";
import { khieuNaiPhanAnhService } from "@/services/khieuNaiPhanAnh/khieuNaiPhanAnh.service";
import { useEffect, useRef, useState } from "react";
import { Button, Col, DatePicker, Divider, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const PhanAnhHangHoaDichVu = () => {
    const chartRef = useRef<am5.Root | null>(null);
    const [chartData, setChartData] = useState<{ country: string; value: number }[]>([]);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const years = ["Tất cả", ...Array.from({ length: 10 }, (_, i) => currentYear - i)];

    const fetchData = async () => {
        try {
            const formSearch: SearchCacThuongHieuDashboard = {
                nam: selectedYear
            };
            const response = await khieuNaiPhanAnhService.GetNhomHangHoaDichVu(formSearch);
            if (response?.data) {
                const data = response.data.map((item: KhieuNaiDashboard) => ({
                    country: item.trangThaiPhanAnh,
                    value: item.soLuong
                }));

                setChartData(data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return; // Đảm bảo chỉ chạy trên client
        if (chartRef.current) return; // Tránh khởi tạo lại nhiều lần

        const root = am5.Root.new("chartdivHangHoaDichVu");
        chartRef.current = root; // Lưu lại root để cleanup khi unmount

        root.setThemes([am5themes_Animated.new(root)]);
        root._logo!.dispose(); // Ẩn logo của amCharts

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true,
                paddingLeft: 0,
                paddingRight: 1,
            })
        );

        const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        const xRenderer = am5xy.AxisRendererX.new(root, {

            minGridDistance: 30,
            minorGridEnabled: true,
        });

        xRenderer.labels.template.setAll({
            rotation: -35,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15,
        });

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: "country",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {}),
            })
        );

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0.3,
                renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 }),
            })
        );

        // Màu sắc tùy chỉnh
        const customColors = [
            am5.color(0x88C273),
            am5.color(0xD4BDAC),
            am5.color(0x536493),
            am5.color(0x37AFE1),
            am5.color(0xFFA24C),
            am5.color(0xFEEC37),
            am5.color(0xFF77B7),
            am5.color(0xF95454),
        ];

        const series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Series 1",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                sequencedInterpolation: true,
                categoryXField: "country",
                tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" }),
            })
        );

        series.columns.template.setAll({
            cornerRadiusTL: 5,
            cornerRadiusTR: 5,
            strokeOpacity: 0,
        });

        series.columns.template.adapters.add("fill", (fill, target) => {
            const index = series.columns.indexOf(target) % customColors.length;
            return customColors[index];
        });

        series.columns.template.adapters.add("stroke", (stroke, target) => {
            const index = series.columns.indexOf(target) % customColors.length;
            return customColors[index];
        });

        const data = chartData;

        xAxis.data.setAll(data);
        series.data.setAll(data);

        series.appear(1000);
        chart.appear(1000, 100);

        return () => {
            root.dispose(); // Dọn dẹp khi component unmount
            chartRef.current = null;
        };
    }, [chartData]);

    return (
        <>
            <Row gutter={16} justify="end">
                <Col span={8}>
                <Select
                  style={{ width: "100%" }}
                  value={selectedYear}
                  onChange={(value) => setSelectedYear(value)}
                >
                  {years.map((year) => (
                      <Select.Option key={year} value={year === "Tất cả" ? null : year}>
                          {year}
                      </Select.Option>
                  ))}
              </Select>
                </Col>
                <Col span={4}>
                    <Button type="primary" style={{width: '100%'}} onClick={fetchData}><SearchOutlined /> Tìm kiếm</Button>
                </Col>
            </Row>     
            <Divider />
           <div id="chartdivHangHoaDichVu" style={{ width: "100%", height: "500px" }}></div>
        </>
    )
}

export default PhanAnhHangHoaDichVu;
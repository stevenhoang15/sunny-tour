"use client";

import { CacSanPhamViPhamDashboard, SearchCacSanPhamViPhamboard } from "@/interface/sanPham/sanPham";
import { DiaPhuongDashboardDto, SearchDiaPhuongDashboard } from "@/interface/thuongHieu/thuongHieu";
import { sanPhamService } from "@/services/sanPham/sanPham.service";
import { thuongHieuService } from "@/services/thuongHieu/thuongHieu.service";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { Button, Col, DatePicker, Divider, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const CacSanPhamViPhamTable: React.FC = () => {
    const [data, setData] = useState<CacSanPhamViPhamDashboard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const years = ["Tất cả", ...Array.from({ length: 10 }, (_, i) => currentYear - i)];

    const fetchData = async () => {
        try {
            const formSearch: SearchCacSanPhamViPhamboard = {
                nam: selectedYear
            };
            sanPhamService.CacSanPhamViPhamTable(formSearch) // Thay đổi URL theo API thực tế
                .then((data) => {
                    setData(data.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        
        {
            title: "Loại phản ánh",
            dataIndex: "nhom",
            key: "nhom",
        },
        {
            title: "Số sản phẩm vi phạm",
            dataIndex: "soLuong",
            key: "soLuong",
            
            
        },
        
    ];

    return (
        <div>
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
            <Table dataSource={data} columns={columns} loading={loading} rowKey="sanPhamViPham" />
        </div>
    );
};

export default CacSanPhamViPhamTable;
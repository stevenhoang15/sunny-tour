"use client";

import Flex from "@/components/shared-components/Flex";
import { searchChuyenMucData } from "@/interface/ChuyenMuc/ChuyenMuc";
import { chuyenMucService } from "@/services/ChuyenMuc/ChuyenMuc.service";
import { downloadFileFromBase64 } from "@/utils/fileDownload";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import classes from "./page.module.css";
interface SearchProps {
    handleSearch: (values: searchChuyenMucData) => void;
}

const Search: React.FC<SearchProps> = ({ handleSearch }) => {
    const [form] = Form.useForm();
    const handleExport = async () => {
        const excelBase64 = await chuyenMucService.exportExcel();
        downloadFileFromBase64(excelBase64.data, "Danh sách chuyên mục.xlsx");
    };
    const onSearch = () => {
        form.validateFields().then((values) => {
            handleSearch(values);
        });
    };
    return (
        <>
            <Card
                className={`${classes.customCardShadow} ${classes.mgButton10}`}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    //onFinish={onSearch}
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                key={1}
                                label={<strong>Tên chuyên mục</strong>}
                                name="tenChuyenMuc"
                            >
                                <Input placeholder="Nhập tên chuyên mục" />
                            </Form.Item>

                            <Form.Item
                                key={1}
                                label={<strong>Mã chuyên mục</strong>}
                                name="maChuyenMuc"
                            >
                                <Input placeholder="Nhập mã chuyên mục" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Flex alignItems="center" justifyContent="center">
                        <Button
                            type="primary"
                            htmlType="button"
                            icon={<SearchOutlined />}
                            className={classes.mgright5}
                            size="small"
                            onClick={onSearch}
                        >
                            Tìm kiếm
                        </Button>
                        <Button
                            onClick={handleExport}
                            type="primary"
                            icon={<DownloadOutlined />}
                            className={`${classes.mgright5} ${classes.colorKetXuat}`}
                            size="small"
                        >
                            Kết xuất
                        </Button>
                    </Flex>
                </Form>
            </Card>
        </>
    );
};
export default Search;

import React from "react";
import { Drawer, Descriptions } from "antd";
import { ChuyenMucType } from "@/interface/ChuyenMuc/ChuyenMuc";

interface DetailDrawerProps {
    isOpen: boolean;
    data?: ChuyenMucType;
    onClose: () => void;
}

const DrawerChiTiet: React.FC<DetailDrawerProps> = ({
    isOpen,
    data,
    onClose,
}) => {
    return (
        <Drawer
            title="Chi Tiết Chuyên Mục"
            placement="right"
            onClose={onClose}
            open={isOpen}
            width={500}
        >
            <Descriptions column={1} bordered size="middle">
                <Descriptions.Item label="Tên chuyên mục">
                    {data?.name || "Chưa có"}
                </Descriptions.Item>
                <Descriptions.Item label="Mã chuyên mục">
                    {data?.code || "Chưa có"}
                </Descriptions.Item>
                <Descriptions.Item label="Đường dẫn slug">
                    {data?.slug || "Chưa có"}
                </Descriptions.Item>
                <Descriptions.Item label="Hiển thị">
                    {data?.isShow ? "Có" : "Không"}
                </Descriptions.Item>
                <Descriptions.Item label="Thứ tự hiển thị">
                    {data?.thuTuHienThi ?? "Không xác định"}
                </Descriptions.Item>
                <Descriptions.Item label="Mô tả">
                    {data?.description || "Không có mô tả"}
                </Descriptions.Item>
                <Descriptions.Item label="Chuyên mục cha">
                    {data?.parentid ? data.chuyenMucChatxt : "Không có"}
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    );
};

export default DrawerChiTiet;

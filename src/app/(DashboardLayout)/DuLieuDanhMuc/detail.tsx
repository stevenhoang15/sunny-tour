import React from "react";
import { Drawer, Divider } from "antd";
import { tableDuLieuDanhMucDataType } from "@/interface/duLieuDanhMuc/duLieuDanhMuc";

interface DuLieuDanhMucViewProps {
    DuLieuDanhMuc?: tableDuLieuDanhMucDataType | null;
    isOpen: boolean;
    onClose: () => void;
}

const DuLieuDanhMucDetail: React.FC<DuLieuDanhMucViewProps> = ({ DuLieuDanhMuc, isOpen, onClose }) => {
    return (
        <Drawer
            title={`Thông tin danh mục`}
            width="20%"
            placement="right"
            onClose={onClose}
            closable={true}
            open={isOpen}
        >
            <Divider dashed />
            <div>
                {/* <h6 className="text-muted text-uppercase mb-3">Thông tin chi tiết</h6> */}
                <p>
                    <span className="ml-3 text-dark">ID: {DuLieuDanhMuc?.id}</span>
                </p>
                <p>
                    <span className="ml-3 text-dark">GroupID: {DuLieuDanhMuc?.groupId}</span>
                </p>
                <p>
                    <span className="ml-3 text-dark">
                        Mã danh mục: {DuLieuDanhMuc?.code || "Chưa có"}
                    </span>
                </p>
                <p>
                    <span className="ml-3 text-dark">
                        Tên danh mục: {DuLieuDanhMuc?.name || "Chưa có"}
                    </span>
                </p>
                <p>
                    <span className="ml-3 text-dark">
                        Thứ tự hiển thị: {DuLieuDanhMuc?.priority || "Chưa có"}
                    </span>
                </p>
                <p>
                    <span className="ml-3 text-dark">
                        Ghi chú: {DuLieuDanhMuc?.note || "Chưa có"}
                    </span>
                </p>
            </div>
        </Drawer>
    );
};

export default DuLieuDanhMucDetail;

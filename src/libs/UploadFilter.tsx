import { TaiLieuDinhKem } from "@/interface/taiLieuDinhKem/taiLieuDinhKem";
import { uploadFileService } from "@/services/File/uploadFile.service";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, UploadFile, UploadProps } from "antd";
import { UploadListType, UploadType } from "antd/es/upload/interface";
import { useState, forwardRef, useImperativeHandle } from "react";
const validFileTypes = [
    "image/png",
    "image/jpeg",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
type FileUploaderProps = {
    maxFiles?: number;
    setUploadedData: React.Dispatch<React.SetStateAction<string[]>>;
    type?: string;
    setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
    fileList: UploadFile[];
    uploadType?: UploadType; //kiểu upload: kéo thả hoặc chọn
    listType?: UploadListType; //kiểu danh sách hiển thị: text hoặc hình ảnh
    handleSuccess?: (taiLieus: TaiLieuDinhKem[]) => void;
};
import "./uploadFiler.css";

const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};
const UploadFiler = forwardRef(
    (
        {
            maxFiles = 2,
            setUploadedData,
            type,
            setFileList,
            fileList,
            uploadType = "select",
            listType = "text",
            handleSuccess,
        }: FileUploaderProps,
        ref,
    ) => {
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [previewVisible, setPreviewVisible] = useState(false);
        const [previewImage, setPreviewImage] = useState("");

        const handlePreview = async (file: UploadFile) => {
            if (!file.url && !file.preview && file.originFileObj) {
                file.preview = await getBase64(file.originFileObj);
            }
            setPreviewImage(file.url || (file.preview as string));
            setPreviewVisible(true);
        };
        const handleCancel = () => setPreviewVisible(false);

        const handleChange: UploadProps["onChange"] = (info) => {
            let newFileList = [...info.fileList];
            newFileList = newFileList.slice(-maxFiles);
            newFileList = newFileList.map((file) => {
                const isValid = file.type && validFileTypes.includes(file.type);
                if (!isValid) {
                    file.status = "error";
                    file.error = "File tải lên không hợp lệ";
                }
                if (file.response) {
                    file.url = file.response.url;
                }
                return file;
            });
            setFileList(newFileList);
        };

        const handleRemove = async (file: UploadFile) => {
            try {
                const fileId = file.response?.data?.[0]?.id || file.uid;
                const listFileId = file.response?.data?.[0]?.id
                    ? [file.response.data[0].id]
                    : [file.uid];

                setUploadedData((prev) => prev.filter((id) => id !== fileId));
                setFileList((prev) =>
                    prev.filter((item) => item.uid !== file.uid),
                );
                try {
                    await uploadFileService.deleteFile(listFileId);
                } catch (err) {
                    console.error("Failed to delete file", err);
                }
            } catch (error) {
                console.error("Error deleting file:", error);
            }
        };

        const customRequest: UploadProps["customRequest"] = async ({
            file,
            onSuccess,
            onError,
        }) => {
            const formData = new FormData();
            formData.append("Files", file);
            formData.append("FileType", type ?? "");
            try {
                const result = await uploadFileService.upload(formData);
                if (result.message == "Success" && result.data != null) {
                    setUploadedData((prev) => [
                        result.data[0].id,
                        ...(prev || []),
                    ]);
                    onSuccess?.(result);
                    if (handleSuccess) {
                        handleSuccess(result?.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        const props: UploadProps = {
            type: uploadType,
            listType: listType,
            fileList: fileList,
            customRequest: customRequest,
            onPreview: handlePreview,
            onChange: handleChange,
            multiple: true,
            onRemove: handleRemove,
            itemRender: (originNode: React.ReactNode, file: UploadFile) => {
                const isError = file.status === "error";
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1px",
                            alignItems: "start",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: "1px",
                                color: isError ? "red" : "#9F9F9F",
                            }}
                        >
                            {originNode}
                        </div>
                        {isError && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                                File tải lên không hợp lệ
                            </span>
                        )}
                    </div>
                );
            },
        };

        useImperativeHandle(ref, () => ({
            triggerChange: (newFile: File, newFileList: UploadFile[]) => {
                handleChange({ file: newFile, fileList: newFileList } as any);
                customRequest({ file: newFile, onSuccess: () => {} } as any);
            },
        }));

        return (
            <>
                <Upload {...props}>
                    {fileList.length >= maxFiles ? null : listType != "text" &&
                      listType != "picture" ? (
                        <div>
                            <PlusOutlined />
                            <div className="ant-upload-text">Upload</div>
                        </div>
                    ) : (
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    )}
                </Upload>
                {listType != "text" && (
                    <Modal
                        open={previewVisible}
                        footer={null}
                        onCancel={handleCancel}
                    >
                        <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage}
                        />
                    </Modal>
                )}

                {/* <Modal
          title={'Xem trực tiếp'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsModalVisible(false)}>
              Đóng
            </Button>,
          ]}
        >
          <>
            <div>Nội dung ở đây</div>
          </>
        </Modal> */}
            </>
        );
    },
);

UploadFiler.displayName = "UploadFiler";
export default UploadFiler;

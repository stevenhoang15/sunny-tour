import { createEditType, tableDuLieuDanhMucDataType } from "@/interface/duLieuDanhMuc/duLieuDanhMuc";
import { Form, FormProps, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { duLieuDanhMucService } from "@/services/duLieuDanhMuc/duLieuDanhMuc.service";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";

interface Props {
  isOpen: boolean;
  groupId: string;
  DuLieuDanhMuc?: tableDuLieuDanhMucDataType | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.DuLieuDanhMuc) {
        const response = await duLieuDanhMucService.Update(formData);
        console.log("Sua: ", formData)
        if (response.status) {
          toast.success("Chỉnh sửa danh mục thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await duLieuDanhMucService.Create(formData);
        console.log("thêm mới: ", formData);
        if (response.status) {
          toast.success("Thêm mới danh mục thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  const handleMapEdit = () => {
    form.setFieldsValue({
      id: props.DuLieuDanhMuc?.id,
      groupId: props.groupId,
      name: props.DuLieuDanhMuc?.name,
      code: props.DuLieuDanhMuc?.code,
      priority: props.DuLieuDanhMuc?.priority,
      note: props.DuLieuDanhMuc?.note
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
    if (props.DuLieuDanhMuc) {
      handleMapEdit();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={props.DuLieuDanhMuc != null ? "Chỉnh sửa danh mục" : "Thêm mới danh mục"}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      width={600}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        style={{ maxWidth: 1000 }}
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        {props.DuLieuDanhMuc && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        {props.groupId && (
          <Form.Item<createEditType> name="groupId" hidden initialValue={props.groupId}>
            <Input />
          </Form.Item>
        )}
        {(
          <>
            <Form.Item<createEditType>
              label="Mã danh mục"
              name="code"
              rules={[
                { required: true, message: "Vui lòng nhập thông tin này!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<createEditType>
              label="Tên danh mục"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập thông tin này!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<createEditType>
              label="Thứ tự"
              name="priority"
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item<createEditType>
              label="Ghi chú"
              name="note"
            >
              <TextArea />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal >
  );
};
export default CreateOrUpdate;

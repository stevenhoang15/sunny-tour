"use client";

import { ChuyenMucType, createEditType } from "@/interface/ChuyenMuc/ChuyenMuc";
import { chuyenMucService } from "@/services/ChuyenMuc/ChuyenMuc.service";
import { Checkbox, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import classes from "./page.module.css";
import { DropdownOption } from "@/interface/general";
import { createSlugPage } from "@/utils/string";

interface CreateProps {
  isOpen: boolean;
  data?: ChuyenMucType;
  dropdown: DropdownOption[];
  onClose: () => void;
  onSuccess: () => void;
}

const convertChuyenMucToCreateEdit = (
  chuyenMuc: ChuyenMucType
): createEditType => {
  return {
    id: chuyenMuc.id,
    Name: chuyenMuc.name ?? null, // Đổi tên và cho phép null
    Code: chuyenMuc.code ?? null, // Đổi tên và cho phép null
    ThuTuHienThi: chuyenMuc.thuTuHienThi,
    IsShow: chuyenMuc.isShow,
    Slug: chuyenMuc.slug,
    Description: chuyenMuc.description,
    Parentid: chuyenMuc.parentid,
  };
};

const CreateUpdateForm: React.FC<CreateProps> = ({
  isOpen,
  data,
  onClose,
  onSuccess,
  dropdown,
}: CreateProps) => {
  const [form] = Form.useForm();
  const [slugTitle, setSlugTitle] = useState<string>();

  const handleFinish = async () => {
    const param = await form.validateFields();
    try {
      if (data) {
        const response = await chuyenMucService.Update({
          ...param,
          id: data.id,
        });
        if (response.status) {
          toast.success("Cập nhật đại diện thương hiệu thành công");
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await chuyenMucService.Create(param);
        if (response.status) {
          toast.success("Thêm mới đại diện thương hiệu thành công");
        } else {
          toast.error(response.message);
        }
      }
      form.resetFields();
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };
  const handleCancel = () => {
    onClose();
  };

  const handleRenderSlug = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = createSlugPage(title);
    form.setFieldsValue({ Slug: slug });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(convertChuyenMucToCreateEdit(data));
    } else {
      form.setFieldsValue({
        Name: "",
        Code: "",
        ThuTuHienThi: 0,
        IsShow: false,
        Slug: "",
        Description: "",
        Parentid: null,
      });
    }
  });
  return (
    <Modal
      title={
        <div style={{ textAlign: "center" }}>
          {data ? "Chỉnh sửa chuyên mục" : "Thêm mới chuyên mục"}
        </div>
      }
      open={isOpen}
      onOk={() => handleFinish()}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Đóng"
      width={600}
    >
      <Form
        layout="vertical"
        form={form}
        style={{ maxWidth: 1000 }}
        autoComplete="off"
      >
        <Form.Item
          label={<strong>Tên chuyên mục</strong>}
          name="Name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin này!",
            },
          ]}
        >
          <Input
            placeholder="Nhập tên chuyên mục"
            onChange={(e) => {
              handleRenderSlug(e);
            }}
          />
        </Form.Item>

        <Form.Item
          label={<strong>Đường dẫn slug</strong>}
          name="Slug"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin này!",
            },
          ]}
        >
          <Input placeholder="Nhập đường dẫn slug" />
        </Form.Item>

        <Form.Item
          label={<strong>Hiển thị</strong>}
          name="IsShow"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin này!",
            },
          ]}
        >
          <Checkbox />
        </Form.Item>

        <Form.Item
          label={<strong>Mã chuyên mục</strong>}
          name="Code"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin này!",
            },
          ]}
        >
          <Input placeholder="Nhập mã chuyên mục" />
        </Form.Item>

        <Form.Item
          label={<strong>Thứ tự hiển thị</strong>}
          name="ThuTuHienThi"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin này!",
            },
          ]}
        >
          <Input placeholder="Nhập thứ tự hiển thị" />
        </Form.Item>

        <Form.Item
          label={<strong>Mô tả</strong>}
          name="Description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập thông tin này!",
            },
          ]}
        >
          <TextArea placeholder="Nhập thứ tự hiển thị" />
        </Form.Item>

        <Form.Item label={<strong>Chuyên mục cha</strong>} name="Parentid">
          <Select
            value={form.getFieldValue("Parentid") || ""}
            options={dropdown}
            allowClear
            placeholder={"Chọn chuyên mục cha"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUpdateForm;

import { DropdownOption } from "@/interface/general";
import {
  tableGroupRoleDataType,
  createEditType,
} from "@/interface/groupRole/groupRole";
import { groupRoleService } from "@/services/groupRole/groupRole";
import { roleService } from "@/services/role/role.service";
import { fetchDropdown } from "@/utils/fetchDropdown";
import { Form, FormProps, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  groupRole?: tableGroupRoleDataType | null;
  onClose: () => void;
  onSuccess: () => void;
  dropVaiTros: DropdownOption[];
  setDropVaiTros: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      // if (Array.isArray(formData.codeVaiTro)) {
      //   formData.idRoles = formData.codeVaiTro
      //     .filter((item: any) => item)
      //     .join(",");
      // }

      if (props.groupRole) {
        const response = await groupRoleService.Update(formData);

        if (response.status) {
          toast.success("Chỉnh sửa nhóm vai trò thành công");
          form.resetFields();
          props.onSuccess();
          props.onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        const response = await groupRoleService.Create(formData);

        if (response.status) {
          toast.success("Thêm mới nhóm vai trò thành công");
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
    form.setFieldsValue(props.groupRole);
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  const handleSetDropdownVaiTro = async () => {
    await Promise.all([
      fetchDropdown(
        props.dropVaiTros,
        () => roleService.getDropDownVaiTroIds(""),
        props.setDropVaiTros
      ),
    ]);
  };

  useEffect(() => {
    handleSetDropdownVaiTro();
    setIsOpen(props.isOpen);
    if (props.groupRole) {
      handleMapEdit();
    }
  }, [props.isOpen]);

  return (
    <Modal
      title={
        props.groupRole != null
          ? "Chỉnh sửa nhóm vai trò"
          : "Thêm mới nhóm vai trò"
      }
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
        {props.groupRole && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}
        {
          <>
            <Form.Item<createEditType>
              label="Mã nhóm vai trò"
              name="code"
              rules={[
                { required: true, message: "Vui lòng nhập thông tin này!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<createEditType>
              label="Tên nhóm vai trò"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập thông tin này!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<createEditType>
              label="Vai trò"
              name="codeVaiTro"
              rules={[
                { required: true, message: "Vui lòng nhập thông tin này!" },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                showSearch
                optionFilterProp="children"
                placeholder="Chọn các vai trò"
                options={props.dropVaiTros}
                fieldNames={{ label: "label", value: "value" }}
              ></Select>
            </Form.Item>
          </>
        }
      </Form>
    </Modal>
  );
};
export default CreateOrUpdate;

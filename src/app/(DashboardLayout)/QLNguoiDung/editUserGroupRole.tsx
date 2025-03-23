import { tableUserDataType } from "@/interface/auth/User";
import {
  Drawer,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { fetchDropdown } from "@/utils/fetchDropdown";
import { DropdownOption } from "@/interface/general";
import { toast } from "react-toastify";
import classes from "./page.module.css";
import { userRoleService } from "@/services/userRole/userRole.service";
import {
  createEditType,
  tableUserRoleVMData,
} from "@/interface/userRole/userRole";
import { groupRoleService } from "@/services/groupRole/groupRole";
dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  user?: tableUserDataType | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
  dropGroupRoles: DropdownOption[];
  setDropGroupRoles: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
}

const EditUserGroupRole: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.user) {
        formData.userId = props.user?.id ?? "";
        const response = await userRoleService.Create(formData);
        if (response.status) {
          toast.success("Chỉnh sửa nhóm vai trò thành công");
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

  const handleMapEdit = async () => {
    if (props.user && props.user.vaiTro) {
      form.setFieldsValue({
        roleCode: props.user.vaiTro,
      });
    }
  };

  const handleGetDropdownGroupRole = async () => {
    await Promise.all([
      fetchDropdown(
        props.dropGroupRoles,
        () => groupRoleService.getDropdown(),
        props.setDropGroupRoles
      ),
    ]);
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    props.onClose();
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    handleGetDropdownGroupRole();
    if (props.user) {
      handleMapEdit();
    }
  }, [props.user]);

  return (
    <Modal
      title={"Chỉnh sửa vai trò"}
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Đóng"
      // width={600}
    >
      <Form
        layout="vertical"
        form={form}
        name="formCreateUpdate"
        onFinish={handleOnFinish}
        autoComplete="off"
      >
        {props.user && (
          <Form.Item<createEditType>
            name="userId"
            initialValue={props.user?.id}
            hidden
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item>
          <Typography.Text className={classes.userNameText}>
            Người dùng: <strong>{props.user?.name}</strong>
          </Typography.Text>
        </Form.Item>
        <Form.Item<createEditType>
          label="Chọn nhóm vai trò"
          name="idGroupRoles"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn nhóm vai trò người dùng"
            options={props.dropGroupRoles}
            fieldNames={{ label: "label", value: "value" }}
            value={props.user?.groupRole_response}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EditUserGroupRole;

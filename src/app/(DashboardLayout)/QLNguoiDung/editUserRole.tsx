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
import { roleService } from "@/services/role/role.service";
import { toast } from "react-toastify";
import { departmentService } from "@/services/department/department.service";
import classes from "./page.module.css";
import { userRoleService } from "@/services/userRole/userRole.service";
import {
  createEditType,
  tableUserRoleVMData,
} from "@/interface/userRole/userRole";
import { Department } from "@/interface/department/department";
dayjs.locale("vi");

interface Props {
  isOpen: boolean;
  user?: tableUserDataType | null;
  onClose: () => void; //function callback
  onSuccess: () => void;
  dropVaiTros: DropdownOption[];
  setDropVaiTros: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
  dropDepartments: DropdownOption[];
  setDropDepartments: React.Dispatch<React.SetStateAction<DropdownOption[]>>;
}

const EditUserRole: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
  const [setupRole, setSetupRole] = useState<DropdownOption[]>();

  const handleOnFinish: FormProps<createEditType>["onFinish"] = async (
    formData: createEditType
  ) => {
    try {
      if (props.user) {
        formData.userId = props.user?.id ?? "";
        const response = await userRoleService.Create(formData);
        if (response.status) {
          toast.success("Chỉnh sửa vai trò thành công");
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

  const handleSetDropdownVaiTro = async () => {
    await Promise.all([
      fetchDropdown(
        props.dropVaiTros,
        () => roleService.getDropDown(""),
        props.setDropVaiTros
      ),
    ]);
  };

  // const handleChangRole = async (departmentId: string) => {
  //   try {
  //     const response = await departmentService.getDropRolesInDepartment(
  //       departmentId,
  //       props.user?.id ?? ""
  //     );
  //     if (response.status) {
  //       const formattedData: DropdownOption[] = response.data.map(
  //         (item: any) => ({
  //           label: item.text,
  //           value: item.value,
  //         })
  //       );

  //       form.setFieldsValue({ roleCode: formattedData });
  //     } else {
  //       toast.error(response.message);
  //     }
  //   } catch (error) {
  //     toast.error("Có lỗi xảy ra: " + error);
  //   }
  // };

  const processDepartments = (departments: Department[], prefix = "") => {
    const optDrop: DropdownOption[] = [];

    departments.forEach((dept) => {
      optDrop.push({ text: `${prefix}${dept.name}`, value: dept.id });

      if (dept.departmentChilds && dept.departmentChilds?.length > 0) {
        optDrop.push(
          ...processDepartments(dept.departmentChilds, prefix + " ── ")
        );
      }
    });

    return optDrop;
  };

  const handleGetUserRoleByUserId = async () => {
    try {
      const response = await userRoleService.SetupRole(props.user?.id ?? "");

      if (response.status) {
        const departmentOptions = processDepartments(
          response.data?.departments
        );

        setSetupRole(departmentOptions);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
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
    handleSetDropdownVaiTro();
    if (props.user) {
      handleMapEdit();
      handleGetUserRoleByUserId();
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

        {/* <Form.Item<createEditType>
          label="Phòng ban"
          name="deparmentId"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Select
            placeholder="Chọn phòng ban"
            options={setupRole}
            fieldNames={{ label: "text", value: "value" }}
            onChange={(value) => handleChangRole(value)}
          />
        </Form.Item> */}
        <Form.Item<createEditType>
          label="Chọn vai trò"
          name="roleCode"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn vai trò người dùng"
            options={props.dropVaiTros}
            fieldNames={{ label: "label", value: "value" }}
            value={props.user?.vaiTro}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EditUserRole;

import { createEditType, tableUserDataType } from '@/interface/auth/User'
import {
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  Radio,
  Select,
  TreeSelect,
} from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { userService } from '@/services/user/user.service'
import { fetchDropdown } from '@/utils/fetchDropdown'
import { DropdownOption, DropdownTreeOptionAntd } from '@/interface/general'
import { roleService } from '@/services/role/role.service'
import { toast } from 'react-toastify'
dayjs.locale('vi')

interface Props {
  isOpen: boolean
  user?: tableUserDataType | null
  onClose: () => void //function callback
  onSuccess: () => void
  dropVaiTros: DropdownOption[]
  departmentDropdown: DropdownTreeOptionAntd[]
  setDropVaiTros: React.Dispatch<React.SetStateAction<DropdownOption[]>>
}

const CreateOrUpdate: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm()
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen)
  const handleOnFinish: FormProps<createEditType>['onFinish'] = async (
    formData: createEditType
  ) => {
    try {
      if (props.user) {
        const response = await userService.Update(formData)
        if (response.status) {
          toast.success('Chỉnh sửa tài khoản thành công')
          form.resetFields()
          props.onSuccess()
          props.onClose()
        } else {
          toast.error(response.message)
        }
      } else {
        const response = await userService.Create(formData)
        if (response.status) {
          toast.success('Tạo tài khoản thành công')
          form.resetFields()
          props.onSuccess()
          props.onClose()
        } else {
          toast.error(response.message)
        }
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra: ' + error)
    }
  }

  const handleMapEdit = () => {
    form.setFieldsValue(props.user)
  }

  const handleSetDropdownVaiTro = async () => {
    await Promise.all([
      fetchDropdown(
        props.dropVaiTros,
        () => roleService.getDropDown(''),
        props.setDropVaiTros
      ),
    ])
  }

  const handleCancel = () => {
    setIsOpen(false)
    form.resetFields()
    props.onClose()
  }

  useEffect(() => {
    // handleSetDropdownVaiTro();
    setIsOpen(props.isOpen)
    console.log(props.user)
    if (props.user) {
      handleMapEdit()
    } else {
      console.log('reset')
      form.resetFields()
      form.setFieldValue('userName', '')
      form.setFieldValue('matKhau', '')
    }
  }, [props.isOpen])

  return (
    <Modal
      title={props.user != null ? 'Chỉnh sửa tài khoản' : 'Thêm mới tài khoản'}
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
        {props.user && (
          <Form.Item<createEditType> name="id" hidden>
            <Input />
          </Form.Item>
        )}

        {!props.user && (
          <>
            <Form.Item<createEditType>
              label="Tài khoản"
              name="userName"
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin này!' },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message: 'Không được nhập chữ có dấu hoặc khoảng trắng!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<createEditType>
              label="Mật khẩu"
              name="matKhau"
              rules={[
                { required: true, message: 'Vui lòng nhập thông tin này!' },
                {
                  min: 8,
                  message: 'Mật khẩu phải có ít nhất 8 ký tự!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}

        <Form.Item<createEditType>
          label="Họ tên"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin này!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<createEditType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập thông tin này!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<createEditType>
          label="Phòng ban"
          name="departmentId"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập thông tin này!',
            },
          ]}
        >
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            value={props.user?.departmentId}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Chọn phòng ban"
            allowClear
            treeDefaultExpandAll
            treeData={props.departmentDropdown}
          />
        </Form.Item>

        {/* <Form.Item
          label="Vai trò"
          name="vaiTro"
          rules={[{ required: true, message: "Vui lòng nhập thông tin này!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn nhiều vai trò"
            options={props.dropVaiTros}
            fieldNames={{ label: "label", value: "value" }}
          />
        </Form.Item> */}
        <Form.Item<createEditType>
          label="Điện thoại"
          name="phoneNumber"
          rules={[
            {
              pattern: /^[0-9]{10}$/,
              message: 'Số điện thoại phải có đúng 10 chữ số',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<createEditType> label="Ngày sinh" name="ngaySinh">
          <DatePicker
            style={{ width: '100%' }}
            format={{
              format: 'DD-MM-YYYY',
              type: 'mask',
            }}
          />
        </Form.Item>
        <Form.Item<createEditType>
          label="Giới tính"
          name="gender"
          initialValue="1"
        >
          <Radio.Group>
            <Radio value="1"> Nam </Radio>
            <Radio value="0"> Nữ </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item<createEditType> label="Địa chỉ" name="diaChi">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default CreateOrUpdate

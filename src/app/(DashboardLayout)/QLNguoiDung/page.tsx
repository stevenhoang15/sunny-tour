"use client";
import Flex from "@/components/shared-components/Flex";
import { searchUserData, tableUserDataType } from "@/interface/auth/User";
import {
  DropdownOption,
  ResponsePageInfo,
  DropdownTreeOptionAntd,
} from "@/interface/general";
import withAuthorization from "@/libs/authentication";
import { userService } from "@/services/user/user.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  FormProps,
  MenuProps,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./page.module.css";
import Search from "./search";
import CreateOrUpdate from "./createOrUpdate";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import EditUserRole from "./editUserRole";
import EditUserGroupRole from "./editUserGroupRole";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";
import { departmentService } from "@/services/department/department.service";
import UserDetail from "./Detail";
import formatDate from "@/utils/formatDate";

const QLNguoiDung: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [listUsers, setListUsers] = useState<tableUserDataType[]>([]);
  const [dataPage, setDataPage] = useState<ResponsePageInfo>();
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [searchValues, setSearchValues] = useState<searchUserData | null>(null);
  const [dropVaiTros, setDropVaiTros] = useState<DropdownOption[]>([]);
  const [dropDepartments, setDropDepartments] = useState<DropdownOption[]>([]);
  const [departmentDropdown, setDepartmentDropdown] = useState<
    DropdownTreeOptionAntd[]
  >([]);
  const searchParams = useSearchParams();

  const departmentId = searchParams.get("departmentId") ?? undefined;

  const loading = useSelector((state) => state.general.isLoading);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<tableUserDataType>();
  const [currentDetailUser, setCurrentDetailUser] =
    useState<tableUserDataType>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [isOpenEditUserRole, setIsOpenEditUserRole] = useState<boolean>(false);
  const [isOpenEditUserGroupRole, setIsOpenEditUserGroupRole] =
    useState<boolean>(false);
  const [dropGroupRole, setDropGroupRole] = useState<DropdownOption[]>([]);

  const tableColumns: TableProps<tableUserDataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tài khoản",
      dataIndex: "userName",
      render: (_: any, record: tableUserDataType) => (
        <span>{record.userName}</span>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      width: "100px",
      render: (_: any, record: tableUserDataType) => {
        return (
          <>
            <p>{record.name}</p>
            {record.vaiTro_txt_response != null &&
              record.vaiTro_txt_response.length > 0 &&
              record.vaiTro_txt_response.map((e, index) => (
                <Tag className="mb-1" color="cyan" key={index}>
                  {e}
                </Tag>
              ))}
          </>
        );
      },
    },
    {
      title: "Phòng ban",
      dataIndex: "departmentId",
      render: (_: any, record: tableUserDataType) => (
        <span>{record.department_txt}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (_: any, record: tableUserDataType) => (
        <span>{record.email}</span>
      ),
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
      align: "center",
      render: (_: any, record: tableUserDataType) => (
        <span>{record.phoneNumber}</span>
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      align: "center",
      render: (_: any, record: tableUserDataType) => (
        <span>
          {record.ngaySinh ? formatDate(new Date(record.ngaySinh), true) : ''}
        </span>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      render: (_: any, record: tableUserDataType) => (
        <span>{record.gioiTinh_txt}</span>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      render: (_: any, record: tableUserDataType) => (
        <span>{record.diaChi}</span>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      fixed: "right",
      render: (_: any, record: tableUserDataType) => {
        const items: MenuProps["items"] = [
          {
            label: "Chi tiết",
            key: "1",
            icon: <EyeOutlined />,
            onClick: () => {
              setCurrentDetailUser(record);
              setIsOpenDetail(true);
            },
          },
          {
            label: "Chỉnh sửa",
            key: "2",
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(true, record);
            },
          },
          {
            label: "Phân vai trò",
            key: "editUserRole",
            icon: <UserAddOutlined />,
            onClick: () => {
              setCurrentDetailUser(record);
              setIsOpenEditUserRole(true);
            },
          },
          {
            label: "Phân nhóm trò",
            key: "editUserGroupRole",
            icon: <UsergroupAddOutlined />,
            onClick: () => {
              setCurrentDetailUser(record);
              setIsOpenEditUserGroupRole(true);
            },
          },
          {
            type: "divider",
          },
          {
            label: (
              <Popconfirm
                key={"Lock" + record.id}
                title={
                  record.lockoutEnabled ? "Xác nhận mở khóa" : "Xác nhận khóa"
                }
                description={
                  <span>
                    Bạn có muốn {record.lockoutEnabled ? "mở khóa" : "khóa"}{" "}
                    người dùng này không? <br /> Sau khi{" "}
                    {record.lockoutEnabled
                      ? "mở khóa người dùng có thể sử dụng hệ thống."
                      : "khóa sẽ không thể sử dụng hệ thống."}
                  </span>
                }
                okText={record.lockoutEnabled ? "Mở khóa ngay" : "Khóa ngay"}
                cancelText="Hủy"
                onConfirm={() => {
                  handleLockUser(
                    record.id || "",
                    record.lockoutEnabled || false
                  );
                }}
                trigger="click"
                forceRender
              >
                <span>{record.lockoutEnabled ? "Mở khóa" : "Khóa"}</span>
              </Popconfirm>
            ),
            key: "3",
            icon: record.lockoutEnabled ? <UnlockOutlined /> : <LockOutlined />,
            danger: true,
          },
          {
            label: (
              <Popconfirm
                key={"Delete" + record.id}
                title="Xác nhận xóa"
                description={
                  <span>
                    Bạn có muốn xóa người dùng này không? <br /> Sau khi xóa sẽ
                    không thể khôi phục.
                  </span>
                }
                okText="Xóa"
                cancelText="Hủy"
                onConfirm={() => {
                  handleDeleteUser(record.id || "");
                }}
                trigger="click"
                forceRender
              >
                <span>Xóa</span>
              </Popconfirm>
            ),
            key: "4",
            icon: <DeleteOutlined />,
            danger: true,
          },
        ];
        return (
          <>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button
                onClick={(e) => e.preventDefault()}
                color="primary"
                size="small"
              >
                <Space>
                  Thao tác
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </>
        );
      },
    },
  ];

  const handleLockUser = async (id: string, isLock: boolean) => {
    try {
      const response = await userService.Lock(id);
      if (response.status) {
        toast.success(
          isLock ? "Nở khóa tài khoản thành công" : "Khóa tài khoản thành công"
        );
        handleGetListNguoiDung();
      } else {
        toast.error(
          isLock ? "Mở khóa tài khoản thất bại" : "Khóa tài khoản thất bại"
        );
      }
    } catch (error) {
      toast.error(
        isLock ? "Mở khóa tài khoản thất bại" : "Khóa tài khoản thất bại"
      );
    }
  };

  const hanleCreateEditSuccess = () => {
    handleGetListNguoiDung();
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const response = await userService.Delete(id);
      if (response.status) {
        toast.success("Xóa tài khoản thành công");
        handleGetListNguoiDung();
      } else {
        toast.error("Xóa tài khoản thất bại");
      }
    } catch (error) {
      toast.error("Xóa tài khoản thất bại");
    }
  };

  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const onFinishSearch: FormProps<searchUserData>["onFinish"] = async (
    values
  ) => {
    try {
      setSearchValues(values);
      await handleGetListNguoiDung(values);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  const handleGetListNguoiDung = useCallback(
    async (searchDataOverride?: searchUserData) => {
      dispatch(setIsLoading(true));
      try {
        const searchData = searchDataOverride || {
          pageIndex,
          pageSize,
          departmentId,
          ...(searchValues || {}),
        };
        const response = await userService.getDataByPage(searchData);
        if (response != null && response.data != null) {
          const data = response.data;
          const items = data.items;
          setListUsers(items);
          setDataPage({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          });
        }
        dispatch(setIsLoading(false));
      } catch (error) {
        dispatch(setIsLoading(false));
      }
    },
    [pageIndex, pageSize]
  );

  const handleShowModal = (isEdit?: boolean, user?: tableUserDataType) => {
    setIsOpenModal(true);
    if (isEdit) {
      setCurrentUser(user);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
  };

  const getDepartmentDropdown = async () => {
    try {
      const response = await departmentService.getHierarchicalDropdownList();
      setDepartmentDropdown(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetListNguoiDung();
  }, [handleGetListNguoiDung]);

  useEffect(() => {
    getDepartmentDropdown();
  }, []);

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className={classes.mgButton10}
      >
        <AutoBreadcrumb />
        <div>
          <Button
            onClick={() => toggleSearch()}
            type="primary"
            size="small"
            icon={isPanelVisible ? <CloseOutlined /> : <SearchOutlined />}
            className={classes.mgright5}
          >
            {isPanelVisible ? "Ẩn tìm kiếm" : "Tìm kiếm"}
          </Button>
          <Link href="/QLNguoiDung/Import">
            <Button
              color="pink"
              variant="solid"
              icon={<VerticalAlignTopOutlined />}
              size="small"
              className={`${classes.mgright5} ${classes.colorKetXuat}`}
            >
              Import
            </Button>
          </Link>

          <Button
            onClick={() => {
              handleShowModal();
            }}
            type="primary"
            icon={<PlusCircleOutlined />}
            size="small"
          >
            Thêm mới
          </Button>
          <CreateOrUpdate
            isOpen={isOpenModal}
            dropVaiTros={dropVaiTros}
            setDropVaiTros={setDropVaiTros}
            departmentDropdown={departmentDropdown}
            onSuccess={hanleCreateEditSuccess}
            onClose={handleClose}
            user={currentUser}
          />
        </div>
      </Flex>
      {isPanelVisible && (
        <Search
          onFinish={onFinishSearch}
          dropVaiTros={dropVaiTros}
          setDropVaiTros={setDropVaiTros}
        />
      )}
      <UserDetail
        user={currentDetailUser}
        isOpen={isOpenDetail}
        onClose={handleCloseDetail}
      />
      <EditUserRole
        user={currentDetailUser}
        isOpen={isOpenEditUserRole}
        onClose={() => setIsOpenEditUserRole(false)}
        onSuccess={hanleCreateEditSuccess}
        dropVaiTros={dropVaiTros}
        setDropVaiTros={setDropVaiTros}
        dropDepartments={dropDepartments}
        setDropDepartments={setDropDepartments}
      />
      <EditUserGroupRole
        user={currentDetailUser}
        isOpen={isOpenEditUserGroupRole}
        onClose={() => setIsOpenEditUserGroupRole(false)}
        onSuccess={hanleCreateEditSuccess}
        dropGroupRoles={dropGroupRole}
        setDropGroupRoles={setDropGroupRole}
      />
      <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            bordered
            dataSource={listUsers}
            rowKey="id"
            scroll={{ x: "max-content" }}
            pagination={false}
            loading={loading}
          />
        </div>
        <Pagination
          className="mt-2"
          total={dataPage?.totalCount}
          showTotal={(total, range) =>
            range[0] + "-" + range[1] + " trong " + total + " dữ liệu"
          }
          pageSize={pageSize}
          defaultCurrent={1}
          onChange={(e) => {
            setPageIndex(e);
          }}
          onShowSizeChange={(current, pageSize) => {
            setPageIndex(current);
            setPageSize(pageSize);
          }}
          size="small"
          align="end"
        />
      </Card>
    </>
  );
};

export default withAuthorization(QLNguoiDung, "QLNguoiDung_index");

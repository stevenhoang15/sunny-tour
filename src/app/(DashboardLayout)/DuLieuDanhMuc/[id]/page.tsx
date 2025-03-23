"use client";
import Flex from "@/components/shared-components/Flex";
import { searchDuLieuDanhMucData, tableDuLieuDanhMucDataType } from "@/interface/duLieuDanhMuc/duLieuDanhMuc";
import {
    Response,
    ResponsePageInfo,
    ResponsePageList,
} from "@/interface/general";
import withAuthorization from "@/libs/authentication";
import { duLieuDanhMucService } from "@/services/duLieuDanhMuc/duLieuDanhMuc.service";
import { setIsLoading } from "@/store/general/GeneralSlice";
import { useSelector } from "@/store/hooks";
import { AppDispatch } from "@/store/store";
import {
    CloseOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    EyeOutlined,
    PlusCircleOutlined,
    SearchOutlined,
    SettingOutlined,
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
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "../page.module.css";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import DuLieuDanhMucDetail from "../detail";
import CreateOrUpdate from "../createOrUpdate";
import Search from "../search";
import AutoBreadcrumb from "@/components/util-compenents/Breadcrumb";

const DuLieuDanhMuc: React.FC = () => {
    const { id } = useParams();
    const groupId = id?.toString() ?? null;

    const initSearch: searchDuLieuDanhMucData = {
        groupId: groupId,
        pageIndex: 1,
        pageSize: 20
    }

    const dispatch = useDispatch<AppDispatch>();
    const [listDuLieuDanhMucs, setListDuLieuDanhMucs] = useState<tableDuLieuDanhMucDataType[]>([]);
    const [dataPage, setDataPage] = useState<ResponsePageInfo>();
    const [pageSize, setPageSize] = useState<number>(20);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false);
    const [searchValues, setSearchValues] = useState<searchDuLieuDanhMucData | null>(initSearch);
    const loading = useSelector((state) => state.general.isLoading);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [currentDuLieuDanhMuc, setCurrentDuLieuDanhMuc] = useState<tableDuLieuDanhMucDataType | null>(null);
    const [currentDetailDuLieuDanhMuc, setCurrentDetailDuLieuDanhMuc] =
        useState<tableDuLieuDanhMucDataType>();
    const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
    const [openPopconfirmId, setOpenPopconfirmId] = useState<string | null>(null)



    const tableColumns: TableProps<tableDuLieuDanhMucDataType>["columns"] = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Tên",
            dataIndex: "name",
            render: (_: any, record: tableDuLieuDanhMucDataType) => (
                <span>{record.name}</span>
            ),
        },
        {
            title: "Mã",
            dataIndex: "code",
            align: "center",
            render: (_: any, record: tableDuLieuDanhMucDataType) => (
                <span>{record.code}</span>
            ),
        },
        {
            title: "Thứ tự hiển thị",
            dataIndex: "priority",
            render: (_: any, record: tableDuLieuDanhMucDataType) => (
                <span>{record.priority}</span>
            ),
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            render: (_: any, record: tableDuLieuDanhMucDataType) => (
                <span>{record.note}</span>
            ),
        },
        {
            title: "Thao tác",
            dataIndex: "actions",
            fixed: "right",
            align: 'center',
            render: (_: any, record: tableDuLieuDanhMucDataType) => {
                const items: MenuProps["items"] = [
                    {
                        label: "Chỉnh sửa",
                        key: "1",
                        icon: <EditOutlined />,
                        onClick: () => {
                            handleShowModal(true, record);
                        },
                    },
                    {
                        label: "Chi tiết",
                        key: "2",
                        icon: <EyeOutlined />,
                        onClick: () => {
                            setCurrentDetailDuLieuDanhMuc(record);
                            setIsOpenDetail(true);
                        },
                    },
                    {
                        type: 'divider',
                    },
                    {
                        label: 'Xóa',
                        key: '3',
                        danger: true,
                        icon: <DeleteOutlined />,
                        onClick: () => setOpenPopconfirmId(record.id ?? ''),
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
                        <Popconfirm
                            title="Xác nhận xóa"
                            description="Bạn có chắc chắn muốn xóa?"
                            okText="Xóa"
                            cancelText="Hủy"
                            open={openPopconfirmId === record.id}
                            onConfirm={() => {
                                handleDeleteDuLieuDanhMuc(record.id || '')
                                setOpenPopconfirmId(null)
                            }}
                            onCancel={() => setOpenPopconfirmId(null)}
                        ></Popconfirm>
                    </>
                );
            },
        },
    ];

    const hanleCreateEditSuccess = () => {
        handleGetListDuLieuDanhMuc();
        setCurrentDuLieuDanhMuc(null);
    };

    const handleDeleteDuLieuDanhMuc = async (id: string) => {
        try {
            const response = await duLieuDanhMucService.Delete(id);
            if (response.status) {
                toast.success("Xóa thành công");
                handleGetListDuLieuDanhMuc();
            } else {
                toast.error("Xóa thất bại");
            }
        } catch (error) {
            toast.error("Xóa thất bại");
        }
    };

    const toggleSearch = () => {
        setIsPanelVisible(!isPanelVisible);
    };

    const onFinishSearch: FormProps<searchDuLieuDanhMucData>["onFinish"] = async (
        values
    ) => {
        try {
            setSearchValues(values);
            await handleGetListDuLieuDanhMuc(values);
        } catch (error) {
            console.error("Lỗi khi lưu dữ liệu:", error);
        }
    };

    const handleGetListDuLieuDanhMuc = useCallback(
        async (searchDataOverride?: searchDuLieuDanhMucData) => {
            dispatch(setIsLoading(true));
            try {
                const searchData = searchDataOverride || {
                    pageIndex,
                    pageSize,
                    ...(searchValues || {}),
                };
                const response: Response = await duLieuDanhMucService.getDataByPage(searchData);
                if (response != null && response.data != null) {
                    const data: ResponsePageList = response.data;
                    const items: tableDuLieuDanhMucDataType[] = data.items;
                    setListDuLieuDanhMucs(items);
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

    const handleShowModal = (isEdit?: boolean, DuLieuDanhMuc?: tableDuLieuDanhMucDataType) => {
        setIsOpenModal(true);
        if (isEdit) {
            setCurrentDuLieuDanhMuc(DuLieuDanhMuc ?? null);
        }
    };

    const handleClose = () => {
        setIsOpenModal(false);
        setCurrentDuLieuDanhMuc(null);
    };

    const handleCloseDetail = () => {
        setIsOpenDetail(false);
    };

    useEffect(() => {
        handleGetListDuLieuDanhMuc();
    }, [handleGetListDuLieuDanhMuc]);

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
                        onSuccess={hanleCreateEditSuccess}
                        onClose={handleClose}
                        groupId={groupId}
                        DuLieuDanhMuc={currentDuLieuDanhMuc}
                    />
                </div>

            </Flex>
            {isPanelVisible && (
                <Search
                    onFinish={onFinishSearch}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    groupId={groupId}
                />
            )}
            <DuLieuDanhMucDetail
                DuLieuDanhMuc={currentDetailDuLieuDanhMuc}
                isOpen={isOpenDetail}
                onClose={handleCloseDetail}
            />
            <Card style={{ padding: "0px" }} className={classes.customCardShadow}>
                <div className="table-responsive">
                    <Table
                        columns={tableColumns}
                        bordered
                        dataSource={listDuLieuDanhMucs}
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
                        `${range[0]}-${range[1]} trong ${total} dữ liệu`
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

export default withAuthorization(DuLieuDanhMuc, "");

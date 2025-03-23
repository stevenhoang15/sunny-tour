'use client'
import {
  ChuyenMucType,
  searchChuyenMucData,
} from '@/interface/ChuyenMuc/ChuyenMuc'
import { DropdownOption, ResponsePageInfo } from '@/interface/general'
import { chuyenMucService } from '@/services/ChuyenMuc/ChuyenMuc.service'
import { AppDispatch } from '@/store/store'
import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Dropdown,
  MenuProps,
  Pagination,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import classes from './page.module.css'
import Flex from '@/components/shared-components/Flex'
import { useSelector } from '@/store/hooks'
import { setIsLoading } from '@/store/general/GeneralSlice'
import Search from './Search'
import CreateUpdateForm from './CreateUpdateForm'
import DrawerChiTiet from './DrawerChiTiet'
import withAuthorization from '@/libs/authentication'
import AutoBreadcrumb from '@/components/util-compenents/Breadcrumb'

const ChuyenMuc: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [dsChuyenMuc, setDsChuyenMuc] = useState<ChuyenMucType[]>()
  const [pageSize, setPageSize] = useState<number>(20)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [dataPageResponse, setDataPageResponse] = useState<ResponsePageInfo>()
  const [pageSizeInfo, setPageSizeInfo] = useState('loading...')

  const [dropdownChuyenMuc, setDropDownChuyenMuc] = useState<DropdownOption[]>(
    []
  )

  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(false)

  const loading = useSelector((state) => state.general.isLoading)
  //chuyên mục current
  const [chuyenMucCurrent, setChuyenMucCurent] = useState<ChuyenMucType>()

  const [searchValue, setSearchValues] = useState<searchChuyenMucData | null>(
    null
  )

  const handleCloseDrawer = () => {
    setOpenDrawer(false)
  }

  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  const handleShowModal = (record?: ChuyenMucType) => {
    setChuyenMucCurent(record)
    setIsOpenModal(true)
  }

  const handleDelete = async (id: string) => {
    try {
      if (id == null) {
        toast.error('Yêu cầu chọn đối tượng để xóa')
        return
      }
      const res = await chuyenMucService.Delete(id)
      if (res.status) {
        toast.success('Xóa thành công chuyên mục')
        handleGetData()
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      toast.error('Có lỗi trong quá trình xử lý')
    }
  }

  const handleSearch = async (values: searchChuyenMucData) => {
    try {
      setSearchValues(values)
      await handleGetData(values)
    } catch (err) {
      toast.error('Có lỗi xảy ra trong quá trình xử lý')
    }
  }

  const handleGetDropDown = useCallback(async () => {
    try {
      const res = await chuyenMucService.GetDropDown()
      setDropDownChuyenMuc(res.data)
    } catch (err) {
      toast.error('Có lỗi xảy ra')
    }
  }, [])
  const tableColumns: TableColumnsType<ChuyenMucType> = [
    {
      key: 'index',
      title: 'STT',
      dataIndex: 'index',
      align: 'center',
      width: '1%',
      render: (_: any, __: ChuyenMucType, index: number) =>
        pageSize * (pageIndex - 1) + index + 1,
    },
    {
      key: 'name',
      title: 'Tên chyên mục',
      dataIndex: 'name',
      align: 'center',
    },
    {
      key: 'code',
      title: 'Mã chuyên mục',
      dataIndex: 'code',
      align: 'center',
    },
    {
      key: 'thuTuHienThi',
      title: 'Thứ tự hiển thị',
      dataIndex: 'thuTuHienThi',
      align: 'center',
    },
    {
      key: 'isShow',
      title: 'Trạng thái hiển thị',
      dataIndex: 'isShow',
      align: 'center',
      render: (value, record, index) => {
        return (
          <Tag color={value ? 'green' : 'red'}>
            {value ? 'Hiển thị' : 'Không hiển thị'}
          </Tag>
        )
      },
    },
    {
      key: 'slug',
      title: 'Đường dẫn slug',
      dataIndex: 'slug',
      align: 'center',
    },
    {
      key: 'description',
      title: 'Mô tả',
      dataIndex: 'description',
      align: 'center',
    },
    {
      key: 'chuyenMucChatxt',
      title: 'Chuyên mục cha',
      dataIndex: 'chuyenMucChatxt',
      align: 'center',
    },
    {
      key: 'actions',
      title: 'Thao tác',
      dataIndex: 'actions',
      align: 'center',
      width: '5%',
      fixed: 'right',
      render: (_: any, record: ChuyenMucType) => {
        const items: MenuProps['items'] = [
          {
            label: 'Chi tiết',
            key: '1',
            icon: <EyeOutlined />,
            onClick: () => {
              setChuyenMucCurent(record)
              handleOpenDrawer()
            },
          },
          {
            label: 'Chỉnh sửa',
            key: '2',
            icon: <EditOutlined />,
            onClick: () => {
              handleShowModal(record)
            },
          },
          {
            label: (
              <Popconfirm
                key={`Delete${record.id}`}
                title="Xác nhận xóa"
                description={
                  <span>
                    Bạn có muốn xóa đại diện thương hiệu này không? <br /> Sau
                    khi xóa sẽ không thể khôi phục.
                  </span>
                }
                okText="Xóa"
                cancelText="Hủy"
                onConfirm={() => {
                  handleDelete(record.id)
                }}
                trigger="click"
                forceRender
              >
                <span>Xóa</span>
              </Popconfirm>
            ),
            key: '4',
            icon: <DeleteOutlined />,
            danger: true,
          },
        ]
        return (
          <>
            <Dropdown menu={{ items }} trigger={['click']}>
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
        )
      },
    },
  ]

  const handleCreateEditSuccess = () => {
    handleGetData()
  }

  const handleGetData = useCallback(
    async (searchData?: searchChuyenMucData) => {
      dispatch(setIsLoading(true))
      try {
        const params = searchData || {
          pageSize: Number(pageSize) || 1,
          pageIndex: Number(pageIndex) || 1,
          name: searchValue?.name ?? null,
          code: searchValue?.code ?? null,
          isShow: searchValue?.isShow ?? false,
          thuTuHienThi: searchValue?.thuTuHienThi ?? 0,
        }
        const response = await chuyenMucService.GetData(params)
        if (response != null && response.data != null) {
          const data = response.data
          setDsChuyenMuc(data.items)
          setDataPageResponse({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            totalPage: data.totalPage,
          })
          setPageSizeInfo('')
          dispatch(setIsLoading(false))
        }
      } catch (err) {
        toast.error('Không tìm thấy kết quả')
        dispatch(setIsLoading(false))
      } finally {
        dispatch(setIsLoading(false))
      }
    },
    [pageIndex, pageSize]
  )
  const toggleSearch = () => {
    setIsPanelVisible(!isPanelVisible)
  }

  useEffect(() => {
    handleGetData()
    handleGetDropDown()
  }, [])

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
            {isPanelVisible ? 'Ẩn tìm kiếm' : 'Tìm kiếm'}
          </Button>

          <Button
            onClick={() => {
              handleShowModal()
            }}
            type="primary"
            icon={<PlusCircleOutlined />}
            size="small"
          >
            Thêm mới
          </Button>
        </div>
      </Flex>

      {isPanelVisible && <Search handleSearch={handleSearch} />}

      <Card style={{ padding: '0px' }} className={classes.customCardShadow}>
        <Flex alignItems="center" justifyContent="end" margin="10px">
          <Typography.Text strong>{pageSizeInfo}</Typography.Text>
        </Flex>

        <Table
          columns={tableColumns}
          pagination={false}
          bordered
          rowKey="id"
          scroll={{
            x: 'max-content',
          }}
          dataSource={dsChuyenMuc}
          loading={loading}
          tableLayout="fixed"
        />
        <Pagination
          className="mt-2"
          total={dataPageResponse?.totalCount}
          showTotal={(total, range) => {
            const pageSizeInfo = `${range[0]}-${range[1]} trong ${total} chuyên mục`
            setPageSizeInfo(pageSizeInfo)
            return pageSizeInfo
          }}
          pageSize={pageSize}
          defaultCurrent={1}
          onChange={(e) => {
            setPageIndex(e)
          }}
          onShowSizeChange={(current, pageSize) => {
            setPageIndex(current)
            setPageSize(pageSize)
          }}
          size="small"
          align="end"
        />
      </Card>

      <CreateUpdateForm
        isOpen={isOpenModal}
        onSuccess={handleCreateEditSuccess}
        onClose={handleClose}
        data={chuyenMucCurrent}
        dropdown={dropdownChuyenMuc}
      />

      <DrawerChiTiet
        isOpen={openDrawer}
        onClose={() => {
          handleCloseDrawer()
        }}
        data={chuyenMucCurrent}
      />
    </>
  )
}

export default withAuthorization(ChuyenMuc, '')

'use client';
import { Card, Col, Row } from 'antd'
import styles from './page.module.css'
import AutoBreadcrumb from '@/components/util-compenents/Breadcrumb'


export default function Dashboard() {
  return (
    <>
      <div style={{ marginBottom: '1%' }}>
        <AutoBreadcrumb />
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Thông báo luồng rà soát của bạn"
            bordered={false}
            className={styles.customCardTitle}
          >
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Văn bản pháp luật"
            bordered={false}
            className={styles.customCardTitle}
          >
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Thống kê số lượng các phản ánh theo sản phẩm"
            bordered={false}
            className={styles.customCardTitle}
          >
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Tình hình phản ánh, khiếu nại"
            bordered={false}
            className={styles.customCardTitle}
          >
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="Thống kê số lượng các phản ánh theo các thương hiệu"
            bordered={false}
            className={styles.customCardTitle}
          >
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        {/* <Col span={12}>
                    <Card
                        title="Biểu đồ số lượng các phản ánh theo địa phương"
                        bordered={false}
                        className={styles.customCardTitle}
                    >
                        <DiaPhuongPhanAnh/>
                    </Card>
                </Col> */}
        <Col span={12}>
          <Card
            title="Thống kê số lượng các phản ánh theo địa phương"
            bordered={false}
            className={styles.customCardTitle}
            style={{
              minHeight: '570px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Thống kê số lượng phản ánh theo nhóm ngành hàng hóa, dịch vụ"
            bordered={false}
            className={styles.customCardTitle}
            style={{
              minHeight: '570px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Thống kê số lượng phản ánh theo đơn vị chủ trì"
            bordered={false}
            className={styles.customCardTitle}
            style={{
              minHeight: '570px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          </Card>
        </Col>
        <Col span="12">
          <Card
            title="Thống kê các sản phẩm bị vi phạm"
            bordered={false}
            className={styles.customCardTitle}
            style={{
              minHeight: '570px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Thống kê số lượng phản ánh theo đại diện thương hiệu"
            bordered={false}
            className={styles.customCardTitle}
            style={{
              minHeight: '570px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          </Card>
        </Col>
        {/* <Col span="12">
                    <Card
                        title="Thống kê các sản phẩm bị vi phạm"
                        bordered={false}
                        className={styles.customCardTitle}
                        style={{ minHeight: '570px', display: 'flex', flexDirection: 'column' }}
                    >
                        <CacSanPhamViPhamTable />
                    </Card>
                </Col> */}
      </Row>
    </>
  )
}

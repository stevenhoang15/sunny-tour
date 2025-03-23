"use client";

import { raSoatService } from "@/services/RaSoat/RaSoat.service";
import { Avatar, Divider, List, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/hooks";
import { UserType } from "@/interface/auth/User";
import { tableRaSoatDataType } from "@/interface/RaSoat/RaSoat";
import Link from "next/link";
import InfiniteScroll from 'react-infinite-scroll-component';
import formatDate from "@/utils/formatDate";
interface DataType {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
  }
const ListThongBao: React.FC = () => {
    // Kiểm tra toàn bộ Redux store
    const userLogin: UserType | null = useSelector((state) => state.auth.User);
    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
  
    const loadMoreData = async () => {
        try {
          setLoading(true);
          if (!userLogin?.id) return;
          const response = await raSoatService.getRaSoatByIdUser(userLogin.id);
      
          if (response?.data) {
            const dataRes = response.data.map((data: tableRaSoatDataType) => ({
              gender: data.trangThai, // Chuyển đổi trạng thái thành giới tính (giả định)
              name: {
                title: "Xử lý rà soát: " + data.tenRaSoat + " (Người gửi: "+ data.nguoiXuLyName+")", // Giả định `tenRaSoat` là tiêu đề
                first: data.tenDaiDien?.split(" ")[0] || "",
                last: data.id || "",
              },
              email:"Hành động xử lý: " + data.tieuDe,
              picture: {
                large: "/img/avatars/default_avatar.png", // Không có dữ liệu ảnh từ `tableRaSoatDataType`
                medium: "/img/avatars/default_avatar.png",
                thumbnail: "/img/avatars/default_avatar.png",
              },
              nat: formatDate(new Date(data.thoiGian)), // Giả định mã tỉnh là mã quốc gia
            }));
      
            setData(dataRes);
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
          setLoading(false);
        }
      };
  
    useEffect(() => {
      loadMoreData();
    }, [userLogin]);

    return (
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 5}
            loader={data.length > 5 ? <Skeleton avatar paragraph={{ rows: 5 }} active /> : null}
            endMessage={<Divider plain>Đã hiển thị tất cả, không còn dữ liệu để hiển thị 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.name.last}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<Link href={`/RaSoat/${item.name.last}`}>{item.name.title}</Link>}
                    description={item.email}
                  />
                  <div>{item.nat}</div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      );
}

export default ListThongBao;
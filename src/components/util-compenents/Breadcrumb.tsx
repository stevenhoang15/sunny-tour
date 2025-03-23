import { operationService } from "@/services/operation/operation.service";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Operation = {
  name: string;
  url: string;
};
const AutoBreadcrumb = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const handleBuildBreadcrumb = () => {
    const items = [
      {
        title: (
          <Link href="/dashboard">
            <HomeOutlined /> Trang chủ
          </Link>
        ),
      },
    ];
    const pathName = window.location.pathname;
    pathName
      .slice(1)
      .split("/")
      .forEach((op) => {
        const matchedOperation = operations.find((x) =>
          x.url.toUpperCase().includes(op.toUpperCase())
        );
        if (matchedOperation) {
          items.push({
            title: (
              <Link href={matchedOperation.url}>{matchedOperation.name}</Link>
            ),
          });
        }
      });
    return items;
  };
  useEffect(() => {
    operationService
      .GetBreadcrumb()
      .then((res) => {
        if (res.status) {
          setOperations(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return <Breadcrumb items={handleBuildBreadcrumb()} />;
};

export default AutoBreadcrumb;

import {
  tableModuleGroupData,
  TableRowHeader,
} from "@/interface/module/module";
import { tableOperationType } from "@/interface/opearation/operation";
import {
  createEditType,
  operationIdCreateData,
} from "@/interface/roleOperation/roleOperation";
import { moduleService } from "@/services/module/module.service";
import { roleOperationService } from "@/services/roleOperation/roleOperation.service";
import { RightOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Drawer,
  Form,
  Row,
  Space,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import classes from "./page.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roleId: string;
}

const EditRoleOperation: React.FC<Props> = (props: Props) => {
  const [lstModuleGroup, setModuleGroup] = useState<tableModuleGroupData[]>();
  const [expandedKeys, setExpandedKeys] = useState([]); // Track expanded Collapse panels

  const handleCheckboxChange = useCallback(
    (moduleCode: string, id: string, checked: boolean) => {
      setModuleGroup((prevGroups) => {
        if (!prevGroups) return prevGroups;

        return prevGroups.map((group) => {
          if (group.moduleCode === moduleCode) {
            return {
              ...group,
              operations: group.operations?.map((op) => {
                if (op.id === id) {
                  return {
                    ...op,
                    isAccess: checked,
                  };
                }
                return op;
              }),
            };
          }
          return group;
        });
      });
    },
    []
  );

  const handleSelectAll = useCallback(
    (moduleCode: string, checked: boolean) => {
      setModuleGroup((prevGroups) => {
        if (!prevGroups) return prevGroups;

        return prevGroups.map((group) => {
          if (group.moduleCode === moduleCode) {
            return {
              ...group,
              operations: group.operations?.map((op) => {
                return {
                  ...op,
                  isAccess: checked,
                };
              }),
            };
          }
          return group;
        });
      });
    },
    []
  );

  const TableRow = React.memo(function tableRow({
    moduleCode,
    operation,
    idx,
  }: {
    operation: tableOperationType;
    idx: number;
    moduleCode: string;
  }) {
    return (
      <tr key={uuidv4()}>
        <td className={`${classes.cssTHead}`}>{idx}</td>
        <td className={`${classes.cssTHead} ${classes.cssChuTrongTable}`}>
          {operation.code}
        </td>
        <td className={`${classes.cssTHead} ${classes.cssChuTrongTable}`}>
          {operation.name}
        </td>
        <td className={`${classes.cssTHead} text-center`}>
          <Checkbox
            checked={operation.isAccess}
            onChange={(e) =>
              handleCheckboxChange(
                moduleCode,
                operation.id ?? "",
                e.target.checked
              )
            }
          />
        </td>
      </tr>
    );
  });

  const TableHeader = React.memo(function tableHeader({
    moduleCode,
    isAllChecked,
    isIndeterminate,
  }: TableRowHeader) {
    return (
      <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
        <th className={`${classes.cssTHead}`}>STT</th>
        <th className={`${classes.cssTHead} ${classes.cssTheadWidth}`}>Mã</th>
        <th className={`${classes.cssTHead} ${classes.cssTheadWidth}`}>
          Thao tác
        </th>
        <th className={`${classes.cssTHead} text-center`}>
          <Checkbox
            checked={isAllChecked}
            indeterminate={isIndeterminate}
            onChange={(e) => handleSelectAll(moduleCode, e.target.checked)}
          />
        </th>
      </tr>
    );
  });

  const handleGetModuleGroupData = async (roleId: string) => {
    try {
      const respone = await moduleService.getModuleGroupData(roleId);
      if (respone.status) {
        // console.log(respone.data);

        setModuleGroup(respone.data);
      } else {
        toast.error("Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  const onCollapseChange = (keys: any) => {
    setExpandedKeys(keys); // Update expanded keys to control the collapse state
  };

  const handleAddRoleOperation = async () => {
    try {
      const listOperaion: operationIdCreateData[] = [];
      lstModuleGroup?.map((item) => {
        if (item.operations) {
          item.operations.map((op) => {
            listOperaion.push({
              operationId: op.id ? op.id : "",
              isAccess: op.isAccess ? 1 : 0,
            });
          });
        }
      });

      const createRoleOperation: createEditType = {
        roleId: props.roleId,
        listOperationCreateVM: listOperaion,
      };
      const respone = await roleOperationService.Create(createRoleOperation);
      if (respone.status) {
        toast.success("Cập nhật dữ liệu thành công");
      }
    } catch (ex) {
      toast.error("Có lỗi xảy ra: " + ex);
    }
  };

  useEffect(() => {
    if (props.roleId !== "" && props.isOpen) {
      handleGetModuleGroupData(props.roleId);
    }

    if (!props.isOpen) {
      setExpandedKeys([]);
    }
  }, [props.isOpen]);

  return (
    <>
      <Drawer
        title={`Phân quyền vai trò`}
        width="95%"
        closable={true}
        open={props.isOpen}
        onClose={props.onClose}
        extra={
          <Space>
            <Button
              onClick={() => {
                handleAddRoleOperation();
              }}
              color="cyan"
            >
              Lưu lại
            </Button>
            <Button onClick={props.onClose}>Hủy</Button>
          </Space>
        }
      >
        <Row gutter={[20, 20]}>
          {lstModuleGroup &&
            lstModuleGroup.length > 0 &&
            lstModuleGroup.map((moduleGroup) => {
              if (!moduleGroup) return moduleGroup;

              const isAllChecked =
                moduleGroup.operations &&
                moduleGroup.operations.every((op) => op.isAccess);

              const isIndeterminate =
                moduleGroup.operations &&
                moduleGroup.operations.length > 0 &&
                moduleGroup.operations.some((op) => op.isAccess) && // Ít nhất một cái được chọn
                !moduleGroup.operations.every((op) => op.isAccess); // Không phải tất cả đều được chọn

              return (
                <Col className="gutter-row" span={6} key={uuidv4()}>
                  <Collapse
                    // type="primary"
                    size="small"
                    activeKey={expandedKeys} // Control which Collapse panel is expanded
                    onChange={onCollapseChange} // Update the expanded keys when the user toggles the Collapse
                    items={[
                      {
                        key: `${moduleGroup?.moduleCode}`,
                        label: `${moduleGroup?.moduleName}`,
                        children: (
                          <div>
                            <table
                              style={{
                                width: "100%",
                                borderCollapse: "collapse",
                              }}
                              className={`${classes.cssTable}`}
                            >
                              <thead>
                                <TableHeader
                                  moduleCode={moduleGroup.moduleCode}
                                  isAllChecked={isAllChecked ?? false}
                                  isIndeterminate={isIndeterminate ?? false}
                                />
                              </thead>
                              <tbody>
                                {moduleGroup.operations &&
                                  moduleGroup.operations.map((op, idx) => (
                                    <TableRow
                                      key={uuidv4()}
                                      operation={op}
                                      idx={idx + 1}
                                      moduleCode={moduleGroup.moduleCode}
                                    />
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        ),
                      },
                    ]}
                    expandIcon={({ isActive }) => (
                      <RightOutlined
                        style={{
                          transform: isActive
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    )}
                  />
                </Col>
              );
            })}
        </Row>
      </Drawer>
    </>
  );
};

export default EditRoleOperation;

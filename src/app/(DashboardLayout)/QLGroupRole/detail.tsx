import { tableGroupRoleDataType } from "@/interface/groupRole/groupRole";

interface GroupRoleDetailProps {
  GroupRoleDetail?: tableGroupRoleDataType | null;
  isOpen: boolean;
  onClose: () => void;
}

const Detail: React.FC<GroupRoleDetailProps> = (
  props: GroupRoleDetailProps
) => {
  return <></>;
};

export default Detail;

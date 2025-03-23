import { searchGroupRoleData } from "@/interface/groupRole/groupRole";

interface SearchProps {
  onFinish: ((values: searchGroupRoleData) => void) | undefined;
  pageIndex: number;
  pageSize: number;
  groupId: string;
}

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  return <></>;
};

export default Search;

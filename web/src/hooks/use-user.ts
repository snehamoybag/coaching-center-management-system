import type { OutletContextType } from "@/types/OutletContextType";
import { useOutletContext } from "react-router";

const useUser = () => {
  const { user } = useOutletContext<OutletContextType>();
  return user;
};

export default useUser;

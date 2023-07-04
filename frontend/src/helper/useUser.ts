import { checkIfUserIsLoggedInOrOffline } from "./api";
import { useQuery } from "@tanstack/react-query";
import useNavigatorOnLine from "./useNavigatorOnLine";

// create a useUser hook to get status of user
const useUser = () => {
  const network = useNavigatorOnLine();
  const { data: user } = useQuery({
    queryKey: ["user", network],
    queryFn: () => checkIfUserIsLoggedInOrOffline(),
    initialData: { status: "OFFLINE" },
    keepPreviousData: true,
    networkMode: "offlineFirst",
  });

  return user;
};

export default useUser;

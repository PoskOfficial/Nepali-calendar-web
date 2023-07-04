import { useEffect, useState } from "react";
import useNavigatorOnLine from "./useNavigatorOnLine";
import { checkIfUserIsLoggedInOrOffline } from "./api";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const [status, setStatus] = useState<"OFFLINE" | "NOT_LOGGED_IN" | "LOGGED_IN">("OFFLINE");
  const [photoUrl, setPhotoUrl] = useState(null);
  const network = useNavigatorOnLine();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: checkIfUserIsLoggedInOrOffline,
    enabled: network, // Query will only run when the network status changes
    onSuccess: (resp: any) => {
      setStatus(resp.status);
      if (resp.status === "LOGGED_IN") {
        setPhotoUrl(resp.data.user._json.picture);
      }
    },
    networkMode: "offlineFirst",
  });

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      if (data.status === "LOGGED_IN") {
        setPhotoUrl(data.data.user._json.picture);
      }
    }
  }, [data]);

  return { status, photoUrl };
};

export default useUser;

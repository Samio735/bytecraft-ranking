import { getActivity } from "@/app/functions";
import useSWR from "swr";

export default function useActivity(activityId) {
  const { isLoading, data, error, mutate } = useSWR(
    `/activity/${activityId}`,
    getActivity
  );

  return { isLoading, activity: data, error, mutateActivity: mutate };
}

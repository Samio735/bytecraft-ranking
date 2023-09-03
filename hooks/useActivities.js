import useSWR from "swr";
import { getActivities } from "../app/functions";

export default function useActivities(department) {
  const { isLoading, data, error, mutate } = useSWR(
    `/activities/active/?department=${department}`,
    getActivities
  );

  return { isLoading, activities: data, error, mutateActivities: mutate };
}

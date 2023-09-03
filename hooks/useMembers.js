import { getMembers } from "@/app/functions";
import useSWR from "swr";

export default function useMembers(department) {
  const {
    data: members,
    error,
    isLoading,
    mutate,
  } = useSWR(`/members?department=${department}`, getMembers);
  return { members, error, isLoading, mutateMembers: mutate };
}

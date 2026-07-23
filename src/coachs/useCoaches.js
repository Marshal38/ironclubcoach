import { useQuery } from "@tanstack/react-query";
import { getCoaches } from "../services/apiCoach";

export function useCoaches() {
  
  const {isLoading, data: coaches, error} = useQuery({
    queryKey: ['coach'],
    queryFn: getCoaches
  })

  return {isLoading, coaches, error}
}

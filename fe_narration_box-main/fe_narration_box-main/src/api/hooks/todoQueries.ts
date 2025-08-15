import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetcher } from '../api'
import { CreateTaskData, GenerateTaskData, Todotype } from '@/lib/types'
import { api } from '../api'
import { toast } from 'sonner'

// const getTodos = () => {
//   return fetcher()
// }

export const useGetTasks = () => {
  return useQuery<Todotype>({
    queryKey: ['get-tasks'],
    queryFn: () => fetcher('/todos/')
  })
}

export const useCreateTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['create-task'],
    mutationFn: (data: CreateTaskData) => {
      return api.post('/todos/', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-tasks'] })
    }
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['delete-task'],
    mutationFn: (id: string) => {
      console.log("DLETEIN")
      return api.delete(`/todos/delete/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-tasks'] })
    }
  })
}

export const useMarkAsComplete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['mark-as-complete'],
    mutationFn: (id: string) => {
      return api.put(`/todos/complete/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-tasks'] })
    }
  })
}

export const useGenerateTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['generate-tasks'],
    mutationFn: (data: GenerateTaskData) => {
      return api.post('/todos/generate', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-tasks'] })
      toast.success('Your tasks have been generated and will be reflected on your dashboard!')
    },
    onError: () => {
      toast.success('There was an error generating the tasks.')
    }
  })
}



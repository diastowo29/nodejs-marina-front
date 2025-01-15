import useSWR from 'swr'
 
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

export const GetChat = () => {
    const { data, error, isLoading } = useSWR(`/api/chat`, fetcher);
    return {
      chat: data,
      isLoading,
      isError: error
    }
}

export const GetChatComments = (id:string) => {
    const { data, error, isLoading } = useSWR(`/api/chat/${id}/comments`, fetcher);
    return {
      chat: data,
      isLoading,
      isError: error
    }
}
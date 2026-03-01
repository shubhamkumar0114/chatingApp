import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Chat", "User", "Message"],

  endpoints: (builder) => ({
    // create api my chats
    myChats: builder.query({
      query: () => ({
        url: "/chat/my",
        credentials: "include"
      }),
      providesTags: ["Chat"],
    }),
    // create api search user
    searchUsers: builder.query({
      query: (name) => ({
        url: `/user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    // send friend request
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/sendrequest",
        credentials: "include",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // notification
    getNotifications: builder.query({
      query: () => ({
        url: "/user/notifications",
        credentials: "include",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),

    // acceptFriendRequest
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/acceptrequest",
        credentials: "include",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    // getChatMessage
    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chat/${chatId}`;
        if (populate) url += "?populate=true";

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    getMessagges: builder.query({
      query: ({ chatId, page }) => ({
        url: `/chat/message/${chatId}?page=${page}`,
        credentials: "include",
        method: "GET"
      }),
      keepUnusedDataFor: 0,
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: `/chat/message`,
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),

    getMyGroups: builder.query({
      query: (data) => ({
        url: "/chat/mygroup",
        credentials: "include",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),

    avilableFriends: builder.query({
      query: (chatId) => {
        let url = "/user/friends";
        if (chatId) url += `?chatId=${chatId}`;
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["User"],
    }),

    newGroups: builder.mutation({
      query: ({ name, members }) => ({
        url: "/chat/new",
        credentials: "include",
        method: "POST",
        body: { name, members }
      }),
      providesTags: ["Chat"],
    }),
    renameGroups: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `/chat/${chatId}`,
        credentials: "include",
        method: "PUT",
        body: { name }
      }),
      providesTags: ["Chat"],
    }),
    removeGroupMembers: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `/chat/removemembers`,
        credentials: "include",
        method: "PUT",
        body: { chatId, userId }
      }),
      providesTags: ["Chat"],
    }),
    addGroupMembers: builder.mutation({
      query: ({ members, chatId }) => ({
        url: `/chat/addmembers`,
        credentials: "include",
        method: "PUT",
        body: { members, chatId }
      }),
      providesTags: ["Chat"],
    }),

    deleteGroups: builder.mutation({
      query: (chatId) => ({
        url: `/chat/${chatId}`,
        credentials: "include",
        method: "DELETE",
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessaggesQuery,
  useSendAttachmentsMutation,
  useGetMyGroupsQuery,
  useAvilableFriendsQuery,
  useNewGroupsMutation,
  useRenameGroupsMutation,
  useRemoveGroupMembersMutation,
  useAddGroupMembersMutation,
  useDeleteGroupsMutation,
} = api;

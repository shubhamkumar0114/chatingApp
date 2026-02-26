import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1` }),
  tagTypes: ["Chat", "User", "Message"],

  endpoints: (builder) => ({
    // create api my chats
    myChats: builder.query({
      query: () => ({
        url: "/chat/my",
        credentials: "include",
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
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // notification
    getNotifications: builder.query({
      query: () => ({
        url: "/user/notifications",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    // acceptFriendRequest
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/acceptrequest",
        method: "PUT",
        credentials: "include",
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
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: `/chat/message`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    getMyGroups: builder.query({
      query: (data) => ({
        url: "/chat/mygroup",
        method: "GET",
        credentials: "include",
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
        method: "POST",
        body: { name, members },
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    renameGroups: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `/chat/${chatId}`,
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    removeGroupMembers: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `/chat/removemembers`,
        method: "PUT",
        body: { chatId, userId },
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    addGroupMembers: builder.mutation({
      query: ({ members, chatId }) => ({
        url: `/chat/addmembers`,
        method: "PUT",
        body: { members, chatId },
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

     deleteGroups: builder.mutation({
      query: (chatId ) => ({
        url: `/chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
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
  useDeleteGroupsMutation
} = api;

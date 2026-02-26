export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Shubham kumar",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Aarav mishra",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Shubham kumar",
    _id: "3",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ravi kumar",
    _id: "4",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Shubham kumar",
    _id: "5",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Shubham kumar",
    _id: "6",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Shubham kumar",
    _id: "7",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Shubham kumar",
    _id: "8",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Shubham kumar",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Aarav Mishra",
    _id: "2",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ravi Mishra",
    _id: "3",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ravi Mishra",
    _id: "4",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ravi Mishra",
    _id: "5",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Ravi Mishra",
    _id: "6",
  },
];

export const sampleNotification = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Shubham kumar",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Aarav mishra",
    },
    _id: "2",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Ravi mishra",
    },
    _id: "3",
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "asdf",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "Ladki ka message hai",
    _id: "1",
    sender: {
      _id: "1",
      name: "Neha",
    },
    chat: "chatId",
    createdAt: "2025-02-12T10:41:30.630Z",
  },
  {
    attachments: [],
    content: "Ladka ka message hai",
    _id: "2",
    sender: {
      _id: "2",
      name: "shubham",
    },
    chat: "chatId",
    createdAt: "2025-02-12T10:41:30.630Z",
  },
];

export const dashboardData = {
  users: [
    {
      _id: "1",
      name: "shubham kumar",
      username: "shubham12",
      friends: 8,
      groups: 4,
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
      _id: "2",
      name: "Aarav kumar",
      username: "aarav01",
      friends: 12,
      groups: 6,
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
    },
  ],

  chats: [
    {
      name: "Aarav Groups",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      groupschats: false,
      _id: "1",
      totalmembers: 8,
      members: [
        { id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalmessages: 6,
      creator: {
        name: "Aarav",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "Shubham Groups",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      groupschats: true,
      _id: "2",
      totalmembers: 5,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalmessages: 20,
      creator: {
        name: "Shubham",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],

  messages: [
    {
      attachments: [
        {
          public_id: "asdf",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "Ladka ka message hai",
      groupschats: false,
      _id: "1",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Shubha, kumar",
      },
      chat: "chatId12",
      createdAt: "2025-02-12T10:41:30.630Z",
    },
    {
      attachments: [
        {
          public_id: "asdfs",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "Ladka ka message hai",
      groupschats: false,
      _id: "2",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Aarav kumar",
      },
      chat: "chatId12",
      createdAt: "2025-02-12T10:41:30.630Z",
    },
  ],
};

export interface ChatData {
    readonly id: string
    readonly owner: UserData
    readonly title: string
    readonly createdAt: string
    readonly members: [UserData]
    readonly messages: [MessageData]
    readonly avatar: MediaData
}

export interface UserData {
    readonly id: string
    readonly createdAt: string
    readonly login: string
    readonly nick : string
    // readonly acl: [string]
    readonly avatar: MediaData
    // readonly chats: [ChatData]
}

export interface MessageData {
    readonly id: string
    readonly createdAt: string
    readonly owner: UserData
    readonly chat: ChatData
    readonly text: string
    readonly media: [MediaData]
    readonly replies: [MessageData]
    readonly replyTo: MessageData
    readonly forwarded: MessageData
    readonly forwardWith: [MessageData]
}

export interface MediaData {
    readonly id: string
    // readonly createdAt: string
    // readonly owner: UserData
    // readonly text: string,
    readonly url: string,
    // readonly originalFileName: string,
    // readonly type: string
    // readonly userAvatar: UserData
    // readonly chatAvatar: [ChatData]
    // readonly messages: [MessageData]
}
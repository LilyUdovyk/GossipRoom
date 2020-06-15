interface variablesData {
    "login"?: string
    "password"?: string
    "nick"?: string
    "activeUserQuery"?: string
    "activeChatQuery"?: string
    "chat_id"?: string
    "text"?: string
    "firstMember_id"?: string
    "secondMember_id"?: string
    "user_id"?: string
    "image_id"?: string
    "media_id"?: string
    "message_id"?: string
    "chat_title"?: string,
    "members"?: { "_id": string; }[]
}

export const dataPost = async (Authorization: string, query: string, variables?: variablesData) => {
    try {
        const response = await fetch('http://chat.fs.a-level.com.ua/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': Authorization
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        });
        const result = response.json();
        return response.ok ? result : new Error('Status is not 200')
    } catch (error) {
        return new Error('dataPost failed')
    }
}
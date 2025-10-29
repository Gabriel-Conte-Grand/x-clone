import { PostWithUser } from "@/types"
import { PostCard } from "./PostCard"
import { PostContent } from "./PostContent"

type Props = {
  replies: PostWithUser[]
}

export const CommentsList = ({ replies }: Props) => {
  return (
    <div className="w-full mx-auto">
      {replies.map((reply) => (
        <PostCard isReply={true} post={reply} key={reply.id}>
          {/* Server component inside client */}
          <PostContent
            content={reply.content}
            image_url={reply.image_url}
            name={reply.user_data.name}
            user_name={reply.user_data.user_name}
            isReply={true} //!!
            userTag={reply.user_data.user_name}
          />
        </PostCard>
      ))}
    </div>
  )
}

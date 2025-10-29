import { PostCard } from "./PostCard"
import { PostWithUser } from "@/types"
import { PostContent } from "./PostContent"
type Props = {
  posts: PostWithUser[]
  isLoggedIn: boolean
}

export const PostsList = ({ posts, isLoggedIn }: Props) => {
  return (
    <div className="md:w-4/5 mx-auto">
      {posts.map((post) => (
        <PostCard
          isReply={false}
          post={post}
          key={post.id}
          isLoggedIn={isLoggedIn}
        >
          {/* Server component inside client  */}
          <PostContent
            content={post.content}
            image_url={post.image_url}
            name={post.user_data.name}
            user_name={post.user_data.user_name}
            isReply={false}
            userTag={post.user_data.user_name}
          />
        </PostCard>
      ))}
    </div>
  )
}

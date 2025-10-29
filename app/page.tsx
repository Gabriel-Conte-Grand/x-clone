import { Navbar } from "@/components/NavBar"
import { PostsList } from "@/components/PostsList"

import { getPosts } from "./actions/getPosts"
import { createClient } from "@/utils/supabase/server"
import { AddPost } from "@/components/AddPost"

const HomePage = async () => {
  const posts = await getPosts()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-screen  flex-col items-center  bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <div className="xl:w-2/5 flex flex-col items-center ">
        {posts.length > 0 ? (
          <PostsList posts={posts} isLoggedIn={!!user} />
        ) : null}
      </div>
      <AddPost />
    </div>
  )
}

export default HomePage

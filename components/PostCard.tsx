"use client"
import { PostWithUser } from "@/types"
import React, { useState } from "react"
import { CommentsList } from "./CommentsList"
import { NewPostForm } from "./NewPostForm"
import { getPostReplies } from "@/app/actions/getPostReplies"
import Image from "next/image"

type Props = {
  post: PostWithUser
  isReply: boolean
  isLoggedIn?: boolean
  children: React.ReactElement
}

export const PostCard = ({
  post,
  isReply = false,
  isLoggedIn = false,
  children,
}: Props) => {
  const [showReplies, setShowReplies] = useState(false)
  const [replies, setReplies] = useState<PostWithUser[]>([])

  const [isCommenting, setIsCommenting] = useState(false)

  const { content, id, user_data, image_url } = post

  const handleClickComments = async () => {
    if (showReplies) {
      return setShowReplies(false)
    }
    const { replies } = await getPostReplies(id)
    setReplies(replies)
    setShowReplies(true)
  }

  const refreshReplies = async () => {
    const { replies } = await getPostReplies(id)
    setReplies(replies)
    setShowReplies(true)
  }

  return (
    <div className="flex flex-col">
      <article
        key={id}
        className={`flex w-full gap-3 p-4 min-h-28  items-center border-b border-gray-800 hover:bg-gray-900 transition ${
          isReply ? "bg-blue-800" : ""
        }`}
      >
        {/* Avatar */}
        {user_data?.avatar_url ? (
          <Image
            width={44}
            height={44}
            src={user_data?.avatar_url || "/default-avatar.png"}
            alt={user_data?.name || "User Avatar"}
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : null}

        <div className="flex flex-col gap-2 w-11/12">
          {/* Server Component */}
          {children}

          {!isReply && (
            <div className="flex  justify-center ">
              <div className="w-4/5  text-center">
                {isLoggedIn && !isReply && (
                  <button
                    onClick={() => setIsCommenting(!isCommenting)}
                    className="text-sm hover:cursor-pointer  text-blue-400 underline  justify-center px-4 "
                  >
                    Reply
                  </button>
                )}
              </div>

              <div className="flex items-center w-1/5 justify-center">
                <svg
                  onClick={handleClickComments}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </article>
      {isCommenting && (
        <NewPostForm
          setShowForm={setIsCommenting}
          postType={1}
          mainPostId={id}
          onPostCreated={refreshReplies}
        />
      )}
      {showReplies && <CommentsList replies={replies} />}
    </div>
  )
}

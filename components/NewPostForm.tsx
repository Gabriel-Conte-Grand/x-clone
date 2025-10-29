"use client"

import { createPost } from "@/app/actions/createPost"
import { Dispatch, SetStateAction, useState } from "react"
import { useFormStatus } from "react-dom"

enum PostType {
  Main = 0,
  Reply = 1,
}

type Props = {
  setShowForm: Dispatch<SetStateAction<boolean>>
  postType: PostType
  mainPostId?: string | null
  onPostCreated?: () => void
}

export const NewPostForm = ({
  setShowForm,
  postType = PostType.Main,
  mainPostId = null,
  onPostCreated,
}: Props) => {
  const [content, setContent] = useState("")

  const handleSubmit = async (formData: FormData) => {
    await createPost(formData, mainPostId)
    setContent("")
    setShowForm(false)
    if (mainPostId !== null) {
      onPostCreated?.() //to update reply list
    }
  }

  return (
    <form
      action={handleSubmit}
      className={`${
        postType === PostType.Main
          ? "absolute  w-[95%] md:w-140 md:bottom-20"
          : "block"
      }  bg-white bottom-4 rounded-lg `}
    >
      <textarea
        maxLength={280}
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full text-black placeholder:text-gray-400  p-2 ml border rounded-t-lg border-blue-200 h-30 bg-gray-100"
        placeholder="Write your post.."
      />
      <div className="flex items-center  w-full p-2 px-4 justify-between">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-red-600 hover:cursor-pointer underline"
        >
          Cancel
        </button>
        <SubmitButton />
      </div>
    </form>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  if (pending) {
    return <span>Enviando</span>
  }

  return (
    <button
      type="submit"
      className="p-2 w-min border hover:cursor-pointer  border-sky-400 rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          color="skyblue"
        />
      </svg>
    </button>
  )
}

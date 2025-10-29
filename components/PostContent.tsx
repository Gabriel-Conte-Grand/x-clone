import Image from "next/image"

type Props = {
  name: string
  user_name: string
  userTag?: string
  content: string | null
  image_url: string | null
  isReply?: boolean
}

export const PostContent = ({
  content,
  image_url,
  name,
  user_name,
  userTag,
  isReply = false,
}: Props) => {
  return (
    <>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-white">{name}</span>
        <span className="text-gray-400">@{user_name}</span>
      </div>

      {/* Text*/}
      <p className="text-white min-h-8  text-[15px] leading-tight whitespace-pre-line wrap-break-words">
        {isReply && <span className="text-blue-300 text-sm">@{userTag}</span>}{" "}
        {content}
      </p>

      {image_url ? (
        <div className="mt-2 rounded-xl overflow-hidden border border-gray-700">
          <Image
            width={600}
            height={400}
            src={image_url}
            alt="tweet-media"
            className="w-full object-cover"
          />
        </div>
      ) : null}
    </>
  )
}

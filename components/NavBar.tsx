import { AuthButtonServer } from "./AuthButton-server"

export const Navbar = () => {
  return (
    <header className="w-full border-b-2 py-2  border-blue-400  text-white">
      <div className="max-w-[1300px] mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-8 h-8 fill-sky-500"
          >
            <g>
              <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723 9.864 9.864 0 0 1-3.127 1.195 4.92 4.92 0 0 0-8.39 4.482A13.978 13.978 0 0 1 1.671 3.149 4.822 4.822 0 0 0 3.195 9.72a4.904 4.904 0 0 1-2.228-.616v.06a4.935 4.935 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.084 4.936 4.936 0 0 0 4.604 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.01-7.513 14.01-14.01 0-.213-.004-.425-.013-.636A9.935 9.935 0 0 0 24 4.59z"></path>
            </g>
          </svg>
          <span className="font-bold text-lg hidden sm:block">
            Twitter Clone
          </span>
        </div>

        <AuthButtonServer />
      </div>
    </header>
  )
}

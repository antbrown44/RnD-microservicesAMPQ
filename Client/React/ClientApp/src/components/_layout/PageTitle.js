import { Link } from "react-router-dom"
import { ArrowSmLeftIcon } from "@heroicons/react/outline"

export default function PageTitle(props) {
  return (
    <div className="flex px-4 py-6 sm:px-6 md:px-8">
      {props.backLink && <Link to={props.backLink} className="mr-4">
        <button
          type="button"
          className="px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <ArrowSmLeftIcon className="h-6 w-6"/>
        </button>
      </Link>}
      <h1 className="text-2xl font-semibold text-gray-900">{props.text} </h1>
    </div>
  )
}
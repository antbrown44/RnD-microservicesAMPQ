import { useEffect } from "react";

export default function Dashboard(props) {
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      props.history.push("/auth");
    }
  }, []);
  
  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  )
}
import App from "@/app"
import Sidebar from "@/components/sidebar"

export default function Page() {
  return (
    <div className="app-container">
      <Sidebar />
      <App />
    </div>
  )
}

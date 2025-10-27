// // import { Link, useLocation } from "react-router-dom";

// // const Sidebar = () => {
// //   const location = useLocation();

// //   return (
// //     <div
// //       style={{
// //         width: "220px",
// //         height: "100vh",
// //         backgroundColor: "#1f2937", // dark gray
// //         color: "#fff",
// //         padding: "20px",
// //         position: "fixed",
// //         top: 0,
// //         left: 0,
// //         display: "flex",
// //         flexDirection: "column",
// //         gap: "20px",
// //       }}
// //     >
// //       <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#10b981" }}>
// //         Gemini AI App
// //       </h2>

// //       <Link
// //         to="/"
// //         style={{
// //           color: location.pathname === "/" ? "#10b981" : "#fff",
// //           textDecoration: "none",
// //           fontWeight: "500",
// //         }}
// //       >
// //         🧠 Chat
// //       </Link>

// //       <Link
// //         to="/image"
// //         style={{
// //           color: location.pathname === "/image" ? "#10b981" : "#fff",
// //           textDecoration: "none",
// //           fontWeight: "500",
// //         }}
// //       >
// //         🎨 Image Generator
// //       </Link>
// //     </div>
// //   );
// // };

// // export default Sidebar;


// import "../styles/sidebar.css"
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useLocation()

//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         <div className="logo">
//           <span className="logo-icon">✨</span>
//           <h2>Gemini AI</h2>
//         </div>
//       </div>

//       <nav className="sidebar-nav">
//         <Link href="/" className={`nav-link ${navigate === "/" ? "active" : ""}`}>
//           <span className="nav-icon">💬</span>
//           <span className="nav-text">Chat</span>
//         </Link>

//         <Link href="/image" className={`nav-link ${navigate === "/image" ? "active" : ""}`}>
//           <span className="nav-icon">🎨</span>
//           <span className="nav-text">Image Generator</span>
//         </Link>
//       </nav>

//       <div className="sidebar-footer">
//         <p className="footer-text">Powered by Google Gemini</p>
//       </div>
//     </aside>
//   )
// }

// export default Sidebar


import { Link, useLocation } from "react-router-dom"
import "../styles/sidebar.css"
import {Image,  MessageCircleHeart} from "lucide-react"
const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">✨</span>
          <h2>Gemini AI</h2>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
          <span className="nav-icon"><MessageCircleHeart color="white"  /></span>
          <span className="nav-text">Chat</span>
        </Link>

        <Link to="/image" className={`nav-link ${location.pathname === "/image" ? "active" : ""}`}>
          <span className="nav-icon"><Image color="white" /></span>
          <span className="nav-text">Image Generator</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <p className="footer-text">Powered by Google Gemini</p>
      </div>
    </aside>
  )
}

export default Sidebar

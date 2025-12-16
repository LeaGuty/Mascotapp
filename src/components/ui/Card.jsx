function Card({ children, className = "", onClick }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
export default function PocketView({ children }) {
  return (
    <div className="viewport">
      <div className="phone">
        {children}
      </div>
    </div>
  )
}

export default function GardenBackground() {
  return (
    <div className="garden-bg" aria-hidden="true">
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
      <div className="hills">
        <div className="hill hill-1" />
        <div className="hill hill-2" />
      </div>
      <div className="river" />
      <div className="flowers">
        <span>🌸</span><span>🌼</span><span>🌺</span><span>🌻</span><span>🌷</span>
      </div>
      <div className="characters left">
        <span title="Ruby Rabbit">🐰</span>
      </div>
      <div className="characters right">
        <span title="Ollie Owl">🦉</span>
        <span title="Bella Bird">🐦</span>
      </div>
    </div>
  )
}

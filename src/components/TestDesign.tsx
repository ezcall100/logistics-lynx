
export function TestDesign() {
  return (
    <div className="min-h-screen bg-dark-darker p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-8">
          Trans Bot AI Design Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Test Card 1 */}
          <div className="holographic-glass p-6 rounded-2xl">
            <h2 className="text-2xl font-semibold gradient-text-cyan mb-4">
              Holographic Glass Effect
            </h2>
            <p className="text-white/80 mb-4">
              This card should have a beautiful glassmorphism effect with cyan/blue gradients.
            </p>
            <button className="btn-primary">
              Test Button
            </button>
          </div>
          
          {/* Test Card 2 */}
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-2xl font-semibold gradient-text-blue mb-4">
              Standard Glass Effect
            </h2>
            <p className="text-white/80 mb-4">
              This card should have a standard glass effect with backdrop blur.
            </p>
            <button className="btn-secondary">
              Secondary Button
            </button>
          </div>
        </div>
        
        {/* Background Test */}
        <div className="mt-8 p-8 rounded-2xl bg-transbot-neural">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Neural Background Test
          </h2>
          <p className="text-white/80">
            This should show the neural network background pattern.
          </p>
        </div>
      </div>
    </div>
  )
}

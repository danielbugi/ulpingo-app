'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute text-6xl animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                💥
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center px-4 max-w-2xl mx-auto text-white">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-9xl">💥</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Erro Crítico
              </h1>
              <p
                className="text-2xl md:text-3xl mb-2"
                dir="rtl"
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  letterSpacing: '0.05em',
                }}
              >
                שגיאה קריטית
              </p>
              <p className="text-xl text-white/70 mb-8">
                Algo deu muito errado. Por favor, recarregue a página.
              </p>
            </div>

            {error.message && (
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left border border-red-500/30">
                <h3 className="text-sm font-semibold text-red-400 mb-2">
                  Detalhes:
                </h3>
                <pre className="text-xs text-white/60 overflow-x-auto">
                  {error.message}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-8 py-4 rounded-2xl font-semibold text-lg bg-purple-600 hover:bg-purple-700 transition-all duration-300 hover:scale-105"
              >
                🔄 Tentar Novamente
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="px-8 py-4 rounded-2xl font-semibold text-lg bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
              >
                🏠 Ir para o Início
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

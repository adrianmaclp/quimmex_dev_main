export default function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">

      {/* Lado izquierdo */}
      <div>
        <h1 className="text-lg font-semibold text-slate-800">
          Quimmex Admin
        </h1>
      </div>

      {/* Lado derecho */}
      <div className="flex items-center gap-3">

        <div className="text-right">
          <p className="text-sm font-medium">
            Administrador
          </p>

          <p className="text-xs text-slate-500">
            admin@quimmex.com
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
          A
        </div>

      </div>

    </header>
  );
}
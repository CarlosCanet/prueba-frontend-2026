
export default function WelcomePage() {
	return (
		<div className="w-dvw h-dvh flex items-center justify-center">
			<div className="w-2/5 flex flex-col items-center justify-center gap-4 text-center">
				<img src="/complete-logo.svg" alt="Diga Logo" className="w-48 h-auto" />
				<h1>Bienvenido a la prueba técnica de Diga!</h1>
				<p>Tendrás una hora para realizarla, es importante que leas el archivo{" "}
					<span className="rounded bg-gray-200 px-1 font-mono">README.md</span>{" "}
					para conocer los detalles de la prueba.</p>
			</div>
		</div>
	);
}

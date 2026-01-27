
export default function EnWelcomePage() {
	return (
		<div className="w-dvw h-dvh flex items-center justify-center">
			<div className="w-2/5 flex flex-col items-center justify-center gap-4 text-center">
				<img src="/complete-logo.svg" alt="Diga Logo" className="w-48 h-auto" />
				<h1>Welcome to Diga's technical test!</h1>
				<p>You'll have an hour to complete as much as possible, it's important to read{" "}
					<span className="rounded bg-gray-200 px-1 font-mono">README.en.md</span>{" "}
					to be informed about every detail.</p>
				<p>Good luck!</p>
			</div>
			<a className="fixed bottom-2 right-2 underline text-blue-800" href="/">Ver esta página en español</a>
		</div>
	);
}

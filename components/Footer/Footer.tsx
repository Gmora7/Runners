import logo from "@/public/ccdr-logo.png";
const Footer = () => {
	return (
		<footer className=" dark:bg-gray-800">
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<a className="flex items-center">
							<img
								src={logo.src}
								className="h-8 mr-3"
								alt="CCDR San José Logo"
							/>
							<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
								CCDR San José
							</span>
						</a>
					</div>
					<div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Contactanos
							</h2>
							<ul className="text-gray-500 dark:text-gray-400 font-medium">
								<li className="mb-4">
									<a
										href="mailto: info@ccdrsanjose.cr"
										className="hover:underline"
										type="email"
									>
										info@ccdrsanjose.cr
									</a>
								</li>
								<li>(+506) 4080-9900</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Síguenos
							</h2>
							<ul className="text-gray-500 dark:text-gray-400 font-medium">
								<li className="mb-4">
									<a
										href="https://www.facebook.com/ccdrsj/"
										className="hover:underline "
									>
										Facebook
									</a>
								</li>
								<li>
									<a
										href="https://www.youtube.com/watch?v=Iky_LrUWWBk"
										className="hover:underline"
									>
										YouTube
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
								Legal
							</h2>
							<ul className="text-gray-500 dark:text-gray-400 font-medium">
								<li className="mb-4">
									<a href="#" className="hover:underline">
										Política de privacidad
									</a>
								</li>
								<li>
									<a href="#" className="hover:underline">
										Térm. &amp; Cond.
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<div className="sm:flex sm:items-center sm:justify-between">
					<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© 2023 Runners San José. Todos los derechos reservados.
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

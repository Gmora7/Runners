import logo from "@/public/ccdr-logo.png";
import Image from "next/image";

const Footer = () => {
	return (
		<footer className="bg-blue-600">
			<div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<a className="flex items-center">
							<Image
								src={logo.src}
								alt="CCDR San José Logo"
								width={200}
								height={100}
								className="mr-3"
								style={{ width: "auto", height: "auto" }} // Add this line
							/>
							<span className="text-white text-2xl font-semibold">
								CCDR San José
							</span>
						</a>
					</div>
					<div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
						<div>
							<h2 className="mb-6 text-sm font-semibold text-white uppercase">
								Contactanos
							</h2>
							<ul className="text-white font-medium">
								<li className="mb-4">
									<a
										href="mailto: info@ccdrsanjose.cr"
										type="email"
										className="bg-blue-600 text-white border-solid:none border-0 hover:underline p-0"
									>
										info@ccdrsanjose.cr
									</a>
								</li>
								<li>(+506) 4080-9900</li>
							</ul>
						</div>
						<div>
							<h2 className="mb-6 text-sm font-semibold text-white uppercase	">
								Síguenos
							</h2>
							<ul className="text-white font-medium">
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
							<h2 className="mb-6 text-sm font-semibold text-white uppercase">
								Legal
							</h2>
							<ul className="text-white font-medium">
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
					<span className="text-sm text-white sm:text-center">
						© 2023 Runners San José. Todos los derechos reservados.
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

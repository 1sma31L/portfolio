import Link from "next/link";
import React from "react";

function Footer() {
	const links = [
		{ name: "About", href: "/" },
		{ name: "Projects", href: "/projects" },
		{ name: "Blog", href: "/blog" },
		{ name: "Contact", href: "/contact/#header" },
	];
	return (
		<footer
			className={`container mx-auto h-[15vh]  rounded-lg text-xs md:text-sm flex justify-center items-center p-4 md:px-0 flex-col `}>
			<div className="flex flex-col sm:flex-row gap-2 justify-between items-center w-full border-2 p-4 border-black">
				<p className=" text-center">
					Contact me at{" "}
					<Link
						href={"mailto:im.boussekine@gmail.com"}
						className="font-bold hover:underline">
						im.boussekine@gmail.com
					</Link>
				</p>
				<div className="flex gap-2 ">
					{links.map((link) => {
						return (
							<Link
								key={link.name}
								href={link.href}
								className="hover:underline">
								{link.name}
							</Link>
						);
					})}
				</div>
			</div>
		</footer>
	);
}

export default Footer;

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiMaterialsScience } from "react-icons/gi";
import { RiCodeSSlashFill } from "react-icons/ri";
import { MdRateReview } from "react-icons/md";
import { MdNaturePeople } from "react-icons/md";

export const navItems = [
	{ path: "/blog", name: "All" },
	{
		path: "/blog/category/science",
		name: "Science",
		icon: <GiMaterialsScience />,
	},
	{
		path: "/blog/category/computer-science",
		name: "Computer Science",
		icon: <RiCodeSSlashFill />,
	},
	// { path: "/blog/category/programming", name: "Programming" },
	{ path: "/blog/category/reviews", name: "Reviews", icon: <MdRateReview /> },
	{ path: "/blog/category/life", name: "Life", icon: <MdNaturePeople /> },
];

function isActive(pathname: string, itemPath: string) {
	return pathname === itemPath;
}

export default function BlogNavBar() {
	let pathname = usePathname() || "/";
	const [hoveredPath, setHoveredPath] = useState(pathname);
	useEffect(() => {
		setHoveredPath(pathname);
	}, [pathname]);

	return (
		<nav
			className="sm:gap-1 relative w-full z-[100] flex justify-center items-center pt-6 md:gap-3 text-[13px] md:text-[18px]"
			id="pheader">
			{navItems.map((item) => {
				const isActiveClass = isActive(pathname, item.path);

				return (
					<Link
						key={item.path}
						className={`md:px-3 md:py-[0.3rem] py-1 px-2 relative duration-150 ease-in rounded-sm font-bold -z-100 ${
							isActiveClass
								? "dark:text-black text-white"
								: "text-zinc-600 dark:text-zinc-400 dark:hover:text-white md:hover:text-black md:hover:bg-zinc-200 md:dark:hover:bg-zinc-800 "
						}`}
						data-active={isActiveClass}
						href={item.path}
						onMouseOver={() => setHoveredPath(item.path)}
						onMouseLeave={() => setHoveredPath(pathname)}>
						<span>{item.name}</span>
						{isActive(pathname, item.path) && (
							<motion.div
								layoutId="clickedbutton2"
								transition={{
									type: "spring",
									bounce: 0.9,
									stiffness: 150,
									damping: 12,
									duration: 0.3,
								}}
								className={
									"absolute inset-0 -z-10 bg-black dark:bg-white rounded-sm"
								}
							/>
						)}
					</Link>
				);
			})}
		</nav>
	);
}

import React from "react";
import { TbArrowBadgeLeftFilled, TbArrowBadgeLeft } from "react-icons/tb";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Link from "next/link";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostProps } from "@/types/types";
import AnimatedDiv from "@/components/AnimatedDiv";

export async function generateStaticParams() {
	const postsDirectory = path.join(process.cwd(), "src", "blog-posts");
	const files = fs.readdirSync(postsDirectory);
	const paths = files.map((fileName) => ({
		slug: fileName.replace(".md", ""),
	}));

	return paths.map((path) => ({ params: path }));
}

async function getPostData(slug: string): Promise<{
	frontMatter: Record<string, any>;
	content: string;
}> {
	const postsDirectory = path.join(process.cwd(), "src", "blog-posts");
	const filePath = path.join(postsDirectory, `${slug}.md`);
	if (!fs.existsSync(filePath)) {
		notFound();
	}
	const fileContent = fs.readFileSync(filePath, "utf-8");
	const { data: frontMatter, content } = matter(fileContent);
	const { htmlContent } = await markdownToHtml(content);

	return {
		frontMatter,
		content: htmlContent,
	};
}

export default async function BlogPost({ params }: PostProps) {
	const { slug } = params;
	const { frontMatter, content } = await getPostData(slug);
	return (
		<AnimatedDiv id={`${frontMatter.title}`}>
			<main className="py-12 container mx-auto px-2 md:px-0" id="slug">
				<div className="container mx-auto prose md:prose-lg lg:prose-xl dark:prose-dark dark:prose-invert">
					<div className="inline-block">
						<Link
							href="/blog"
							className="flex justify-start items-center mb-5 text-zinc-400 hover:text-black transition-colors duration-150 dark:text-zinc-600 dark:hover:text-white group">
							<TbArrowBadgeLeft className="mb-1 group-hover:hidden block " />
							<TbArrowBadgeLeftFilled className="mb-1 group-hover:block hidden " />
							<button className="inline-block">Back</button>
						</Link>
					</div>
					<h1 className="sm:!text-[80px] !text-[47px]">{frontMatter.title}</h1>
					<div className="text-xs md:text-sm">
						{[
							frontMatter.lastMod,
							frontMatter.author,
							frontMatter.readTime,
						].map((item, index) => {
							if (item) {
								return (
									<p key={index} className="m-0 p-0">
										<span className="font-bold">
											{index === 0
												? "Last edited: "
												: index === 1
												? "Author: "
												: "Read Time: "}
										</span>
										{item}
									</p>
								);
							}
							return null;
						})}
					</div>
					<div className="h-1 w-full bg-black dark:bg-white my-10" />
					<div dangerouslySetInnerHTML={{ __html: content }} />
					<div className="dark:text-white text-black flex flex-wrap gap-2 mt-20">
						{frontMatter.tags?.map((tag: string) => {
							return (
								<span
									className="px-2 py-1 border border-zinc-500 dark:border-zinc-200 text-[12px] sm:text-[14px]"
									key={tag}>
									#{tag}
								</span>
							);
						})}
					</div>
				</div>
			</main>
		</AnimatedDiv>
	);
}

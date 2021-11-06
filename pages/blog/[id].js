import React from "react";
const { Client } = require("@notionhq/client");
import Link from "next/link";
import NotionBlocks from "../../components/NotionBlocks/NotionBlocks";
import BlogTitle from "../../components/blog/Title";
import Cover from "../../components/blog/Cover";

const BlogPageDetail = ({ title, cover, content }) => {
  console.log("Blog page detail", title);
  console.log("Blog page detail", cover);
  console.log("Blog page detail", content);
  return (
    <div>
     
      <Link href="/"> Back to Homepage </Link>
      <Cover img={cover} />
      <BlogTitle heading={title[0].plain_text} />
      <NotionBlocks blocks={content} />
    </div>
  );
};

export default BlogPageDetail;

export async function getServerSideProps(context) {
  const notion = new Client({
    auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
  });


  const page = await notion.pages.retrieve({
    page_id: context.query.id
  })

  const data = await notion.blocks.children.list({
    block_id: context.query.id,
  });

  const blogs = data.results;


  console.log("page..........", page.properties?.title?.title)


  // for (const blog of blogs) {
  //   console.log("blog inside loop", blog.type);
  // }

  return {
    props: {
      cover: page.cover?.external?.url,
      title: page.properties?.title?.title,
      content: data.results,
    },
  };
}

import React from "react";
const { Client } = require("@notionhq/client");

const BlogPageDetail = () => {
  return <div>BlogPageDetail</div>;
};

export default BlogPageDetail;

export async function getServerSideProps(context) {
  const notion = new Client({
    auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
  });

  
  const data = await notion.blocks.children.list({
    block_id: context.query.id,
  });

  const blogs = data.results;

  for (const blog of blogs) {
    console.log(blog)
  }

  return {
    props: {
      blogs: data.results,
    }, // will be passed to the page component as props
  };
}

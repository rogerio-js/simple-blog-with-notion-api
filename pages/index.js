import Link from "next/link";
const { Client } = require("@notionhq/client");

export default function IndexPage({ blogs }) {
  return (
    <div>
      {blogs.length > 0 ? (
        <>
          {blogs.map((blog) => {
            return (
              <p key={blog.id}>
                <Link href={`/blog/${blog.id}`}>
                  <a>{blog.child_page.title}</a>
                </Link>
              </p>
            );
          })}
        </>
      ) : (
        <>No Blog found!!</>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const notion = new Client({
    auth: process.env.NEXT_PUBLIC_NOTION_API_KEY,
  });

  const getBlocks = await notion.blocks.children.list({
    block_id: process.env.NEXT_PUBLIC_NOTION_BLOGPAGE_ID,
  });

  const blocks = getBlocks?.results;

  //pass only "child_page" type as props
  let blogs = [];
  
  Object.keys(blocks).forEach((key) => {
    if (blocks[key].type === "child_page") {
      blogs.push(blocks[key]);
    }
  });

  


  return {
    props: {
      blogs: blogs,
    },
  };
}

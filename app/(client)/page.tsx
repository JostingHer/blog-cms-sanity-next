import { client } from "@/sanity/lib/client"; 
import Header from "../components/Header";
import { Post } from "../utils/types";
import Article from "../components/Article";

// OJO
export const revalidate = 60;

async function getPosts() {
  const query = `
           *[_type ==  "post"]{
              _type,
              slug,
              title,
              publishedAt,
              excerpt,
              bodyMD, 
              tags[] -> {
                _id,
                slug,
                name
              }
            }
    `
    const data = await client.fetch(query);

    return data;
}

export default async function Home() {
  const post : Post[] = await getPosts();
  console.log(post)
  return (

    <>
        <Header title="Articles" tags={true}/>
        <main className='max-w-2xl mx-auto px-4 py-10'>
            {post.map((post) => (
              
                <Article key={post._id} post={post} />

            ))}
        </main>

    </>
  
  );
}

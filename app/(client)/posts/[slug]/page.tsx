import Header from '@/app/components/Header'
import { Post } from '@/app/utils/types';
import { client } from '@/sanity/lib/client';
import { VT323 } from 'next/font/google';
import React from 'react'
import Link from 'next/link';
import Markdown from 'markdown-to-jsx';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from "next/navigation";




const dateFont = VT323({ weight: "400", subsets: ["latin"] });

type PropsArticlePage = {
    params: {
        slug: string;
    }
}

const page = async ({params}: PropsArticlePage) => {

    const slug = params?.slug;
    const post = await getPostBySlug(slug);
    console.log(post)

    if(!post){
        notFound();
    }

  return (
    <>

        <Header title={post?.title} />

        <div className="text-center">
            <span className={`${dateFont?.className} text-purple-500`}>
                {new Date(post?.publishedAt).toDateString()}
            </span>
            <div className="mt-5">
                {post?.tags?.map((tag) => (
                <Link key={tag?._id} href={`/tags/${tag.slug.current}`}>
                    <span className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
                    #{tag.name}
                    </span>
                </Link>
                ))}
            </div>
            <div className={richTextStyles}>
                    <Markdown>
                        {post.bodyMD}
                    </Markdown>
            </div>
            <h1 className='py-2 bg-red-700 text-white font-bold text-xl'>se acaba el markdown</h1>
            <div className={richTextStyles}>
                <PortableText
                value={post?.body}
                components={myPortableTextComponents}
            />
            </div>
        </div>

  </>
  )
}
export default page;


const richTextStyles = `
mt-14
text-justify
max-w-2xl
m-auto
prose-headings:my-5
prose-heading:text-2xl
prose-p:mb-5
prose-p:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`;


export const revalidate = 60;

async function getPostBySlug(slug: string): Promise<Post> {
    
    const query = `
              *[_type ==  "post" && slug.current == "${slug}"][0] {
              _type,
              slug,
              title,
              publishedAt,
              excerpt,
              body,
              bodyMD, 
              tags[] -> {
                _id,
                slug{
                current
              },
                name
              }
            }
    `;
    const data = await client.fetch(query);
    return data;
}

const myPortableTextComponents = {
    types: {
      image: ({value} : any) => (
        <Image 
                src={urlFor(value).url()}
                alt='post'
                width={700}
                height={700}
        />
    )
    
    }
  }


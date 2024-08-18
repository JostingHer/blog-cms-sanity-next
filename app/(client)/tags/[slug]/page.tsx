import Article from '@/app/components/Article';
import Header from '@/app/components/Header';
import { Post } from '@/app/utils/types';
import { client } from '@/sanity/lib/client';
import React from 'react'
import { notFound } from "next/navigation";


type PropsCategoryPage = {
    params: {
        slug: string;
    }
}
const page = async ({params} : PropsCategoryPage) => {

    const slug = params.slug;
    const dataPost = await getArticleByCat(slug);

    

  return (
    <>
            <Header title={`desde la pagiana de una categoria ${slug}`} tags={true} />

            <main className='max-w-2xl mx-auto px-4 py-10'>
            {(dataPost?.length > 0 ) && dataPost.map((post) => (
              
                <Article key={post._id} post={post} />

            ))}
        </main>


    </>
  )
}

export default page;



async function getArticleByCat( slugTag: string):Promise<Post[]> {
    const query = `
              *[_type ==  "post" && references(*[_type == "tag" && slug.current == "${slugTag}" ]._id)]{
              _type,
               _id,
               publishedAt,
              slug{
                current
              },
              title,
              tags[]-> {
                _id,
                name,
                slug
            }
                
      }
    `

    const data = await client.fetch(query);

    return data;

}
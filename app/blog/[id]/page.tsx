'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import blog from '@/data/blog.json';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';

// Tipos discriminados para o conteúdo do blog
interface ParagraphContent {
  type: 'paragraph';
  text: string;
}

interface CodeContent {
  type: 'code';
  language: string;
  code?: string | null | undefined;
}

interface ImageContent {
  type: 'image';
  src: string;
  alt?: string;
}

type ContentItem = ParagraphContent | CodeContent | ImageContent;

interface BlogPostProps {
  id: string;
  title: string;
  content: ContentItem[];
  label: string;
  author: string;
  published: string;
  image: string;
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPostProps | null | undefined>(undefined);

  useEffect(() => {
    const { id } = params;

    if (!id) return;

    // Busca simulada
    const res: BlogPostProps | null | undefined = blog.posts.find(
      (item) => item.id === id
    ) as BlogPostProps | undefined;

    setTimeout(() => {
      if (!res) {
        setPost(null);
        return;
      }
      setPost(res);
    }, 1000); // Simula um delay
  }, [params]);

  if (post === undefined) {
    return (
      <div className="p-6">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-5 w-1/2 mb-4" />
        <Skeleton className="h-64 w-full rounded-lg mb-6" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-5/6 mb-2" />
        <Skeleton className="h-5 w-2/3" />
      </div>
    );
  }

  if (!post) {
    return <div>Post não encontrado.</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Início</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/blog">Blog</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Postagem: {post.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Por {post.author} em {post.published}
      </p>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-auto mb-6 rounded-lg shadow-md h-[250px] object-cover"
      />
      <div className="prose prose-lg">
        {post.content.map((item, index) => (
          <div key={index}>
            {item.type === 'paragraph' && <p>{item.text}</p>}
            {item.type === 'code' && (
              <pre>
                <code className={`language-${item.language}`}>{item.code}</code>
              </pre>
            )}
            {item.type === 'image' && (
              <img src={item.src} alt={item.alt || 'Imagem'} />
            )}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

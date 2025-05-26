// pages/articles/[slug].js
import { useRouter } from 'next/router';
import { fetchAPI } from '../../lib/api';
import ReactMarkdown from 'react-markdown'; // You might need to install this: npm install react-markdown
// If you installed @tailwindcss/typography, you can wrap ReactMarkdown in a div with `prose` class
// import Head from 'next/head'; // Good for SEO

export default function ArticlePage({ article }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading article...</div>;
  }

  if (!article) {
    // This case is handled by notFound: true in getStaticProps,
    // but good to have a client-side fallback if article somehow is undefined.
    return <div>Article not found.</div>;
  }

  const { title, content, published_at, featuredImage, author, createdAt } = article.attributes;
  const imageUrl = featuredImage?.data?.attributes?.url;
  const authorName = author?.data?.attributes?.username;

  return (
    <>
      {/* <Head>
        <title>{title} | The Fountain Al-Manba Media</title>
        {article.attributes.excerpt && <meta name="description" content={article.attributes.excerpt} />}
      </Head> */}
      <div className="container mx-auto p-4 max-w-3xl">
        <header className="my-8 text-center"> {/* Centered header */}
          <h1 className="text-4xl font-bold text-green-700 mb-2">{title}</h1>
          <p className="text-gray-600 text-sm">
            Published on: {new Date(published_at || createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
            {authorName && ` by ${authorName}`}
          </p>
        </header>

        {imageUrl && (
          <div className="mb-8">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}${imageUrl}`}
              alt={featuredImage.data.attributes.alternativeText || title}
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <article className="prose lg:prose-xl max-w-none bg-white p-6 shadow-md rounded-lg">
          {/* If content is Markdown */}
          <ReactMarkdown>{content}</ReactMarkdown>
          {/* If content is HTML, you might use dangerouslySetInnerHTML (be careful with XSS) */}
          {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
        </article>

        <div className="mt-8 text-center"> {/* Centered button */}
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            &larr; Back to articles
          </button>
        </div>

        <footer className="text-center mt-12 py-6 border-t">
            <p>&copy; {new Date().getFullYear()} The Fountain Al-Manba Media</p>
        </footer>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const articlesRes = await fetchAPI("/articles?fields[0]=slug");
    const paths = articlesRes.data.map((article) => ({
      params: { slug: article.attributes.slug },
    }));

    return {
      paths,
      fallback: true, // or 'blocking' or false
    };
  } catch (error) {
    console.error("Failed to fetch article paths:", error);
    return {
        paths: [],
        fallback: true,
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    // Fetch a single article by slug, populate related fields
    const articlesRes = await fetchAPI(
      `/articles?filters[slug][$eq]=${params.slug}&populate=featuredImage,author`
    );

    if (!articlesRes.data || articlesRes.data.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        article: articlesRes.data[0], // Strapi returns an array
      },
      revalidate: 60, // Re-generate the page every 60 seconds (ISR)
    };
  } catch (error) {
    console.error(`Failed to fetch article ${params.slug}:`, error);
    return { notFound: true }; // Or handle error differently
  }
}
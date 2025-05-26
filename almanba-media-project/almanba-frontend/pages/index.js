import Link from 'next/link';
import { fetchAPI } from '../lib/api';

export default function HomePage({ articles }) {
  if (!articles || !articles.data) {
    if (articles === null) return <div>Failed to load articles. Please try again later.</div>;
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-green-700">The Fountain Al-Manba Media</h1>
        <p className="text-lg text-gray-600">Illuminating Truth, Uniting Communities</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.data.map((article) => (
          <div key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {article.attributes.featuredImage?.data && (
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL}${article.attributes.featuredImage.data.attributes.url}`}
                alt={article.attributes.featuredImage.data.attributes.alternativeText || article.attributes.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 hover:text-green-600">
                <Link href={`/articles/${article.attributes.slug}`}>
                  {article.attributes.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {new Date(article.attributes.published_at || article.attributes.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
              <p className="text-gray-700 mb-4">
                {article.attributes.excerpt || (article.attributes.content && article.attributes.content.substring(0, 150) + '...')}
              </p>
              <Link href={`/articles/${article.attributes.slug}`} className="text-green-600 hover:text-green-800 font-medium">
                Read more &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center mt-12 py-6 border-t">
        <p>&copy; {new Date().getFullYear()} The Fountain Al-Manba Media</p>
        <p>KLM 129 Lagos Ibadan Expressway, Boluwaji, Ibadan, Oyo State, Nigeria.</p>
        <p>Contact: +2347055030824</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const articlesRes = await fetchAPI("/articles?populate=featuredImage&sort=published_at:desc");
    return {
      props: {
        articles: articlesRes,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return {
      props: { articles: null },
    };
  }
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import service from '../Appwrite/service';
import { Container } from '../components/index.js';

export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts and select the first 3 for featured
    service.ListPost([]).then((response) => {
      if (response && response.documents) {
        setFeaturedPosts(response.documents.slice(0, 3));
      }
    });
  }, []);

  return (
    <div className="bg-gray-400 text-black min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Welcome to LushLines
        </h1>
        <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-xl">
          A modern, futuristic space where you share your feelings in words.
        </p>
      </section>

      {/* Featured Posts Preview */}
      <Container className="px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Featured Stories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredPosts.map((post) => {
            const title = post.title || post.data?.title || 'Untitled';
            const excerpt =
              post.excerpt || post.content || post.data?.excerpt || '';

            return (
              <Link
                key={post.$id}
                to={`/post/${post.$id}`}
                className="block bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  {title}
                </h3>
                <p className="text-sm sm:text-base opacity-80 mb-4">
                  {excerpt.length > 100 ? `${excerpt.substring(0, 100)}...` : excerpt}
                </p>
                <span className="text-xs sm:text-sm uppercase tracking-wide border-b-2 border-black">
                  Read More
                </span>
              </Link>
            );
          })}
        </div>
      </Container>

      {/* Call to Action */}
      <section className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Link
          to="/add-posts"
          className="inline-block bg-black text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-opacity-90 transition-opacity duration-200"
        >
          Share Your Thoughts
        </Link>
      </section>
    </div>
  );
}

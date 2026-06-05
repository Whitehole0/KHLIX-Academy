// src/pages/public/BlogPost.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "../../components/Skeleton";

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    const mockPost = {
      id: parseInt(postId),
      title: "10 Tips to Master React in 2024",
      content: `
        <p>React continues to be one of the most popular JavaScript libraries for building user interfaces. As we move through 2024, staying up-to-date with best practices and new patterns is crucial for React developers. Here are 10 tips to help you master React this year.</p>

        <h2>1. Master Hooks</h2>
        <p>Hooks revolutionized how we write React components. Make sure you understand not just useState and useEffect, but also useMemo, useCallback, useRef, and custom hooks. Understanding when and why to use each hook is key to writing efficient React applications.</p>

        <h2>2. Understand the Virtual DOM</h2>
        <p>React's virtual DOM is what makes it fast. Understanding how React reconciles changes and when components re-render will help you optimize your applications. Learn about the diffing algorithm and how keys affect reconciliation.</p>

        <h2>3. Optimize Performance</h2>
        <p>Learn techniques like code splitting, lazy loading, and memoization. Use React.memo for functional components, and understand when to use useMemo and useCallback to prevent unnecessary re-renders.</p>

        <h2>4. State Management</h2>
        <p>While useState and useReducer are great for local state, you might need more for complex applications. Understand when to use Context API, when to bring in Redux, and explore newer options like Zustand or Jotai.</p>

        <h2>5. Type Safety with TypeScript</h2>
        <p>TypeScript has become essential for large React applications. Learn how to properly type props, state, context, and hooks. This will catch bugs early and improve developer experience.</p>

        <h2>6. Testing Strategies</h2>
        <p>Write tests that give you confidence. Learn React Testing Library and Jest. Test component behavior, not implementation details. Understand unit tests vs integration tests vs end-to-end tests.</p>

        <h2>7. Server Components and Suspense</h2>
        <p>React Server Components are changing how we think about data fetching and rendering. Learn about Suspense and how it integrates with data fetching libraries. Understand the benefits of server components for performance and SEO.</p>

        <h2>8. Build Custom Hooks</h2>
        <p>Custom hooks are a powerful way to reuse logic across components. Create hooks for data fetching, form handling, local storage, and more. This will make your code more maintainable and reusable.</p>

        <h2>9. Learn the Ecosystem</h2>
        <p>React doesn't exist in isolation. Learn React Router for navigation, React Query or SWR for data fetching, and popular component libraries. Understand how these tools work together.</p>

        <h2>10. Stay Updated</h2>
        <p>The React ecosystem evolves quickly. Follow the React blog, attend conferences, and engage with the community. Try out new features in beta versions and understand upcoming changes.</p>

        <p>Remember, mastering React is a journey. Start with these tips, build projects, and keep learning. The React ecosystem is rich and constantly evolving, so stay curious and keep coding!</p>
      `,
      author: "Sarah Johnson",
      authorAvatar: "SJ",
      authorBio:
        "Sarah is a senior software engineer with over 10 years of experience. She specializes in React and has taught thousands of students through her courses.",
      date: "2024-03-15",
      readTime: 5,
      category: "Development",
      tags: ["React", "JavaScript", "Web Development", "Tutorial"],
    };

    setPost(mockPost);

    // Related posts
    setRelatedPosts([
      {
        id: 2,
        title: "Understanding React Hooks: A Deep Dive",
        author: "Michael Chen",
        readTime: 8,
      },
      {
        id: 3,
        title: "React Performance Optimization Techniques",
        author: "Emily Rodriguez",
        readTime: 6,
      },
      {
        id: 4,
        title: "TypeScript with React: Best Practices",
        author: "David Kim",
        readTime: 7,
      },
    ]);

    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton count={5} type="card" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block"
        >
          ← Back to Blog
        </Link>

        <article className="card">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-sm rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-400">
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-300 text-lg">
                    {post.authorAvatar}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium">{post.author}</div>
                  <div className="text-sm text-gray-400">
                    {formatDate(post.date)}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                  <svg
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                  <svg
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="h-96 bg-gray-700 rounded-lg mb-8 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
              <span className="text-6xl">📚</span>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="px-3 py-1.5 bg-gray-700 text-gray-300 text-sm rounded-lg hover:bg-gray-600"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <div className="card mt-8">
          <div className="flex items-start">
            <div className="w-16 h-16 bg-indigo-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-indigo-300 text-xl">
                {post.authorAvatar}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                About {post.author}
              </h3>
              <p className="text-gray-400">{post.authorBio}</p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            Related Articles
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="card hover:border-gray-600"
              >
                <h4 className="text-white font-medium mb-2 hover:text-indigo-400">
                  {post.title}
                </h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{post.author}</span>
                  <span className="text-gray-400">
                    {post.readTime} min read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

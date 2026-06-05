// src/pages/public/Blog.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import Skeleton from "../../components/Skeleton";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data
    const mockPosts = [
      {
        id: 1,
        title: "10 Tips to Master React in 2024",
        excerpt:
          "Learn the best practices and tips to become a React expert this year...",
        author: "Sarah Johnson",
        authorAvatar: "SJ",
        date: "2024-03-15",
        readTime: 5,
        category: "Development",
        image: null,
        tags: ["React", "JavaScript", "Web Development"],
      },
      {
        id: 2,
        title: "The Future of Data Science: Trends to Watch",
        excerpt:
          "Explore the emerging trends in data science and how they will shape the industry...",
        author: "Michael Chen",
        authorAvatar: "MC",
        date: "2024-03-12",
        readTime: 7,
        category: "Data Science",
        image: null,
        tags: ["Data Science", "AI", "Machine Learning"],
      },
      {
        id: 3,
        title: "How to Build a Successful Tech Career",
        excerpt:
          "Practical advice for advancing your career in the technology industry...",
        author: "Emily Rodriguez",
        authorAvatar: "ER",
        date: "2024-03-10",
        readTime: 6,
        category: "Career",
        image: null,
        tags: ["Career", "Professional Development", "Tech"],
      },
      {
        id: 4,
        title: "Understanding Cloud Architecture Patterns",
        excerpt:
          "Deep dive into modern cloud architecture patterns and best practices...",
        author: "David Kim",
        authorAvatar: "DK",
        date: "2024-03-08",
        readTime: 8,
        category: "Cloud",
        image: null,
        tags: ["AWS", "Cloud", "DevOps"],
      },
      {
        id: 5,
        title: "Machine Learning for Beginners: A Practical Guide",
        excerpt:
          "Start your machine learning journey with this comprehensive guide...",
        author: "Sarah Johnson",
        authorAvatar: "SJ",
        date: "2024-03-05",
        readTime: 10,
        category: "Data Science",
        image: null,
        tags: ["Machine Learning", "Python", "AI"],
      },
      {
        id: 6,
        title: "The Complete Guide to System Design Interviews",
        excerpt:
          "Everything you need to know to ace system design interviews...",
        author: "Michael Chen",
        authorAvatar: "MC",
        date: "2024-03-01",
        readTime: 12,
        category: "Career",
        image: null,
        tags: ["Interviews", "System Design", "Career"],
      },
    ];

    setPosts(mockPosts);
    setLoading(false);
  };

  const categories = ["all", ...new Set(posts.map((post) => post.category))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts[0];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Khlix Academy Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and news from our team of experts
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="w-full md:w-96">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search articles..."
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category ?
                    "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ?
          <Skeleton count={6} type="card" />
        : <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <div className="card hover:border-indigo-500 transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="h-64 bg-gray-700 rounded-lg overflow-hidden">
                      {featuredPost.image ?
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover"
                        />
                      : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900/30 to-purple-900/30">
                          <span className="text-4xl">📝</span>
                        </div>
                      }
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-full">
                          Featured
                        </span>
                        <span className="text-sm text-gray-400">
                          {featuredPost.readTime} min read
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3 hover:text-indigo-400">
                        <Link to={`/blog/${featuredPost.id}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="text-gray-400 mb-4">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center mt-auto">
                        <div className="w-10 h-10 bg-indigo-900/30 rounded-full flex items-center justify-center mr-3">
                          <span className="text-indigo-300 text-sm">
                            {featuredPost.authorAvatar}
                          </span>
                        </div>
                        <div>
                          <div className="text-white text-sm">
                            {featuredPost.author}
                          </div>
                          <div className="text-xs text-gray-400">
                            {formatDate(featuredPost.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(1).map((post) => (
                <div
                  key={post.id}
                  className="card hover:border-gray-600 transition-all duration-300"
                >
                  <div className="h-48 bg-gray-700 rounded-lg mb-4 overflow-hidden">
                    {post.image ?
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <span className="text-3xl opacity-30">📄</span>
                      </div>
                    }
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xs text-gray-400">
                      {post.readTime} min read
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-indigo-400">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 hover:text-indigo-400">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-900/30 rounded-full flex items-center justify-center mr-2">
                      <span className="text-indigo-300 text-xs">
                        {post.authorAvatar}
                      </span>
                    </div>
                    <div>
                      <div className="text-white text-xs font-medium">
                        {post.author}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDate(post.date)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 1 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4 opacity-30">📝</div>
                <h3 className="text-xl text-white mb-2">No more articles</h3>
                <p className="text-gray-400">Check back soon for new content</p>
              </div>
            )}
          </>
        }

        {/* Newsletter */}
        <div className="mt-16 card text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Get the latest articles, tutorials, and resources delivered straight
            to your inbox
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-grow"
            />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;

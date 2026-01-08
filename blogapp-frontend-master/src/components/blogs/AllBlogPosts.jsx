import BlogCard from "../common/BlogCard";

export default function AllBlogPosts({ posts, loading}) {
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto px-6 py-12">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.name}
            body={post.summary.substring(0,100)}
            image={post.thumbnail}
            created_at={post.created_at}
          />
        ))}
        
      </div>
    </>
  );
}
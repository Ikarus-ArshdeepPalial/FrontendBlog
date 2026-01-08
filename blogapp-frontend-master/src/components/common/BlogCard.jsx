import { Link } from 'react-router-dom';

export default function BlogCard({ id, image, title, body, created_at , category}) {
  const imageUrl = image; // The image prop already provides the full URL

  return (
    <Link to={`/blog/${id}`} className="block">
      {imageUrl && <img src={imageUrl} alt={title} className="rounded-xl mb-4 h-48 w-full object-cover"/>}
      <p className="text-gray-500 mb-4 text-sm font-semibold mt-5">
        {new Date(created_at).toDateString()}
      </p>
      <p className="text-gray-500 mb-4 text-sm font-semibold mt-5">
        {category}
      </p>
      <h3 className="font-bold text-md mb-3">
        {title}
      </h3>
      <p className="text-gray-600 mb-3">
        {body}
      </p>
      <span className="text-[#CF462A] font-bold text-sm cursor-pointer">
        Read more...
      </span>
    </Link>
  );
}
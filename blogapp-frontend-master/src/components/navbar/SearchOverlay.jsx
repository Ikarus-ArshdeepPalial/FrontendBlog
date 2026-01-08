import { Search, Clock, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchOverlay = ({ closeSearch }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const searchInputRef = useRef(null);
    const apiHost = import.meta.env.VITE_API_HOST;

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query && !category) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const params = {};
                if (query) params.q = query;
                if (category) params.category = category;

                const response = await axios.get(`${apiHost}/api/blog/search/`, { params });
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchResults();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, category, apiHost]);

    const categories = ["finance", "education", "technology", "health"];

    const stripHtml = (html) => {
        if (!html) return "";
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <div className="bg-white opacity-100 rounded-lg shadow-xl overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b">
                <Search className="text-gray-500" size={20} />
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search blogs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full text-lg outline-none placeholder-gray-400"
                />
                <button onClick={closeSearch} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 py-8 max-h-[70vh] overflow-y-auto">
                <div className="md:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-500 mb-4">
                        {query || category ? "Search Results" : "Start typing to search"}
                    </h3>

                    {loading ? (
                        <div className="text-gray-500">Loading...</div>
                    ) : results.length > 0 ? (
                        <ul className="space-y-4">
                            {results.map((blog) => (
                                <li key={blog.id} className="group">
                                    <Link
                                        to={`/blog/${blog.id}`}
                                        onClick={closeSearch}
                                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 truncate">
                                                {blog.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 line-clamp-2 mt-1 break-words">
                                                {stripHtml(blog.content)}
                                            </p>
                                        </div>
                                        <ArrowRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (query || category) ? (
                        <div className="text-gray-500">No results found.</div>
                    ) : null}
                </div>

                <div className="border-l pl-8 border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 mb-4">
                        Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat, index) => (
                            <button
                                key={index}
                                onClick={() => setCategory(category === cat ? "" : cat)}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${category === cat
                                    ? "bg-blue-100 text-blue-700 font-medium"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SearchOverlay;
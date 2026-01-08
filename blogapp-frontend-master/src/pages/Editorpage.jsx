import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuillEditor from "../components/editor/Quilleditor.jsx";
import { createBlog } from "../services.js";
import Navbar from "../components/navbar/Navbar.jsx";

export default function Editorpage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', title);
    formData.append('content', content);
    if (thumbnail) {
        formData.append('thumbnail', thumbnail);
    }

    try {
      await createBlog(formData);
      navigate('/');
    } catch (error) {
      console.error("Failed to create blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-5xl px-6 py-12">
          <h2 className="text-xl font-bold mb-8 text-center">
            Ikarus Blog Editor
          </h2>

          <div className="bg-white rounded-xl shadow-md p-6">
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <div className="mb-4">
              <label htmlFor="thumbnail" className="block text-gray-700 font-bold mb-2">Thumbnail Image</label>
              <input
                  type="file"
                  id="thumbnail"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <QuillEditor value={content} onChange={setContent} />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handlePublish}
              disabled={loading}
              className="bg-[#DA634B] text-white px-6 py-3 rounded-lg cursor-pointer transition duration-300 hover:bg-[#CF462A] disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

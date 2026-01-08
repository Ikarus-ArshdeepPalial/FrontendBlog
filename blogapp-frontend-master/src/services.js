import api from './api';

const getPosts = async (page = 1) => {
    const response = await api.get(`/api/blog/get_blogs/?page=${page}`);
    return response.data;
}

const signup = async (userData) => {
    const response = await api.post("/api/user/signup/", userData);
    return response.data;
}

const login = async (credentials) => {
    const response = await api.post("/api/user/login/", credentials);
    return response.data;
}

const createBlog = async (blogData) => {
    const response = await api.post("/api/blog/create/", blogData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

const getSingleBlog = async (recent = false) => {
    const response = await api.get(`/api/blog/getsingleblog/?recent=${recent}`);
    return response.data;
}

const getMe = async () => {
    const response = await api.get("/api/user/manageuser/");
    return response.data;
}

const getBlogById = async (id) => {
    const response = await api.get(`/api/blog/manage/${id}/`);
    return response.data;
}

export { getPosts, signup, login, createBlog, getSingleBlog, getMe, getBlogById };
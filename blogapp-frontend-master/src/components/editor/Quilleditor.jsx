import React, { useEffect, useRef, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import api from '../../api'; // Import the shared api instance

const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const apiHost = import.meta.env.VITE_API_HOST; // Re-introduce apiHost import

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await api.post('/api/blog/image/manage/', formData); // Use api instance
        const imageUrl = apiHost + response.data.image_url; // Prepend apiHost for absolute URL
        
        const quill = quillRef.current;
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  }, [apiHost]); // Add apiHost to dependency array

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              [{ 'header': [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              ['clean']
            ],
            handlers: {
              image: imageHandler
            }
          },
          clipboard: {
            matchers: [
              ['img', (node, delta) => {
                const Delta = Quill.import('delta');
                if (node.src.startsWith('data:image/')) {
                  const blob = dataURLtoBlob(node.src);
                  const formData = new FormData();
                  formData.append('image', blob);
                  return api.post('/api/blog/image/manage/', formData) // Use api instance
                    .then(response => {
                      const imageUrl = apiHost + response.data.image_url; // Prepend apiHost for absolute URL
                      return new Delta().insert({ image: imageUrl });
                    })
                    .catch(error => {
                      console.error('Error uploading image:', error);
                      return new Delta();
                    });
                } else {
                  return delta;
                }
              }]
            ]
          }
        }
      });

      quillRef.current = quill;

      quill.on('text-change', (delta, oldDelta, source) => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [imageHandler, apiHost]); // Add apiHost to dependency array

  const dataURLtoBlob = (dataurl) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      const delta = quillRef.current.clipboard.convert(value);
      quillRef.current.setContents(delta, 'silent');
    }
  }, [value]);

  return <div ref={editorRef} />;
}

export default QuillEditor;

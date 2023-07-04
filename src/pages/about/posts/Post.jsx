import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

export default function Post() {
  const { id } = useParams();
  const {
    data: post,
    loading,
    error,
  } = useFetch(`https://dummyjson.com/posts/${id}`);
  // const [post, setPost] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetchPosts(id);
  // }, [id]);

  // async function fetchPosts(postId) {
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`https://dummyjson.com/posts/${postId}`);
  //     const data = await res.json();

  //     if (data) {
  //       setPost(data);
  //     }
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  if (loading || !post) return <h2>Loading...</h2>;
  if (error) return <h2>Error - {error.toString()}</h2>;

  return (
    <div>
      <h1>{post?.title}</h1>
      <div>{post?.body}</div>
      {post?.tags?.length && (
        <div>
          <ul>
            {post.tags.map((tag, i) => (
              <li key={i}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

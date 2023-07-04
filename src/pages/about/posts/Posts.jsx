import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

export default function Posts() {
  const { data, loading, error } = useFetch("https:://dummyjson.com/posts");

  if (loading || !data?.posts?.length) return <h2>Loading...</h2>;
  if (error) return <h2>Error - {error.toString()}</h2>;

  return (
    <div>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openPost } from "../../store/postSlice";

function PostCard({ id, slug, title, content, imageUrl }) {
  const dispatch = useDispatch();
  // console.log(id, slug, title, content, imageUrl);

  const selectedPost = () => {
    dispatch(
      openPost({
        id,
        slug,
        title,
        content,
        imageUrl,
      })
    );
  };
  return (
    <Link to={`/post/${id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-56 object-contain rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold truncate ">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;

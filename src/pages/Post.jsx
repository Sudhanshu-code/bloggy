import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import services from "../firebase/services";
import { useSelector } from "react-redux";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import WrongPage from "./WrongPage";
import LodingPage from "./LodingPage";

function Post() {
  const [loader, setLoader] = useState(true);
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.userData);

  const isAuthor = post && userData ? post.userId === userData.userId : false;

  if (!slug) {
    navigate("/");
    return;
  }
  useEffect(() => {
    setLoader(true);
    services.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
      }
      setLoader(false);
    });
  }, [slug, navigate]);

  const deletePost = () => {
    services.deletePost(slug).then((status) => {
      if (status) {
        services.deleteFile(post.filePath);
        navigate("/");
      }
    });
  };

  if (!loader) {
    return post ? (
      <div className="py-8">
        <Container>
          <div className="w-full flex justify-center mb-4 relative border-2 border-black dark:border-white  rounded-xl p-2">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="rounded-xl object-contain h-80"
            />

            {isAuthor && (
              <div className="absolute right-4 top-6">
                <Link to={`/edit-post/${slug}`}>
                  <Button
                    bgColor="bg-green-500"
                    text="Edit"
                    className="mr-3 "
                  />
                </Link>
                <Button
                  bgColor="bg-red-500"
                  text="Delete"
                  onClick={deletePost}
                />
              </div>
            )}
          </div>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              {post.title}
            </h1>
          </div>
          <div className="browser-css text-black dark:text-white ">
            {parse(`${post.content}`)}
          </div>
        </Container>
      </div>
    ) : (
      <WrongPage />
    );
  } else {
    return <LodingPage />;
  }
}

export default Post;

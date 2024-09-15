import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import services from "../firebase/services";
import LoadingPage from "./LodingPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Home() {
  const [posts, setPosts] = useState([]);
  const userStatus = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!userStatus.isUserLoggedIn) {
      navigate("/login");
    } else {
      setLoader(true);
      services.getAllPosts().then((posts) => {
        if (posts) {
          setPosts(posts);
        }
      });
    }
    setLoader(false);
  }, []);

  if (!loader) {
    if (posts.length === 0) {
      return (
        <div className="w-full py-8 mt-4 text-center">
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <LoadingPage />
              </div>
            </div>
          </Container>
        </div>
      );
    }
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.imageUrl} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  } else {
    return <LoadingPage />;
  }
}

export default Home;

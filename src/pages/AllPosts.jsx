import React, { useState } from "react";
import { Container, PostCard } from "../components";
import services from "../firebase/services";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userStatus = useSelector((state) => state.user.isUserLoggedIn);

  // useEffect(() => {}, []);
  if (userStatus) {
    services.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts);
      }
    });
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid gap-4 md:grid-cols-3 grid-cols-2">
          {posts.map((post) => (
            <div key={post.id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

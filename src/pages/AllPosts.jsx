import React, { useState } from "react";
import { Container, PostCard } from "../components";
import services from "../firebase/services";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userStatus = useSelector((state) => state.user.isUserLoggedIn);
  console.log("user status: ", userStatus);

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
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

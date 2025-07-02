import { useEffect, useState } from "react";
import service from "../Appwrite/service"
import { Postcard, Container } from "../components/index.js"

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.ListPost([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap -mx-2 ">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <Postcard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPostsPage;

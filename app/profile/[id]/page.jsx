"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import Loading from "../loading";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setIsLoading(false); // Set loading state to false when fetching is done
      }
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page.`}
      data={userPosts}
    />
  );
};

export default UserProfile;

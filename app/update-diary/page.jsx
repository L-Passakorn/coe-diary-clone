"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateDiary = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const diaryId = searchParams.get("id");

  const [post, setPost] = useState({ diary: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getDiaryDetails = async () => {
      const response = await fetch(`/api/diary/${diaryId}`);
      const data = await response.json();

      setPost({
        diary: data.diary,
        tag: data.tag,
      });
    };

    getDiaryDetails();
  }, [diaryId]);

  const updateDiary = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!diaryId) return alert("Diary ID Not Found");

    try {
      const response = await fetch(`/api/diary/${diaryId}`, {
        method: "PATCH",
        body: JSON.stringify({
          diary: post.diary,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateDiary}
    />
  );
};

export default UpdateDiary;

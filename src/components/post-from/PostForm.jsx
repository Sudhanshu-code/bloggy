import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Rte, Select } from "../index";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import services from "../../firebase/services";

function PostForm({ post, id }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const { register, handleSubmit, setValue, watch, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "",
      },
    });

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;
      if (file) {
        await services.deleteFile(post.filePath);
      }
      const dbPost = await services.updatePost(id, {
        ...data,
        userId: userData.userId,
        imageUrl: file ? file.url : post.imageUrl,
        filePath: file ? file.filePath : post.filePath,
      });
      if (dbPost) {
        navigate(`/post/${id}`);
      } else {
        navigate(`/post/${id}`);
      }
    } else {
      let file = null;
      if (data.image && data.image[0]) {
        file = await services.uploadFile(data.image[0]);
      }

      if (file) {
        data.filePath = file.filePath;
        data.imageUrl = file.url;

        const dbPost = await services.createPost({
          ...data,
          userId: userData.userId,
        });
        if (dbPost) navigate(`/post/${dbPost.id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          readOnly
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Rte
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img src={post.imageUrl} alt={post.title} className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Select Status: "
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          text={post ? "Update" : "Submit"}
        ></Button>
      </div>
    </form>
  );
}

export default PostForm;

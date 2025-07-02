import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RTE, Button, Input, Select } from "./index";
import service from "../Appwrite/service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, getValues, control ,reset} =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.userdata);

  // const submit = async (data) => {
  //   try {
  //     if (post) {
  //     const file = data.image[0] ? service.createFile(data.image[0]) : null;
  //     if (file) {
  //       service.deleteFile(post.featuredImage);
  //     }
  //     const dbPost = await service.updatePost(post.$id, {
  //       ...data,
  //       featuredImage: file ? file.$id : undefined,
  //     });

  //     if (dbPost) {
  //       navigate(`/post/${dbPost.$id}`);
  //     } else {
  //       const file = await service.createFile(data.image[0]);

  //       if (file) {
  //         const fileId = file.$id;
  //         data.featuredImage = fileId;
  //         const dbPost = await service.createPost({
  //           ...data,
  //           userId: userData.$id,
  //         });
  //         if (dbPost) {
  //           navigate(`/post/${dbPost.$id}`);
  //         }
  //       }
  //     }
  //   }
  //   } catch (error) {
  //     console.log("Error in submitting post", error);
  //   }
  // };

  const submit = async (data) => {
  try {
    let fileId = post?.featuredImage;

    if (data.image && data.image[0]) {
      const file = await service.createFile(data.image[0]);
      if (file) {
        fileId = file.$id;
        if (post?.featuredImage) {
          await service.deleteFile(post.featuredImage);
        }
      }
    }

    const payload = {
      ...data,
      featuredImage: fileId,
      userId: userData?.$id,
    };

    const dbPost = post
      ? await service.updatePost(post.$id, payload)
      : await service.createPost(payload);

    if (dbPost) {
      navigate(`/post/${dbPost.$id}`);
    } else {
      console.error('Error: Post could not be saved.');
    }
  } catch (error) {
    console.error('Error in submit:', error);
  }
};


  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with -
      .replace(/^-+|-+$/g, '');   // Remove leading/trailing -

    }
    return "";
  });

  useEffect(() => {
      const subscription = watch((value,{name})=>{
        if(name==='title'){
            setValue('slug',slugTransform(value.title,{shouldValidate:true}))
        }
      })

      return () => subscription.unsubscribe()
  })

  useEffect(() => {
  if (post) {
    reset({
      title: post.title || "",
      slug: post.slug || "",
      content: post.content || "",
      status: post.status || "active",
    });
  }
}, [post, reset]);



return (
  <form
    onSubmit={handleSubmit(submit)}
    className="flex flex-wrap -mx-2"
  >
    {/* Main Content Area */}
    <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
      <Input
        label="Title :"
        placeholder="Title"
        className="mb-4"
        {...register("title", { required: true })}
      />
      <Input
        label="Slug :"
        placeholder="Slug"
        className="mb-4"
        {...register("slug", { required: true })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
        }}
      />
      <RTE
        label="Content :"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />
    </div>

    {/* Sidebar Area */}
    <div className="w-full md:w-1/3 px-2">
      <Input
        label="Featured Image :"
        type="file"
        className="mb-4"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", { required: !post })}
      />

      {post && (
        <div className="w-full mb-4">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
      )}

      <Select
        options={["active", "inactive"]}
        label="Status"
        className="mb-4"
        {...register("status", { required: true })}
      />

      <Button
        type="submit"
        bgColor={post ? "bg-green-500" : undefined}
        className="w-full"
      >
        {post ? "Update" : "Submit"}
      </Button>
    </div>
  </form>
);

};

export default PostForm;

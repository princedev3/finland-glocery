"use client";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";
import { userStore } from "@/provider/user-store";
import { useDeleteCommentMutation } from "@/app/_apis_/_comment_index.apis";
import StarRating from "./navbar-collections/star-rating";
import { CreatedComment } from "@/constants/types";

const ListComments = ({commentData}:{commentData:{
    createdComment: CreatedComment[];
    averageRating: number;
}}) => {


  const session = userStore((state) => state.session);
  const [deleteComment] = useDeleteCommentMutation();
  const handleDelete = async (productId:string) => {
    try {
      const res = await deleteComment({ productId, userId: session?.user?.id });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        return;
      }
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const fadeInVariant = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: (idx: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.05 * idx,
      },
    }),
  };
  return (
    <div className="grid gap-y-4  ">
      {commentData && commentData.createdComment.length>0 &&
        commentData.createdComment.map((item, index) => (
          <motion.div
            variants={fadeInVariant}
            initial="initial"
            viewport={{ once: true }}
            custom={index}
            whileInView="animate"
            key={item.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <Image
                src={(item.user.image as string) || "/noavatar.png"}
                width={40}
                height={40}
                alt=""
                className="object-cover w-[40px] h-[40px] rounded-full"
              />
              <div className="">
                <StarRating rating={item.value} />

                <div className="text-gray-800 flex gap-2 items-center">
                  By{" "}
                  <span className="text-[#00A6E7] capitalize ">
                    {" "}
                    {item.user.name}
                  </span>
                  <span className="text-gray-600 capitalize">
                    | {format(new Date(item.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
                <span className="text-gray-700">{item.comment}</span>
              </div>
            </div>
            <motion.div whileTap={{ scale: 0.95 }} className="">
              {(session?.user?.role === "ADMIN" ||
                session?.user?.id === item.user.id) && (
                <Trash
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-600 cursor-pointer"
                  size={17}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
    </div>
  );
};

export default ListComments;

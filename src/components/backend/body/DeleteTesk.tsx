'use client';
import { deleteArticle } from "@/utils/action/article";
import { deleteCategory } from "@/utils/action/category";
import { deleteComment } from "@/utils/action/comment";
import { deleteSiteInfo } from "@/utils/action/siteCustom";
import { deleteUser } from "@/utils/action/user";
import { redirect } from "next/navigation";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";

const DeleteTesk = ({id, model}: {id: string, model: string}) => {
    const handleDelete = async (id: string) => {

      let resp: any;
      switch(model) {
        case 'category':
          resp =await deleteCategory(id);
          break;
        case 'article':
          resp = await deleteArticle(id);
          break;
        case 'comment':
          resp = await deleteComment(id);
          break;
        case 'user':
          resp = await deleteUser(id);
          break;
        case 'site-custom':
          resp = await deleteSiteInfo(id);
          break;
      }

        if(resp.success && resp.statusCode === 204) {
            toast.success(resp.message);
            return redirect(`/dashboard/${model}`);
        }
    }
  return (
    <button onClick={()=> handleDelete(id)}> <FaTrashCan className="text-red-600 cursor-pointer" /> </button>
  )
}

export default DeleteTesk

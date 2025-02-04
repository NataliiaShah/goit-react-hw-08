import toast from "react-hot-toast";

export const successAdd = () => toast.success("Contact successfully added!");
export const successDelete = () => toast.success("Contact successfully deleted!");
export const successEdit = () => toast.success("Contact successfully updated!");

export const errorNotification = () => toast.error("Oops, something went wrong");
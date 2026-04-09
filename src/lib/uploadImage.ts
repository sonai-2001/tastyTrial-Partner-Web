import axiosInstance from "@/api/axiosInstance";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();

  formData.append("image", file);

  const res = await axiosInstance.post("/upload", formData);

  return res.data.data.imageUrl;
}

export const imageCreate = (url:string)=>{
    const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL;
    return `${baseUrlApi}${url}`;
}
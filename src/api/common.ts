import { defaultRequest } from "helpers";

const uploadFile = async (file: File) => {
  const form = new FormData();
  form.append("image", file);

  return await defaultRequest.post("/api/jwt/uploadFile", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const removeFile = async (id: string) => {
  return await defaultRequest.post(`/api/jwt/file/${id}/remove`);
};

export const commonApi = {
  uploadFile,
  removeFile,
};

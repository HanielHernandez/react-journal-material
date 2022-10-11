export const fileUpload = async (file) => {
  if (!file) throw new Error("NO hay archivos a subir");
  const cloudUrl = "https://api.cloudinary.com/v1_1/dpcwhxeyp/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);
  try {
    const response = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });


    if (!response.ok) throw new Error("no se pudo subir imagen");
    const cloudResponse = await response.json();
    return cloudResponse.secure_url;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
};

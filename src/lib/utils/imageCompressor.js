import imageCompression from "browser-image-compression";

export default async function imageCompressor(file) {
  const options = {
    masSizeMB: 2,
    maxWidthOrHeight: 768,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);

    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log(base64data);
    };
  } catch (e) {
    console.log(e);
  }
}

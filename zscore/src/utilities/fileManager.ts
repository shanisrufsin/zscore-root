import {
  storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "../lib/firebase.config";

export const upload = async (
  files: File[] | Blob[],
  path: string,
  includeFileName: boolean = true,
) => {
  const promises = [];
  const downloadUrlPromises = [];

  for (let file of files) {
    let filePath = `/${path}/${includeFileName ? file.name : ""}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytes(storageRef, file);
    promises.push(uploadTask);
  }

  const results = await Promise.all(promises);

  for (let file of results) {
    const url = await getDownloadURL(file.ref);
    downloadUrlPromises.push({ url, ref: file.ref.fullPath });
  }

  return downloadUrlPromises;
};

export const deleteFile = async (refString: string) => {
  const fileRef = ref(storage, refString);

  try {
    await deleteObject(fileRef);
  } catch (error) {
    console.log("Couldn't delete.");
  }
};

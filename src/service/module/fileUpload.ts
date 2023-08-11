import { AxiosError } from "axios";
import { api } from "../api";

const file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
    })
}
export const fileUpload = async (file: File, path: string) => {
    try {
        const res = await api.post('/utils/fileUpload', { file: await file2Base64(file), path, contentType: file.type });
        return res;
    } catch (error) {
        console.log(error, (error as AxiosError));

    }
}
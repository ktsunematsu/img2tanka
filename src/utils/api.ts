import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://api.example.com/generate-tanka';
const IMAGE_API_KEY = import.meta.env.VITE_IMAGE_API_KEY;
const LANGUAGE_MODEL_API_KEY = import.meta.env.VITE_LANGUAGE_MODEL_API_KEY;

export async function generateTanka(imageFile: File): Promise<string> {
  try {
    const base64Image = await fileToBase64(imageFile);

    // 実際のAPIコール（コメントアウトを解除して使用）
    const response = await axios.post(API_ENDPOINT, 
      { image: base64Image },
      {
        headers: {
          'X-Image-API-Key': IMAGE_API_KEY,
          'X-Language-Model-API-Key': LANGUAGE_MODEL_API_KEY
        }
      }
    );
    const tanka = response.data.tanka;

    // モックレスポンスの代わりに実際のAPIレスポンスを使用
    // const tanka = '春の風\n桜舞い散る\n街の中\n人々の笑顔\n花びらのように';

    return tanka || '短歌を生成できませんでした。';
  } catch (error) {
    console.error('Error in generateTanka:', error);
    throw new Error('短歌の生成中にエラーが発生しました。');
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
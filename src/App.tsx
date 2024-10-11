import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Loader } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import TankaDisplay from './components/TankaDisplay';
import { generateTanka } from './utils/api';

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [tanka, setTanka] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (imageFile: File) => {
    setImage(URL.createObjectURL(imageFile));
    setTanka(null);
    setLoading(true);

    try {
      const generatedTanka = await generateTanka(imageFile);
      setTanka(generatedTanka);
    } catch (error) {
      console.error('Error generating tanka:', error);
      setTanka('短歌の生成中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">画像から短歌ジェネレーター</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <ImageUploader onImageUpload={handleImageUpload} />
        {image && (
          <div className="mt-4">
            <img src={image} alt="Uploaded" className="w-full h-48 object-cover rounded" />
          </div>
        )}
        {loading && (
          <div className="mt-4 flex items-center justify-center">
            <Loader className="animate-spin mr-2" />
            <span>短歌を生成中...</span>
          </div>
        )}
        {tanka && <TankaDisplay tanka={tanka} />}
      </div>
    </div>
  );
}

export default App;
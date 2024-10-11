import React from 'react';

interface TankaDisplayProps {
  tanka: string;
}

const TankaDisplay: React.FC<TankaDisplayProps> = ({ tanka }) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">生成された短歌:</h2>
      <p className="text-lg whitespace-pre-line">{tanka}</p>
    </div>
  );
};

export default TankaDisplay;
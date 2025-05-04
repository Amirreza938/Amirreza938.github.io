import { useState } from 'react';

function WordDefinition({ wordData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  if (!wordData || wordData.length === 0) return null;
  
  const word = wordData[0];
  
  // Find an audio URL if available
  const audioUrl = word.phonetics?.find(p => p.audio)?.audio || '';
  const hasAudio = audioUrl && audioUrl.length > 0;
  
  const playAudio = () => {
    if (!hasAudio || isPlaying) return;
    
    setIsPlaying(true);
    const audio = new Audio(audioUrl.startsWith('//') ? `https:${audioUrl}` : audioUrl);
    
    audio.onended = () => {
      setIsPlaying(false);
    };
    
    audio.onerror = () => {
      setIsPlaying(false);
      console.error('Error playing audio');
    };
    
    audio.play();
  };
  
  return (
    <div className="word-data">
      <div className="word-header">
        <h2>{word.word}</h2>
        {hasAudio && (
          <button 
            className={`audio-btn ${isPlaying ? 'playing' : ''}`} 
            onClick={playAudio}
            disabled={isPlaying}
            aria-label="پخش تلفظ"
          >
            {isPlaying ? '🔊' : '🔈'}
          </button>
        )}
      </div>
      
      {word.phonetic && (
        <p className="phonetic">{word.phonetic}</p>
      )}
      
      {word.meanings.map((meaning, idx) => (
        <div key={idx} className="meaning">
          <h3 className="part-of-speech">{meaning.partOfSpeech}</h3>
          <ul className="definitions">
            {meaning.definitions.map((def, defIdx) => (
              <li key={defIdx} className="definition">
                <p>{def.definition}</p>
                {def.example && <p className="example">"{def.example}"</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      {word.origin && (
        <div className="origin">
          <h3>ریشه:</h3>
          <p>{word.origin}</p>
        </div>
      )}
    </div>
  );
}

export default WordDefinition;
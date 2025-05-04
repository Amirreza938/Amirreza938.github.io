function WordDefinition({ wordData }) {
    if (!wordData || wordData.length === 0) return null;
    
    const word = wordData[0];
    
    return (
      <div className="word-data">
        <h2>{word.word}</h2>
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
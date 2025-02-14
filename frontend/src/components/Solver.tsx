

import { useState } from 'react';
import { excludeLetter, excludeLetterAtPosition, includeLetter, includeLetterAtPosition } from './service';



const Solver: React.FC = () => {

  const [response, setResponse] = useState(null);


  const handleExcludeLetter = async (letter: string) => {
    const res = await excludeLetter(letter);
    setResponse(res);
  };

  const handleIncludeLetter = async (letter: string) => {
    const res = await includeLetter(letter);
    setResponse(res);
  };

  const handleExcludeLetterAtPosition = async (letter: string, position: number) => {
    const res = await excludeLetterAtPosition(letter, position);
    setResponse(res);
  };

  const handleIncludeLetterAtPosition = async (letter: string, position: number) => {
    const res = await includeLetterAtPosition(letter, position);
    setResponse(res);
  };

  return (
    <div>

      {response}

    </div>
  )

}

export default Solver;
import React, { useState } from 'react';
import { dailyGuess, randomGuess, wordGuess } from 'Core/Apis/GuessApi';
import { Mode } from 'Core/Utils/Enum';
import { Box, Typography } from '@mui/material';
import Input from '../Input/Input';
import VoteeButton from '../Button/Button';
import { Item, Wrapper, AnswerText } from './styles';

const Board = ({ mode }) => {
  const [word, setWord] = useState();
  const [size, setSize] = useState();
  const [seed, setSeed] = useState();
  const [slot, setSlot] = useState();
  const [guessedAnswer, setGuessedAnswer] = useState();
  const [guessed, setGuessed] = useState();
  const [shadow, setShadow] = useState('transparent');
  const [suggest, setSuggest] = useState();

  const onChange = (value, type) => {
    switch (type) {
      case 'word':
        setWord(value?.target?.value);
        break;
      case 'size':
        setSize(value?.target?.value);
        break;

      case 'seed':
        setSeed(value?.target?.value);
        break;

      case 'slot':
        setSlot(value?.target?.value);
        break;
    }
  };

  const validate = () => {
    return mode === Mode.DAILY || mode === Mode.RANDOM
      ? !!word
      : !!word && !!slot && word.length === slot.length;
  };

  const handleGuess = async () => {
    if (!validate()) {
      alert('Please fill required data!');
      return;
    }

    try {
      let result = null;

      switch (mode) {
        case Mode.DAILY:
          result = await dailyGuess({
            guess: word,
            size: size || word?.length || 0,
          });
          break;
        case Mode.RANDOM:
          result = await randomGuess({
            guess: word,
            size: size || word?.length || 0,
            seed,
          });
          getAnswer(result);

          break;
        case Mode.WORD:
          result = await wordGuess({
            urlParams: word,
            queryParams: {
              guess: slot,
            },
          });
          break;
      }

      console.log(result);
      setGuessed(result);
    } catch (e) {
      alert(e); //Error Catch
    }
  };

  const getAnswer = async (firstAnswer) => {
    let answer = firstAnswer.map((item) => {
      if (item?.result === 'correct') return item?.guess;
      else return '.';
    });

    let allChars = [
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
    ];

    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === '.') {
        for (let j = 0; j < allChars.length; j++) {
          let answerResult = await randomGuess({
            guess: `${word.slice(0, i)}${allChars[j]}${word.slice(i + 1)}`,
            size: size || word?.length || 0,
            seed,
          });

          if (answerResult[i]?.result === 'correct') {
            answer[i] = allChars[j];
            break;
          }
        }
      }
    }

    setGuessedAnswer(answer);
    getSuggestionChar(answer, firstAnswer);
  };

  const toggleBlur = () => {
    if (shadow === 'transparent') {
      setShadow('black');
    } else {
      setShadow('transparent');
    }
  };

  const getSuggestionChar = (guessedAnswer, firstAnswer) => {
    const firstAnswerTransformed = firstAnswer?.map(item => item?.guess)

    const suggest = guessedAnswer?.map((item) => {
      if (!firstAnswerTransformed?.includes(item)) return item;
      else return '';
    });


    setSuggest(suggest?.filter(item => item != '')?.join(','));
  };

  return (
    <Wrapper>
      <Box sx={{ display: 'flex' }}>
        {!guessed && (
          <>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
          </>
        )}
        {!!guessed && guessed?.map((item) => <Item status={item?.result}>{item?.guess}</Item>)}
      </Box>

      {mode === Mode.DAILY && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }} component="form">
          <Input
            required
            error={!word}
            id="outlined-basic"
            label="Your Word"
            variant="outlined"
            margin="normal"
            value={word}
            onChange={(val) => onChange(val, 'word')}
          />
          <Input
            id="outlined-basic"
            label="Size"
            variant="outlined"
            margin="normal"
            value={size}
            onChange={(val) => onChange(val, 'size')}
          />
          <VoteeButton variant="outlined" text="Result" onClick={handleGuess} />
        </Box>
      )}

      {mode === Mode.RANDOM && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            required
            error={!word}
            id="outlined-basic"
            label="Your Word"
            variant="outlined"
            margin="normal"
            value={word}
            onChange={(val) => onChange(val, 'word')}
          />
          <Input
            id="outlined-basic"
            label="Size"
            variant="outlined"
            margin="normal"
            value={size}
            onChange={(val) => onChange(val, 'size')}
          />

          <Input
            id="outlined-basic"
            label="Seed"
            variant="outlined"
            margin="normal"
            value={seed}
            onChange={(val) => onChange(val, 'seed')}
          />

          <Typography sx={{ display: 'flex', margin: '10px 0 10px 0' }}>
            Let's try these characters: {suggest}
          </Typography>

          <Typography sx={{ display: 'flex', margin: '10px 0 10px 0' }}>
            Tired ? Click to see the answer:{' '}
            <AnswerText onClick={toggleBlur} shadow={shadow}>
              {guessedAnswer}
            </AnswerText>
          </Typography>
          <VoteeButton variant="outlined" text="Result" onClick={handleGuess} />
        </Box>
      )}

      {mode === Mode.WORD && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            required
            error={!word}
            id="outlined-basic"
            label="Your Word"
            variant="outlined"
            margin="normal"
            value={word}
            onChange={(val) => onChange(val, 'word')}
          />
          <Input
            required
            error={!slot}
            id="outlined-basic"
            label="Guess"
            variant="outlined"
            margin="normal"
            value={slot}
            onChange={(val) => onChange(val, 'slot')}
          />
          <VoteeButton variant="outlined" text="Result" onClick={handleGuess} />
        </Box>
      )}
    </Wrapper>
  );
};

export default Board;

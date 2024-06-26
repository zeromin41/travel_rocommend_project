import React, { useState, useEffect } from 'react';

import {
  infj_places,
  infp_places,
  intp_places,
  intj_places,
  istj_places,
  isfj_places,
  istp_places,
  isfp_places,
  estj_places,
  estp_places,
  esfj_places,
  esfp_places,
  enfj_places,
  entj_places,
  entp_places,
  enfp_places
} from './10_place.js';

import KakaoLoginButton from './KakaoLoginButton.jsx';

import './MBTITest.css';

const questions = [
  { question: '여행지에서 새로운 사람들과 만나는 것을 즐기시나요?', type: 'EI' },
  { question: '게스트하우스나 펜션 자체에서 진행하는 파티에 참석하시는 것을 즐기시나요?', type: 'EI' },
  { question: '새로운 여행지를 탐험하는 것을 선호하시나요?', type: 'EI' },
  { question: '여행지의 역사적인 장소나 박물관 탐방을 좋아하시나요?', type: 'SN' },
  { question: '모르는 길을 찾을때 구체적인 매장명, 거리, 주소 등을 파악하고 찾나요?', type: 'SN' },
  { question: '여행중 이동시간에 잡생각 없이 현재에 집중하시나요?', type: 'SN' },
  { question: '여행지 선택 시 실용성과 효율성을 중요하게 고려하시나요?', type: 'TF' },
  { question: '여행중 동행자가 사고가 났을 때 위로보다 119, 보험사 등 현실적인 조언부터 하시나요? ', type: 'TF' },
  { question: '여행 중 개인적인 가치관에 따라 의사결정을 내리시나요?', type: 'TF' },
  { question: '여행 일정을 꼼꼼하게 계획하고 정해진 스케줄대로 진행하는 것을 선호하시나요?', type: 'JP' },
  { question: '여행 계획을 주도적으로 짜시나요?', type: 'JP' },
  { question: '여행지에서 갑자기 이끌리는 카페나 이색적인 장소가 있어도 스케쥴대로 진행하시나요?', type: 'JP' },
];

const mbtiPlaces = {
  INFJ: infj_places,
  INFP: infp_places,
  INTP: intp_places,
  INTJ: intj_places,
  ISTJ: istj_places,
  ISFJ: isfj_places,
  ISTP: istp_places,
  ISFP: isfp_places,
  ESTJ: estj_places,
  ESTP: estp_places,
  ESFJ: esfj_places,
  ESFP: esfp_places,
  ENFP: enfj_places,
  ENTP: entp_places,
  ENFJ: enfj_places,
  ENTJ: entj_places
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const MBTITest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
  });
  const [recommendedPlace, setRecommendedPlace] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [mbtiResult, setMbtiResult] = useState('');

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  const handleAnswer = (answer) => {
    if (currentQuestion < shuffledQuestions.length) {
      const { type } = shuffledQuestions[currentQuestion];
      const newScores = { ...scores };
      newScores[type[answer === 'yes' ? 0 : 1]] += 1;
      setScores(newScores);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setScores({
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
    });
    setRecommendedPlace(null);
    setShuffledQuestions(shuffleArray(questions));
    setMbtiResult('');
  };

  const calculateMBTI = () => {
    const result =
      (scores.E >= scores.I ? 'E' : 'I') +
      (scores.S >= scores.N ? 'S' : 'N') +
      (scores.T >= scores.F ? 'T' : 'F') +
      (scores.J >= scores.P ? 'J' : 'P');
    setMbtiResult(result);
    return result;
  };

  const recommendPlace = () => {
    const mbtiType = calculateMBTI();
    const places = mbtiPlaces[mbtiType];
    console.log(`${places}`);
    if (places && places.length > 0) {
      const randomIndex = Math.floor(Math.random() * places.length);
      setRecommendedPlace(places[randomIndex]);
    } else {
      console.log(`No recommended places found for MBTI type: ${mbtiType}`);
      setRecommendedPlace(null);
    }
  };

  useEffect(() => {
    if (currentQuestion >= shuffledQuestions.length) {
      recommendPlace();
    }
  }, [currentQuestion, shuffledQuestions]);

  if (currentQuestion < shuffledQuestions.length) {
    return (
      <div className="mbti-test-container">
        <h1 className="mbti-test-title">MBTI별 여행 성향 테스트</h1>
        <p className="mbti-test-question">{shuffledQuestions[currentQuestion].question}</p>
        <div className="mbti-test-buttons">
          <button className="mbti-test-button" onClick={() => handleAnswer('yes')}>예</button>
          <button className="mbti-test-button" onClick={() => handleAnswer('no')}>아니오</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mbti-test-result-container">
        <h2 className="mbti-test-result-title">당신의 MBTI 유형은 {mbtiResult}입니다!</h2>
        {recommendedPlace && (
          <div className="mbti-test-recommended-place">
            <h3 className="mbti-test-place-name">추천 여행지 : {recommendedPlace.name}</h3>
            {recommendedPlace.image && (
              <img className="mbti-test-place-image" src={recommendedPlace.image} alt={recommendedPlace.name} />
            )}
          </div>
        )}
        <div className="mbti-test-result-buttons">
          <button className="retest-button" onClick={resetTest}>다시 테스트하기</button>
          <KakaoLoginButton />
        </div>
      </div>
    );
  }
};

export default MBTITest;
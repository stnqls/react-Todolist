import React from 'react';
import './Form.css';

const Form = ({value, onChange, onCreate, onKeyPress}) => {
  //value인풋의 내용 onCreate버튼이 클릭될때 실행되는 함수 onChange인풋내용이 변경될때 실행되는 함수 onKeyPress인풋에서 키를 입력될때 실행되는 함수(enter키가 눌러졌을때 onCreate한 것과 동일한 작업을 하게 된다.)
  return(
    <div className="form">
      <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
      <div className="create-button" onClick={onCreate}>
        추가
      </div>
    </div>
  );
};

export default Form;
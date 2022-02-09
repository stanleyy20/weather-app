import React from 'react';

const Form = ({ value, change }) => {
  return (
    <form>
      <input
        type='text'
        placeholder='Wpisz miasto'
        value={value}
        onChange={change}
      />
    </form>
  );
};

export default Form;

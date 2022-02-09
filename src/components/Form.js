import React from 'react';

const Form = ({ submit, value, change }) => {
  return (
    <form onSubmit={submit}>
      <input
        type='text'
        placeholder='Wpisz miasto'
        value={value}
        onChange={change}
      />
      <button>Wyszukaj miasto</button>
    </form>
  );
};

export default Form;

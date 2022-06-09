import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState({});
  function handleSubmit(e) {
    e.preventDefault();
    setInput({
      tag: 'input',
      props: {
        type: e.target.elements.type.value,
        placeholder: e.target.elements.placeholder.value,
      }
    })
  }

   return (
     <>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Tipo do input'
            name='type'
          />
          <br/>
          <input
            type='text'
            placeholder='Placeholder do input'
            name='placeholder'
          />
          <br/>
          <button type='submit'>
            Criar input
          </button>
        </form>
        {!!input.tag && React.createElement(input.tag, input.props)}
     </>
  )
}

export default App

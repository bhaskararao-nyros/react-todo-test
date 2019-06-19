import React from 'react'

import styled from 'styled-components'

const AddList = ({ onAddList }) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        onAddList(e.target.value)
      } else {
        alert("Text shouldn't be empty");
      }
    }
  }

  return (
    <Input
      type='text'
      onKeyPress={handleKeyPress}
      placeholder='Add new list...'
    />
  )
}

const Input = styled.input`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 40px;
  width: 500px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`

export default AddList

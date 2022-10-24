import React, { useState } from 'react'
import Board from '../board/Board'
import BoardFun from '../board/BoardFun'

import Style from './Container.module.css'

const initialState = {
  color: '#000000',
  size: '5',
}

const Container = () => {
  const [paint, setPaint] = useState(initialState)

  const changeColor = (event) => {
    console.log(paint.color)
    setPaint((prevPaint) => {
      return { ...prevPaint, color: event.target.value }
    })
  }
  const changeSize = (event) => {
    console.log(paint.size)
    setPaint((prevPaint) => {
      return { ...prevPaint, size: event.target.value }
    })
  }

  return (
    <div className={Style.container}>
      <div className={Style['tools-section']}>
        <div className={Style['color-picker-container']}>
          Select Brush Color: &nbsp;
          <input type="color" value={paint.color} onChange={changeColor} />
        </div>
        <div className={Style['brushsize-container']}>
          Select Brush Size: &nbsp;
          <select value={paint.size} onChange={changeSize}>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
          </select>
        </div>
      </div>
      <div className={Style['board-container']}>
        <BoardFun color={paint.color} size={paint.size} />
      </div>
    </div>
  )
}

export default Container

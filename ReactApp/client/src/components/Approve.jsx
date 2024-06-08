import React from 'react'

const Approve = ({ buttonType, label, onClickHandler, customStyles }) => {
  return (
    <button
      type={buttonType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-black min-h-[52px] px-4 rounded-[10px] ${customStyles}`}
      onClick={onClickHandler}
    >
      {label}
    </button>

  )
}

export default Approve
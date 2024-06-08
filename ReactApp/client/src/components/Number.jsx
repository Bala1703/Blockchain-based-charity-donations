import React from 'react'

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-epilogue font-bold text-[30px] text-black p-3 bg-[#ffff] w-full text-center truncate ml-[1920px]">{value}</h4>
      <p className="font-epilogue font-normal text-[16px] text-[#000] bg-[#ffff] px-3 py-2 w-full rouned-b-[10px] text-center ml-[1920px]">{title}</p>
    </div>
  )
}

export default CountBox
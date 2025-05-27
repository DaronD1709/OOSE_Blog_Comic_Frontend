import { characterMeta } from '../../meta/CharacterMeta.jsx'
import { useEffect } from 'react'

export const CharacterInfo = ({ character }) => {
  return (
    <>
      {
        character !== null &&
        (<div className="w-full  border text-sm -mt-1">
          {characterMeta.map((section, i) => {
            // Kiểm tra nếu tất cả các field trong section này đều không có giá trị
            const hasValidData = section.fields.some(({ key }) => character[key])

            // Nếu không có giá trị hợp lệ thì bỏ qua section này
            if (!hasValidData) return null
            return (

              <div key={i}>
                <div className="bg-purple-900 text-white font-bold px-3 py-2">{section.section}</div>
                {section.fields.map(({ key, label }, index) => {
                  const value = character[key]
                  if (!value) return null // Bỏ qua nếu không có dữ liệu
                  return (
                    <div
                      key={key}
                      className={`grid grid-cols-6 px-3 py-3 text-left border-b text-xs border-purple-200 last:border-b-0`}
                    >
                      <div className="col-span-2 font-bold ">{label}</div>
                      <div className="col-span-4 ml-3">{value}</div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>)
      }
    </>

  )
}

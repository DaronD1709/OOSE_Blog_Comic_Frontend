import { Image } from "antd";
import { URL_BACKEND_IMAGES } from "../../constants/images.js";
import { CharacterInfo } from "./CharacterInfo.jsx";

const character = {
  vietName: "Đỗ Ti",
  chineseName: "拓森 (TuoSen)",
  otherName: "Ma Niệm Cổ Thần",
  age: 100000,
  gender: "Nam giới",
  faction: "Vương tộc Cổ Thần",
  race: "Cổ Thần",
  realm: "Cổ Thần Chi Địa",
  cultivationRealm: "Chu Tước Tinh",
  bodyRealm: "Côn Hư Tinh Vực",
  combatPower: "Bị phong ấn",
};

export const Character = ({ character, thumbnail }) => {
  return (
    <>
      <div
        className={
          "w-[220px]  border-1 border-purple-500-300 rounded-xl border-gray-100"
        }
      >
        <div
          className={
            "text-center py-3 px-[9px] h-[2.5rem] bg-amber-200 font-bold"
          }
        >
          Vương Lâm
        </div>
        <Image src={`${URL_BACKEND_IMAGES}/${thumbnail}`} />
        <CharacterInfo character={character} />
      </div>
    </>
  );
};

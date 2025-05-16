import React, { useState } from "react";
import { Divider, Form, Input, Modal } from "antd";
import { CharacterInfo } from "./CharacterInfo.jsx";
import EditImageUpload from "./EditImageUpload.jsx";
import editText from "/src/assets/images/edit-text.png";

export const EditCharacterInfo = ({
  character,
  setCharacter,
  blogCharacterThumbnail,
  setBlogCharacterThumbnail,
}) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const onSaveInfo = (values) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(
        ([_, value]) =>
          value !== undefined && value !== null && String(value).trim() !== ""
      )
    );
    setCharacter({ ...filteredValues });
  };

  return (
    <>
      <Modal
        title="Sửa đổi: Thông tin tổng quan nhân vật"
        className="text-center"
        width="1000px"
        open={isModalOpen}
        okText="Lưu thông tin"
        cancelText="Hủy lưu"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Divider />
        <div
          className="grid grid-cols-12 overflow-y-auto"
          style={{ height: "800px" }}
        >
          <div className="col-span-4 mr-5 bg-amber-50 rounded-lg p-4">
            {/* Left side content */}
          </div>
          <div className="col-span-8 px-5">
            <Form
              layout="vertical"
              className="font-medium"
              form={form}
              onFinish={(values) => onSaveInfo(values)}
              initialValues={{
                vietName: character?.vietName || "",
                chineseName: character?.chineseName || "",
                englishName: character?.englishName || "",
                otherName: character?.otherName || "",
                alias: character?.alias || "",
                age: character?.age || "",
                gender: character?.gender || "",
                pseudonym: character?.pseudonym || "",
                status: character?.status || "",
                causeOfDeath: character?.causeOfDeath || "",
                betrothed: character?.betrothed || "",
                faction: character?.faction || "",
                sect: character?.sect || "",
                clan: character?.clan || "",
                race: character?.race || "",
                bloodLine: character?.bloodLine || "",
                realm: character?.realm || "",
                cultivationRealm: character?.cultivationRealm || "",
                bodyRealm: character?.bodyRealm || "",
                combatPower: character?.combatPower || "",
                firstAppearance: character?.firstAppearance || "",
              }}
            >
              <div>
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-600 font-semibold text-white px-6 py-2 rounded-full shadow-sm">
                    Thông Tin
                  </div>
                </div>
                <div className="space-y-3">
                  <Form.Item className="!mb-0" name="vietName" label="Tên Việt">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item
                    className="!mb-0"
                    name="chineseName"
                    label="Tên Tiếng Trung"
                  >
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item
                    className="!mb-0"
                    name="englishName"
                    label="Tên Tiếng Anh"
                  >
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item
                    className="!mb-0"
                    name="otherName"
                    label="Tên Khác"
                  >
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item className="!mb-0" name="alias" label="Bí Danh">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item className="!mb-0" name="age" label="Tuổi">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item className="!mb-0" name="gender" label="Giới Tính">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item className="!mb-0" name="pseudonym" label="Tên Giả">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item className="!mb-0" name="status" label="Tình Trạng">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item
                    className="!mb-0"
                    name="causeOfDeath"
                    label="Nguyên Nhân Tử Vong"
                  >
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item className="!mb-0" name="betrothed" label="Hôn Phu">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-600 font-semibold text-white px-6 py-2 rounded-full shadow-sm">
                    Thế Lực
                  </div>
                </div>
                <div className="space-y-3">
                  <Form.Item className="!mb-0" name="faction" label="Phe Phái">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item className="!mb-0" name="sect" label="Tông Môn">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item className="!mb-0" name="clan" label="Gia Tộc">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-600 font-semibold text-white px-6 py-2 rounded-full shadow-sm">
                    Nguồn gốc
                  </div>
                </div>
                <div className="space-y-3">
                  <Form.Item className="!mb-0" name="race" label="Chủng Tộc">
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item
                    className="!mb-0"
                    name="bloodLine"
                    label="Huyết Mạch"
                  >
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item
                    className="!mb-0"
                    name="realm"
                    label="Lãnh Thổ / Quốc Gia"
                  >
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-600 font-semibold text-white px-6 py-2 rounded-full shadow-sm">
                    Sức mạnh
                  </div>
                </div>
                <div className="space-y-3">
                  <Form.Item
                    className="!mb-0"
                    name="cultivationRealm"
                    label="Cảnh Giới Tu Luyện"
                  >
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item
                    className="!mb-0"
                    name="bodyRealm"
                    label="Cảnh Giới Thân Thể"
                  >
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                  <Form.Item
                    className="!mb-0"
                    name="combatPower"
                    label="Sức Mạnh"
                  >
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                </div>
              </div>

              <div>
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-600 font-semibold text-white px-6 py-2 rounded-full shadow-sm">
                    Khác
                  </div>
                </div>
                <div className="space-y-3">
                  <Form.Item
                    className="!mb-0"
                    name="firstAppearance"
                    label="Xuất Hiện Lần Đầu"
                  >
                    <Input className="rounded-lg hover:border-purple-400 focus:border-purple-500" />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Modal>

      <div className="w-[280px]">
        <div className="flex justify-center mb-4">
          <button
            className="flex items-center justify-center w-full bg-amber-100 hover:bg-amber-200 transition-colors duration-200 p-3 rounded-xl shadow-sm border border-amber-200"
            onClick={handleEdit}
          >
            <img src={editText} className="w-5 h-5 mr-2" alt="edit" />
            <span className="font-medium">Sửa thông tin</span>
          </button>
        </div>

        <div className="bg-white text-center rounded-xl shadow-sm border border-gray-100">
          <Input
            placeholder="Tên nhân vật"
            value={character !== null ? character.vietName : ""}
            className="text-center py-3 px-3 h-12 bg-amber-50 font-semibold rounded-t-xl border-b border-amber-100"
          />
          <div className="p-4">
            <EditImageUpload
              blogCharacterThumbnail={blogCharacterThumbnail}
              setBlogCharacterThumbnail={setBlogCharacterThumbnail}
            />
            <CharacterInfo character={character} />
          </div>
        </div>
      </div>
    </>
  );
};

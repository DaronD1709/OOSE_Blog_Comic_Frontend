import React, { useState } from 'react'
import { Divider, Form, Input, Modal } from 'antd'
import { CharacterInfo } from './CharacterInfo.jsx'
import EditImageUpload from './EditImageUpload.jsx'
import editText from '/src/assets/images/edit-text.png'

export const EditCharacterInfo = ({ character, setCharacter, blogCharacterThumbnail, setBlogCharacterThumbnail }) => {
  const [form] = Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOk = () => {
    setIsModalOpen(false)
    form.submit()
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleEdit = () => {
    setIsModalOpen(true)

  }
  const onSaveInfo = (values) => {
    // Lọc để chỉ lấy nhưng field có giá trị
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(
        ([_, value]) => value !== undefined && value !== null && String(value).trim() !== ''
      )
    )
    setCharacter({ ...filteredValues })
  }

  return (
    <>
      <Modal title="Sửa đổi: Thông tin tổng quan nhân vật" className={'text-center'} width="1000px" open={isModalOpen}
             okText={'Lưu thông tin'} cancelText={'Hủy lưu'}
             onOk={handleOk} onCancel={handleCancel}>
        <Divider></Divider>
        <div className={'grid grid-cols-12 overflow-y-scroll'} style={{ height: '800px' }}>
          <div className={'col-span-4 mr-5 bg-amber-200'}>
          </div>
          <div className={'col-span-8  px-5'}>
            <Form layout={'vertical'} className={'font-bold'} form={form} onFinish={(values) => onSaveInfo(values)}
                  initialValues={{
                    vietName: character?.vietName || '',  // Nếu không có vietName, dùng giá trị mặc định là ''
                    chineseName: character?.chineseName || '',
                    englishName: character?.englishName || '',
                    otherName: character?.otherName || '',
                    alias: character?.alias || '',
                    age: character?.age || '',
                    gender: character?.gender || '',
                    pseudonym: character?.pseudonym || '',
                    status: character?.status || '',
                    causeOfDeath: character?.causeOfDeath || '',
                    betrothed: character?.betrothed || '',
                    faction: character?.faction || '',
                    sect: character?.sect || '',
                    clan: character?.clan || '',
                    race: character?.race || '',
                    bloodLine: character?.bloodLine || '',
                    realm: character?.realm || '',
                    cultivationRealm: character?.cultivationRealm || '',
                    bodyRealm: character?.bodyRealm || '',
                    combatPower: character?.combatPower || '',
                    firstAppearance: character?.firstAppearance || ''
                  }}>
              <div className={'flex justify-center'}>
                <div className={'bg-purple-500 font-bold text-white p-1 w-1/2 rounded-2xl'}>Thông Tin</div>
              </div>
              <Form.Item className="!mb-1.5" name="vietName" label="Tên Việt">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="chineseName" label="Tên Tiếng Trung">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="englishName" label="Tên Tiếng Anh">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="otherName" label="Tên Khác">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="alias" label="Bí Danh">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="age" label="Tuổi">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="gender" label="Giới Tính">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="pseudonym" label="Tên Giả">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="status" label="Tình Trạng">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="causeOfDeath" label="Nguyên Nhân Tử Vong">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="betrothed" label="Hôn Phu">
                <Input/>
              </Form.Item>
              <div className={'flex justify-center'}>
                <div className={'bg-purple-500 font-bold text-white p-1 w-1/2 rounded-2xl'}>Thế Lực</div>
              </div>
              <Form.Item className="!mb-1.5" name="faction" label="Phe Phái">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="sect" label="Tông Môn">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="clan" label="Gia Tộc">
                <Input/>
              </Form.Item>
              <div className={'flex justify-center'}>
                <div className={'bg-purple-500 font-bold text-white p-1 w-1/2 rounded-2xl'}>Nguồn gốc</div>
              </div>
              <Form.Item className="!mb-1.5" name="race" label="Chủng Tộc">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="bloodLine" label="Huyết Mạch">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="realm" label="Lãnh Thổ / Quốc Gia">
                <Input/>
              </Form.Item>
              <div className={'flex justify-center'}>
                <div className={'bg-purple-500 font-bold text-white p-1 w-1/2 rounded-2xl'}>Sức mạnh</div>
              </div>
              <Form.Item className="!mb-1.5" name="cultivationRealm" label="Cảnh Giới Tu Luyện">
                <Input/>
              </Form.Item>
              <Form.Item className="!mb-1.5" name="bodyRealm" label="Cảnh Giới Thân Thể">
                <Input/>
              </Form.Item>

              <Form.Item className="!mb-1.5" name="combatPower" label="Sức Mạnh">
                <Input/>
              </Form.Item>
              <div className={'flex justify-center'}>
                <div className={'bg-purple-500 font-bold text-white p-1 w-1/2 rounded-2xl'}>Khác</div>
              </div>
              <Form.Item className="!mb-1.5" name="firstAppearance" label="Xuất Hiện Lần Đầu">
                <Input/>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
      <div className={'w-[220px]'}>
        <div className="flex justify-center  ">
          <div className={'flex justify-center items-center border w-full hover:bg-amber-300 p-2 rounded-2xl mb-1'}
               onClick={handleEdit}>
            <img src={`${editText}`} className={'w-auto h-5'}/>
            <div className={'mb-0'}>Sửa thông tin</div>
          </div>
        </div>
        <div className={'border-1 border-purple-500-300'}>
          <Input placeHolder={'Tên nhân vật'} value={character !== null ? character.vietName : ''}
                 className={
                   '!text-center !py-3 !px-[9px] !h-[2.5rem] !bg-amber-200 !font-bold'
                 }
          />
          <EditImageUpload blogCharacterThumbnail={blogCharacterThumbnail}
                           setBlogCharacterThumbnail={setBlogCharacterThumbnail}/>
          <CharacterInfo character={character}/>
        </div>
      </div>
    </>
  )
}

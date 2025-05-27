import { useContext, useEffect, useState } from 'react';
import { FavouriteContext } from '../context/FavouriteContext';
import { Empty, Card, Row, Col, Typography } from 'antd';
import FavouriteButton from '../components/Favourite/FavouriteButton';

const { Title, Text, Paragraph } = Typography;

// Mock dữ liệu bài viết
const mockBlogs = [
  {
    id: '1',
    title: 'One Piece - Hành trình đến Laugh Tale',
    author: 'Nguyễn Văn A',
    content: 'One Piece là một series manga và anime nổi tiếng kể về cuộc phiêu lưu của Monkey D. Luffy và băng hải tặc Mũ Rơm...',
    thumbnail: 'https://via.placeholder.com/300x200?text=One+Piece',
    createdAt: '2023-06-15'
  },
  {
    id: '2',
    title: 'Doraemon - Những bảo bối thay đổi cuộc sống',
    author: 'Trần Thị B',
    content: 'Doraemon là một chú mèo máy đến từ tương lai với nhiều bảo bối thần kỳ...',
    thumbnail: 'https://via.placeholder.com/300x200?text=Doraemon',
    createdAt: '2023-07-20'
  },
  {
    id: '3',
    title: 'Dragon Ball - Hành trình của Son Goku',
    author: 'Lê Văn C',
    content: 'Dragon Ball là một bộ truyện tranh nổi tiếng về võ thuật và phiêu lưu của Son Goku...',
    thumbnail: 'https://via.placeholder.com/300x200?text=Dragon+Ball',
    createdAt: '2023-08-10'
  },
  {
    id: '4',
    title: 'Naruto - Con đường trở thành Hokage',
    author: 'Phạm Thị D',
    content: 'Naruto kể về hành trình trở thành Hokage của cậu bé Naruto Uzumaki...',
    thumbnail: 'https://via.placeholder.com/300x200?text=Naruto',
    createdAt: '2023-09-05'
  },
  {
    id: '5',
    title: 'Detective Conan - Những vụ án bí ẩn',
    author: 'Hoàng Văn E',
    content: 'Detective Conan hay còn gọi là Thám tử lừng danh Conan kể về các vụ án mà Conan giải quyết...',
    thumbnail: 'https://via.placeholder.com/300x200?text=Conan',
    createdAt: '2023-10-15'
  },
];

function FavouritePage() {
  const { getFavourites } = useContext(FavouriteContext);
  const [favouriteBlogs, setFavouriteBlogs] = useState([]);

  useEffect(() => {
    const favouriteIds = getFavourites();
    const filteredBlogs = mockBlogs.filter(blog => favouriteIds.includes(blog.id));
    setFavouriteBlogs(filteredBlogs);
  }, [getFavourites]);

  return (
    <div className="p-4">
      <Title level={2}>Danh sách bài viết yêu thích</Title>
      <Paragraph>Các bài viết bạn đã đánh dấu là yêu thích sẽ xuất hiện ở đây.</Paragraph>
      
      {favouriteBlogs.length === 0 ? (
        <Empty 
          description="Bạn chưa có bài viết yêu thích nào" 
          className="my-8"
        />
      ) : (
        <Row gutter={[16, 16]} className="mt-4">
          {favouriteBlogs.map(blog => (
            <Col xs={24} sm={12} md={8} key={blog.id}>
              <Card
                hoverable
                cover={<img alt={blog.title} src={blog.thumbnail} />}
                actions={[
                  <FavouriteButton blogId={blog.id} key="favorite" />
                ]}
              >
                <Card.Meta
                  title={blog.title}
                  description={
                    <>
                      <Text type="secondary">{blog.author} • {blog.createdAt}</Text>
                      <Paragraph ellipsis={{ rows: 2 }} className="mt-2">
                        {blog.content}
                      </Paragraph>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="mt-8">
        <Title level={3}>Khám phá thêm</Title>
        <Row gutter={[16, 16]} className="mt-4">
          {mockBlogs.slice(0, 3).map(blog => (
            <Col xs={24} sm={12} md={8} key={blog.id}>
              <Card
                hoverable
                style={{ height: '100%' }}
                cover={<img alt={blog.title} src={blog.thumbnail} />}
                actions={[
                  <FavouriteButton blogId={blog.id} key="favorite" />
                ]}
              >
                <Card.Meta
                  title={blog.title}
                  description={
                    <>
                      <Text type="secondary">{blog.author} • {blog.createdAt}</Text>
                      <Paragraph ellipsis={{ rows: 2 }} className="mt-2">
                        {blog.content}
                      </Paragraph>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default FavouritePage; 
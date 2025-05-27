import { Typography } from "antd"

const { Text } = Typography

// -----Hardcode data-----
const suggestions = [
  {
    id: 1,
    title: "Review manga 'One Piece' tập mới nhất",
    date: "07/05/2025",
    thumbnail: "https://placehold.co/64x64?text=OP",
  },
  {
    id: 2,
    title: "Top 5 manga hành động đỉnh cao",
    date: "06/05/2025",
    thumbnail: "https://placehold.co/64x64?text=Action",
  },
  {
    id: 3,
    title: "Phân tích nhân vật Levi Ackerman",
    date: "05/05/2025",
    thumbnail: "https://placehold.co/64x64?text=Levi",
  },
]
// -----Hardcode data-----

const SearchSuggestion= () => {
  return (
    <div className="space-y-2 bg-white p-2 rounded-md shadow-md w-full max-w-md">
      {suggestions.slice(0, 5).map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded-md transition"
          onClick={() => {
            // TODO: xử lý chọn bài viết
          }}
        >
          <img
            src={item.thumbnail}
            alt="thumbnail"
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="flex flex-col">
            <Text style={{ color: "black", fontWeight: 500 }}>{item.title}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>{item.date}</Text>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchSuggestion

import AdminHeader from "../../components/AdminHeader";
import { Box } from "@mui/material";
import { mockTags } from "../../data_testing/testData";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/tags";
const fetchTags = () => axios.get(API_URL);
const createTag = (data) => axios.post(API_URL, data);
const updateTag = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteTag = (id) => axios.delete(`${API_URL}/${id}`);

const AdminManageTags = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tags, setTags] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [addData, setAddData] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchTags()
      .then((res) => setTags(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (tag) => {
    setEditId(tag.id);
    setEditData({ name: tag.name, description: tag.description });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = (id) => {
    updateTag(id, editData)
      .then(() => {
        setTags((prev) =>
          prev.map((tag) => (tag.id === id ? { ...tag, ...editData } : tag))
        );
        setEditId(null);
      })
      .catch(() => alert("Update failed!"));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this tag?")) return;
    deleteTag(id)
      .then(() => setTags((prev) => prev.filter((tag) => tag.id !== id)))
      .catch(() => alert("Delete failed!"));
  };

  const handleAddShow = () => {
    setShowAdd(true);
    setAddData({ name: "", description: "" });
  };

  const handleAddChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const handleAddSave = () => {
    if (!addData.name) return alert("Name is required");
    createTag(addData)
      .then((res) => {
        setTags((prev) => [...prev, res.data.data]);
        setShowAdd(false);
        setAddData({ name: "", description: "" });
      })
      .catch(() => alert("Add failed!"));
  };

  return (
    <Box m="20px">
      <div className="flex items-center justify-between mb-6">
        <div>
          <AdminHeader title="MANAGE TAGS" subtitle="Lists of Tags" />
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200"
            onClick={handleAddShow}
          >
            Add
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div className="flex justify-center mb-8">
          <Card
            sx={{
              width: 320,
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              borderRadius: 3,
              boxShadow: 5,
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add New Tag
              </Typography>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={addData.name}
                onChange={handleAddChange}
                className="w-full mb-2 p-2 rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={addData.description}
                onChange={handleAddChange}
                className="w-full mb-2 p-2 rounded"
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  onClick={handleAddSave}
                  variant="contained"
                  color="success"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setShowAdd(false)}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Card Grid */}
      <div className="flex flex-wrap justify-center gap-8">
        {tags.map((tag) => (
          <Card
            key={tag.id}
            sx={{
              width: 280,
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              borderRadius: 3,
              boxShadow: 5,
              p: 2,
            }}
          >
            <CardContent>
              {editId === tag.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="w-full mb-2 p-2 rounded"
                  />
                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="w-full mb-2 p-2 rounded"
                  />
                </>
              ) : (
                <>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color={colors.greenAccent[400]}
                  >
                    {tag.name}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    {tag.description}
                  </Typography>
                </>
              )}
            </CardContent>
            <div className="flex justify-between mt-4 px-2 pb-2">
              {editId === tag.id ? (
                <>
                  <Button
                    onClick={() => handleEditSave(tag.id)}
                    variant="contained"
                    color="success"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditId(null)}
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleEdit(tag)}
                    variant="contained"
                    color="warning"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(tag.id)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Box>
  );
};

export default AdminManageTags;

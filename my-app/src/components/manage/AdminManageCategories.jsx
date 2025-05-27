import AdminHeader from "../../components/AdminHeader";
import { Box } from "@mui/material";
import { mockCategories } from "../../data_testing/testData";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/categories"; // Change port if needed

export const fetchCategories = () => axios.get(API_URL);
export const createCategory = (data) => axios.post(API_URL, data);
export const updateCategory = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`);

const AdminManageCategories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [addData, setAddData] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data.data)) // adjust if your response structure is different
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (category) => {
    setEditId(category.id);
    setEditData({ name: category.name, description: category.description });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = (id) => {
    updateCategory(id, editData)
      .then((res) => {
        setCategories((prev) =>
          prev.map((cat) => (cat.id === id ? { ...cat, ...editData } : cat))
        );
        setEditId(null);
      })
      .catch((err) => alert("Update failed!"));
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (!window.confirm("Delete this category?")) return;
    deleteCategory(id)
      .then(() => setCategories((prev) => prev.filter((cat) => cat.id !== id)))
      .catch((err) => alert("Delete failed!"));
  };

  // Handle Add
  const handleAddShow = () => {
    setShowAdd(true);
    setAddData({ name: "", description: "" });
  };

  const handleAddChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const handleAddSave = () => {
    if (!addData.name) return alert("Name is required");
    createCategory(addData)
      .then((res) => {
        setCategories((prev) => [...prev, res.data.data]);
        setShowAdd(false);
        setAddData({ name: "", description: "" });
      })
      .catch((err) => alert("Add failed!"));
  };

  return (
    <Box m="20px">
      <div className="flex items-center justify-between mb-6">
        <div>
          <AdminHeader
            title="MANAGE CATEGORIES"
            subtitle="Lists of Categories"
          />
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
                Add New Category
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
        {categories.map((category) => (
          <Card
            key={category.id}
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
              {editId === category.id ? (
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
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    {category.description}
                  </Typography>
                </>
              )}
            </CardContent>
            <div className="flex justify-between mt-4 px-2 pb-2">
              {editId === category.id ? (
                <>
                  <Button
                    onClick={() => handleEditSave(category.id)}
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
                    onClick={() => handleEdit(category)}
                    variant="contained"
                    color="warning"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(category.id)}
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

export default AdminManageCategories;

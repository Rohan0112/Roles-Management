import React, { useState } from "react";
import RoleManagement from "./RoleManagement";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import "./App.css";

const Roles = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(["Admin", "Editor", "Viewer"]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });
  const [editingUser, setEditingUser] = useState(null);
  const statuses = ["Active", "Inactive"];

  const handleAddUser = () => {
    const newId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    const newUserWithId = { ...newUser, id: newId };
    setUsers([...users, newUserWithId]);
    setNewUser({ name: "", email: "", role: "", status: "" });
    setOpenDialog(false);
  };

  const handleEditUser = () => {
    const updatedUser = {
      ...editingUser,
      role: newUser.role,
      status: newUser.status,
    };
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setOpenDialog(false);
    setEditingUser(null);
    setNewUser({ name: "", email: "", role: "", status: "" });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <RoleManagement roles={roles} setRoles={setRoles} />
      <Button variant="contained" style={{ backgroundColor: '#2a9d8f', color: 'white' }} onClick={() => setOpenDialog(true)}>
        Add User
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setEditingUser(user);
                        setNewUser(user);
                        setOpenDialog(true);
                      }}
                    >
                      <Edit />
                    </Button>
                    <Button onClick={() => handleDeleteUser(user.id)}>
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={editingUser ? handleEditUser : handleAddUser}
            color="primary"
          >
            {editingUser ? "Save Changes" : "Add"}
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Roles;

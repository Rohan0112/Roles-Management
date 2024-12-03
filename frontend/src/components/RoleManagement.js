import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const RoleManagement = ({ roles, setRoles }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newRole, setNewRole] = useState("");

  const handleAddRole = () => {
    if (newRole && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
      setNewRole("");
      setOpenDialog(false);
    }
  };

  const handleDeleteRole = (roleToDelete) => {
    setRoles(roles.filter(role => role !== roleToDelete));
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)} variant="contained" style={{ backgroundColor: '#2a9d8f', color: 'white' }}>
        Add Role
      </Button>
      <List>
        {roles.map((role, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" onClick={() => handleDeleteRole(role)}>
              <Delete />
            </IconButton>
          }>
            <ListItemText primary={role} />
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddRole} color="primary">Add</Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleManagement;

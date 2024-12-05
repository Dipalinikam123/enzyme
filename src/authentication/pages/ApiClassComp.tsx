import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress, IconButton } from '@mui/material';
import { FaTimes } from 'react-icons/fa';

const ResponsiveBoxModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Open Modal
      </Button>

      {/* Modal Box */}
      {open && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
            zIndex: 1000, // Make sure it overlays on top
            padding:'10px'
          }}
        >
          <Box
            sx={{
              width: {
                xs: '90%', // 90% width for extra small screens
                sm: '80%', // 80% for small screens
                md: '70%', // 70% for medium screens
                lg: '60%', // 60% for large screens
              },
              maxWidth: '600px',
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              position: 'relative', // For positioning close button
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: 'gray',
              }}
            >
              <FaTimes size={20} />
            </IconButton>

            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Responsive Modal Box
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
              This is a modal created using Box, which is responsive based on screen size.
            </Typography>
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Button onClick={handleClose} variant="contained">
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ResponsiveBoxModal;

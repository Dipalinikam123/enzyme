import React, { Component } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FaBackward, FaPlay, FaForward } from 'react-icons/fa'; // React Icons

class ApiClassComp extends Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchProductData();
  }

  async fetchProductData() {
    try {
      const res = await fetch('https://spotify-downloader9.p.rapidapi.com/playlistTracks?id=7DgPQwzEoUVfQYBiMLER9Z&limit=50&offset=0', {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'spotify-downloader9.p.rapidapi.com',
          'x-rapidapi-key': '193861aaaamsh9a994df71032ce2p15f611jsn5bf77738d113',
        },
      });
      const response = await res.json();
      console.log('response--', response.data.items);
      this.setState({ data: response.data.items });
    } catch (error) {
      console.log('Error fetching product', error);
    }
  }

  render() {
    return (
      <Card sx={{ display: 'flex', borderRadius: 10, boxShadow: 3, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Live From Space
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ color: '#757575' }}>
              Mac Miller
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <IconButton
              aria-label="previous"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '50%',
                padding: 2,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
              }}
            >
              <FaBackward size={20} color="#1976d2" />
            </IconButton>
            <IconButton
              aria-label="play/pause"
              sx={{
                backgroundColor: '#1976d2',
                borderRadius: '50%',
                padding: 3,
                margin: '0 20px',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              <FaPlay size={20} color="white" />
            </IconButton>
            <IconButton
              aria-label="next"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '50%',
                padding: 2,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
              }}
            >
              <FaForward size={20} color="#1976d2" />
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{
            width: 151,
            objectFit: 'cover',
            borderRadius: 3,
            boxShadow: 3,
          }}
          image="/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        />
      </Card>
    );
  }
}

export default ApiClassComp;

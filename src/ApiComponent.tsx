import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  expanded: boolean;
}

interface MyState {
  products: Product[];
}

export default class ApiComponent extends Component<{}, MyState> {
  state: MyState = {
    products: [],
  };

  componentDidMount(): void {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        const productsWithExpansion = data.map((product: Product) => ({
          ...product,
          expanded: false,
        }));
        this.setState({ products: productsWithExpansion });
      })
      .catch((err) => {
        console.error('Error fetching products:',err);
      });
  }


  toggleDescription = (id: number) => {
    this.setState((prevState) => ({
      products: prevState.products.map((product) =>
        product.id === id ? { ...product, expanded: !product.expanded } : product
      ),
    }));
  };

  render() {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap:'50px', padding:'30px 50px' }}>
        {this.state.products.map((e) => (
          <Card sx={{ maxWidth: 290, margin: '10px auto' }} key={e.id}>
            <CardMedia
              sx={{ height: 140 }}
              image={e.image}
              title={e.title}
            />
            <CardContent>
              <Typography gutterBottom  sx={{
                  color: 'text.secondary',
                  whiteSpace: e.expanded ? 'normal' : 'nowrap',
                  overflow: e.expanded ? 'visible' : 'hidden',
                  textOverflow: e.expanded ? 'clip' : 'ellipsis',
                  cursor: 'pointer',
                }}
                onClick={() => this.toggleDescription(e.id)}>
                {e.title}
              </Typography>
              <Typography gutterBottom component="div">
                Category: {e.category}
              </Typography>
              <Typography gutterBottom >
                Price: {e.price}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  whiteSpace: e.expanded ? 'normal' : 'nowrap',
                  overflow: e.expanded ? 'visible' : 'hidden',
                  textOverflow: e.expanded ? 'clip' : 'ellipsis',
                  cursor: 'pointer',
                }}
                onClick={() => this.toggleDescription(e.id)}
              >
                {e.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    );
  }
}

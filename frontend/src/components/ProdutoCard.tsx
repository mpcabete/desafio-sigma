import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OutlinedCard(
  { nome, descricao, id, updateProdutosList }:
    { nome: string, descricao: string, id: number, updateProdutosList: () => Promise<void> }
) {
  async function handleDelete() {
    console.log(id)
    try {
      const response = await fetch(`http://127.0.0.1:8000/produtos/?produtoID=${id}`, { method: "delete" })
      if (response.status !== 200) {
        throw (new Error("unable to delete produto"))
      }
      updateProdutosList()

    } catch (e) {
      console.error(e)
    }

  }
  return (
    <Box display="inline-block" sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {nome}
          </Typography>
          <Typography variant="body2">
            {descricao}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleDelete}>Deletar</Button>
          <Button size="small">Update</Button>
        </CardActions>

      </Card>
    </Box>
  );
}

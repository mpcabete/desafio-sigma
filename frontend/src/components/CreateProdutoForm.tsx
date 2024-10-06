import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface FormData {
  nome: string;
  descricao: string;
  valor: string;
}


function ProdutoForm({ updateProdutosList }: { updateProdutosList: () => Promise<void> }) {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: '',
    valor: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        valor:Math.floor(Number(formData.valor)*100) //Convert float value to int representing centavos

      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/produtos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        alert("Erro ao criar produto")
        throw new Error("Error creating produto")
      }
      setFormData({ nome: '', descricao: '', valor: '' });
      updateProdutosList()
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Criar Novo Produto
      </Typography>
      <TextField
        fullWidth
        label="Nome"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Descrição"
        name="descricao"
        value={formData.descricao}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={3}
        required
      />
      <TextField
        fullWidth
        label="Valor"
        name="valor"
        type="number"
        value={formData.valor}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 0, step:"0.01" }}
        required
      />
      <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Criar Produto
      </Button>
    </Box>
  );
};

export default ProdutoForm;

# Teste Técnico - Betalent

Este projeto é um teste técnico da Betalent que utiliza AdonisJS como framework backend e MySQL como banco de dados.

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/JotaDD/betalent.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados no arquivo `.env` baseado no `.env.example`.

4. Execute as migrações do banco de dados:
   ```bash
   node ace migration:run
   ```

5. Execute os seeders do banco de dados:
   ```bash
   node ace db:seed
   ```
6. Inicie o servidor:
   ```bash
   npm run dev
   ```
7. Acesse o sistema em `http://localhost:3333`.

8. Utilize o Insomnia ou Postman para testar as rotas.

   Importe o arquivo `HttpRoutes.json` ou `HttpRoutes.har` para o Insomnia.

9. Você também pode usar o Docker para rodar o projeto. Basta executar o comando:
   ```bash
   docker-compose up --build -d
   ```
    O projeto estará disponível em `http://localhost:3333`.

## Autenticação

As rotas de clientes, produtos e vendas só podem ser acessadas por usuários autenticados. Utilize o token JWT recebido no login para acessar essas rotas.

## Estrutura do Banco de Dados

O banco de dados possui as seguintes tabelas e campos:

- **Users**: 
  - `id`
  - `email`
  - `password`
  - `createdAt`
  - `updatedAt`

- **Customers**:
  - `name`
  - `cpf`
  - `addressId`
  - `phoneId`
  - `createdAt`
  - `updatedAt`


- **Addresses**:
  - `id`
  - `street`
  - `number`
  - `complement`
  - `neighborhood`
  - `city`
  - `state`
  - `cep`
  - `createdAt`
  - `updatedAt`

- **Phones**:
  - `id`
  - `number`
  - `createdAt`
  - `updatedAt`

- **Products**:
  - `id`
  - `name`
  - `quantity`
  - `description`
  - `price`
  - `isActive`
  - `createdAt`
  - `updatedAt`

- **Orders**:
  - `id`
  - `customerId`
  - `productId`
  - `quantity`
  - `unitPrice`
  - `totalPrice`
  - `createdAt`
  - `updatedAt`

## Rotas do Sistema

### Usuários

- **Cadastro de usuário do sistema**:
  - `POST /signup`
  - Exemplo de body:
    ```json
    {
      "email": "johnny@test.com",
      "password": "test123"
    }
    ```

- **Login com JWT de usuário cadastrado**:
  - `POST /login`
  - Exemplo de body:
    ```json
    {
      "email": "johnny@test.com",
      "password": "test123"
    }
    ```
  - Retorna um token JWT para acessar as rotas protegidas.

### Clientes

- **Listar todos os clientes cadastrados**:
  - `GET /customers`
  - Retorna apenas dados principais, ordenados por ID.
  - Exemplo de Retorno:
    ```json
    [
      {
        "id": 1,
        "name": "Johnny Test",
        "cpf": "12345678900",
        "phoneId": 1,
        "addressId": 1,
        "address": {
          "id": 1,
          "street": "Rua 1",
          "number": "123",
          "complement": "Casa",
          "neighborhood": "Bairro 1",
          "city": "Cidade 1",
          "state": "SP",
          "cep": "12345678"
        },
        "phone": {
          "id": 1,
          "number": "5518998888888"
        }
      },
    ]
    ```

- **Detalhar um cliente e vendas a ele**:
  - `GET /customers/:id`
  - Retorna os detalhes do cliente e suas vendas mais recentes primeiro.
  - Possibilidade de filtrar as vendas por mês e ano com query params: `?mes=7&ano=2024`.
  - Exemplo de Retorno:
    ```json
    {
      "id": 1,
      "name": "Johnny Test",
      "cpf": "12345678900",
      "phoneId": 1,
      "addressId": 1,
      "address": {
        "id": 1,
        "street": "Rua 1",
        "number": "123",
        "complement": "Casa",
        "neighborhood": "Bairro 1",
        "city": "Cidade 1",
        "state": "SP",
        "cep": "12345678"
      },
      "phone": {
        "id": 1,
        "number": "5518998888888"
      },
      "orders": [
        {
          "id": 1,
          "productId": 1,
          "quantity": 2,
          "unitPrice": 100.00,
          "totalPrice": 200.00,
          "createdAt": "2024-07-21T14:00:00.000Z",
          "product": {
            "id": 1,
            "name": "Produto 1",
            "quantity": 10,
            "description": "Descrição do Produto 1",
            "price": 100.00
          }
        }
      ]
    }
    ```

- **Adicionar um cliente**:
  - `POST /customers`
  - Exemplo de body:
    ```json
        {
      "name": "João Silva",
      "cpf": "123.456.789-58",
      "address": {
        "street": "Rua das Flores",
        "number": "123",
        "complement": "Apto 45",
        "neighborhood": "Jardim das Rosas",
        "city": "São Paulo",
        "state": "so",
        "cep": "12345-678"
      },
      "phone": {
        "number": "(11) 98765-4321"
      }
    }
    ```
  - Exemplo de Retorno:
    ```json
        {
      "id": 4,
      "name": "João Silva",
      "cpf": "123.456.789-58",
      "phone": {
        "number": "11987654321",
        "createdAt": "2024-07-22T02:30:08.076+00:00",
        "updatedAt": "2024-07-22T02:30:08.076+00:00",
        "id": 5
      },
      "address": {
        "street": "Rua das Flores",
        "number": "123",
        "complement": "Apto 45",
        "neighborhood": "Jardim das Rosas",
        "city": "São Paulo",
        "state": "SO",
        "cep": "12345678",
        "createdAt": "2024-07-22T02:30:08.222+00:00",
        "updatedAt": "2024-07-22T02:30:08.222+00:00",
        "id": 4
      }
    }
    ```

- **Editar um cliente**:
  - `PUT /customers/:id`
  - Exemplo de body:
    ```json
        {
      "name": "João Silva",
      "cpf": "123.456.789-33",
      "address": {
        "street": "Rua das Flores",
        "number": "123",
        "complement": "Apto 45",
        "neighborhood": "Jardim das Rosas",
        "city": "São Paulo",
        "state": "so",
        "cep": "12345-678"
      },
      "phone": {
        "number": "(11) 98765-4321"
      }
    } 
    ```
  - Exemplo de Retorno:
    ```json
        {
      "id": 4,
      "name": "João Silva",
      "cpf": "123.456.789-33",
      "phone": {
        "number": "11987654321",
        "createdAt": "2024-07-22T02:30:08.076+00:00",
        "updatedAt": "2024-07-22T02:30:08.076+00:00",
        "id": 5
      },
      "address": {
        "street": "Rua das Flores",
        "number": "123",
        "complement": "Apto 45",
        "neighborhood": "Jardim das Rosas",
        "city": "São Paulo",
        "state": "SO",
        "cep": "12345678",
        "createdAt": "2024-07-22T02:30:08.222+00:00",
        "updatedAt": "2024-07-22T02:30:08.222+00:00",
        "id": 4
      }
    }
    ```

- **Excluir um cliente e vendas a ele**:
  - `DELETE /customers/:id`
  - Exemplo de Retorno:
    ```json
    {
      "message": "Customer and Orders deleted successfully"
    }
    ```

### Produtos

- **Listar todos os produtos cadastrados**:
  - `GET /products`
  - Retorna apenas dados principais, ordenados alfabeticamente.
  - Exemplo de Retorno:
    ```json
    [
      {
        "id": 4,
        "name": "ar condicionado",
        "quantity": 30,
        "price": 300,
        "description": "Description 4"
      },
      {
        "id": 1,
        "name": "Product 1",
        "quantity": 10,
        "price": 100.5,
        "description": "Description 1"
      },
    ]
    ```

- **Listar produtos ativos**:
  - `GET /products/active`
  - Retorna apenas produtos ativos, ordenados alfabeticamente.
  - Exemplo de Retorno:
    ```json
    [
      {
        "id": 4,
        "name": "ar condicionado",
        "quantity": 30,
        "price": 300,
        "description": "Description 4"
      },
      {
        "id": 1,
        "name": "Product 1",
        "quantity": 10,
        "price": 100.5,
        "description": "Description 1"
      },
    ]
    ```

- **Detalhar um produto**:
  - `GET /products/:id`
  - Exemplo de Retorno:
    ```json
    {
      "id": 3,
      "name": "Churrasqueira",
      "quantity": 10,
      "price": 100,
      "description": "churrasqueira - carvão não incluso",
      "isActive": 1,
      "createdAt": "2024-07-22T02:30:08.076+00:00",
      "updatedAt": "2024-07-22T02:30:08.076+00:00"
    }
    ```

- **Criar um produto**:
  - `POST /products`
  - Exemplo de body:
    ```json
    {
      "name": "Churrasqueira",
      "quantity": 10,
      "price": 100,
      "description": "churrasqueira - carvão não incluso"
    }
    ```
  - Exemplo de Retorno:
    ```json
    {
      "id": 3,
      "name": "Churrasqueira",
      "quantity": 10,
      "price": 100,
      "description": "churrasqueira - carvão não incluso",
      "isActive": 1,
      "createdAt": "2024-07-22T02:30:08.076+00:00",
      "updatedAt": "2024-07-22T02:30:08.076+00:00"
    }
    ```

- **Editar um produto**:
  - `PUT /products/:id`
  - Exemplo de body:
    ```json
    {
      "name": "Churrasqueira",
      "quantity": 10,
      "price": 100,
      "description": "churrasqueira - carvão não incluso",
      "isActive": 1
    }
    ```
  - Exemplo de Retorno:
    ```json
    {
      "id": 3,
      "name": "Churrasqueira",
      "quantity": 10,
      "price": 100,
      "description": "churrasqueira - carvão não incluso",
      "isActive": 1,
      "createdAt": "2024-07-22T02:30:08.076+00:00",
      "updatedAt": "2024-07-22T02:30:08.076+00:00"
    }
    ```

- **Exclusão lógica de um produto (isActive = false)**:
  - `DELETE /products/:id`
  - Exemplo de Retorno:
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

### Vendas

- **Registrar venda de 1 produto a 1 cliente**:
  - `POST /orders`
  - Exemplo de body:
    ```json
    {
      "customerId": "2",
      "productId": "3",
      "quantity": 2,
      "unitPrice": 100
    }
    ```
  - Exemplo de Retorno:
    ```json
    {
      "id": 7,
      "customerId": 2,
      "productId": 3,
      "quantity": 2,
      "unitPrice": 100,
      "totalPrice": 200
    }
    ```




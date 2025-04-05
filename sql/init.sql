CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(10) CHECK (status IN ('OPEN', 'ORDERED')) NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
  cart_id UUID REFERENCES carts(id),
  product_id UUID NOT NULL,
  count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  cart_id UUID REFERENCES carts(id),
  payment JSON,
  delivery JSON,
  comments TEXT,
  status TEXT,
  total NUMERIC
);

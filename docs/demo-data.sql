-- Script SQL para popular banco de demonstração
-- Execute no Supabase SQL Editor

-- Inserir clientes de exemplo
INSERT INTO clientes (nome, apelido, telefone) VALUES
('João Silva', 'João', '(11)99999-1111'),
('Maria Santos', 'Mari', '(11)99999-2222'),
('Pedro Oliveira', 'Pedrão', '(11)99999-3333'),
('Ana Costa', 'Aninha', '(11)99999-4444'),
('Carlos Mendes', 'Carlinhos', '(11)99999-5555');

-- Inserir serviços de exemplo
INSERT INTO servicos (nome, preco, duracao) VALUES
('Corte de Cabelo', 25.00, 30),
('Corte + Barba', 35.00, 45),
('Barba Completa', 20.00, 25),
('Sobrancelha', 15.00, 15),
('Luzes/Reflexos', 80.00, 120);

-- Inserir agendamentos de exemplo (ajuste as datas)
INSERT INTO agendamentos (cliente_id, servico_id, servico, data, horario, status) VALUES
((SELECT id FROM clientes WHERE nome = 'João Silva'), 
 (SELECT id FROM servicos WHERE nome = 'Corte de Cabelo'), 
 'Corte de Cabelo', 
 CURRENT_DATE, 
 '14:00', 
 'agendado'),
 
((SELECT id FROM clientes WHERE nome = 'Maria Santos'), 
 (SELECT id FROM servicos WHERE nome = 'Corte + Barba'), 
 'Corte + Barba', 
 CURRENT_DATE, 
 '15:30', 
 'agendado'),
 
((SELECT id FROM clientes WHERE nome = 'Pedro Oliveira'), 
 (SELECT id FROM servicos WHERE nome = 'Barba Completa'), 
 'Barba Completa', 
 CURRENT_DATE + 1, 
 '10:00', 
 'agendado');
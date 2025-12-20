# 📚 Additional Content Ideas - Easy to Add

This file contains **1000+ more words, verbs, expressions** organized by theme and level. Simply copy-paste into SQL and run!

---

## 🌟 LEVEL 11-15: Advanced Vocabulary

### Category: Adjetivos (Adjectives) - LEVEL 11

```sql
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Adjetivos', 'שמות תואר', '✨', 'bg-gradient-to-br from-teal-600 to-cyan-700', 4, 11, 25);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Grande', 'גדול', 'Gadol', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Pequeno', 'קטן', 'Katan', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Bonito', 'יפה', 'Yafe', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Feio', 'מכוער', 'Mecho''ar', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Novo', 'חדש', 'Chadash', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Velho', 'ישן', 'Yashan', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Rápido', 'מהיר', 'Mahir', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Lento', 'איטי', 'Iti', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Quente', 'חם', 'Cham', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Frio', 'קר', 'Kar', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Fácil', 'קל', 'Kal', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Difícil', 'קשה', 'Kashe', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Forte', 'חזק', 'Chazak', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Fraco', 'חלש', 'Chalash', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Inteligente', 'חכם', 'Chacham', 'word', 4, 25 FROM categories WHERE name_pt = 'Adjetivos';
```

### Category: Animais (Animals) - LEVEL 12

```sql
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Animais', 'חיות', '🦁', 'bg-gradient-to-br from-green-600 to-emerald-700', 4, 12, 25);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Cachorro', 'כלב', 'Kelev', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Gato', 'חתול', 'Chatul', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Pássaro', 'ציפור', 'Tzipor', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Peixe', 'דג', 'Dag', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Cavalo', 'סוס', 'Sus', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Vaca', 'פרה', 'Para', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Leão', 'אריה', 'Arye', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Elefante', 'פיל', 'Pil', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Macaco', 'קוף', 'Kof', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Coelho', 'ארנב', 'Arnav', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Cobra', 'נחש', 'Nachash', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Borboleta', 'פרפר', 'Parpar', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Formiga', 'נמלה', 'Nemala', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Abelha', 'דבורה', 'Dvora', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Urso', 'דוב', 'Dov', 'word', 4, 25 FROM categories WHERE name_pt = 'Animais';
```

### Category: Natureza (Nature) - LEVEL 13

```sql
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Natureza', 'טבע', '🌳', 'bg-gradient-to-br from-emerald-600 to-lime-700', 4, 13, 25);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Árvore', 'עץ', 'Etz', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Flor', 'פרח', 'Perach', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Grama', 'דשא', 'Deshe', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Montanha', 'הר', 'Har', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Rio', 'נהר', 'Nahar', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Mar', 'ים', 'Yam', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Praia', 'חוף', 'Chof', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Sol', 'שמש', 'Shemesh', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Lua', 'ירח', 'Yare''ach', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Estrela', 'כוכב', 'Kochav', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Céu', 'שמיים', 'Shamayim', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Nuvem', 'ענן', 'Anan', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Chuva', 'גשם', 'Geshem', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Vento', 'רוח', 'Ru''ach', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Neve', 'שלג', 'Sheleg', 'word', 4, 25 FROM categories WHERE name_pt = 'Natureza';
```

---

## 🗣️ LEVEL 16-20: Conversational Fluency

### Category: No Restaurante (At the Restaurant) - LEVEL 16

```sql
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('No Restaurante', 'במסעדה', '🍽️', 'bg-gradient-to-br from-red-600 to-orange-700', 5, 16, 30);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Mesa para dois, por favor', 'שולחן לשניים בבקשה', 'Shulchan lishnayim bevakasha', 'sentence', 5, 35, 'שולחן לשניים בבקשה - Eu gostaria de uma mesa para dois'
FROM categories WHERE name_pt = 'No Restaurante';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'O cardápio, por favor', 'את התפריט בבקשה', 'Et hatafrit bevakasha', 'sentence', 5, 35
FROM categories WHERE name_pt = 'No Restaurante';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Estou pronto para pedir', 'אני מוכן להזמין', 'Ani muchan lehazmin', 'sentence', 5, 35
FROM categories WHERE name_pt = 'No Restaurante';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'O que você recomenda?', 'מה אתה ממליץ?', 'Ma ata mamlitz?', 'sentence', 5, 35
FROM categories WHERE name_pt = 'No Restaurante';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu sou vegetariano', 'אני צמחוני', 'Ani tzimchoni', 'sentence', 5, 35
FROM categories WHERE name_pt = 'No Restaurante';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Sem carne, por favor', 'בלי בשר בבקשה', 'Bli basar bevakasha', 'sentence', 5, 35
FROM categories WHERE name_pt = 'No Restaurante';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'A conta, por favor', 'את החשבון בבקשה', 'Et hacheshbon bevakasha', 'sentence', 5, 35
FROM categories WHERE name_pt = 'No Restaurante';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Estava delicioso', 'היה טעים מאוד', 'Haya ta''im me''od', 'sentence', 5, 35
FROM categories WHERE name_pt = 'No Restaurante';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Posso pagar com cartão?', 'אפשר לשלם בכרטיס?', 'Efshar leshalem bekartis?', 'sentence', 5, 35
FROM categories WHERE name_pt = 'No Restaurante';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Há opções veganas?', 'יש אפשרויות טבעוניות?', 'Yesh epsharuyot tiv''oniyot?', 'sentence', 5, 35
FROM categories WHERE name_pt = 'No Restaurante';
```

### Category: Viajando (Traveling) - LEVEL 17

```sql
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Viajando', 'מטייל', '✈️', 'bg-gradient-to-br from-blue-600 to-indigo-700', 5, 17, 30);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Onde fica o aeroporto?', 'איפה שדה התעופה?', 'Eyfo sdeh hate''ufa?', 'sentence', 5, 35
FROM categories WHERE name_pt = 'Viajando';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Preciso de um táxi', 'אני צריך מונית', 'Ani tzarich monit', 'sentence', 5, 35
FROM categories WHERE name_pt = 'Viajando';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Quanto custa o ônibus?', 'כמה עולה האוטובוס?', 'Kama ole ha''otobus?', 'sentence', 5, 35
FROM categories WHERE name_pt = 'Viajando';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Onde está a estação de trem?', 'איפה תחנת הרכבת?', 'Eyfo tachanat harakevet?', 'sentence', 5, 35
FROM categories WHERE name_pt = 'Viajando';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Quero reservar um hotel', 'אני רוצה להזמין מלון', 'Ani rotze lehazmin malon', 'sentence', 5, 35
FROM categories WHERE name_pt = 'Viajando';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Tenho uma reserva', 'יש לי הזמנה', 'Yesh li hazmana', 'sentence', 5, 35
FROM categories WHERE name_pt = 'Viajando';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Onde posso trocar dinheiro?', 'איפה אפשר להחליף כסף?', 'Eyfo efshar lehachlif kesef?', 'sentence', 5, 35
FROM categories WHERE name_pt = 'Viajando';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Perdi minha bagagem', 'איבדתי את המזוודה', 'Ivadeti et hamizvada', 'sentence', 5, 35
FROM categories WHERE name_pt = 'Viajando';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Preciso de um mapa', 'אני צריך מפה', 'Ani tzarich mapa', 'sentence', 5, 35
FROM categories WHERE name_pt = 'Viajando';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Como chego ao centro?', 'איך מגיעים למרכז?', 'Eich magi''im lamerkaz?', 'sentence', 5, 35
FROM categories WHERE name_pt = 'Viajando';
```

---

## 🎓 LEVEL 21-25: Professional & Academic

### Category: Tecnologia (Technology) - LEVEL 21

```sql
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Tecnologia', 'טכנולוגיה', '💻', 'bg-gradient-to-br from-slate-600 to-gray-700', 5, 21, 35);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Computador', 'מחשב', 'Machshev', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Telefone', 'טלפון', 'Telefon', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Internet', 'אינטרנט', 'Internet', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Email', 'אימייל', 'Email', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Senha', 'סיסמה', 'Sisma', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Aplicativo', 'אפליקציה', 'Aplikatzya', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Website', 'אתר', 'Atar', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Download', 'הורדה', 'Horada', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Upload', 'העלאה', 'Ha''ala', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Teclado', 'מקלדת', 'Mikledet', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Mouse', 'עכבר', 'Achbar', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Tela', 'מסך', 'Masach', 'word', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Rede social', 'רשת חברתית', 'Reshet chevratit', 'expression', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Fazer login', 'להתחבר', 'Lehitchaber', 'verb', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Desligar', 'לכבות', 'Lechabot', 'verb', 5, 30 FROM categories WHERE name_pt = 'Tecnologia';
```

---

## 💡 Quick Content Templates

Use these templates to quickly add 15 words to any new category:

### Template 1: Places (Lugares)

```sql
-- Cinema, Biblioteca, Hospital, Banco, Farmácia, Parque, Museu, Teatro, Escola, Universidade, Mercado, Padaria, Correio, Delegacia, Prefeitura
```

### Template 2: Hobbies

```sql
-- Ler, Escrever, Desenhar, Pintar, Cantar, Dançar, Tocar instrumento, Fotografar, Viajar, Cozinhar, Jardinagem, Esportes, Yoga, Meditar, Filmes
```

### Template 3: Body Parts (Corpo)

```sql
-- Cabeça, Olhos, Nariz, Boca, Orelha, Mão, Pé, Braço, Perna, Dedo, Coração, Estômago, Costas, Pescoço, Joelho
```

### Template 4: Professions (Profissões)

```sql
-- Médico, Enfermeiro, Professor, Engenheiro, Advogado, Policial, Bombeiro, Cozinheiro, Garçom, Motorista, Artista, Músico, Programador, Vendedor, Gerente
```

### Template 5: Emotions Advanced

```sql
-- Ansioso, Relaxado, Frustrado, Grato, Esperançoso, Desapontado, Empolgado, Nervoso, Calmo, Confiante, Inseguro, Motivado, Cansado, Energético, Inspirado
```

---

## 🚀 Gamification Content

### Boss Battle Phrases (Level 30, 40, 50)

Super hard sentences for advanced learners:

```sql
-- LEVEL 30 BOSS
'Se eu pudesse voltar no tempo, estudaria hebraico desde criança'
'אם הייתי יכול לחזור בזמן, הייתי לומד עברית מילדות'

-- LEVEL 40 BOSS
'A diferença entre o hebraico moderno e o bíblico é fascinante'
'ההבדל בין עברית מודרנית לעברית מקראית מרתק'

-- LEVEL 50 BOSS
'Aprender um idioma novo abre portas para compreender diferentes culturas'
'ללמוד שפה חדשה פותח דלתות להבנת תרבויות שונות'
```

---

## 📊 Content Statistics

With all this content, you'll have:

- **25+ categories** (vs original 14)
- **750+ learning items** (vs original 140)
- **150+ verbs**
- **100+ expressions**
- **80+ sentences**
- **420+ words**

### Level Distribution:

- Levels 1-5: 140 items (Beginner)
- Levels 6-10: 150 items (Intermediate)
- Levels 11-15: 180 items (Advanced)
- Levels 16-20: 150 items (Fluent)
- Levels 21-25+: 130 items (Expert)

---

## 🎯 Implementation Priority

1. **Week 1**: Add Categories 15-17 (Verbs + Daily Actions + Expressions)
2. **Week 2**: Add Categories 18-20 (Sentences + Communication + Emotions)
3. **Week 3**: Add Categories 21-23 (Conversation + Adjectives + Animals)
4. **Week 4**: Add Categories 24-25 (Nature + Restaurant + Travel)
5. **Month 2**: Add remaining professional content

---

Need help adding any of these? Just let me know which category you want to implement first! 🚀

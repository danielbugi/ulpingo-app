-- Enhanced Content: Verbs, Expressions, and Sentences (NO ACHIEVEMENTS)
-- 105+ new learning items organized by level

-- ============================================
-- LEVEL 1-3: ESSENTIAL VERBS (Beginner)
-- ============================================

-- Category 15: Verbos Essenciais (Essential Verbs) - LEVEL 3
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Verbos Essenciais', 'פעלים בסיסיים', '⚡', 'bg-gradient-to-br from-amber-500 to-orange-600', 1, 3, 15)
;

-- Get category ID for inserts
DO $$ 
DECLARE cat_id INT;
BEGIN
  SELECT id INTO cat_id FROM categories WHERE name_pt = 'Verbos Essenciais';
  
  -- Insert verbs
  INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence) VALUES
  (cat_id, 'Ser/Estar', 'להיות', 'Lihiyot', 'verb', 1, 15, 'אני רוצה להיות רופא - Eu quero ser médico'),
  (cat_id, 'Ter', 'להיות לי', 'Lihiyot li', 'verb', 1, 15, 'יש לי כלב - Eu tenho um cachorro'),
  (cat_id, 'Fazer', 'לעשות', 'La''asot', 'verb', 1, 15, 'מה אתה עושה? - O que você está fazendo?'),
  (cat_id, 'Ir', 'ללכת', 'Lalechet', 'verb', 1, 15, 'אני הולך הביתה - Eu vou para casa'),
  (cat_id, 'Vir', 'לבוא', 'Lavo', 'verb', 1, 15, 'תבוא לבקר! - Venha visitar!'),
  (cat_id, 'Querer', 'לרצות', 'Lirtzot', 'verb', 1, 15, 'אני רוצה לאכול - Eu quero comer'),
  (cat_id, 'Poder/Conseguir', 'יכול', 'Yachol', 'verb', 1, 15, 'אני יכול לעזור - Eu posso ajudar'),
  (cat_id, 'Ver', 'לראות', 'Lirot', 'verb', 1, 15, 'אני רואה אותך - Eu te vejo'),
  (cat_id, 'Saber', 'לדעת', 'Lada''at', 'verb', 1, 15, 'אני יודע עברית - Eu sei hebraico'),
  (cat_id, 'Dar', 'לתת', 'Latet', 'verb', 1, 15, 'תן לי מים - Me dê água'),
  (cat_id, 'Falar', 'לדבר', 'Ledaber', 'verb', 1, 15, 'אני מדבר עברית - Eu falo hebraico'),
  (cat_id, 'Comer', 'לאכול', 'Leechol', 'verb', 1, 15, 'אני אוכל פיצה - Eu como pizza'),
  (cat_id, 'Beber', 'לשתות', 'Lishtot', 'verb', 1, 15, 'אני שותה מים - Eu bebo água'),
  (cat_id, 'Dormir', 'לישון', 'Lishon', 'verb', 1, 15, 'אני ישן טוב - Eu durmo bem'),
  (cat_id, 'Acordar', 'להתעורר', 'Lehit''orer', 'verb', 1, 15, 'אני מתעורר מוקדם - Eu acordo cedo')
 ;
END $$;

-- Category 16: Ações Diárias (Daily Actions) - LEVEL 4
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Ações Diárias', 'פעולות יומיומיות', '🏃', 'bg-gradient-to-br from-green-500 to-teal-600', 2, 4, 15)
;

DO $$ 
DECLARE cat_id INT;
BEGIN
  SELECT id INTO cat_id FROM categories WHERE name_pt = 'Ações Diárias';
  
  INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence) VALUES
  (cat_id, 'Escovar', 'לצחצח', 'Letzachtzech', 'verb', 2, 15, 'צחצח שיניים - Escove os dentes'),
  (cat_id, 'Vestir', 'להתלבש', 'Lehitlabesh', 'verb', 2, 15, 'אני מתלבש מהר - Eu me visto rápido'),
  (cat_id, 'Trabalhar', 'לעבוד', 'La''avod', 'verb', 2, 15, 'אני עובד היום - Eu trabalho hoje'),
  (cat_id, 'Descansar', 'לנוח', 'Lanuach', 'verb', 2, 15, 'אני צריך לנוח - Eu preciso descansar'),
  (cat_id, 'Limpar', 'לנקות', 'Lenakot', 'verb', 2, 15, 'אני מנקה את הבית - Eu limpo a casa'),
  (cat_id, 'Cozinhar', 'לבשל', 'Levashel', 'verb', 2, 15, 'אני אוהב לבשל - Eu amo cozinhar'),
  (cat_id, 'Ler', 'לקרוא', 'Likro', 'verb', 2, 15, 'אני קורא ספר - Eu leio um livro'),
  (cat_id, 'Escrever', 'לכתוב', 'Lichtov', 'verb', 2, 15, 'אני כותב מכתב - Eu escrevo uma carta'),
  (cat_id, 'Ouvir', 'לשמוע', 'Lishmo''a', 'verb', 2, 15, 'אני שומע מוזיקה - Eu ouço música'),
  (cat_id, 'Assistir', 'לצפות', 'Litzpot', 'verb', 2, 15, 'אני צופה בטלוויזיה - Eu assisto TV'),
  (cat_id, 'Jogar', 'לשחק', 'Lesachek', 'verb', 2, 15, 'הילדים משחקים - As crianças jogam'),
  (cat_id, 'Correr', 'לרוץ', 'Larutz', 'verb', 2, 15, 'אני רץ בפארק - Eu corro no parque'),
  (cat_id, 'Caminhar', 'ללכת', 'Lalechet', 'verb', 2, 15, 'אני הולך ברגל - Eu caminho'),
  (cat_id, 'Estudar', 'ללמוד', 'Lilmod', 'verb', 2, 15, 'אני לומד עברית - Eu estudo hebraico'),
  (cat_id, 'Ensinar', 'ללמד', 'Lelamed', 'verb', 2, 15, 'המורה מלמדת - A professora ensina')
  ;
END $$;

-- Category 17: Expressões do Dia a Dia - LEVEL 5
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Expressões do Dia a Dia', 'ביטויים יומיומיים', '💭', 'bg-gradient-to-br from-violet-500 to-purple-600', 2, 5, 20)
;

DO $$ 
DECLARE cat_id INT;
BEGIN
  SELECT id INTO cat_id FROM categories WHERE name_pt = 'Expressões do Dia a Dia';
  
  INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value) VALUES
  (cat_id, 'Com licença', 'סליחה', 'Slicha', 'expression', 2, 20),
  (cat_id, 'De nada', 'בבקשה', 'Bevakasha', 'expression', 2, 20),
  (cat_id, 'Tudo bem?', 'הכל בסדר?', 'Hakol beseder?', 'expression', 2, 20),
  (cat_id, 'Está tudo bem', 'הכל בסדר', 'Hakol beseder', 'expression', 2, 20),
  (cat_id, 'Não entendo', 'אני לא מבין', 'Ani lo mevin', 'expression', 2, 20),
  (cat_id, 'Você fala inglês?', 'אתה מדבר אנגלית?', 'Ata medaber anglit?', 'expression', 2, 20),
  (cat_id, 'Quanto custa?', 'כמה זה עולה?', 'Kama ze ole?', 'expression', 2, 20),
  (cat_id, 'Onde fica?', 'איפה זה?', 'Eifo ze?', 'expression', 2, 20),
  (cat_id, 'Que horas são?', 'מה השעה?', 'Ma hasha''a?', 'expression', 2, 20),
  (cat_id, 'Tenho fome', 'אני רעב', 'Ani ra''ev', 'expression', 2, 20),
  (cat_id, 'Tenho sede', 'אני צמא', 'Ani tzame', 'expression', 2, 20),
  (cat_id, 'Estou cansado', 'אני עייף', 'Ani ayef', 'expression', 2, 20),
  (cat_id, 'Boa sorte!', 'בהצלחה!', 'Behatzlacha!', 'expression', 2, 20),
  (cat_id, 'Parabéns!', 'מזל טוב!', 'Mazal tov!', 'expression', 2, 20),
  (cat_id, 'Desculpe', 'מצטער', 'Mitztaer', 'expression', 2, 20)
  ;
END $$;

-- Category 18: Frases Completas - LEVEL 6
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Frases Completas', 'משפטים שלמים', '💬', 'bg-gradient-to-br from-pink-500 to-rose-600', 3, 6, 25)
;

DO $$ 
DECLARE cat_id INT;
BEGIN
  SELECT id INTO cat_id FROM categories WHERE name_pt = 'Frases Completas';
  
  INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value) VALUES
  (cat_id, 'Qual é o seu nome?', 'מה שמך?', 'Ma shimcha?', 'sentence', 3, 25),
  (cat_id, 'Meu nome é...', 'שמי...', 'Shmi...', 'sentence', 3, 25),
  (cat_id, 'De onde você é?', 'מאיפה אתה?', 'Me''eifo ata?', 'sentence', 3, 25),
  (cat_id, 'Eu sou do Brasil', 'אני מברזיל', 'Ani miBrazil', 'sentence', 3, 25),
  (cat_id, 'Prazer em conhecê-lo', 'נעים להכיר', 'Na''im lehakir', 'sentence', 3, 25),
  (cat_id, 'Como você está?', 'מה שלומך?', 'Ma shlomcha?', 'sentence', 3, 25),
  (cat_id, 'Estou bem, obrigado', 'אני בסדר תודה', 'Ani beseder, toda', 'sentence', 3, 25),
  (cat_id, 'Você pode me ajudar?', 'אתה יכול לעזור לי?', 'Ata yachol la''azor li?', 'sentence', 3, 25),
  (cat_id, 'Onde está o banheiro?', 'איפה השירותים?', 'Eifo hasherutim?', 'sentence', 3, 25),
  (cat_id, 'Eu não falo hebraico bem', 'אני לא מדבר עברית טוב', 'Ani lo medaber ivrit tov', 'sentence', 3, 25),
  (cat_id, 'Você pode repetir?', 'אתה יכול לחזור?', 'Ata yachol lachzor?', 'sentence', 3, 25),
  (cat_id, 'Eu gostaria de...', 'הייתי רוצה...', 'Hayiti rotze...', 'sentence', 3, 25),
  (cat_id, 'Quanto tempo leva?', 'כמה זמן זה לוקח?', 'Kama zman ze loke''ach?', 'sentence', 3, 25),
  (cat_id, 'Posso pagar com cartão?', 'אפשר לשלם בכרטיס?', 'Efshar leshalem bekartis?', 'sentence', 3, 25),
  (cat_id, 'Tenha um bom dia!', 'יום טוב!', 'Yom tov!', 'sentence', 3, 25)
  ;
END $$;

-- Category 19: Verbos de Comunicação - LEVEL 7
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Verbos de Comunicação', 'פעלי תקשורת', '📢', 'bg-gradient-to-br from-indigo-600 to-blue-700', 3, 7, 20)
;

DO $$ 
DECLARE cat_id INT;
BEGIN
  SELECT id INTO cat_id FROM categories WHERE name_pt = 'Verbos de Comunicação';
  
  INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value) VALUES
  (cat_id, 'Perguntar', 'לשאול', 'Lish''ol', 'verb', 3, 20),
  (cat_id, 'Responder', 'לענות', 'La''anot', 'verb', 3, 20),
  (cat_id, 'Explicar', 'להסביר', 'Lehasbir', 'verb', 3, 20),
  (cat_id, 'Entender', 'להבין', 'Lehavin', 'verb', 3, 20),
  (cat_id, 'Contar (história)', 'לספר', 'Lesaper', 'verb', 3, 20),
  (cat_id, 'Prometer', 'להבטיח', 'Lehavti''ach', 'verb', 3, 20),
  (cat_id, 'Concordar', 'להסכים', 'Lehaskim', 'verb', 3, 20),
  (cat_id, 'Discordar', 'לא להסכים', 'Lo lehaskim', 'verb', 3, 20),
  (cat_id, 'Gritar', 'לצעוק', 'Litz''ok', 'verb', 3, 20),
  (cat_id, 'Sussurrar', 'ללחוש', 'Lalachosh', 'verb', 3, 20),
  (cat_id, 'Chamar', 'לקרוא', 'Likro', 'verb', 3, 20),
  (cat_id, 'Avisar', 'להודיע', 'Lehodi''a', 'verb', 3, 20),
  (cat_id, 'Sugerir', 'להציע', 'Lehatzi''a', 'verb', 3, 20),
  (cat_id, 'Recomendar', 'להמליץ', 'Lehamlitz', 'verb', 3, 20),
  (cat_id, 'Convencer', 'לשכנע', 'Leshakhne''a', 'verb', 3, 20)
  ;
END $$;

-- Category 20: Emoções - LEVEL 8
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Emoções', 'רגשות', '😊', 'bg-gradient-to-br from-yellow-500 to-orange-500', 3, 8, 25)
;

DO $$ 
DECLARE cat_id INT;
BEGIN
  SELECT id INTO cat_id FROM categories WHERE name_pt = 'Emoções';
  
  INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value) VALUES
  (cat_id, 'Feliz', 'שמח', 'Same''ach', 'word', 3, 25),
  (cat_id, 'Triste', 'עצוב', 'Atzuv', 'word', 3, 25),
  (cat_id, 'Bravo', 'כעוס', 'Ka''us', 'word', 3, 25),
  (cat_id, 'Assustado', 'מפוחד', 'Mefuchad', 'word', 3, 25),
  (cat_id, 'Animado', 'נרגש', 'Nirgash', 'word', 3, 25),
  (cat_id, 'Surpreso', 'מופתע', 'Mufta', 'word', 3, 25),
  (cat_id, 'Preocupado', 'דאוג', 'Da''ug', 'word', 3, 25),
  (cat_id, 'Calmo', 'רגוע', 'Ragu''a', 'word', 3, 25),
  (cat_id, 'Nervoso', 'עצבני', 'Atzabani', 'word', 3, 25),
  (cat_id, 'Confuso', 'מבולבל', 'Mevulbal', 'word', 3, 25),
  (cat_id, 'Entediado', 'משועמם', 'Meshu''amam', 'word', 3, 25),
  (cat_id, 'Orgulhoso', 'גאה', 'Ge''e', 'word', 3, 25),
  (cat_id, 'Envergonhado', 'מבויש', 'Mevuyash', 'word', 3, 25),
  (cat_id, 'Solitário', 'בודד', 'Boded', 'word', 3, 25),
  (cat_id, 'Apaixonado', 'מאוהב', 'Me''ohav', 'word', 3, 25)
  ;
END $$;

-- Category 21: Conversação Avançada - LEVEL 10
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Conversação Avançada', 'שיחה מתקדמת', '🗣️', 'bg-gradient-to-br from-red-600 to-pink-700', 4, 10, 30)
;

DO $$ 
DECLARE cat_id INT;
BEGIN
  SELECT id INTO cat_id FROM categories WHERE name_pt = 'Conversação Avançada';
  
  INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value) VALUES
  (cat_id, 'Na minha opinião', 'לדעתי', 'Leda''ati', 'expression', 4, 30),
  (cat_id, 'Concordo completamente', 'אני מסכים לחלוטין', 'Ani maskim lechalutin', 'expression', 4, 30),
  (cat_id, 'Isso é interessante', 'זה מעניין', 'Ze me''anyen', 'expression', 4, 30),
  (cat_id, 'Você pode repetir isso?', 'אתה יכול לחזור?', 'Ata yachol lachzor?', 'sentence', 4, 30),
  (cat_id, 'Como se diz... em hebraico?', 'איך אומרים... בעברית?', 'Eich omrim... be''ivrit?', 'sentence', 4, 30),
  (cat_id, 'Deixe-me pensar', 'תן לי לחשוב', 'Ten li lachshov', 'expression', 4, 30),
  (cat_id, 'Faz sentido', 'זה הגיוני', 'Ze higioni', 'expression', 4, 30),
  (cat_id, 'Por outro lado', 'מצד שני', 'Mitzad sheni', 'expression', 4, 30),
  (cat_id, 'Depende', 'זה תלוי', 'Ze talui', 'expression', 4, 30),
  (cat_id, 'Com certeza não', 'בהחלט לא', 'Behechlet lo', 'expression', 4, 30),
  (cat_id, 'Eu não tenho certeza', 'אני לא בטוח', 'Ani lo batu''ach', 'sentence', 4, 30),
  (cat_id, 'Talvez', 'אולי', 'Ulay', 'expression', 4, 30),
  (cat_id, 'É verdade', 'זה נכון', 'Ze nachon', 'expression', 4, 30),
  (cat_id, 'Não necessariamente', 'לא בהכרח', 'Lo behechreach', 'expression', 4, 30),
  (cat_id, 'Exatamente!', 'בדיוק!', 'Bediyuk!', 'expression', 4, 30)
  ;
END $$;
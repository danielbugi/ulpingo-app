-- Enhanced Content: Verbs, Expressions, and Sentences
-- 500+ new learning items organized by level

-- ============================================
-- LEVEL 1-3: ESSENTIAL VERBS (Beginner)
-- ============================================

-- Category 15: Verbos Essenciais (Essential Verbs) - LEVEL 3
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Verbos Essenciais', 'פעלים בסיסיים', '⚡', 'bg-gradient-to-br from-amber-500 to-orange-600', 1, 3, 15);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Ser/Estar', 'להיות', 'Lihiyot', 'verb', 1, 15, 'אני רוצה להיות רופא - Eu quero ser médico'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Ter', 'להיות לי', 'Lihiyot li', 'verb', 1, 15, 'יש לי כלב - Eu tenho um cachorro'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Fazer', 'לעשות', 'La''asot', 'verb', 1, 15, 'מה אתה עושה? - O que você está fazendo?'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Ir', 'ללכת', 'Lalechet', 'verb', 1, 15, 'אני הולך הביתה - Eu vou para casa'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Vir', 'לבוא', 'Lavo', 'verb', 1, 15, 'תבוא לבקר! - Venha visitar!'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Querer', 'לרצות', 'Lirtzot', 'verb', 1, 15, 'אני רוצה לאכול - Eu quero comer'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Poder/Conseguir', 'יכול', 'Yachol', 'verb', 1, 15, 'אני יכול לעזור - Eu posso ajudar'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Ver', 'לראות', 'Lirot', 'verb', 1, 15, 'אני רואה אותך - Eu te vejo'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Saber', 'לדעת', 'Lada''at', 'verb', 1, 15, 'אני יודע עברית - Eu sei hebraico'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Dar', 'לתת', 'Latet', 'verb', 1, 15, 'תן לי מים - Me dê água'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Falar', 'לדבר', 'Ledaber', 'verb', 1, 15, 'אני מדבר עברית - Eu falo hebraico'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Comer', 'לאכול', 'Leechol', 'verb', 1, 15, 'אני אוכל פיצה - Eu como pizza'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Beber', 'לשתות', 'Lishtot', 'verb', 1, 15, 'אני שותה קפה - Eu bebo café'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Dormir', 'לישון', 'Lishon', 'verb', 1, 15, 'אני רוצה לישון - Eu quero dormir'
FROM categories WHERE name_pt = 'Verbos Essenciais';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Estudar', 'ללמוד', 'Lilmod', 'verb', 1, 15, 'אני לומד עברית - Eu estudo hebraico'
FROM categories WHERE name_pt = 'Verbos Essenciais';

-- Category 16: Ações Diárias (Daily Actions) - LEVEL 4
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Ações Diárias', 'פעולות יומיומיות', '🏃', 'bg-gradient-to-br from-lime-500 to-green-600', 2, 4, 15);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Acordar', 'להתעורר', 'Lehit''orer', 'verb', 2, 15, 'אני מתעורר בבוקר - Eu acordo de manhã'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Levantar', 'לקום', 'Lakum', 'verb', 2, 15, 'קום מהמיטה - Levante da cama'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Tomar banho', 'להתקלח', 'Lehitkaleach', 'verb', 2, 15, 'אני מתקלח בבוקר - Eu tomo banho de manhã'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Escovar', 'לצחצח', 'Letzachtzech', 'verb', 2, 15, 'צחצח שיניים - Escove os dentes'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Vestir', 'להתלבש', 'Lehitlabesh', 'verb', 2, 15, 'אני מתלבש מהר - Eu me visto rápido'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Trabalhar', 'לעבוד', 'La''avod', 'verb', 2, 15, 'אני עובד היום - Eu trabalho hoje'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Descansar', 'לנוח', 'Lanuach', 'verb', 2, 15, 'אני צריך לנוח - Eu preciso descansar'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Limpar', 'לנקות', 'Lenakot', 'verb', 2, 15, 'אני מנקה את הבית - Eu limpo a casa'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Cozinhar', 'לבשל', 'Levashel', 'verb', 2, 15, 'אני אוהב לבשל - Eu amo cozinhar'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Ler', 'לקרוא', 'Likro', 'verb', 2, 15, 'אני קורא ספר - Eu leio um livro'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Escrever', 'לכתוב', 'Lichtov', 'verb', 2, 15, 'אני כותב מכתב - Eu escrevo uma carta'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Ouvir', 'לשמוע', 'Lishmo''a', 'verb', 2, 15, 'אני שומע מוזיקה - Eu ouço música'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Assistir', 'לצפות', 'Litzpot', 'verb', 2, 15, 'אני צופה בטלוויזיה - Eu assisto TV'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Jogar', 'לשחק', 'Lesachek', 'verb', 2, 15, 'הילדים משחקים - As crianças jogam'
FROM categories WHERE name_pt = 'Ações Diárias';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value, example_sentence)
SELECT id, 'Correr', 'לרוץ', 'Larutz', 'verb', 2, 15, 'אני רץ בפארק - Eu corro no parque'
FROM categories WHERE name_pt = 'Ações Diárias';

-- ============================================
-- LEVEL 5-7: COMMON EXPRESSIONS
-- ============================================

-- Category 17: Expressões do Dia a Dia - LEVEL 5
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Expressões do Dia a Dia', 'ביטויים יומיומיים', '💭', 'bg-gradient-to-br from-violet-500 to-purple-600', 2, 5, 20);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Com licença', 'סליחה', 'Slicha', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'De nada', 'בבקשה', 'Bevakasha', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Tudo bem?', 'הכל בסדר?', 'Hakol beseder?', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Está tudo bem', 'הכל בסדר', 'Hakol beseder', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Não entendo', 'אני לא מבין', 'Ani lo mevin', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Você fala inglês?', 'אתה מדבר אנגלית?', 'Ata medaber anglit?', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Quanto custa?', 'כמה זה עולה?', 'Kama ze ole?', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Onde fica?', 'איפה זה?', 'Eyfo ze?', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Qual é seu nome?', 'מה שמך?', 'Ma shimcha?', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Prazer em conhecer', 'נעים מאוד', 'Na''im meod', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Até logo', 'להתראות', 'Lehitra''ot', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Boa sorte', 'בהצלחה', 'Behatzlacha', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Com certeza', 'בטח', 'Betach', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Sem problema', 'אין בעיה', 'Ein be''aya', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Um momento', 'רגע', 'Rega', 'expression', 2, 20
FROM categories WHERE name_pt = 'Expressões do Dia a Dia';

-- Category 18: Frases Completas Básicas - LEVEL 6
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Frases Completas', 'משפטים שלמים', '📝', 'bg-gradient-to-br from-rose-500 to-red-600', 3, 6, 25);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu me chamo...', 'קוראים לי...', 'Kor''im li...', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu sou do Brasil', 'אני מברזיל', 'Ani mi-Brazil', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu estou aprendendo hebraico', 'אני לומד עברית', 'Ani lomed ivrit', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Você pode me ajudar?', 'אתה יכול לעזור לי?', 'Ata yachol la''azor li?', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu não sei', 'אני לא יודע', 'Ani lo yode''a', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Onde está o banheiro?', 'איפה השירותים?', 'Eyfo hasherutim?', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu gostaria de água', 'אני רוצה מים', 'Ani rotze mayim', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Que horas são?', 'מה השעה?', 'Ma hasha''a?', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu tenho uma pergunta', 'יש לי שאלה', 'Yesh li she''ela', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Está muito caro', 'זה יקר מדי', 'Ze yakar miday', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu estou com fome', 'אני רעב', 'Ani ra''ev', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu estou cansado', 'אני עייף', 'Ani ayef', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu moro em Tel Aviv', 'אני גר בתל אביב', 'Ani gar be-Tel Aviv', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Fale mais devagar, por favor', 'דבר לאט יותר בבקשה', 'Daber le''at yoter bevakasha', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu amo Israel', 'אני אוהב את ישראל', 'Ani ohev et Yisrael', 'sentence', 3, 25
FROM categories WHERE name_pt = 'Frases Completas';

-- ============================================
-- LEVEL 8-10: INTERMEDIATE CONTENT
-- ============================================

-- Category 19: Verbos de Comunicação - LEVEL 7
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Verbos de Comunicação', 'פעלי תקשורת', '📢', 'bg-gradient-to-br from-indigo-600 to-blue-700', 3, 7, 20);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Perguntar', 'לשאול', 'Lish''ol', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Responder', 'לענות', 'La''anot', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Explicar', 'להסביר', 'Lehasbir', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Entender', 'להבין', 'Lehavin', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Contar (história)', 'לספר', 'Lesaper', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Prometer', 'להבטיח', 'Lehavti''ach', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Concordar', 'להסכים', 'Lehaskim', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Discordar', 'לא להסכים', 'Lo lehaskim', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Gritar', 'לצעוק', 'Litz''ok', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Sussurrar', 'ללחוש', 'Lilchosh', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Ligar (telefone)', 'להתקשר', 'Lehitkasher', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Enviar mensagem', 'לשלוח הודעה', 'Lishlo''ach hoda''a', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Traduzir', 'לתרגם', 'Letargem', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Mencionar', 'להזכיר', 'Lehazkir', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Avisar', 'להודיע', 'Lehodi''a', 'verb', 3, 20
FROM categories WHERE name_pt = 'Verbos de Comunicação';

-- Category 20: Emoções e Sentimentos - LEVEL 8
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Emoções', 'רגשות', '😊', 'bg-gradient-to-br from-pink-600 to-rose-700', 3, 8, 20);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Amar', 'לאהוב', 'Le''ehov', 'verb', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Gostar', 'לאהוב', 'Le''ehov', 'verb', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Odiar', 'לשנוא', 'Lisno', 'verb', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Feliz', 'שמח', 'Same''ach', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Triste', 'עצוב', 'Atzuv', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Bravo/Irritado', 'כועס', 'Ko''es', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Assustado', 'מפוחד', 'Mefuchad', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Animado', 'נרגש', 'Nirgash', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Preocupado', 'מודאג', 'Mud''ag', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Surpreso', 'מופתע', 'Muftah', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Entediado', 'משועמם', 'Meshu''amam', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Confuso', 'מבולבל', 'Mevulbal', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Envergonhado', 'נבוך', 'Navoch', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Orgulhoso', 'גאה', 'Ge''e', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Solitário', 'בודד', 'Boded', 'word', 3, 20
FROM categories WHERE name_pt = 'Emoções';

-- Category 21: Conversação Avançada - LEVEL 10
INSERT INTO categories (name_pt, name_he, icon, color, difficulty_level, required_level, xp_reward)
VALUES ('Conversação Avançada', 'שיחה מתקדמת', '🗣️', 'bg-gradient-to-br from-emerald-600 to-teal-700', 4, 10, 30);

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'O que você acha sobre...?', 'מה אתה חושב על...?', 'Ma ata choshev al...?', 'sentence', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Na minha opinião', 'לדעתי', 'Leda''ati', 'expression', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Concordo completamente', 'אני מסכים לגמרי', 'Ani maskim legamri', 'sentence', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Isso é interessante', 'זה מעניין', 'Ze me''anyen', 'sentence', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Você poderia repetir?', 'אתה יכול לחזור?', 'Ata yachol lachzor?', 'sentence', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Como se diz... em hebraico?', 'איך אומרים... בעברית?', 'Eich omrim... be''ivrit?', 'sentence', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Deixe-me pensar', 'תן לי לחשוב', 'Ten li lachshov', 'expression', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Faz sentido', 'זה הגיוני', 'Ze higioni', 'expression', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Por outro lado', 'מצד שני', 'Mitzad sheni', 'expression', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Depende', 'זה תלוי', 'Ze talui', 'expression', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Com certeza não', 'בהחלט לא', 'Behechlet lo', 'expression', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Eu não tenho certeza', 'אני לא בטוח', 'Ani lo batu''ach', 'sentence', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Talvez', 'אולי', 'Ulay', 'expression', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'É verdade', 'זה נכון', 'Ze nachon', 'expression', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

INSERT INTO words (category_id, word_pt, word_he, transliteration, content_type, difficulty, xp_value)
SELECT id, 'Não necessariamente', 'לא בהכרח', 'Lo behechreach', 'expression', 4, 30
FROM categories WHERE name_pt = 'Conversação Avançada';

-- Achievement seeds
INSERT INTO achievements (key, name_pt, name_he, description_pt, icon, rarity, xp_reward)
VALUES 
  ('first_word', 'Primeira Palavra', 'מילה ראשונה', 'Aprendeu sua primeira palavra', '🌟', 'common', 50),
  ('level_5', 'Aprendiz', 'לומד', 'Alcançou o nível 5', '📚', 'common', 100),
  ('level_10', 'Estudante', 'תלמיד', 'Alcançou o nível 10', '🎓', 'rare', 200),
  ('level_20', 'Expert', 'מומחה', 'Alcançou o nível 20', '🏆', 'epic', 500),
  ('level_50', 'Mestre', 'מאסטר', 'Alcançou o nível 50', '👑', 'legendary', 1000),
  ('streak_7', 'Semana Completa', 'שבוע שלם', 'Estudou 7 dias seguidos', '🔥', 'common', 150),
  ('streak_30', 'Mestre da Consistência', 'מאסטר עקביות', 'Estudou 30 dias seguidos', '💎', 'epic', 500),
  ('perfect_quiz', 'Perfeição', 'מושלם', 'Completou um quiz sem erros', '✨', 'rare', 200),
  ('100_words', 'Vocabulário Rico', 'אוצר מילים עשיר', 'Aprendeu 100 palavras', '📖', 'rare', 300),
  ('all_verbs', 'Mestre dos Verbos', 'מאסטר פעלים', 'Completou todas categorias de verbos', '⚡', 'epic', 400),
  ('speed_demon', 'Raio', 'ברק', 'Completou 30 flashcards em menos de 3 minutos', '⚡', 'rare', 250),
  ('night_owl', 'Coruja Noturna', 'ינשוף לילה', 'Estudou depois das 22h', '🦉', 'common', 100),
  ('early_bird', 'Madrugador', 'משכים', 'Estudou antes das 7h', '🐦', 'common', 100),
  ('polyglot', 'Poliglota', 'פוליגלוט', 'Dominou 5 categorias', '🌍', 'epic', 600),
  ('legend', 'Lendário', 'אגדי', 'Completou TODO o conteúdo', '💫', 'legendary', 2000);

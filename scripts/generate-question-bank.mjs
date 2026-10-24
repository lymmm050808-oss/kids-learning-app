import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ages = ['3-4', '5-6']

const chineseWords = {
  '3-4': [
    ['一', '1️⃣'], ['二', '2️⃣'], ['三', '3️⃣'], ['大', '🐘'], ['小', '🐭'], ['上', '⬆️'], ['下', '⬇️'], ['中', '🎯'],
    ['天', '🌤️'], ['米', '🍚'], ['花', '🌼'], ['草', '🌱'], ['鱼', '🐟'], ['鸟', '🐦'], ['车', '🚗'], ['门', '🚪'],
    ['田', '🌾'], ['土', '🪴'], ['石', '🪨'], ['牛', '🐮'], ['羊', '🐑'], ['马', '🐴'], ['狗', '🐶'], ['猫', '🐱'],
    ['兔', '🐰'], ['竹', '🎋'], ['叶', '🍃'], ['雨', '🌧️'], ['星', '⭐'], ['头', '🙂'], ['目', '👀'], ['耳', '👂'],
    ['足', '🦶'], ['女', '👧'], ['男', '👦'], ['红', '🔴'], ['白', '⚪'], ['多', '🎈🎈'],
  ],
  '5-6': [
    ['春', '🌷'], ['夏', '🍉'], ['秋', '🍂'], ['冬', '❄️'], ['风', '💨'], ['雪', '⛄'], ['雷', '🌩️'], ['电', '⚡'],
    ['河', '🏞️'], ['海', '🌊'], ['江', '⛵'], ['湖', '🦆'], ['树', '🌳'], ['林', '🌲🌲'], ['森', '🌲🌲🌲'], ['路', '🛣️'],
    ['桥', '🌉'], ['船', '🚢'], ['飞', '🕊️'], ['走', '🚶'], ['跑', '🏃'], ['跳', '🤸'], ['唱', '🎤'], ['读', '📖'],
    ['写', '✍️'], ['画', '🎨'], ['笑', '😄'], ['哭', '😢'], ['早', '🌅'], ['晚', '🌙'], ['东', '🧭'], ['南', '🧭'],
    ['西', '🧭'], ['北', '🧭'], ['前', '➡️'], ['后', '⬅️'], ['开', '🔓'], ['关', '🔒'],
  ],
}

const englishWords = {
  '3-4': [
    ['ball', '球', '⚽'], ['bus', '公交车', '🚌'], ['duck', '鸭子', '🦆'], ['cow', '奶牛', '🐮'], ['pig', '小猪', '🐷'],
    ['horse', '马', '🐴'], ['rabbit', '兔子', '🐰'], ['bear', '熊', '🐻'], ['lion', '狮子', '🦁'], ['tiger', '老虎', '🐯'],
    ['panda', '熊猫', '🐼'], ['frog', '青蛙', '🐸'], ['banana', '香蕉', '🍌'], ['orange', '橙子', '🍊'], ['pear', '梨', '🍐'],
    ['grape', '葡萄', '🍇'], ['bread', '面包', '🍞'], ['egg', '鸡蛋', '🥚'], ['milk', '牛奶', '🥛'], ['water', '水', '💧'],
    ['cup', '杯子', '🥤'], ['plate', '盘子', '🍽️'], ['spoon', '勺子', '🥄'], ['bed', '床', '🛏️'], ['chair', '椅子', '🪑'],
    ['table', '桌子', '🪵'], ['house', '房子', '🏠'], ['door', '门', '🚪'], ['hat', '帽子', '🧢'], ['shoe', '鞋子', '👟'],
    ['sock', '袜子', '🧦'], ['hand', '手', '✋'], ['eye', '眼睛', '👁️'], ['nose', '鼻子', '👃'], ['ear', '耳朵', '👂'],
    ['red', '红色', '🔴'], ['blue', '蓝色', '🔵'], ['green', '绿色', '🟢'],
  ],
  '5-6': [
    ['pencil', '铅笔', '✏️'], ['crayon', '蜡笔', '🖍️'], ['ruler', '尺子', '📏'], ['eraser', '橡皮', '🧽'], ['schoolbag', '书包', '🎒'],
    ['classroom', '教室', '🏫'], ['teacher', '老师', '🧑‍🏫'], ['student', '学生', '🧒'], ['desk', '课桌', '🪑'], ['clock', '时钟', '🕒'],
    ['window', '窗户', '🪟'], ['garden', '花园', '🪴'], ['park', '公园', '🏞️'], ['zoo', '动物园', '🦒'], ['elephant', '大象', '🐘'],
    ['monkey', '猴子', '🐒'], ['giraffe', '长颈鹿', '🦒'], ['zebra', '斑马', '🦓'], ['turtle', '乌龟', '🐢'], ['snake', '蛇', '🐍'],
    ['butterfly', '蝴蝶', '🦋'], ['bee', '蜜蜂', '🐝'], ['run', '跑步', '🏃'], ['jump', '跳跃', '🤸'], ['swim', '游泳', '🏊'],
    ['sing', '唱歌', '🎤'], ['dance', '跳舞', '💃'], ['read', '阅读', '📖'], ['write', '写字', '✍️'], ['draw', '画画', '🎨'],
    ['sleep', '睡觉', '😴'], ['eat', '吃', '🍽️'], ['drink', '喝', '🥤'], ['play', '玩耍', '🛝'], ['happy', '开心', '😊'],
    ['tired', '累了', '🥱'], ['hot', '热', '🥵'], ['cold', '冷', '🥶'],
  ],
}

function putCorrectAnswer(correct, distractors, index) {
  const others = [...new Set(distractors.map(String).filter((answer) => answer !== String(correct)))].slice(0, 2)
  while (others.length < 2) others.push(String(Number(others.at(-1) || 0) + 1))
  const answers = [...others]
  answers.splice(index % 3, 0, String(correct))
  return answers
}

function nearbyNumbers(correct, index, maximum, minimum = 0) {
  const alternatives = [correct - 1, correct + 1, correct - 2, correct + 2, minimum, maximum]
    .filter((value, position, all) => value >= minimum && value <= maximum && value !== correct && all.indexOf(value) === position)
  return putCorrectAnswer(correct, alternatives, index)
}

function characterQuestions(group) {
  const entries = chineseWords[group]
  return entries.map(([word, emoji], index) => ({
    prompt: word,
    emoji,
    speech: word,
    lang: 'zh-CN',
    question: '请找到“' + word + '”字',
    answers: putCorrectAnswer(word, [entries[(index + 1) % entries.length][0], entries[(index + 7) % entries.length][0]], index),
    correct: word,
  }))
}

function englishQuestions(group) {
  const entries = englishWords[group]
  return entries.map(([word, clue, emoji], index) => ({
    prompt: word,
    emoji,
    speech: word,
    lang: 'en-US',
    question: clue + '的英文是什么？',
    answers: putCorrectAnswer(word, [entries[(index + 1) % entries.length][0], entries[(index + 8) % entries.length][0]], index),
    correct: word,
  }))
}

const numberNames = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
const repeat = (emoji, count) => emoji.repeat(count)

function countQuestion(count, emoji, noun, index, maximum = 5) {
  return {
    prompt: count + ' ' + noun,
    emoji: repeat(emoji, count),
    speech: '数一数，有几个' + noun,
    lang: 'zh-CN',
    question: '数一数，有几个' + noun + '？',
    answers: nearbyNumbers(count, index, maximum, 1),
    correct: String(count),
  }
}

function arithmeticQuestion(a, operator, b, label, index, maximum) {
  const result = operator === '+' ? a + b : a - b
  const emoji = repeat(label[0], a) + ' ' + (operator === '+' ? '＋' : '－') + ' ' + repeat(label[1], b)
  return {
    prompt: a + ' ' + operator + ' ' + b,
    emoji,
    speech: numberNames[a] + (operator === '+' ? '加' : '减') + numberNames[b],
    lang: 'zh-CN',
    question: '请算一算，结果是多少？',
    answers: nearbyNumbers(result, index, maximum),
    correct: String(result),
  }
}

function mathQuestions(group) {
  const questions = []
  if (group === '3-4') {
    const objects = [['🐥', '只小鸡'], ['🎈', '个气球'], ['🐟', '条小鱼'], ['🍓', '颗草莓'], ['🌼', '朵小花']]
    for (let count = 1; count <= 5; count += 1) {
      for (const [emoji, noun] of objects) questions.push(countQuestion(count, emoji, noun, questions.length, 5))
    }
    questions.push(
      arithmeticQuestion(1, '+', 4, ['🍎', '🍓'], questions.length, 8),
      arithmeticQuestion(3, '+', 2, ['⭐', '🌙'], questions.length + 1, 8),
      arithmeticQuestion(2, '+', 4, ['🐟', '🐢'], questions.length + 2, 8),
    )
    const missing = [
      { prompt: '1 + ? = 3', known: '🍎🍎🍎', a: 1, b: 2, total: 3 },
      { prompt: '2 + ? = 5', known: '⭐ ⭐ ⭐ ⭐ ⭐', a: 2, b: 3, total: 5 },
      { prompt: '? + 1 = 4', known: '🐥🐥🐥🐥', a: 3, b: 1, total: 4 },
      { prompt: '? + 2 = 5', known: '🎈🎈🎈🎈🎈', a: 3, b: 2, total: 5 },
      { prompt: '? + 3 = 5', known: '🍐🍐🍐🍐🍐', a: 2, b: 3, total: 5 },
    ]
    for (const item of missing) questions.push({
      prompt: item.prompt, emoji: item.known, speech: '几加' + numberNames[item.b] + '等于' + numberNames[item.total], lang: 'zh-CN',
      question: '空格里应该填几？', answers: nearbyNumbers(item.a, questions.length, 5, 1), correct: String(item.a),
    })
    const comparisons = [[1, 2, '🍎', '🍐'], [3, 2, '⭐', '🌙'], [2, 2, '🐟', '🐢'], [4, 1, '🌼', '🌻'], [3, 5, '🎈', '🪁']]
    for (const [first, second, firstEmoji, secondEmoji] of comparisons) {
      const correct = first === second ? '一样多' : first > second ? '第一组' : '第二组'
      questions.push({
        prompt: '比一比：' + first + ' 和 ' + second,
        emoji: repeat(firstEmoji, first) + '  |  ' + repeat(secondEmoji, second),
        speech: '比一比，哪一组更多', lang: 'zh-CN', question: '哪一组更多？',
        answers: putCorrectAnswer(correct, ['第一组', '第二组', '一样多'], questions.length), correct,
      })
    }
    return questions
  }

  for (let count = 6; count <= 10; count += 1) {
    questions.push(countQuestion(count, '⭐', '颗星星', questions.length, 12))
    questions.push(countQuestion(count, '🐟', '条小鱼', questions.length, 12))
  }
  const additions = [[3, 4], [4, 3], [2, 5], [5, 2], [6, 2], [2, 6], [4, 4], [3, 5], [5, 3], [1, 6], [6, 1], [2, 7]]
  for (const [a, b] of additions) questions.push(arithmeticQuestion(a, '+', b, ['🍎', '🍐'], questions.length, 12))
  const subtractions = [[10, 1], [10, 2], [9, 3], [8, 4], [7, 2], [6, 3], [5, 2], [9, 5], [8, 3], [7, 4]]
  for (const [a, b] of subtractions) questions.push(arithmeticQuestion(a, '-', b, ['⭐', '🌙'], questions.length, 12))
  const patterns = [
    ['2，4，6，？', 8], ['5，6，7，？', 8], ['10，8，6，？', 4], ['1，3，5，？', 7], ['7 和 9', 9], ['8 和 6', 8],
  ]
  for (const [prompt, answer] of patterns) questions.push({
    prompt, emoji: '🔢', speech: String(prompt), lang: 'zh-CN',
    question: String(prompt).includes('和') ? '哪个数字更大？' : '请找出规律，问号处应该是什么？',
    answers: nearbyNumbers(answer, questions.length, 12, 1), correct: String(answer),
  })
  return questions
}

const additions = {
  chinese: Object.fromEntries(ages.map((group) => [group, characterQuestions(group)])),
  math: Object.fromEntries(ages.map((group) => [group, mathQuestions(group)])),
  english: Object.fromEntries(ages.map((group) => [group, englishQuestions(group)])),
}

for (const subject of Object.keys(additions)) {
  for (const group of ages) {
    const bank = additions[subject][group]
    if (bank.length !== 38) throw new Error(subject + ' ' + group + ' has ' + bank.length + ' additions, expected 38')
    if (new Set(bank.map((question) => question.prompt)).size !== bank.length) throw new Error(subject + ' ' + group + ' contains duplicate prompts')
    if (bank.some((question) => question.answers.length !== 3 || new Set(question.answers).size !== 3 || !question.answers.includes(question.correct))) {
      throw new Error(subject + ' ' + group + ' contains invalid answer choices')
    }
  }
}

const tsSource = [
  "import type { AgeGroup, Question, SubjectId } from '../types/domain'",
  '',
  'export const questionBankAdditions: Record<SubjectId, Record<AgeGroup, Question[]>> = ' + JSON.stringify(additions, null, 2) + ';',
  '',
].join('\n')
writeFileSync(path.join(root, 'src/data/questionBankAdditions.ts'), tsSource, 'utf8')

const questions = []
const options = []
for (const [subject, byAge] of Object.entries(additions)) {
  for (const [group, bank] of Object.entries(byAge)) {
    for (const question of bank) {
      const difficulty = group === '3-4' ? 1 : 2
      questions.push([subject, group, question.prompt, question.emoji, question.question, question.speech, question.lang || 'zh-CN', difficulty, 2])
      question.answers.forEach((answer, index) => options.push([subject, group, question.prompt, question.emoji, answer, index + 1, answer === question.correct]))
    }
  }
}
const sql = (value) => "'" + String(value).replaceAll("'", "''") + "'"
const questionRows = questions.map((row) => '  (' + row.map((value, index) => index === 7 || index === 8 ? String(value) : sql(value)).join(', ') + ')').join(',\n')
const optionRows = options.map((row) => '  (' + [...row.slice(0, 5).map(sql), String(row[5]), String(row[6])].join(', ') + ')').join(',\n')
const sqlSource = [
  '-- Adds 38 new questions per subject and age group. Safe to run again.',
  '-- Existing starter questions are kept; together they give 50 questions per age group.',
  'begin;',
  'create unique index if not exists questions_seed_identity_idx',
  '  on public.questions (subject, age_group, prompt, emoji, content_version);',
  'create unique index if not exists question_options_seed_order_idx',
  '  on public.question_options (question_id, sort_order);',
  '',
  'with question_data(subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version) as (',
  '  values', questionRows,
  '), upserted_questions as (',
  '  insert into public.questions (subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version)',
  '  select subject, age_group, prompt, emoji, question_text, speech_text, speech_language, difficulty, content_version from question_data',
  '  on conflict (subject, age_group, prompt, emoji, content_version) do update set',
  '    question_text = excluded.question_text, speech_text = excluded.speech_text,',
  '    speech_language = excluded.speech_language, difficulty = excluded.difficulty, is_active = true',
  '  returning id, subject, age_group, prompt, emoji',
  '), option_data(subject, age_group, prompt, emoji, option_text, sort_order, is_correct) as (',
  '  values', optionRows,
  '), upserted_options as (',
  '  insert into public.question_options (question_id, option_text, sort_order, is_correct)',
  '  select q.id, o.option_text, o.sort_order, o.is_correct',
  '  from upserted_questions q join option_data o using (subject, age_group, prompt, emoji)',
  '  on conflict (question_id, sort_order) do update set option_text = excluded.option_text, is_correct = excluded.is_correct',
  '  returning question_id',
  ')',
  'select count(distinct question_id) as questions_updated from upserted_options;',
  'commit;',
  '',
].join('\n')
writeFileSync(path.join(root, 'supabase/add_question_bank_100.sql'), sqlSource, 'utf8')
console.log('Generated 50 questions per subject and age group (300 total).')

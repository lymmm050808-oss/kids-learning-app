export type KnowledgeSubject = 'chinese' | 'math' | 'english'
export type KnowledgeAgeGroup = '3-4' | '5-6'

export interface KnowledgeChunk {
  id: string
  subject: KnowledgeSubject
  ageGroup: KnowledgeAgeGroup
  title: string
  content: string
  keywords: string[]
  sourceTitle: string
  sourceUrl: string
}

// Curated summaries of public early-learning guidance. These are paraphrases,
// not copied passages; each card links back to its original source.
export const learningKnowledge: KnowledgeChunk[] = [
  {
    id: 'chinese-3-4-storytime',
    subject: 'chinese',
    ageGroup: '3-4',
    title: '从孩子喜欢的绘本开始共读',
    content: '让孩子挑选感兴趣的图画书，一起看图、聊天、讲故事。把阅读放进温暖的亲子互动里，不必把认字或背诵当作每次阅读的任务。',
    keywords: ['看书', '喜欢看书', '绘本', '阅读', '亲子共读', '讲故事', '认字', '语文'],
    sourceTitle: '教育部：3—6岁儿童学习与发展指南问答',
    sourceUrl: 'https://www.moe.gov.cn/jyb_xwfb/s271/201210/t20121015_143257.html?authkey=boxdr3',
  },
  {
    id: 'chinese-5-6-language',
    subject: 'chinese',
    ageGroup: '5-6',
    title: '在故事和日常对话里发展表达',
    content: '读完故事后，可以请孩子说说喜欢哪个角色、接下来可能发生什么，也可以一起描述身边的事物。多听、多说、轮流交流，比单纯增加练习量更适合启蒙阶段。',
    keywords: ['表达', '讲故事', '阅读理解', '词语', '说话', '对话', '语文', '故事'],
    sourceTitle: '教育部：3—6岁儿童学习与发展指南问答',
    sourceUrl: 'https://www.moe.gov.cn/jyb_xwfb/s271/201210/t20121015_143257.html?authkey=boxdr3',
  },
  {
    id: 'math-3-4-everyday',
    subject: 'math',
    ageGroup: '3-4',
    title: '把数数和比较放进生活游戏',
    content: '收玩具、摆餐具或散步时，可以一起数一数、找一找“哪个更多”“哪个更大”。用真实物品和轻松游戏建立数量与比较的初步经验。',
    keywords: ['数学', '数数', '数量', '比较', '更多', '更少', '大小', '生活', '游戏'],
    sourceTitle: '教育部：3—6岁儿童学习与发展指南问答',
    sourceUrl: 'https://www.moe.gov.cn/jyb_xwfb/s271/201210/t20121015_143257.html?authkey=boxdr3',
  },
  {
    id: 'math-5-6-patterns',
    subject: 'math',
    ageGroup: '5-6',
    title: '用分类和规律游戏培养数学兴趣',
    content: '把积木、纽扣或水果按颜色、形状、大小分类，再试着排出红蓝红蓝这样的规律。请孩子说说自己的发现，让数学从观察和解决小问题中发生。',
    keywords: ['数学', '分类', '规律', '图形', '颜色', '积木', '逻辑', '数感', '游戏'],
    sourceTitle: '教育部：3—6岁儿童学习与发展指南问答',
    sourceUrl: 'https://www.moe.gov.cn/jyb_xwfb/s271/201210/t20121015_143257.html?authkey=boxdr3',
  },
  {
    id: 'english-3-4-play',
    subject: 'english',
    ageGroup: '3-4',
    title: '用歌曲、动作和图片接触英语',
    content: '可以在亲子游戏中加入一两句简单英语，配上动作、实物或图片；孩子愿意听、愿意参与就很好，不必要求马上开口或背单词。',
    keywords: ['英语', '英文', '启蒙', '歌曲', '儿歌', '动作', '单词', '开口', '游戏'],
    sourceTitle: 'NAEYC：双语幼儿的教育原则',
    sourceUrl: 'https://www.naeyc.org/node/3796',
  },
  {
    id: 'english-5-6-routines',
    subject: 'english',
    ageGroup: '5-6',
    title: '借助熟悉情境积累英语词汇',
    content: '围绕孩子熟悉的玩具、食物、天气或绘本，反复听到并使用少量有意义的英语词句。允许孩子先听和理解，也尊重家庭常用语言。',
    keywords: ['英语', '英文', '词汇', '绘本', '日常', '听力', '双语', '家庭语言', '表达'],
    sourceTitle: 'NAEYC：双语幼儿的教育原则',
    sourceUrl: 'https://www.naeyc.org/node/3796',
  },
]

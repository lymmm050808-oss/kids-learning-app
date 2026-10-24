import type { AgeGroup, Question, SubjectId } from '../types/domain'

export const questionBankAdditions: Record<SubjectId, Record<AgeGroup, Question[]>> = {
  "chinese": {
    "3-4": [
      {
        "prompt": "一",
        "emoji": "1️⃣",
        "speech": "一",
        "lang": "zh-CN",
        "question": "请找到“一”字",
        "answers": [
          "一",
          "二",
          "中"
        ],
        "correct": "一"
      },
      {
        "prompt": "二",
        "emoji": "2️⃣",
        "speech": "二",
        "lang": "zh-CN",
        "question": "请找到“二”字",
        "answers": [
          "三",
          "二",
          "天"
        ],
        "correct": "二"
      },
      {
        "prompt": "三",
        "emoji": "3️⃣",
        "speech": "三",
        "lang": "zh-CN",
        "question": "请找到“三”字",
        "answers": [
          "大",
          "米",
          "三"
        ],
        "correct": "三"
      },
      {
        "prompt": "大",
        "emoji": "🐘",
        "speech": "大",
        "lang": "zh-CN",
        "question": "请找到“大”字",
        "answers": [
          "大",
          "小",
          "花"
        ],
        "correct": "大"
      },
      {
        "prompt": "小",
        "emoji": "🐭",
        "speech": "小",
        "lang": "zh-CN",
        "question": "请找到“小”字",
        "answers": [
          "上",
          "小",
          "草"
        ],
        "correct": "小"
      },
      {
        "prompt": "上",
        "emoji": "⬆️",
        "speech": "上",
        "lang": "zh-CN",
        "question": "请找到“上”字",
        "answers": [
          "下",
          "鱼",
          "上"
        ],
        "correct": "上"
      },
      {
        "prompt": "下",
        "emoji": "⬇️",
        "speech": "下",
        "lang": "zh-CN",
        "question": "请找到“下”字",
        "answers": [
          "下",
          "中",
          "鸟"
        ],
        "correct": "下"
      },
      {
        "prompt": "中",
        "emoji": "🎯",
        "speech": "中",
        "lang": "zh-CN",
        "question": "请找到“中”字",
        "answers": [
          "天",
          "中",
          "车"
        ],
        "correct": "中"
      },
      {
        "prompt": "天",
        "emoji": "🌤️",
        "speech": "天",
        "lang": "zh-CN",
        "question": "请找到“天”字",
        "answers": [
          "米",
          "门",
          "天"
        ],
        "correct": "天"
      },
      {
        "prompt": "米",
        "emoji": "🍚",
        "speech": "米",
        "lang": "zh-CN",
        "question": "请找到“米”字",
        "answers": [
          "米",
          "花",
          "田"
        ],
        "correct": "米"
      },
      {
        "prompt": "花",
        "emoji": "🌼",
        "speech": "花",
        "lang": "zh-CN",
        "question": "请找到“花”字",
        "answers": [
          "草",
          "花",
          "土"
        ],
        "correct": "花"
      },
      {
        "prompt": "草",
        "emoji": "🌱",
        "speech": "草",
        "lang": "zh-CN",
        "question": "请找到“草”字",
        "answers": [
          "鱼",
          "石",
          "草"
        ],
        "correct": "草"
      },
      {
        "prompt": "鱼",
        "emoji": "🐟",
        "speech": "鱼",
        "lang": "zh-CN",
        "question": "请找到“鱼”字",
        "answers": [
          "鱼",
          "鸟",
          "牛"
        ],
        "correct": "鱼"
      },
      {
        "prompt": "鸟",
        "emoji": "🐦",
        "speech": "鸟",
        "lang": "zh-CN",
        "question": "请找到“鸟”字",
        "answers": [
          "车",
          "鸟",
          "羊"
        ],
        "correct": "鸟"
      },
      {
        "prompt": "车",
        "emoji": "🚗",
        "speech": "车",
        "lang": "zh-CN",
        "question": "请找到“车”字",
        "answers": [
          "门",
          "马",
          "车"
        ],
        "correct": "车"
      },
      {
        "prompt": "门",
        "emoji": "🚪",
        "speech": "门",
        "lang": "zh-CN",
        "question": "请找到“门”字",
        "answers": [
          "门",
          "田",
          "狗"
        ],
        "correct": "门"
      },
      {
        "prompt": "田",
        "emoji": "🌾",
        "speech": "田",
        "lang": "zh-CN",
        "question": "请找到“田”字",
        "answers": [
          "土",
          "田",
          "猫"
        ],
        "correct": "田"
      },
      {
        "prompt": "土",
        "emoji": "🪴",
        "speech": "土",
        "lang": "zh-CN",
        "question": "请找到“土”字",
        "answers": [
          "石",
          "兔",
          "土"
        ],
        "correct": "土"
      },
      {
        "prompt": "石",
        "emoji": "🪨",
        "speech": "石",
        "lang": "zh-CN",
        "question": "请找到“石”字",
        "answers": [
          "石",
          "牛",
          "竹"
        ],
        "correct": "石"
      },
      {
        "prompt": "牛",
        "emoji": "🐮",
        "speech": "牛",
        "lang": "zh-CN",
        "question": "请找到“牛”字",
        "answers": [
          "羊",
          "牛",
          "叶"
        ],
        "correct": "牛"
      },
      {
        "prompt": "羊",
        "emoji": "🐑",
        "speech": "羊",
        "lang": "zh-CN",
        "question": "请找到“羊”字",
        "answers": [
          "马",
          "雨",
          "羊"
        ],
        "correct": "羊"
      },
      {
        "prompt": "马",
        "emoji": "🐴",
        "speech": "马",
        "lang": "zh-CN",
        "question": "请找到“马”字",
        "answers": [
          "马",
          "狗",
          "星"
        ],
        "correct": "马"
      },
      {
        "prompt": "狗",
        "emoji": "🐶",
        "speech": "狗",
        "lang": "zh-CN",
        "question": "请找到“狗”字",
        "answers": [
          "猫",
          "狗",
          "头"
        ],
        "correct": "狗"
      },
      {
        "prompt": "猫",
        "emoji": "🐱",
        "speech": "猫",
        "lang": "zh-CN",
        "question": "请找到“猫”字",
        "answers": [
          "兔",
          "目",
          "猫"
        ],
        "correct": "猫"
      },
      {
        "prompt": "兔",
        "emoji": "🐰",
        "speech": "兔",
        "lang": "zh-CN",
        "question": "请找到“兔”字",
        "answers": [
          "兔",
          "竹",
          "耳"
        ],
        "correct": "兔"
      },
      {
        "prompt": "竹",
        "emoji": "🎋",
        "speech": "竹",
        "lang": "zh-CN",
        "question": "请找到“竹”字",
        "answers": [
          "叶",
          "竹",
          "足"
        ],
        "correct": "竹"
      },
      {
        "prompt": "叶",
        "emoji": "🍃",
        "speech": "叶",
        "lang": "zh-CN",
        "question": "请找到“叶”字",
        "answers": [
          "雨",
          "女",
          "叶"
        ],
        "correct": "叶"
      },
      {
        "prompt": "雨",
        "emoji": "🌧️",
        "speech": "雨",
        "lang": "zh-CN",
        "question": "请找到“雨”字",
        "answers": [
          "雨",
          "星",
          "男"
        ],
        "correct": "雨"
      },
      {
        "prompt": "星",
        "emoji": "⭐",
        "speech": "星",
        "lang": "zh-CN",
        "question": "请找到“星”字",
        "answers": [
          "头",
          "星",
          "红"
        ],
        "correct": "星"
      },
      {
        "prompt": "头",
        "emoji": "🙂",
        "speech": "头",
        "lang": "zh-CN",
        "question": "请找到“头”字",
        "answers": [
          "目",
          "白",
          "头"
        ],
        "correct": "头"
      },
      {
        "prompt": "目",
        "emoji": "👀",
        "speech": "目",
        "lang": "zh-CN",
        "question": "请找到“目”字",
        "answers": [
          "目",
          "耳",
          "多"
        ],
        "correct": "目"
      },
      {
        "prompt": "耳",
        "emoji": "👂",
        "speech": "耳",
        "lang": "zh-CN",
        "question": "请找到“耳”字",
        "answers": [
          "足",
          "耳",
          "一"
        ],
        "correct": "耳"
      },
      {
        "prompt": "足",
        "emoji": "🦶",
        "speech": "足",
        "lang": "zh-CN",
        "question": "请找到“足”字",
        "answers": [
          "女",
          "二",
          "足"
        ],
        "correct": "足"
      },
      {
        "prompt": "女",
        "emoji": "👧",
        "speech": "女",
        "lang": "zh-CN",
        "question": "请找到“女”字",
        "answers": [
          "女",
          "男",
          "三"
        ],
        "correct": "女"
      },
      {
        "prompt": "男",
        "emoji": "👦",
        "speech": "男",
        "lang": "zh-CN",
        "question": "请找到“男”字",
        "answers": [
          "红",
          "男",
          "大"
        ],
        "correct": "男"
      },
      {
        "prompt": "红",
        "emoji": "🔴",
        "speech": "红",
        "lang": "zh-CN",
        "question": "请找到“红”字",
        "answers": [
          "白",
          "小",
          "红"
        ],
        "correct": "红"
      },
      {
        "prompt": "白",
        "emoji": "⚪",
        "speech": "白",
        "lang": "zh-CN",
        "question": "请找到“白”字",
        "answers": [
          "白",
          "多",
          "上"
        ],
        "correct": "白"
      },
      {
        "prompt": "多",
        "emoji": "🎈🎈",
        "speech": "多",
        "lang": "zh-CN",
        "question": "请找到“多”字",
        "answers": [
          "一",
          "多",
          "下"
        ],
        "correct": "多"
      }
    ],
    "5-6": [
      {
        "prompt": "春",
        "emoji": "🌷",
        "speech": "春",
        "lang": "zh-CN",
        "question": "请找到“春”字",
        "answers": [
          "春",
          "夏",
          "电"
        ],
        "correct": "春"
      },
      {
        "prompt": "夏",
        "emoji": "🍉",
        "speech": "夏",
        "lang": "zh-CN",
        "question": "请找到“夏”字",
        "answers": [
          "秋",
          "夏",
          "河"
        ],
        "correct": "夏"
      },
      {
        "prompt": "秋",
        "emoji": "🍂",
        "speech": "秋",
        "lang": "zh-CN",
        "question": "请找到“秋”字",
        "answers": [
          "冬",
          "海",
          "秋"
        ],
        "correct": "秋"
      },
      {
        "prompt": "冬",
        "emoji": "❄️",
        "speech": "冬",
        "lang": "zh-CN",
        "question": "请找到“冬”字",
        "answers": [
          "冬",
          "风",
          "江"
        ],
        "correct": "冬"
      },
      {
        "prompt": "风",
        "emoji": "💨",
        "speech": "风",
        "lang": "zh-CN",
        "question": "请找到“风”字",
        "answers": [
          "雪",
          "风",
          "湖"
        ],
        "correct": "风"
      },
      {
        "prompt": "雪",
        "emoji": "⛄",
        "speech": "雪",
        "lang": "zh-CN",
        "question": "请找到“雪”字",
        "answers": [
          "雷",
          "树",
          "雪"
        ],
        "correct": "雪"
      },
      {
        "prompt": "雷",
        "emoji": "🌩️",
        "speech": "雷",
        "lang": "zh-CN",
        "question": "请找到“雷”字",
        "answers": [
          "雷",
          "电",
          "林"
        ],
        "correct": "雷"
      },
      {
        "prompt": "电",
        "emoji": "⚡",
        "speech": "电",
        "lang": "zh-CN",
        "question": "请找到“电”字",
        "answers": [
          "河",
          "电",
          "森"
        ],
        "correct": "电"
      },
      {
        "prompt": "河",
        "emoji": "🏞️",
        "speech": "河",
        "lang": "zh-CN",
        "question": "请找到“河”字",
        "answers": [
          "海",
          "路",
          "河"
        ],
        "correct": "河"
      },
      {
        "prompt": "海",
        "emoji": "🌊",
        "speech": "海",
        "lang": "zh-CN",
        "question": "请找到“海”字",
        "answers": [
          "海",
          "江",
          "桥"
        ],
        "correct": "海"
      },
      {
        "prompt": "江",
        "emoji": "⛵",
        "speech": "江",
        "lang": "zh-CN",
        "question": "请找到“江”字",
        "answers": [
          "湖",
          "江",
          "船"
        ],
        "correct": "江"
      },
      {
        "prompt": "湖",
        "emoji": "🦆",
        "speech": "湖",
        "lang": "zh-CN",
        "question": "请找到“湖”字",
        "answers": [
          "树",
          "飞",
          "湖"
        ],
        "correct": "湖"
      },
      {
        "prompt": "树",
        "emoji": "🌳",
        "speech": "树",
        "lang": "zh-CN",
        "question": "请找到“树”字",
        "answers": [
          "树",
          "林",
          "走"
        ],
        "correct": "树"
      },
      {
        "prompt": "林",
        "emoji": "🌲🌲",
        "speech": "林",
        "lang": "zh-CN",
        "question": "请找到“林”字",
        "answers": [
          "森",
          "林",
          "跑"
        ],
        "correct": "林"
      },
      {
        "prompt": "森",
        "emoji": "🌲🌲🌲",
        "speech": "森",
        "lang": "zh-CN",
        "question": "请找到“森”字",
        "answers": [
          "路",
          "跳",
          "森"
        ],
        "correct": "森"
      },
      {
        "prompt": "路",
        "emoji": "🛣️",
        "speech": "路",
        "lang": "zh-CN",
        "question": "请找到“路”字",
        "answers": [
          "路",
          "桥",
          "唱"
        ],
        "correct": "路"
      },
      {
        "prompt": "桥",
        "emoji": "🌉",
        "speech": "桥",
        "lang": "zh-CN",
        "question": "请找到“桥”字",
        "answers": [
          "船",
          "桥",
          "读"
        ],
        "correct": "桥"
      },
      {
        "prompt": "船",
        "emoji": "🚢",
        "speech": "船",
        "lang": "zh-CN",
        "question": "请找到“船”字",
        "answers": [
          "飞",
          "写",
          "船"
        ],
        "correct": "船"
      },
      {
        "prompt": "飞",
        "emoji": "🕊️",
        "speech": "飞",
        "lang": "zh-CN",
        "question": "请找到“飞”字",
        "answers": [
          "飞",
          "走",
          "画"
        ],
        "correct": "飞"
      },
      {
        "prompt": "走",
        "emoji": "🚶",
        "speech": "走",
        "lang": "zh-CN",
        "question": "请找到“走”字",
        "answers": [
          "跑",
          "走",
          "笑"
        ],
        "correct": "走"
      },
      {
        "prompt": "跑",
        "emoji": "🏃",
        "speech": "跑",
        "lang": "zh-CN",
        "question": "请找到“跑”字",
        "answers": [
          "跳",
          "哭",
          "跑"
        ],
        "correct": "跑"
      },
      {
        "prompt": "跳",
        "emoji": "🤸",
        "speech": "跳",
        "lang": "zh-CN",
        "question": "请找到“跳”字",
        "answers": [
          "跳",
          "唱",
          "早"
        ],
        "correct": "跳"
      },
      {
        "prompt": "唱",
        "emoji": "🎤",
        "speech": "唱",
        "lang": "zh-CN",
        "question": "请找到“唱”字",
        "answers": [
          "读",
          "唱",
          "晚"
        ],
        "correct": "唱"
      },
      {
        "prompt": "读",
        "emoji": "📖",
        "speech": "读",
        "lang": "zh-CN",
        "question": "请找到“读”字",
        "answers": [
          "写",
          "东",
          "读"
        ],
        "correct": "读"
      },
      {
        "prompt": "写",
        "emoji": "✍️",
        "speech": "写",
        "lang": "zh-CN",
        "question": "请找到“写”字",
        "answers": [
          "写",
          "画",
          "南"
        ],
        "correct": "写"
      },
      {
        "prompt": "画",
        "emoji": "🎨",
        "speech": "画",
        "lang": "zh-CN",
        "question": "请找到“画”字",
        "answers": [
          "笑",
          "画",
          "西"
        ],
        "correct": "画"
      },
      {
        "prompt": "笑",
        "emoji": "😄",
        "speech": "笑",
        "lang": "zh-CN",
        "question": "请找到“笑”字",
        "answers": [
          "哭",
          "北",
          "笑"
        ],
        "correct": "笑"
      },
      {
        "prompt": "哭",
        "emoji": "😢",
        "speech": "哭",
        "lang": "zh-CN",
        "question": "请找到“哭”字",
        "answers": [
          "哭",
          "早",
          "前"
        ],
        "correct": "哭"
      },
      {
        "prompt": "早",
        "emoji": "🌅",
        "speech": "早",
        "lang": "zh-CN",
        "question": "请找到“早”字",
        "answers": [
          "晚",
          "早",
          "后"
        ],
        "correct": "早"
      },
      {
        "prompt": "晚",
        "emoji": "🌙",
        "speech": "晚",
        "lang": "zh-CN",
        "question": "请找到“晚”字",
        "answers": [
          "东",
          "开",
          "晚"
        ],
        "correct": "晚"
      },
      {
        "prompt": "东",
        "emoji": "🧭",
        "speech": "东",
        "lang": "zh-CN",
        "question": "请找到“东”字",
        "answers": [
          "东",
          "南",
          "关"
        ],
        "correct": "东"
      },
      {
        "prompt": "南",
        "emoji": "🧭",
        "speech": "南",
        "lang": "zh-CN",
        "question": "请找到“南”字",
        "answers": [
          "西",
          "南",
          "春"
        ],
        "correct": "南"
      },
      {
        "prompt": "西",
        "emoji": "🧭",
        "speech": "西",
        "lang": "zh-CN",
        "question": "请找到“西”字",
        "answers": [
          "北",
          "夏",
          "西"
        ],
        "correct": "西"
      },
      {
        "prompt": "北",
        "emoji": "🧭",
        "speech": "北",
        "lang": "zh-CN",
        "question": "请找到“北”字",
        "answers": [
          "北",
          "前",
          "秋"
        ],
        "correct": "北"
      },
      {
        "prompt": "前",
        "emoji": "➡️",
        "speech": "前",
        "lang": "zh-CN",
        "question": "请找到“前”字",
        "answers": [
          "后",
          "前",
          "冬"
        ],
        "correct": "前"
      },
      {
        "prompt": "后",
        "emoji": "⬅️",
        "speech": "后",
        "lang": "zh-CN",
        "question": "请找到“后”字",
        "answers": [
          "开",
          "风",
          "后"
        ],
        "correct": "后"
      },
      {
        "prompt": "开",
        "emoji": "🔓",
        "speech": "开",
        "lang": "zh-CN",
        "question": "请找到“开”字",
        "answers": [
          "开",
          "关",
          "雪"
        ],
        "correct": "开"
      },
      {
        "prompt": "关",
        "emoji": "🔒",
        "speech": "关",
        "lang": "zh-CN",
        "question": "请找到“关”字",
        "answers": [
          "春",
          "关",
          "雷"
        ],
        "correct": "关"
      }
    ]
  },
  "math": {
    "3-4": [
      {
        "prompt": "1 只小鸡",
        "emoji": "🐥",
        "speech": "数一数，有几个只小鸡",
        "lang": "zh-CN",
        "question": "数一数，有几个只小鸡？",
        "answers": [
          "1",
          "2",
          "3"
        ],
        "correct": "1"
      },
      {
        "prompt": "1 个气球",
        "emoji": "🎈",
        "speech": "数一数，有几个个气球",
        "lang": "zh-CN",
        "question": "数一数，有几个个气球？",
        "answers": [
          "2",
          "1",
          "3"
        ],
        "correct": "1"
      },
      {
        "prompt": "1 条小鱼",
        "emoji": "🐟",
        "speech": "数一数，有几个条小鱼",
        "lang": "zh-CN",
        "question": "数一数，有几个条小鱼？",
        "answers": [
          "2",
          "3",
          "1"
        ],
        "correct": "1"
      },
      {
        "prompt": "1 颗草莓",
        "emoji": "🍓",
        "speech": "数一数，有几个颗草莓",
        "lang": "zh-CN",
        "question": "数一数，有几个颗草莓？",
        "answers": [
          "1",
          "2",
          "3"
        ],
        "correct": "1"
      },
      {
        "prompt": "1 朵小花",
        "emoji": "🌼",
        "speech": "数一数，有几个朵小花",
        "lang": "zh-CN",
        "question": "数一数，有几个朵小花？",
        "answers": [
          "2",
          "1",
          "3"
        ],
        "correct": "1"
      },
      {
        "prompt": "2 只小鸡",
        "emoji": "🐥🐥",
        "speech": "数一数，有几个只小鸡",
        "lang": "zh-CN",
        "question": "数一数，有几个只小鸡？",
        "answers": [
          "1",
          "3",
          "2"
        ],
        "correct": "2"
      },
      {
        "prompt": "2 个气球",
        "emoji": "🎈🎈",
        "speech": "数一数，有几个个气球",
        "lang": "zh-CN",
        "question": "数一数，有几个个气球？",
        "answers": [
          "2",
          "1",
          "3"
        ],
        "correct": "2"
      },
      {
        "prompt": "2 条小鱼",
        "emoji": "🐟🐟",
        "speech": "数一数，有几个条小鱼",
        "lang": "zh-CN",
        "question": "数一数，有几个条小鱼？",
        "answers": [
          "1",
          "2",
          "3"
        ],
        "correct": "2"
      },
      {
        "prompt": "2 颗草莓",
        "emoji": "🍓🍓",
        "speech": "数一数，有几个颗草莓",
        "lang": "zh-CN",
        "question": "数一数，有几个颗草莓？",
        "answers": [
          "1",
          "3",
          "2"
        ],
        "correct": "2"
      },
      {
        "prompt": "2 朵小花",
        "emoji": "🌼🌼",
        "speech": "数一数，有几个朵小花",
        "lang": "zh-CN",
        "question": "数一数，有几个朵小花？",
        "answers": [
          "2",
          "1",
          "3"
        ],
        "correct": "2"
      },
      {
        "prompt": "3 只小鸡",
        "emoji": "🐥🐥🐥",
        "speech": "数一数，有几个只小鸡",
        "lang": "zh-CN",
        "question": "数一数，有几个只小鸡？",
        "answers": [
          "2",
          "3",
          "4"
        ],
        "correct": "3"
      },
      {
        "prompt": "3 个气球",
        "emoji": "🎈🎈🎈",
        "speech": "数一数，有几个个气球",
        "lang": "zh-CN",
        "question": "数一数，有几个个气球？",
        "answers": [
          "2",
          "4",
          "3"
        ],
        "correct": "3"
      },
      {
        "prompt": "3 条小鱼",
        "emoji": "🐟🐟🐟",
        "speech": "数一数，有几个条小鱼",
        "lang": "zh-CN",
        "question": "数一数，有几个条小鱼？",
        "answers": [
          "3",
          "2",
          "4"
        ],
        "correct": "3"
      },
      {
        "prompt": "3 颗草莓",
        "emoji": "🍓🍓🍓",
        "speech": "数一数，有几个颗草莓",
        "lang": "zh-CN",
        "question": "数一数，有几个颗草莓？",
        "answers": [
          "2",
          "3",
          "4"
        ],
        "correct": "3"
      },
      {
        "prompt": "3 朵小花",
        "emoji": "🌼🌼🌼",
        "speech": "数一数，有几个朵小花",
        "lang": "zh-CN",
        "question": "数一数，有几个朵小花？",
        "answers": [
          "2",
          "4",
          "3"
        ],
        "correct": "3"
      },
      {
        "prompt": "4 只小鸡",
        "emoji": "🐥🐥🐥🐥",
        "speech": "数一数，有几个只小鸡",
        "lang": "zh-CN",
        "question": "数一数，有几个只小鸡？",
        "answers": [
          "4",
          "3",
          "5"
        ],
        "correct": "4"
      },
      {
        "prompt": "4 个气球",
        "emoji": "🎈🎈🎈🎈",
        "speech": "数一数，有几个个气球",
        "lang": "zh-CN",
        "question": "数一数，有几个个气球？",
        "answers": [
          "3",
          "4",
          "5"
        ],
        "correct": "4"
      },
      {
        "prompt": "4 条小鱼",
        "emoji": "🐟🐟🐟🐟",
        "speech": "数一数，有几个条小鱼",
        "lang": "zh-CN",
        "question": "数一数，有几个条小鱼？",
        "answers": [
          "3",
          "5",
          "4"
        ],
        "correct": "4"
      },
      {
        "prompt": "4 颗草莓",
        "emoji": "🍓🍓🍓🍓",
        "speech": "数一数，有几个颗草莓",
        "lang": "zh-CN",
        "question": "数一数，有几个颗草莓？",
        "answers": [
          "4",
          "3",
          "5"
        ],
        "correct": "4"
      },
      {
        "prompt": "4 朵小花",
        "emoji": "🌼🌼🌼🌼",
        "speech": "数一数，有几个朵小花",
        "lang": "zh-CN",
        "question": "数一数，有几个朵小花？",
        "answers": [
          "3",
          "4",
          "5"
        ],
        "correct": "4"
      },
      {
        "prompt": "5 只小鸡",
        "emoji": "🐥🐥🐥🐥🐥",
        "speech": "数一数，有几个只小鸡",
        "lang": "zh-CN",
        "question": "数一数，有几个只小鸡？",
        "answers": [
          "4",
          "3",
          "5"
        ],
        "correct": "5"
      },
      {
        "prompt": "5 个气球",
        "emoji": "🎈🎈🎈🎈🎈",
        "speech": "数一数，有几个个气球",
        "lang": "zh-CN",
        "question": "数一数，有几个个气球？",
        "answers": [
          "5",
          "4",
          "3"
        ],
        "correct": "5"
      },
      {
        "prompt": "5 条小鱼",
        "emoji": "🐟🐟🐟🐟🐟",
        "speech": "数一数，有几个条小鱼",
        "lang": "zh-CN",
        "question": "数一数，有几个条小鱼？",
        "answers": [
          "4",
          "5",
          "3"
        ],
        "correct": "5"
      },
      {
        "prompt": "5 颗草莓",
        "emoji": "🍓🍓🍓🍓🍓",
        "speech": "数一数，有几个颗草莓",
        "lang": "zh-CN",
        "question": "数一数，有几个颗草莓？",
        "answers": [
          "4",
          "3",
          "5"
        ],
        "correct": "5"
      },
      {
        "prompt": "5 朵小花",
        "emoji": "🌼🌼🌼🌼🌼",
        "speech": "数一数，有几个朵小花",
        "lang": "zh-CN",
        "question": "数一数，有几个朵小花？",
        "answers": [
          "5",
          "4",
          "3"
        ],
        "correct": "5"
      },
      {
        "prompt": "1 + 4",
        "emoji": "🍎 ＋ 🍓🍓🍓🍓",
        "speech": "一加四",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "4",
          "5",
          "6"
        ],
        "correct": "5"
      },
      {
        "prompt": "3 + 2",
        "emoji": "⭐⭐⭐ ＋ 🌙🌙",
        "speech": "三加二",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "4",
          "6",
          "5"
        ],
        "correct": "5"
      },
      {
        "prompt": "2 + 4",
        "emoji": "🐟🐟 ＋ 🐢🐢🐢🐢",
        "speech": "二加四",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "6",
          "5",
          "7"
        ],
        "correct": "6"
      },
      {
        "prompt": "1 + ? = 3",
        "emoji": "🍎🍎🍎",
        "speech": "几加二等于三",
        "lang": "zh-CN",
        "question": "空格里应该填几？",
        "answers": [
          "2",
          "1",
          "3"
        ],
        "correct": "1"
      },
      {
        "prompt": "2 + ? = 5",
        "emoji": "⭐ ⭐ ⭐ ⭐ ⭐",
        "speech": "几加三等于五",
        "lang": "zh-CN",
        "question": "空格里应该填几？",
        "answers": [
          "1",
          "3",
          "2"
        ],
        "correct": "2"
      },
      {
        "prompt": "? + 1 = 4",
        "emoji": "🐥🐥🐥🐥",
        "speech": "几加一等于四",
        "lang": "zh-CN",
        "question": "空格里应该填几？",
        "answers": [
          "3",
          "2",
          "4"
        ],
        "correct": "3"
      },
      {
        "prompt": "? + 2 = 5",
        "emoji": "🎈🎈🎈🎈🎈",
        "speech": "几加二等于五",
        "lang": "zh-CN",
        "question": "空格里应该填几？",
        "answers": [
          "2",
          "3",
          "4"
        ],
        "correct": "3"
      },
      {
        "prompt": "? + 3 = 5",
        "emoji": "🍐🍐🍐🍐🍐",
        "speech": "几加三等于五",
        "lang": "zh-CN",
        "question": "空格里应该填几？",
        "answers": [
          "1",
          "3",
          "2"
        ],
        "correct": "2"
      },
      {
        "prompt": "比一比：1 和 2",
        "emoji": "🍎  |  🍐🍐",
        "speech": "比一比，哪一组更多",
        "lang": "zh-CN",
        "question": "哪一组更多？",
        "answers": [
          "第二组",
          "第一组",
          "一样多"
        ],
        "correct": "第二组"
      },
      {
        "prompt": "比一比：3 和 2",
        "emoji": "⭐⭐⭐  |  🌙🌙",
        "speech": "比一比，哪一组更多",
        "lang": "zh-CN",
        "question": "哪一组更多？",
        "answers": [
          "第二组",
          "第一组",
          "一样多"
        ],
        "correct": "第一组"
      },
      {
        "prompt": "比一比：2 和 2",
        "emoji": "🐟🐟  |  🐢🐢",
        "speech": "比一比，哪一组更多",
        "lang": "zh-CN",
        "question": "哪一组更多？",
        "answers": [
          "第一组",
          "第二组",
          "一样多"
        ],
        "correct": "一样多"
      },
      {
        "prompt": "比一比：4 和 1",
        "emoji": "🌼🌼🌼🌼  |  🌻",
        "speech": "比一比，哪一组更多",
        "lang": "zh-CN",
        "question": "哪一组更多？",
        "answers": [
          "第一组",
          "第二组",
          "一样多"
        ],
        "correct": "第一组"
      },
      {
        "prompt": "比一比：3 和 5",
        "emoji": "🎈🎈🎈  |  🪁🪁🪁🪁🪁",
        "speech": "比一比，哪一组更多",
        "lang": "zh-CN",
        "question": "哪一组更多？",
        "answers": [
          "第一组",
          "第二组",
          "一样多"
        ],
        "correct": "第二组"
      }
    ],
    "5-6": [
      {
        "prompt": "6 颗星星",
        "emoji": "⭐⭐⭐⭐⭐⭐",
        "speech": "数一数，有几个颗星星",
        "lang": "zh-CN",
        "question": "数一数，有几个颗星星？",
        "answers": [
          "6",
          "5",
          "7"
        ],
        "correct": "6"
      },
      {
        "prompt": "6 条小鱼",
        "emoji": "🐟🐟🐟🐟🐟🐟",
        "speech": "数一数，有几个条小鱼",
        "lang": "zh-CN",
        "question": "数一数，有几个条小鱼？",
        "answers": [
          "5",
          "6",
          "7"
        ],
        "correct": "6"
      },
      {
        "prompt": "7 颗星星",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐",
        "speech": "数一数，有几个颗星星",
        "lang": "zh-CN",
        "question": "数一数，有几个颗星星？",
        "answers": [
          "6",
          "8",
          "7"
        ],
        "correct": "7"
      },
      {
        "prompt": "7 条小鱼",
        "emoji": "🐟🐟🐟🐟🐟🐟🐟",
        "speech": "数一数，有几个条小鱼",
        "lang": "zh-CN",
        "question": "数一数，有几个条小鱼？",
        "answers": [
          "7",
          "6",
          "8"
        ],
        "correct": "7"
      },
      {
        "prompt": "8 颗星星",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐⭐",
        "speech": "数一数，有几个颗星星",
        "lang": "zh-CN",
        "question": "数一数，有几个颗星星？",
        "answers": [
          "7",
          "8",
          "9"
        ],
        "correct": "8"
      },
      {
        "prompt": "8 条小鱼",
        "emoji": "🐟🐟🐟🐟🐟🐟🐟🐟",
        "speech": "数一数，有几个条小鱼",
        "lang": "zh-CN",
        "question": "数一数，有几个条小鱼？",
        "answers": [
          "7",
          "9",
          "8"
        ],
        "correct": "8"
      },
      {
        "prompt": "9 颗星星",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐⭐⭐",
        "speech": "数一数，有几个颗星星",
        "lang": "zh-CN",
        "question": "数一数，有几个颗星星？",
        "answers": [
          "9",
          "8",
          "10"
        ],
        "correct": "9"
      },
      {
        "prompt": "9 条小鱼",
        "emoji": "🐟🐟🐟🐟🐟🐟🐟🐟🐟",
        "speech": "数一数，有几个条小鱼",
        "lang": "zh-CN",
        "question": "数一数，有几个条小鱼？",
        "answers": [
          "8",
          "9",
          "10"
        ],
        "correct": "9"
      },
      {
        "prompt": "10 颗星星",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
        "speech": "数一数，有几个颗星星",
        "lang": "zh-CN",
        "question": "数一数，有几个颗星星？",
        "answers": [
          "9",
          "11",
          "10"
        ],
        "correct": "10"
      },
      {
        "prompt": "10 条小鱼",
        "emoji": "🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟",
        "speech": "数一数，有几个条小鱼",
        "lang": "zh-CN",
        "question": "数一数，有几个条小鱼？",
        "answers": [
          "10",
          "9",
          "11"
        ],
        "correct": "10"
      },
      {
        "prompt": "3 + 4",
        "emoji": "🍎🍎🍎 ＋ 🍐🍐🍐🍐",
        "speech": "三加四",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "6",
          "7",
          "8"
        ],
        "correct": "7"
      },
      {
        "prompt": "4 + 3",
        "emoji": "🍎🍎🍎🍎 ＋ 🍐🍐🍐",
        "speech": "四加三",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "6",
          "8",
          "7"
        ],
        "correct": "7"
      },
      {
        "prompt": "2 + 5",
        "emoji": "🍎🍎 ＋ 🍐🍐🍐🍐🍐",
        "speech": "二加五",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "7",
          "6",
          "8"
        ],
        "correct": "7"
      },
      {
        "prompt": "5 + 2",
        "emoji": "🍎🍎🍎🍎🍎 ＋ 🍐🍐",
        "speech": "五加二",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "6",
          "7",
          "8"
        ],
        "correct": "7"
      },
      {
        "prompt": "6 + 2",
        "emoji": "🍎🍎🍎🍎🍎🍎 ＋ 🍐🍐",
        "speech": "六加二",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "7",
          "9",
          "8"
        ],
        "correct": "8"
      },
      {
        "prompt": "2 + 6",
        "emoji": "🍎🍎 ＋ 🍐🍐🍐🍐🍐🍐",
        "speech": "二加六",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "8",
          "7",
          "9"
        ],
        "correct": "8"
      },
      {
        "prompt": "4 + 4",
        "emoji": "🍎🍎🍎🍎 ＋ 🍐🍐🍐🍐",
        "speech": "四加四",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "7",
          "8",
          "9"
        ],
        "correct": "8"
      },
      {
        "prompt": "3 + 5",
        "emoji": "🍎🍎🍎 ＋ 🍐🍐🍐🍐🍐",
        "speech": "三加五",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "7",
          "9",
          "8"
        ],
        "correct": "8"
      },
      {
        "prompt": "5 + 3",
        "emoji": "🍎🍎🍎🍎🍎 ＋ 🍐🍐🍐",
        "speech": "五加三",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "8",
          "7",
          "9"
        ],
        "correct": "8"
      },
      {
        "prompt": "1 + 6",
        "emoji": "🍎 ＋ 🍐🍐🍐🍐🍐🍐",
        "speech": "一加六",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "6",
          "7",
          "8"
        ],
        "correct": "7"
      },
      {
        "prompt": "6 + 1",
        "emoji": "🍎🍎🍎🍎🍎🍎 ＋ 🍐",
        "speech": "六加一",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "6",
          "8",
          "7"
        ],
        "correct": "7"
      },
      {
        "prompt": "2 + 7",
        "emoji": "🍎🍎 ＋ 🍐🍐🍐🍐🍐🍐🍐",
        "speech": "二加七",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "9",
          "8",
          "10"
        ],
        "correct": "9"
      },
      {
        "prompt": "10 - 1",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ － 🌙",
        "speech": "十减一",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "8",
          "9",
          "10"
        ],
        "correct": "9"
      },
      {
        "prompt": "10 - 2",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ － 🌙🌙",
        "speech": "十减二",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "7",
          "9",
          "8"
        ],
        "correct": "8"
      },
      {
        "prompt": "9 - 3",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐⭐⭐ － 🌙🌙🌙",
        "speech": "九减三",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "6",
          "5",
          "7"
        ],
        "correct": "6"
      },
      {
        "prompt": "8 - 4",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐⭐ － 🌙🌙🌙🌙",
        "speech": "八减四",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "3",
          "4",
          "5"
        ],
        "correct": "4"
      },
      {
        "prompt": "7 - 2",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐ － 🌙🌙",
        "speech": "七减二",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "4",
          "6",
          "5"
        ],
        "correct": "5"
      },
      {
        "prompt": "6 - 3",
        "emoji": "⭐⭐⭐⭐⭐⭐ － 🌙🌙🌙",
        "speech": "六减三",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "3",
          "2",
          "4"
        ],
        "correct": "3"
      },
      {
        "prompt": "5 - 2",
        "emoji": "⭐⭐⭐⭐⭐ － 🌙🌙",
        "speech": "五减二",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "2",
          "3",
          "4"
        ],
        "correct": "3"
      },
      {
        "prompt": "9 - 5",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐⭐⭐ － 🌙🌙🌙🌙🌙",
        "speech": "九减五",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "3",
          "5",
          "4"
        ],
        "correct": "4"
      },
      {
        "prompt": "8 - 3",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐⭐ － 🌙🌙🌙",
        "speech": "八减三",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "5",
          "4",
          "6"
        ],
        "correct": "5"
      },
      {
        "prompt": "7 - 4",
        "emoji": "⭐⭐⭐⭐⭐⭐⭐ － 🌙🌙🌙🌙",
        "speech": "七减四",
        "lang": "zh-CN",
        "question": "请算一算，结果是多少？",
        "answers": [
          "2",
          "3",
          "4"
        ],
        "correct": "3"
      },
      {
        "prompt": "2，4，6，？",
        "emoji": "🔢",
        "speech": "2，4，6，？",
        "lang": "zh-CN",
        "question": "请找出规律，问号处应该是什么？",
        "answers": [
          "7",
          "9",
          "8"
        ],
        "correct": "8"
      },
      {
        "prompt": "5，6，7，？",
        "emoji": "🔢",
        "speech": "5，6，7，？",
        "lang": "zh-CN",
        "question": "请找出规律，问号处应该是什么？",
        "answers": [
          "8",
          "7",
          "9"
        ],
        "correct": "8"
      },
      {
        "prompt": "10，8，6，？",
        "emoji": "🔢",
        "speech": "10，8，6，？",
        "lang": "zh-CN",
        "question": "请找出规律，问号处应该是什么？",
        "answers": [
          "3",
          "4",
          "5"
        ],
        "correct": "4"
      },
      {
        "prompt": "1，3，5，？",
        "emoji": "🔢",
        "speech": "1，3，5，？",
        "lang": "zh-CN",
        "question": "请找出规律，问号处应该是什么？",
        "answers": [
          "6",
          "8",
          "7"
        ],
        "correct": "7"
      },
      {
        "prompt": "7 和 9",
        "emoji": "🔢",
        "speech": "7 和 9",
        "lang": "zh-CN",
        "question": "哪个数字更大？",
        "answers": [
          "9",
          "8",
          "10"
        ],
        "correct": "9"
      },
      {
        "prompt": "8 和 6",
        "emoji": "🔢",
        "speech": "8 和 6",
        "lang": "zh-CN",
        "question": "哪个数字更大？",
        "answers": [
          "7",
          "8",
          "9"
        ],
        "correct": "8"
      }
    ]
  },
  "english": {
    "3-4": [
      {
        "prompt": "ball",
        "emoji": "⚽",
        "speech": "ball",
        "lang": "en-US",
        "question": "球的英文是什么？",
        "answers": [
          "ball",
          "bus",
          "lion"
        ],
        "correct": "ball"
      },
      {
        "prompt": "bus",
        "emoji": "🚌",
        "speech": "bus",
        "lang": "en-US",
        "question": "公交车的英文是什么？",
        "answers": [
          "duck",
          "bus",
          "tiger"
        ],
        "correct": "bus"
      },
      {
        "prompt": "duck",
        "emoji": "🦆",
        "speech": "duck",
        "lang": "en-US",
        "question": "鸭子的英文是什么？",
        "answers": [
          "cow",
          "panda",
          "duck"
        ],
        "correct": "duck"
      },
      {
        "prompt": "cow",
        "emoji": "🐮",
        "speech": "cow",
        "lang": "en-US",
        "question": "奶牛的英文是什么？",
        "answers": [
          "cow",
          "pig",
          "frog"
        ],
        "correct": "cow"
      },
      {
        "prompt": "pig",
        "emoji": "🐷",
        "speech": "pig",
        "lang": "en-US",
        "question": "小猪的英文是什么？",
        "answers": [
          "horse",
          "pig",
          "banana"
        ],
        "correct": "pig"
      },
      {
        "prompt": "horse",
        "emoji": "🐴",
        "speech": "horse",
        "lang": "en-US",
        "question": "马的英文是什么？",
        "answers": [
          "rabbit",
          "orange",
          "horse"
        ],
        "correct": "horse"
      },
      {
        "prompt": "rabbit",
        "emoji": "🐰",
        "speech": "rabbit",
        "lang": "en-US",
        "question": "兔子的英文是什么？",
        "answers": [
          "rabbit",
          "bear",
          "pear"
        ],
        "correct": "rabbit"
      },
      {
        "prompt": "bear",
        "emoji": "🐻",
        "speech": "bear",
        "lang": "en-US",
        "question": "熊的英文是什么？",
        "answers": [
          "lion",
          "bear",
          "grape"
        ],
        "correct": "bear"
      },
      {
        "prompt": "lion",
        "emoji": "🦁",
        "speech": "lion",
        "lang": "en-US",
        "question": "狮子的英文是什么？",
        "answers": [
          "tiger",
          "bread",
          "lion"
        ],
        "correct": "lion"
      },
      {
        "prompt": "tiger",
        "emoji": "🐯",
        "speech": "tiger",
        "lang": "en-US",
        "question": "老虎的英文是什么？",
        "answers": [
          "tiger",
          "panda",
          "egg"
        ],
        "correct": "tiger"
      },
      {
        "prompt": "panda",
        "emoji": "🐼",
        "speech": "panda",
        "lang": "en-US",
        "question": "熊猫的英文是什么？",
        "answers": [
          "frog",
          "panda",
          "milk"
        ],
        "correct": "panda"
      },
      {
        "prompt": "frog",
        "emoji": "🐸",
        "speech": "frog",
        "lang": "en-US",
        "question": "青蛙的英文是什么？",
        "answers": [
          "banana",
          "water",
          "frog"
        ],
        "correct": "frog"
      },
      {
        "prompt": "banana",
        "emoji": "🍌",
        "speech": "banana",
        "lang": "en-US",
        "question": "香蕉的英文是什么？",
        "answers": [
          "banana",
          "orange",
          "cup"
        ],
        "correct": "banana"
      },
      {
        "prompt": "orange",
        "emoji": "🍊",
        "speech": "orange",
        "lang": "en-US",
        "question": "橙子的英文是什么？",
        "answers": [
          "pear",
          "orange",
          "plate"
        ],
        "correct": "orange"
      },
      {
        "prompt": "pear",
        "emoji": "🍐",
        "speech": "pear",
        "lang": "en-US",
        "question": "梨的英文是什么？",
        "answers": [
          "grape",
          "spoon",
          "pear"
        ],
        "correct": "pear"
      },
      {
        "prompt": "grape",
        "emoji": "🍇",
        "speech": "grape",
        "lang": "en-US",
        "question": "葡萄的英文是什么？",
        "answers": [
          "grape",
          "bread",
          "bed"
        ],
        "correct": "grape"
      },
      {
        "prompt": "bread",
        "emoji": "🍞",
        "speech": "bread",
        "lang": "en-US",
        "question": "面包的英文是什么？",
        "answers": [
          "egg",
          "bread",
          "chair"
        ],
        "correct": "bread"
      },
      {
        "prompt": "egg",
        "emoji": "🥚",
        "speech": "egg",
        "lang": "en-US",
        "question": "鸡蛋的英文是什么？",
        "answers": [
          "milk",
          "table",
          "egg"
        ],
        "correct": "egg"
      },
      {
        "prompt": "milk",
        "emoji": "🥛",
        "speech": "milk",
        "lang": "en-US",
        "question": "牛奶的英文是什么？",
        "answers": [
          "milk",
          "water",
          "house"
        ],
        "correct": "milk"
      },
      {
        "prompt": "water",
        "emoji": "💧",
        "speech": "water",
        "lang": "en-US",
        "question": "水的英文是什么？",
        "answers": [
          "cup",
          "water",
          "door"
        ],
        "correct": "water"
      },
      {
        "prompt": "cup",
        "emoji": "🥤",
        "speech": "cup",
        "lang": "en-US",
        "question": "杯子的英文是什么？",
        "answers": [
          "plate",
          "hat",
          "cup"
        ],
        "correct": "cup"
      },
      {
        "prompt": "plate",
        "emoji": "🍽️",
        "speech": "plate",
        "lang": "en-US",
        "question": "盘子的英文是什么？",
        "answers": [
          "plate",
          "spoon",
          "shoe"
        ],
        "correct": "plate"
      },
      {
        "prompt": "spoon",
        "emoji": "🥄",
        "speech": "spoon",
        "lang": "en-US",
        "question": "勺子的英文是什么？",
        "answers": [
          "bed",
          "spoon",
          "sock"
        ],
        "correct": "spoon"
      },
      {
        "prompt": "bed",
        "emoji": "🛏️",
        "speech": "bed",
        "lang": "en-US",
        "question": "床的英文是什么？",
        "answers": [
          "chair",
          "hand",
          "bed"
        ],
        "correct": "bed"
      },
      {
        "prompt": "chair",
        "emoji": "🪑",
        "speech": "chair",
        "lang": "en-US",
        "question": "椅子的英文是什么？",
        "answers": [
          "chair",
          "table",
          "eye"
        ],
        "correct": "chair"
      },
      {
        "prompt": "table",
        "emoji": "🪵",
        "speech": "table",
        "lang": "en-US",
        "question": "桌子的英文是什么？",
        "answers": [
          "house",
          "table",
          "nose"
        ],
        "correct": "table"
      },
      {
        "prompt": "house",
        "emoji": "🏠",
        "speech": "house",
        "lang": "en-US",
        "question": "房子的英文是什么？",
        "answers": [
          "door",
          "ear",
          "house"
        ],
        "correct": "house"
      },
      {
        "prompt": "door",
        "emoji": "🚪",
        "speech": "door",
        "lang": "en-US",
        "question": "门的英文是什么？",
        "answers": [
          "door",
          "hat",
          "red"
        ],
        "correct": "door"
      },
      {
        "prompt": "hat",
        "emoji": "🧢",
        "speech": "hat",
        "lang": "en-US",
        "question": "帽子的英文是什么？",
        "answers": [
          "shoe",
          "hat",
          "blue"
        ],
        "correct": "hat"
      },
      {
        "prompt": "shoe",
        "emoji": "👟",
        "speech": "shoe",
        "lang": "en-US",
        "question": "鞋子的英文是什么？",
        "answers": [
          "sock",
          "green",
          "shoe"
        ],
        "correct": "shoe"
      },
      {
        "prompt": "sock",
        "emoji": "🧦",
        "speech": "sock",
        "lang": "en-US",
        "question": "袜子的英文是什么？",
        "answers": [
          "sock",
          "hand",
          "ball"
        ],
        "correct": "sock"
      },
      {
        "prompt": "hand",
        "emoji": "✋",
        "speech": "hand",
        "lang": "en-US",
        "question": "手的英文是什么？",
        "answers": [
          "eye",
          "hand",
          "bus"
        ],
        "correct": "hand"
      },
      {
        "prompt": "eye",
        "emoji": "👁️",
        "speech": "eye",
        "lang": "en-US",
        "question": "眼睛的英文是什么？",
        "answers": [
          "nose",
          "duck",
          "eye"
        ],
        "correct": "eye"
      },
      {
        "prompt": "nose",
        "emoji": "👃",
        "speech": "nose",
        "lang": "en-US",
        "question": "鼻子的英文是什么？",
        "answers": [
          "nose",
          "ear",
          "cow"
        ],
        "correct": "nose"
      },
      {
        "prompt": "ear",
        "emoji": "👂",
        "speech": "ear",
        "lang": "en-US",
        "question": "耳朵的英文是什么？",
        "answers": [
          "red",
          "ear",
          "pig"
        ],
        "correct": "ear"
      },
      {
        "prompt": "red",
        "emoji": "🔴",
        "speech": "red",
        "lang": "en-US",
        "question": "红色的英文是什么？",
        "answers": [
          "blue",
          "horse",
          "red"
        ],
        "correct": "red"
      },
      {
        "prompt": "blue",
        "emoji": "🔵",
        "speech": "blue",
        "lang": "en-US",
        "question": "蓝色的英文是什么？",
        "answers": [
          "blue",
          "green",
          "rabbit"
        ],
        "correct": "blue"
      },
      {
        "prompt": "green",
        "emoji": "🟢",
        "speech": "green",
        "lang": "en-US",
        "question": "绿色的英文是什么？",
        "answers": [
          "ball",
          "green",
          "bear"
        ],
        "correct": "green"
      }
    ],
    "5-6": [
      {
        "prompt": "pencil",
        "emoji": "✏️",
        "speech": "pencil",
        "lang": "en-US",
        "question": "铅笔的英文是什么？",
        "answers": [
          "pencil",
          "crayon",
          "desk"
        ],
        "correct": "pencil"
      },
      {
        "prompt": "crayon",
        "emoji": "🖍️",
        "speech": "crayon",
        "lang": "en-US",
        "question": "蜡笔的英文是什么？",
        "answers": [
          "ruler",
          "crayon",
          "clock"
        ],
        "correct": "crayon"
      },
      {
        "prompt": "ruler",
        "emoji": "📏",
        "speech": "ruler",
        "lang": "en-US",
        "question": "尺子的英文是什么？",
        "answers": [
          "eraser",
          "window",
          "ruler"
        ],
        "correct": "ruler"
      },
      {
        "prompt": "eraser",
        "emoji": "🧽",
        "speech": "eraser",
        "lang": "en-US",
        "question": "橡皮的英文是什么？",
        "answers": [
          "eraser",
          "schoolbag",
          "garden"
        ],
        "correct": "eraser"
      },
      {
        "prompt": "schoolbag",
        "emoji": "🎒",
        "speech": "schoolbag",
        "lang": "en-US",
        "question": "书包的英文是什么？",
        "answers": [
          "classroom",
          "schoolbag",
          "park"
        ],
        "correct": "schoolbag"
      },
      {
        "prompt": "classroom",
        "emoji": "🏫",
        "speech": "classroom",
        "lang": "en-US",
        "question": "教室的英文是什么？",
        "answers": [
          "teacher",
          "zoo",
          "classroom"
        ],
        "correct": "classroom"
      },
      {
        "prompt": "teacher",
        "emoji": "🧑‍🏫",
        "speech": "teacher",
        "lang": "en-US",
        "question": "老师的英文是什么？",
        "answers": [
          "teacher",
          "student",
          "elephant"
        ],
        "correct": "teacher"
      },
      {
        "prompt": "student",
        "emoji": "🧒",
        "speech": "student",
        "lang": "en-US",
        "question": "学生的英文是什么？",
        "answers": [
          "desk",
          "student",
          "monkey"
        ],
        "correct": "student"
      },
      {
        "prompt": "desk",
        "emoji": "🪑",
        "speech": "desk",
        "lang": "en-US",
        "question": "课桌的英文是什么？",
        "answers": [
          "clock",
          "giraffe",
          "desk"
        ],
        "correct": "desk"
      },
      {
        "prompt": "clock",
        "emoji": "🕒",
        "speech": "clock",
        "lang": "en-US",
        "question": "时钟的英文是什么？",
        "answers": [
          "clock",
          "window",
          "zebra"
        ],
        "correct": "clock"
      },
      {
        "prompt": "window",
        "emoji": "🪟",
        "speech": "window",
        "lang": "en-US",
        "question": "窗户的英文是什么？",
        "answers": [
          "garden",
          "window",
          "turtle"
        ],
        "correct": "window"
      },
      {
        "prompt": "garden",
        "emoji": "🪴",
        "speech": "garden",
        "lang": "en-US",
        "question": "花园的英文是什么？",
        "answers": [
          "park",
          "snake",
          "garden"
        ],
        "correct": "garden"
      },
      {
        "prompt": "park",
        "emoji": "🏞️",
        "speech": "park",
        "lang": "en-US",
        "question": "公园的英文是什么？",
        "answers": [
          "park",
          "zoo",
          "butterfly"
        ],
        "correct": "park"
      },
      {
        "prompt": "zoo",
        "emoji": "🦒",
        "speech": "zoo",
        "lang": "en-US",
        "question": "动物园的英文是什么？",
        "answers": [
          "elephant",
          "zoo",
          "bee"
        ],
        "correct": "zoo"
      },
      {
        "prompt": "elephant",
        "emoji": "🐘",
        "speech": "elephant",
        "lang": "en-US",
        "question": "大象的英文是什么？",
        "answers": [
          "monkey",
          "run",
          "elephant"
        ],
        "correct": "elephant"
      },
      {
        "prompt": "monkey",
        "emoji": "🐒",
        "speech": "monkey",
        "lang": "en-US",
        "question": "猴子的英文是什么？",
        "answers": [
          "monkey",
          "giraffe",
          "jump"
        ],
        "correct": "monkey"
      },
      {
        "prompt": "giraffe",
        "emoji": "🦒",
        "speech": "giraffe",
        "lang": "en-US",
        "question": "长颈鹿的英文是什么？",
        "answers": [
          "zebra",
          "giraffe",
          "swim"
        ],
        "correct": "giraffe"
      },
      {
        "prompt": "zebra",
        "emoji": "🦓",
        "speech": "zebra",
        "lang": "en-US",
        "question": "斑马的英文是什么？",
        "answers": [
          "turtle",
          "sing",
          "zebra"
        ],
        "correct": "zebra"
      },
      {
        "prompt": "turtle",
        "emoji": "🐢",
        "speech": "turtle",
        "lang": "en-US",
        "question": "乌龟的英文是什么？",
        "answers": [
          "turtle",
          "snake",
          "dance"
        ],
        "correct": "turtle"
      },
      {
        "prompt": "snake",
        "emoji": "🐍",
        "speech": "snake",
        "lang": "en-US",
        "question": "蛇的英文是什么？",
        "answers": [
          "butterfly",
          "snake",
          "read"
        ],
        "correct": "snake"
      },
      {
        "prompt": "butterfly",
        "emoji": "🦋",
        "speech": "butterfly",
        "lang": "en-US",
        "question": "蝴蝶的英文是什么？",
        "answers": [
          "bee",
          "write",
          "butterfly"
        ],
        "correct": "butterfly"
      },
      {
        "prompt": "bee",
        "emoji": "🐝",
        "speech": "bee",
        "lang": "en-US",
        "question": "蜜蜂的英文是什么？",
        "answers": [
          "bee",
          "run",
          "draw"
        ],
        "correct": "bee"
      },
      {
        "prompt": "run",
        "emoji": "🏃",
        "speech": "run",
        "lang": "en-US",
        "question": "跑步的英文是什么？",
        "answers": [
          "jump",
          "run",
          "sleep"
        ],
        "correct": "run"
      },
      {
        "prompt": "jump",
        "emoji": "🤸",
        "speech": "jump",
        "lang": "en-US",
        "question": "跳跃的英文是什么？",
        "answers": [
          "swim",
          "eat",
          "jump"
        ],
        "correct": "jump"
      },
      {
        "prompt": "swim",
        "emoji": "🏊",
        "speech": "swim",
        "lang": "en-US",
        "question": "游泳的英文是什么？",
        "answers": [
          "swim",
          "sing",
          "drink"
        ],
        "correct": "swim"
      },
      {
        "prompt": "sing",
        "emoji": "🎤",
        "speech": "sing",
        "lang": "en-US",
        "question": "唱歌的英文是什么？",
        "answers": [
          "dance",
          "sing",
          "play"
        ],
        "correct": "sing"
      },
      {
        "prompt": "dance",
        "emoji": "💃",
        "speech": "dance",
        "lang": "en-US",
        "question": "跳舞的英文是什么？",
        "answers": [
          "read",
          "happy",
          "dance"
        ],
        "correct": "dance"
      },
      {
        "prompt": "read",
        "emoji": "📖",
        "speech": "read",
        "lang": "en-US",
        "question": "阅读的英文是什么？",
        "answers": [
          "read",
          "write",
          "tired"
        ],
        "correct": "read"
      },
      {
        "prompt": "write",
        "emoji": "✍️",
        "speech": "write",
        "lang": "en-US",
        "question": "写字的英文是什么？",
        "answers": [
          "draw",
          "write",
          "hot"
        ],
        "correct": "write"
      },
      {
        "prompt": "draw",
        "emoji": "🎨",
        "speech": "draw",
        "lang": "en-US",
        "question": "画画的英文是什么？",
        "answers": [
          "sleep",
          "cold",
          "draw"
        ],
        "correct": "draw"
      },
      {
        "prompt": "sleep",
        "emoji": "😴",
        "speech": "sleep",
        "lang": "en-US",
        "question": "睡觉的英文是什么？",
        "answers": [
          "sleep",
          "eat",
          "pencil"
        ],
        "correct": "sleep"
      },
      {
        "prompt": "eat",
        "emoji": "🍽️",
        "speech": "eat",
        "lang": "en-US",
        "question": "吃的英文是什么？",
        "answers": [
          "drink",
          "eat",
          "crayon"
        ],
        "correct": "eat"
      },
      {
        "prompt": "drink",
        "emoji": "🥤",
        "speech": "drink",
        "lang": "en-US",
        "question": "喝的英文是什么？",
        "answers": [
          "play",
          "ruler",
          "drink"
        ],
        "correct": "drink"
      },
      {
        "prompt": "play",
        "emoji": "🛝",
        "speech": "play",
        "lang": "en-US",
        "question": "玩耍的英文是什么？",
        "answers": [
          "play",
          "happy",
          "eraser"
        ],
        "correct": "play"
      },
      {
        "prompt": "happy",
        "emoji": "😊",
        "speech": "happy",
        "lang": "en-US",
        "question": "开心的英文是什么？",
        "answers": [
          "tired",
          "happy",
          "schoolbag"
        ],
        "correct": "happy"
      },
      {
        "prompt": "tired",
        "emoji": "🥱",
        "speech": "tired",
        "lang": "en-US",
        "question": "累了的英文是什么？",
        "answers": [
          "hot",
          "classroom",
          "tired"
        ],
        "correct": "tired"
      },
      {
        "prompt": "hot",
        "emoji": "🥵",
        "speech": "hot",
        "lang": "en-US",
        "question": "热的英文是什么？",
        "answers": [
          "hot",
          "cold",
          "teacher"
        ],
        "correct": "hot"
      },
      {
        "prompt": "cold",
        "emoji": "🥶",
        "speech": "cold",
        "lang": "en-US",
        "question": "冷的英文是什么？",
        "answers": [
          "pencil",
          "cold",
          "student"
        ],
        "correct": "cold"
      }
    ]
  }
};

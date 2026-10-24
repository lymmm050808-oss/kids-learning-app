import type { AgeGroup, Question, SubjectId } from '../types/domain'
import { questionBankAdditions } from './questionBankAdditions'

const starterQuestionBank: Record<SubjectId, Question[]> = {
  chinese: [
    {emoji:'🌙',prompt:'月',speech:'月',question:'哪一个是“月”？',answers:['日','月','山'],correct:'月'},{emoji:'💧',prompt:'水',speech:'水',question:'请找到“水”字',answers:['木','火','水'],correct:'水'},{emoji:'⛰️',prompt:'山',speech:'山',question:'哪一个字读“山”？',answers:['山','口','手'],correct:'山'},{emoji:'☀️',prompt:'日',speech:'日',question:'太阳对应哪个字？',answers:['月','日','木'],correct:'日'},{emoji:'🌳',prompt:'木',speech:'木',question:'请找到“木”字',answers:['水','人','木'],correct:'木'},{emoji:'👄',prompt:'口',speech:'口',question:'嘴巴对应哪个字？',answers:['手','口','人'],correct:'口'},{emoji:'✋',prompt:'手',speech:'手',question:'哪一个字读“手”？',answers:['口','山','手'],correct:'手'},{emoji:'🧍',prompt:'人',speech:'人',question:'请找到“人”字',answers:['人','木','日'],correct:'人'},{emoji:'🔥',prompt:'火',speech:'火',question:'火焰对应哪个字？',answers:['水','火','木'],correct:'火'},{emoji:'🌾',prompt:'禾',speech:'禾',question:'哪一个字读“禾”？',answers:['禾','木','米'],correct:'禾'},{emoji:'🏠',prompt:'家',speech:'家',question:'请找到“家”字',answers:['学','家','云'],correct:'家'},{emoji:'☁️',prompt:'云',speech:'云',question:'白云对应哪个字？',answers:['雨','天','云'],correct:'云'}],
  math: [
    {emoji:'🍎🍎',prompt:'1 + 1',speech:'一加一',question:'一共有几个苹果？',answers:['1','2','3'],correct:'2'},{emoji:'⭐⭐⭐',prompt:'2 + 1',speech:'二加一',question:'一共有几颗星星？',answers:['2','3','4'],correct:'3'},{emoji:'🐥🐥🐥🐥',prompt:'3 + 1',speech:'三加一',question:'一共有几只小鸡？',answers:['3','4','5'],correct:'4'},{emoji:'🚀',prompt:'数一数',speech:'数一数，有几个火箭',question:'这里有几个火箭？',answers:['1','2','3'],correct:'1'},{emoji:'🪐🪐🪐🪐🪐',prompt:'数一数',speech:'数一数，有几个星球',question:'这里有几个星球？',answers:['3','4','5'],correct:'5'},{emoji:'🍓🍓🍓',prompt:'1 + 2',speech:'一加二',question:'一共有几个草莓？',answers:['2','3','4'],correct:'3'},{emoji:'🎈🎈🎈🎈🎈',prompt:'2 + 3',speech:'二加三',question:'一共有几个气球？',answers:['3','4','5'],correct:'5'},{emoji:'🌟🌟🌟🌟',prompt:'2 + 2',speech:'二加二',question:'一共有几颗亮星？',answers:['3','4','5'],correct:'4'},{emoji:'🌼🌼',prompt:'数一数',speech:'数一数，有几朵花',question:'这里有几朵花？',answers:['1','2','3'],correct:'2'},{emoji:'🐟🐟🐟🐟',prompt:'数一数',speech:'数一数，有几条鱼',question:'这里有几条鱼？',answers:['3','4','5'],correct:'4'},{emoji:'🍪🍪🍪🍪🍪',prompt:'4 + 1',speech:'四加一',question:'一共有几块饼干？',answers:['4','5','6'],correct:'5'},{emoji:'🧸🧸🧸',prompt:'2 + 1',speech:'二加一',question:'一共有几个玩具熊？',answers:['2','3','4'],correct:'3'}],
  english: [
    {emoji:'🍎',prompt:'apple',speech:'apple',lang:'en-US',question:'苹果的英文是什么？',answers:['apple','cat','sun'],correct:'apple'},{emoji:'🐱',prompt:'cat',speech:'cat',lang:'en-US',question:'小猫的英文是什么？',answers:['dog','cat','moon'],correct:'cat'},{emoji:'☀️',prompt:'sun',speech:'sun',lang:'en-US',question:'太阳的英文是什么？',answers:['star','sun','tree'],correct:'sun'},{emoji:'🐶',prompt:'dog',speech:'dog',lang:'en-US',question:'小狗的英文是什么？',answers:['cat','book','dog'],correct:'dog'},{emoji:'🌙',prompt:'moon',speech:'moon',lang:'en-US',question:'月亮的英文是什么？',answers:['moon','sun','car'],correct:'moon'},{emoji:'🌳',prompt:'tree',speech:'tree',lang:'en-US',question:'大树的英文是什么？',answers:['book','tree','apple'],correct:'tree'},{emoji:'🚗',prompt:'car',speech:'car',lang:'en-US',question:'小汽车的英文是什么？',answers:['dog','car','sun'],correct:'car'},{emoji:'📘',prompt:'book',speech:'book',lang:'en-US',question:'书的英文是什么？',answers:['book','tree','moon'],correct:'book'},{emoji:'⭐',prompt:'star',speech:'star',lang:'en-US',question:'星星的英文是什么？',answers:['sun','star','moon'],correct:'star'},{emoji:'🐟',prompt:'fish',speech:'fish',lang:'en-US',question:'小鱼的英文是什么？',answers:['bird','fish','cat'],correct:'fish'},{emoji:'🐦',prompt:'bird',speech:'bird',lang:'en-US',question:'小鸟的英文是什么？',answers:['bird','dog','fish'],correct:'bird'},{emoji:'🌼',prompt:'flower',speech:'flower',lang:'en-US',question:'花朵的英文是什么？',answers:['tree','flower','grass'],correct:'flower'}]
}

export const questionBank: Record<SubjectId, Record<AgeGroup, Question[]>> = {
  chinese: {
    '3-4': [...starterQuestionBank.chinese, ...questionBankAdditions.chinese['3-4']],
    '5-6': [...starterQuestionBank.chinese, ...questionBankAdditions.chinese['5-6']],
  },
  math: {
    '3-4': [...starterQuestionBank.math, ...questionBankAdditions.math['3-4']],
    '5-6': [...starterQuestionBank.math, ...questionBankAdditions.math['5-6']],
  },
  english: {
    '3-4': [...starterQuestionBank.english, ...questionBankAdditions.english['3-4']],
    '5-6': [...starterQuestionBank.english, ...questionBankAdditions.english['5-6']],
  },
}

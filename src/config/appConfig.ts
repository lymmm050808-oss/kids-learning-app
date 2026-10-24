import type { AgeGroup } from '../types/domain'
export const appConfig = {
  missionQuestionCount: 5,
  defaultAgeGroup: '3-4' as AgeGroup,
  defaultDailyQuestionGoal: 10,
  defaultDailyTimeLimitMinutes: 20,
  rewardLevels: [
    { stars: 10, name: '新手宇航员' },
    { stars: 30, name: '星球探险家' },
    { stars: 50, name: '知识领航员' },
  ],
}

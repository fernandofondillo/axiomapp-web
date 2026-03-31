export type DriverId = 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7';
export interface DriverScore { driver: DriverId; label: string; score: number; weight: number; trend: 'up'|'down'|'stable'; lastUpdated: string; }
export interface MetabolicQScore { overall: number; drivers: DriverScore[]; date: string; trend: 'up'|'down'|'stable'; trendPercent: number; isProvisional: boolean; }
export interface UserProfile { id: string; email: string; onboardingDay: number; onboardingComplete: boolean; primaryGoal: 'weight'|'glucose'|'energy'|'prevention'; healthGoal?: string; wearableLinked?: string|null; glucoseMonitor?: 'none'|'cgm'|'capillary'; createdAt: string; }
export interface DailyLog { id: string; userId: string; date: string; weight?: number; energy?: number; emotion?: EmotionState; foodLog: FoodEntry[]; notes?: string; createdAt: string; }
export type EmotionState = 'great'|'good'|'okay'|'low'|'bad';
export interface FoodEntry { name: string; time: string; }

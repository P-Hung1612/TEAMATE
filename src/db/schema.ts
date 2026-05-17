import Dexie, { type Table } from 'dexie';

export interface User {
  id?: number;
  name: string;
  role: 'teacher';
  school: string;
}

export interface Class {
  id?: string;
  name: string;
  academicYear: string;
  gradeLevel: number;
}

export interface Student {
  id?: string;
  classId: string;
  fullName: string;
  gender: string;
  birthDate: string;
  parentPhone?: string;
}

export interface LessonLog {
  id?: string;
  classId: string;
  date: string;
  period: number;
  subject: string;
  topic: string;
  attendance: { studentId: string; status: 'present' | 'absent_permitted' | 'absent_unpermitted' }[];
  notes: string;
  syncStatus: 'synced' | 'pending' | 'conflict';
}

export interface LessonPlan {
  id?: string;
  subject: string;
  gradeLevel: number;
  topic: string;
  objectives: string;
  methods: string;
  steps: string;
  assessment: string;
  createdAt: number;
  updatedAt: number;
}

export class TeamateDB extends Dexie {
  users!: Table<User>;
  classes!: Table<Class>;
  students!: Table<Student>;
  lessonLogs!: Table<LessonLog>;
  lessonPlans!: Table<LessonPlan>;

  constructor() {
    super('TeamateDB');
    this.version(1).stores({
      users: '++id, name',
      classes: 'id, name, gradeLevel',
      students: 'id, classId, fullName',
      lessonLogs: 'id, classId, date, [classId+date+period]',
      lessonPlans: 'id, subject, topic, gradeLevel'
    });
  }
}

export const db = new TeamateDB();

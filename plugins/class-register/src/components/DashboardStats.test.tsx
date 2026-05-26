import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardStats } from './DashboardStats';
import { DocumentNode } from '@teamate/kernel';
import { LessonLogPayload } from '../types';

type MockLog = DocumentNode<LessonLogPayload>;

const mockLogs: MockLog[] = [
  {
    id: '1',
    type: 'lesson_log',
    payload: {
      dayOfWeek: 'monday',
      period: 1,
      classId: '10A1',
      subject: 'Toán',
      topic: 'Phép cộng',
      totalStudents: 40,
      absentCount: 2,
      absents: [
        { name: 'Nguyen A', type: 'permitted', note: 'Ốm' },
        { name: 'Tran B', type: 'unpermitted' },
      ],
      notes: 'Tiết học ổn',
      grade: 8,
      teacherSignature: 'Thầy An',
    },
    is_synced: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

describe('DashboardStats', () => {
  it('renders total lessons, average grade and total absences', () => {
    render(<DashboardStats logs={mockLogs} />);
    // total lessons (1)
    expect(screen.getByText('1')).toBeInTheDocument();
    // average grade (8.0)
    expect(screen.getByText('8.0')).toBeInTheDocument();
    // total absences (2)
    expect(screen.getByText('2 lượt')).toBeInTheDocument();
  });
});

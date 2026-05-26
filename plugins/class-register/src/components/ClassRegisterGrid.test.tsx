import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClassRegisterGrid } from './ClassRegisterGrid';
import { DocumentNode } from '@teamate/kernel';
import { LessonLogPayload } from '../types';

type MockLog = DocumentNode<LessonLogPayload>;

const mockLog: MockLog = {
  id: '1',
  type: 'lesson_log',
  payload: {
    dayOfWeek: 'monday',
    period: 1,
    classId: '10A1',
    subject: 'Toán',
    topic: 'Đại số',
    totalStudents: 30,
    absentCount: 2,
    absents: [
      { name: 'Nguyen A', type: 'permitted' },
      { name: 'Tran B', type: 'unpermitted', note: 'đi bù' }
    ],
    notes: 'Buổi học tốt',
    grade: 9,
    teacherSignature: 'ThS. Huy',
    is_synced: true
  },
  is_synced: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

describe('ClassRegisterGrid', () => {
  test('renders grid with correct headers', () => {
    render(<ClassRegisterGrid logs={[]} onSelectSlot={() => {}} />);
    expect(screen.getByText('Tiết')).toBeInTheDocument();
    expect(screen.getByText('Thứ Hai')).toBeInTheDocument();
    expect(screen.getByText('Thứ Bảy')).toBeInTheDocument();
  });

  test('shows logged lesson in correct cell and triggers onSelectSlot', () => {
    const handleSelect = vi.fn();
    render(<ClassRegisterGrid logs={[mockLog]} onSelectSlot={handleSelect} />);
    // The cell for Monday period 1 should contain classId
    const cell = screen.getByText('10A1');
    expect(cell).toBeInTheDocument();
    // Click the cell
    fireEvent.click(cell);
    expect(handleSelect).toHaveBeenCalledWith('monday', 1, mockLog);
  });

  test('renders empty slot button when no log exists', () => {
    const handleSelect = vi.fn();
    render(<ClassRegisterGrid logs={[]} onSelectSlot={handleSelect} />);
    const addButton = screen.getAllByRole('button', { name: /Thêm tiết/i })[0];
    fireEvent.click(addButton);
    expect(handleSelect).toHaveBeenCalledWith('monday', 1);
  });
});

function expect(handleSelect: any) {
  throw new Error('Function not implemented.');
}

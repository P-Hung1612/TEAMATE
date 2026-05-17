import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import type { LessonLog, Class, Student } from '../db/schema';

export const exportJournalToExcel = async (
  logs: LessonLog[],
  classes: Class[],
  students: Student[]
) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'TEAMATE';
  workbook.lastModifiedBy = 'TEAMATE';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Create a worksheet for each class
  const classGroups = logs.reduce((acc, log) => {
    if (!acc[log.classId]) {
      acc[log.classId] = [];
    }
    acc[log.classId].push(log);
    return acc;
  }, {} as Record<string, LessonLog[]>);

  for (const [classId, classLogs] of Object.entries(classGroups)) {
    const cls = classes.find((c) => c.id === classId);
    const sheetName = cls ? `Lớp ${cls.name}` : `Lớp ${classId}`;
    
    // Create sheet and set column widths
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.columns = [
      { header: 'Ngày', key: 'date', width: 15 },
      { header: 'Tiết', key: 'period', width: 10 },
      { header: 'Môn', key: 'subject', width: 20 },
      { header: 'Tên bài', key: 'topic', width: 35 },
      { header: 'Sĩ số', key: 'total_students', width: 10 },
      { header: 'Vắng (Có phép)', key: 'absent_permitted', width: 20 },
      { header: 'Vắng (Không phép)', key: 'absent_unpermitted', width: 20 },
      { header: 'Ghi chú', key: 'notes', width: 30 },
      { header: 'Trạng thái đồng bộ', key: 'sync', width: 20 }
    ];

    // Style the header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };

    // Sort logs by date and period
    classLogs.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.period - b.period;
    });

    const classStudents = students.filter(s => s.classId === classId);

    // Add data rows
    classLogs.forEach((log) => {
      const absentPermitted = log.attendance
        .filter(a => a.status === 'absent_permitted')
        .map(a => classStudents.find(s => s.id === a.studentId)?.fullName || 'Không rõ')
        .join(', ');

      const absentUnpermitted = log.attendance
        .filter(a => a.status === 'absent_unpermitted')
        .map(a => classStudents.find(s => s.id === a.studentId)?.fullName || 'Không rõ')
        .join(', ');

      worksheet.addRow({
        date: log.date,
        period: log.period,
        subject: log.subject,
        topic: log.topic,
        total_students: classStudents.length,
        absent_permitted: absentPermitted || '-',
        absent_unpermitted: absentUnpermitted || '-',
        notes: log.notes || '-',
        sync: log.syncStatus === 'synced' ? 'Đã đồng bộ' : 'Chưa đồng bộ'
      });
    });

    // Add borders to all populated cells
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        // Vertical align middle
        cell.alignment = { ...cell.alignment, vertical: 'middle', wrapText: true };
      });
    });
  }

  // If no logs found, create an empty sheet to avoid error
  if (Object.keys(classGroups).length === 0) {
    const worksheet = workbook.addWorksheet('Không có dữ liệu');
    worksheet.addRow(['Không có dữ liệu sổ đầu bài nào được tìm thấy.']);
  }

  // Generate blob and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const filename = `So_Dau_Bai_TEAMATE_${format(new Date(), 'yyyyMMdd_HHmmss')}.xlsx`;
  saveAs(blob, filename);
};

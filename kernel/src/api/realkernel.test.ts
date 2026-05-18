import { describe, it, expect, beforeEach } from 'vitest';
import 'fake-indexeddb/auto'; // Polyfill indexedDB trong môi trường Node.js cho Dexie
import { StorageManager } from '../storage/index';
import { RealKernel } from './realkernel';

describe('RealKernel Integration Tests (IndexedDB)', () => {
  let kernel: RealKernel;

  beforeEach(async () => {
    // Khởi tạo StorageManager
    const storageManager = new StorageManager();
    const driver = await storageManager.init();

    // Tạo RealKernel instance với Driver thực tế (DexieDriver)
    kernel = new RealKernel(driver);
  });

  it('should insert a document correctly with metadata', async () => {
    const payload = { title: 'Tiết 1: Toán đại số', class: '10A1' };
    const id = await kernel.insertDocument('lesson_log', payload);

    expect(id).toBeDefined();
    expect(typeof id).toBe('string');

    // Kiểm tra xem dữ liệu có lưu đúng trong IndexedDB không
    const doc = await kernel.getDocument(id);
    expect(doc).not.toBeNull();
    expect(doc!.id).toBe(id);
    expect(doc!.type).toBe('lesson_log');
    expect(doc!.payload).toEqual(payload);
    expect(doc!.owner_id).toBe('teacher_1');
    expect(doc!.created_at).toBeGreaterThan(0);
    expect(doc!.updated_at).toBe(doc!.created_at);
    expect(doc!.deleted_at).toBeNull();
    expect(doc!.is_synced).toBe(false); // Trạng thái mặc định là chưa đồng bộ
  });

  it('should get all documents of a specific type', async () => {
    const type = 'student';
    const id1 = await kernel.insertDocument(type, { name: 'Nguyễn Văn A', age: 16 });
    const id2 = await kernel.insertDocument(type, { name: 'Trần Thị B', age: 16 });

    const docs = await kernel.getDocuments(type);
    expect(docs.length).toBeGreaterThanOrEqual(2);

    const ids = docs.map(d => d.id);
    expect(ids).toContain(id1);
    expect(ids).toContain(id2);
  });

  it('should update a document payload, refresh updated_at and set is_synced to false', async () => {
    const type = 'rubric';
    const initialPayload = { score: 10, criteria: 'Chuyên cần' };
    const id = await kernel.insertDocument(type, initialPayload);

    // Chờ 5ms để đảm bảo timestamp updated_at khác với created_at
    await new Promise(resolve => setTimeout(resolve, 5));

    const updated = await kernel.updateDocument(id, { score: 8 });
    expect(updated).toBe(true);

    const doc = await kernel.getDocument(id);
    expect(doc!.payload).toEqual({ score: 8, criteria: 'Chuyên cần' });
    expect(doc!.updated_at).toBeGreaterThan(doc!.created_at);
    expect(doc!.is_synced).toBe(false); // Đã sửa đổi thì is_synced phải được đặt lại thành false
  });

  it('should soft-delete a document correctly, marking deleted_at and hiding from queries', async () => {
    const id = await kernel.insertDocument('lesson_plan', { topic: 'Văn học VN' });

    // Xóa mềm tài liệu
    const deleted = await kernel.deleteDocument(id);
    expect(deleted).toBe(true);

    // Tài liệu phải không còn truy vấn được qua getDocument
    const doc = await kernel.getDocument(id);
    expect(doc).toBeNull();

    // Tài liệu cũng không được xuất hiện trong danh sách getDocuments
    const docs = await kernel.getDocuments('lesson_plan');
    const ids = docs.map(d => d.id);
    expect(ids).not.toContain(id);
  });
});

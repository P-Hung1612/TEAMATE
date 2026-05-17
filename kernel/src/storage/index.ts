import { IStorageDriver } from './driver';
import { DexieDriver } from './indexeddb';

export * from './driver';
export * from './indexeddb';

/**
 * Bộ quản lý Storage của Kernel (Storage Orchestrator).
 * Tự động phát hiện môi trường chạy (Tauri Desktop hoặc Web PWA) để nạp Driver phù hợp nhất.
 */
export class StorageManager {
  private activeDriver!: IStorageDriver;

  /**
   * Khởi tạo và phát hiện môi trường
   */
  async init(): Promise<IStorageDriver> {
    // Phát hiện xem có đang chạy trong ứng dụng desktop Tauri hay không
    const isTauri = typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined;

    if (isTauri) {
      console.log('[StorageManager] Phát hiện môi trường Tauri Desktop. Nạp SQLite Driver...');
      // Tạm thời dùng Dexie làm fallback cho đến khi SQLite Driver được viết hoàn thiện
      this.activeDriver = new DexieDriver();
    } else {
      console.log('[StorageManager] Phát hiện môi trường Web/PWA. Nạp IndexedDB (Dexie) Driver...');
      this.activeDriver = new DexieDriver();
    }

    await this.activeDriver.init();
    return this.activeDriver;
  }

  /**
   * Lấy driver đang hoạt động
   */
  getDriver(): IStorageDriver {
    if (!this.activeDriver) {
      throw new Error('[StorageManager] Driver chưa được khởi tạo! Vui lòng gọi init() trước.');
    }
    return this.activeDriver;
  }
}

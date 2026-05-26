import React, { createContext, useContext, useEffect, useState } from "react";
import type { IKernelAPI } from "@teamate/kernel";
import { MockKernel } from "@teamate/kernel";

const KernelContext = createContext<IKernelAPI | null>(null);

export const KernelProvider: React.FC<{
    kernel?: IKernelAPI;
    children: React.ReactNode;
}> = ({ kernel, children }) => {
    const [activeKernel, setActiveKernel] = useState<IKernelAPI | null>(
        kernel || null,
    );

    useEffect(() => {
        if (!activeKernel) {
            const mock = new MockKernel();
            setActiveKernel(mock);
        }
    }, [activeKernel]);

    if (!activeKernel) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-white font-sans">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-slate-400 font-medium">
                        Đang khởi tạo Kernel...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <KernelContext.Provider value={activeKernel}>
            {children}
        </KernelContext.Provider>
    );
};

export const useKernel = () => {
    const context = useContext(KernelContext);
    if (!context) {
        throw new Error("useKernel phải được đặt bên trong KernelProvider");
    }
    return context;
};

"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  title: string;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export default function DeleteModal({
  isOpen,
  title,
  itemName,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-workshop-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-studio-card border-2 border-workshop-black max-w-md w-full p-6 shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between pb-4 border-b border-studio-border mb-4">
          <div className="flex items-center gap-2 text-signal-orange">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-display font-black text-lg uppercase tracking-tight text-workshop-black">
              {title}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="text-concrete hover:text-workshop-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="font-sans text-sm text-workshop-black/80 mb-6">
          Apakah Anda yakin ingin menghapus item{" "}
          <strong className="text-workshop-black">&quot;{itemName}&quot;</strong>? Tindakan ini tidak dapat dibatalkan.
        </p>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-studio-border">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 bg-studio-muted text-workshop-black font-mono text-xs font-bold hover:bg-studio-border transition-colors"
          >
            BATAL
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-signal-orange text-white font-mono text-xs font-bold hover:bg-signal-hover transition-colors disabled:opacity-50"
          >
            {isDeleting ? "MENGHAPUS..." : "YA, HAPUS PERMANEN"}
          </button>
        </div>
      </div>
    </div>
  );
}

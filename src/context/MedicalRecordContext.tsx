import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MedicalRecord, MedicalRecordCategory, MedicalRecordMediaType } from '../types';

const RECORDS_KEY = '@fitpro/medical_records';

const recordsDir = new Directory(Paths.document, 'medical-records');

function ensureDir() {
  if (!recordsDir.exists) {
    recordsDir.create({ intermediates: true, idempotent: true });
  }
}

interface MedicalRecordContextValue {
  records: MedicalRecord[];
  loading: boolean;
  addRecord: (input: {
    pickedUri: string;
    mediaType: MedicalRecordMediaType;
    category: MedicalRecordCategory;
    title: string;
    note?: string;
    fileName?: string;
  }) => Promise<MedicalRecord>;
  deleteRecord: (id: string) => Promise<void>;
  countByCategory: (category: MedicalRecordCategory) => number;
}

const MedicalRecordContext = createContext<MedicalRecordContextValue | undefined>(undefined);

export function MedicalRecordProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        ensureDir();
        const raw = await AsyncStorage.getItem(RECORDS_KEY);
        if (raw) setRecords(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next: MedicalRecord[]) => {
    const sorted = [...next].sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
    setRecords(sorted);
    await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(sorted));
  }, []);

  const addRecord = useCallback(
    async ({
      pickedUri,
      mediaType,
      category,
      title,
      note,
      fileName,
    }: {
      pickedUri: string;
      mediaType: MedicalRecordMediaType;
      category: MedicalRecordCategory;
      title: string;
      note?: string;
      fileName?: string;
    }) => {
      ensureDir();
      const extensionMatch = pickedUri.match(/\.(\w+)(\?.*)?$/);
      const defaultExt = mediaType === 'video' ? 'mp4' : mediaType === 'pdf' ? 'pdf' : 'jpg';
      const extension = extensionMatch ? extensionMatch[1] : defaultExt;
      const safeFileName = fileName?.replace(/[^\w.\-() ]/g, '_');
      const storedName = safeFileName && mediaType === 'pdf' ? safeFileName : `medical-${Date.now()}.${extension}`;

      const sourceFile = new File(pickedUri);
      const destFile = new File(recordsDir, storedName);
      sourceFile.copy(destFile);

      const newRecord: MedicalRecord = {
        id: `medical-${Date.now()}`,
        uri: destFile.uri,
        mediaType,
        category,
        title: title.trim(),
        note: note?.trim() || undefined,
        fileName: fileName || storedName,
        dateISO: new Date().toISOString(),
      };
      await persist([newRecord, ...records]);
      return newRecord;
    },
    [records, persist]
  );

  const deleteRecord = useCallback(
    async (id: string) => {
      const target = records.find((r) => r.id === id);
      if (target) {
        try {
          const file = new File(target.uri);
          if (file.exists) file.delete();
        } catch {
          // Arquivo já pode ter sido removido — ignora.
        }
      }
      await persist(records.filter((r) => r.id !== id));
    },
    [records, persist]
  );

  const countByCategory = useCallback(
    (category: MedicalRecordCategory) => records.filter((r) => r.category === category).length,
    [records]
  );

  const value = useMemo<MedicalRecordContextValue>(
    () => ({ records, loading, addRecord, deleteRecord, countByCategory }),
    [records, loading, addRecord, deleteRecord, countByCategory]
  );

  return <MedicalRecordContext.Provider value={value}>{children}</MedicalRecordContext.Provider>;
}

export function useMedicalRecords() {
  const ctx = useContext(MedicalRecordContext);
  if (!ctx) throw new Error('useMedicalRecords must be used within a MedicalRecordProvider');
  return ctx;
}

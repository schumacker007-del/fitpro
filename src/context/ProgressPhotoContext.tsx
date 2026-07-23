import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ProgressPhoto } from '../types';

const PHOTOS_KEY = '@fitpro/progress_photos';

const photosDir = new Directory(Paths.document, 'progress-photos');

function ensureDir() {
  if (!photosDir.exists) {
    photosDir.create({ intermediates: true, idempotent: true });
  }
}

interface ProgressPhotoContextValue {
  photos: ProgressPhoto[];
  loading: boolean;
  /** Copia a imagem escolhida (câmera/galeria) para o armazenamento permanente do app e registra a entrada. */
  addPhoto: (input: { pickedUri: string; weightKg?: number; note?: string }) => Promise<ProgressPhoto>;
  deletePhoto: (id: string) => Promise<void>;
}

const ProgressPhotoContext = createContext<ProgressPhotoContextValue | undefined>(undefined);

export function ProgressPhotoProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        ensureDir();
        const raw = await AsyncStorage.getItem(PHOTOS_KEY);
        if (raw) setPhotos(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (next: ProgressPhoto[]) => {
    setPhotos(next);
    await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(next));
  }, []);

  const addPhoto = useCallback(
    async ({ pickedUri, weightKg, note }: { pickedUri: string; weightKg?: number; note?: string }) => {
      ensureDir();
      const extensionMatch = pickedUri.match(/\.(\w+)$/);
      const extension = extensionMatch ? extensionMatch[1] : 'jpg';
      const fileName = `progress-${Date.now()}.${extension}`;

      const sourceFile = new File(pickedUri);
      const destFile = new File(photosDir, fileName);
      sourceFile.copy(destFile);

      const newPhoto: ProgressPhoto = {
        id: `progress-${Date.now()}`,
        uri: destFile.uri,
        dateISO: new Date().toISOString(),
        weightKg,
        note,
      };
      const next = [newPhoto, ...photos].sort(
        (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
      );
      await persist(next);
      return newPhoto;
    },
    [photos, persist]
  );

  const deletePhoto = useCallback(
    async (id: string) => {
      const target = photos.find((p) => p.id === id);
      if (target) {
        try {
          const file = new File(target.uri);
          if (file.exists) file.delete();
        } catch {
          // Arquivo já pode ter sido removido — ignora.
        }
      }
      await persist(photos.filter((p) => p.id !== id));
    },
    [photos, persist]
  );

  const value = useMemo<ProgressPhotoContextValue>(
    () => ({ photos, loading, addPhoto, deletePhoto }),
    [photos, loading, addPhoto, deletePhoto]
  );

  return <ProgressPhotoContext.Provider value={value}>{children}</ProgressPhotoContext.Provider>;
}

export function useProgressPhotos() {
  const ctx = useContext(ProgressPhotoContext);
  if (!ctx) throw new Error('useProgressPhotos must be used within a ProgressPhotoProvider');
  return ctx;
}

import { 
  FirestoreDataConverter, 
  QueryDocumentSnapshot, 
  SnapshotOptions, 
  Timestamp, 
  serverTimestamp 
} from 'firebase/firestore';
import type { Scripture, Chapter, Verse } from '@/types/schema';

export const scriptureConverter: FirestoreDataConverter<Scripture> = {
  toFirestore(scripture: Scripture) {
    return {
      ...scripture,
      updatedAt: serverTimestamp(),
      // Ensure createdAt is only set if it exists, otherwise serverTimestamp (for new docs)
      createdAt: scripture.createdAt || serverTimestamp(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Scripture {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      slug: data.slug,
      title: data.title,
      category: data.category,
      yuga: data.yuga,
      description: data.description,
      author: data.author,
      coverImage: data.coverImage,
      tags: data.tags || [],
      isPublished: data.isPublished ?? false,
      createdAt: data.createdAt as Timestamp,
      updatedAt: data.updatedAt as Timestamp,
    };
  },
};

export const chapterConverter: FirestoreDataConverter<Chapter> = {
  toFirestore(chapter: Chapter) {
    return {
      ...chapter,
      updatedAt: serverTimestamp(),
      createdAt: chapter.createdAt || serverTimestamp(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Chapter {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      scriptureId: data.scriptureId,
      number: data.number,
      title: data.title,
      summary: data.summary,
      slug: data.slug,
      order: data.order,
      createdAt: data.createdAt as Timestamp,
      updatedAt: data.updatedAt as Timestamp,
    };
  },
};

export const verseConverter: FirestoreDataConverter<Verse> = {
  toFirestore(verse: Verse) {
    return {
      ...verse,
      updatedAt: serverTimestamp(),
      createdAt: verse.createdAt || serverTimestamp(),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Verse {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      scriptureId: data.scriptureId,
      chapterId: data.chapterId,
      number: data.number,
      content: data.content,
      transliteration: data.transliteration,
      meaning: data.meaning,
      audioUrl: data.audioUrl,
      order: data.order,
      createdAt: data.createdAt as Timestamp,
      updatedAt: data.updatedAt as Timestamp,
    };
  },
};

// Service pour gérer les articles
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const articleService = {
  // Créer un nouvel article
  createArticle: async (articleData) => {
    try {
      const docRef = await addDoc(collection(db, 'articles'), {
        ...articleData,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
        views: 0
      });
      return docRef.id;
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      throw error;
    }
  },

  // Récupérer tous les articles publiés
  getPublishedArticles: async () => {
    try {
      const q = query(
        collection(db, 'articles'),
        where('published', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération:', error);
      throw error;
    }
  },

  // Récupérer les articles par catégorie
  getArticlesByCategory: async (category) => {
    try {
      const q = query(
        collection(db, 'articles'),
        where('category', '==', category),
        where('published', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération par catégorie:', error);
      throw error;
    }
  },

  // Mettre à jour un article
  updateArticle: async (articleId, updateData) => {
    try {
      const articleRef = doc(db, 'articles', articleId);
      await updateDoc(articleRef, {
        ...updateData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  },

  // Supprimer un article
  deleteArticle: async (articleId) => {
    try {
      await deleteDoc(doc(db, 'articles', articleId));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw error;
    }
  },

  // Incrémenter les vues
  incrementViews: async (articleId) => {
    try {
      const articleRef = doc(db, 'articles', articleId);
      // Vous devrez utiliser increment() pour cela
      // await updateDoc(articleRef, {
      //   views: increment(1)
      // });
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation des vues:', error);
    }
  }
};
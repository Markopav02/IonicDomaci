import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  deleteDoc, 
  addDoc,
  query,
  updateDoc,
  getDocs,
  onSnapshot,
  getDoc,
  runTransaction
 } from '@angular/fire/firestore';
//import { query, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
export interface recipe{
  id:string,
  img?:String,
  naziv?:String,
  opis?:String,
  tezina?:String,
  omiljen:boolean,
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore ) { }
  getRecipes(recipeId: string) : Observable<any[]> {
    
    /*const recipeRef = collection(this.firestore, 'recipes');
    return collectionData(recipeRef, { idField: 'id' });*/
     // Kreiranje referencije na kolekciju
     const collectionRef = collection(this.firestore, 'recipes');
     console.log('Firestore instanca:', this.firestore);
     console.log('Referenca na kolekciju:', collectionRef);
     // Pravljenje query-ja (ako treba filtrirati ili sortirati)
     const recipesQuery = query(collectionRef);
     console.log('Query:', recipesQuery);
     // Dohvatanje podataka kao Observable
     return collectionData(recipesQuery, { idField: 'id' });
  }
  async addRecipe(recipe: recipe) {
    /*const recipeRef = collection(this.firestore, 'recipes');
    return addDoc(recipeRef, recipe); */
    const recipeRef = await addDoc(collection(this.firestore, 'recipes'), recipe);
    recipe.id = recipeRef.id; // Sačuvajte generisani ID u objektu recepta
  return recipeRef;
}
updateRecipe(recipe: recipe) {
  if (!recipe.id) {
    throw new Error('Recipe ID is required for update');
  }
  const recipeRef = doc(this.firestore, `recipes/${recipe.id}`);
  return updateDoc(recipeRef, {
   id:recipe.id,
   img:recipe.img,
   naziv:recipe.naziv,
   opis:recipe.opis,
   tezina:recipe.tezina,
   omiljen:recipe.omiljen
  });
}
  async deleteRecipe(recipe: recipe, callback: (recipes: recipe[]) => void) {
  /*const recipeRef = doc(this.firestore, `recipes/${recipe.id}`);
  return deleteDoc(recipeRef);*/
 /*const recipeRef = doc(this.firestore, `recipes/${recipe.id}`);
  try {
    await deleteDoc(recipeRef);
    console.log('Recept obrisan:', recipe.id,recipe.naziv);
  } catch (error) {
    console.error('Greška pri brisanju recepta:', error);
  }*/
 // Pretpostavljamo da `recipe.id` sadrži ispravan ID dokumenta iz Firebase-a
 /*const recipeRef = doc(this.firestore, `recipes/${recipe.id}`);
 try {
   const docSnapshot = await getDoc(recipeRef);
   if (docSnapshot.exists()) {
     await deleteDoc(recipeRef);
     console.log('Recept obrisan:', recipe.id);
   } else {
     console.log('Recept ne postoji:', recipe.id);
   }
 } catch (error) {
   console.error('Greška pri brisanju recepta:', error);
 }*/
   const recipeRef = doc(this.firestore, `recipes/${recipe.id}`);
    console.log('Pokušaj brisanja recepta ciji je ID:', recipe.id); // Dodajte log za ID
    try {
      await runTransaction(this.firestore, async (transaction) => {
        const docSnapshot = await transaction.get(recipeRef);
        if (docSnapshot.exists()) {
          transaction.delete(recipeRef);
          console.log('Recept obrisan:', recipe.id, recipe.naziv);
          
          // Nakon brisanja, ponovo učitajte recepte i pozovite callback funkciju
          const collectionRef = collection(this.firestore, 'recipes');
          onSnapshot(collectionRef, (snapshot) => {
            const recipes = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as recipe[];
            callback(recipes); // pozivanje callback funkcije sa novim podacima
          });
        } else {
          console.log('Recept ne postoji:', recipe.id);
        }
      });
    } catch (error) {
      console.error('Greška pri brisanju recepta:', error);
    }
}


async getRecipesDirect(callback: (recipes: recipe[]) => void) {
  /*const collectionRef = collection(this.firestore, 'recipes');
  const snapshot = await getDocs(collectionRef);
  const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log('Recepti (direct):', recipes);
  return recipes;*/
  const collectionRef = collection(this.firestore, 'recipes');
    
    // onSnapshot prati promene u kolekciji i poziva callback funkciju
    onSnapshot(collectionRef, (snapshot) => {
      const recipes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        
      })) as unknown as recipe[];
      
      callback(recipes); // pozivanje callback funkcije sa novim podacima
    });
}

}

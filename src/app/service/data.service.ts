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
  onSnapshot
 } from '@angular/fire/firestore';
//import { query, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
export interface recipe{
  id:number,
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
  getRecipes() : Observable<any[]> {
    
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
  addRecipe(recipe: recipe) {
    const recipeRef = collection(this.firestore, 'recipes');
    return addDoc(recipeRef, recipe); 
}
updateRecipe(recipe: recipe) {
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
  async deleteRecipe(recipe: recipe) {
  /*const recipeRef = doc(this.firestore, `recipes/${recipe.id}`);
  return deleteDoc(recipeRef);*/
  const recipeRef = doc(this.firestore, `recipes/${recipe.id}`);
  try {
    await deleteDoc(recipeRef);
    console.log('Recept obrisan:', recipe.id);
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

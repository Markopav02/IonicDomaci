import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  deleteDoc, 
  addDoc
 } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
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
  getRecipes() {
    const recipeRef = collection(this.firestore, 'recipes');
    return collectionData(recipeRef, { idField: 'id' });
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
deleteRecipe(recipe: recipe) {
  const recipeRef = doc(this.firestore, `recipes/${recipe.id}`);
  return deleteDoc(recipeRef);
}

}

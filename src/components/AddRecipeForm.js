import React, { useState, useEffect } from 'react';
import { Form, Link } from 'react-router-dom'; 
import classes from '../css/AddRecipeForm.module.css';
import CategoryFetcher from './CategoryFetcher';
import DietaryFetcher from './DietaryFetcher';

function AddRecipeFormPage({ onSubmit, ingredients, steps }) { 
  const [localIngredients, setLocalIngredients] = useState(ingredients || [{ name: '', unit: '' }]);
  const [localSteps, setLocalSteps] = useState(steps || ['']);

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...localIngredients];
    list[index][name] = value;
    setLocalIngredients(list);
  };

  const handleStepChange = (index, event) => {
    const list = [...localSteps];
    list[index] = event.target.value;
    setLocalSteps(list);
  };



  const handleAddIngredient = () => {
    setLocalIngredients([...localIngredients, { name: '', unit: '' }]);
  };

  const handleAddStep = () => {
    setLocalSteps([...localSteps, '']);
  };

  const handleDeleteIngredient = index => {
    if (localIngredients.length > 1) {
      const list = [...localIngredients];
      list.splice(index, 1);
      setLocalIngredients(list);
    }
  };

  const handleDeleteStep = index => {
    if (localSteps.length > 1) {
      const list = [...localSteps];
      list.splice(index, 1);
      setLocalSteps(list);
    }
  };

  

  const handleSubmit = event => {
    event.preventDefault(); 
    const form = event.target; 
    const formData = new FormData(form); 
    onSubmit(formData, localSteps); 
  };

  const handleReset = () => {
    setLocalIngredients([{ name: '', unit: '' }]);
    setLocalSteps(['']);
  };

  return (
    <>
      <Form method='post' className={classes.form} onSubmit={handleSubmit} onReset={handleReset}>
      <div className={classes.formBackground}>
        <h1>Provide Recipe Details</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" required />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input id="description" type="text" name="description" required />
        </div>
        <div>
          <label htmlFor="preparationTime">Preparation Time</label>
          <input id="preparationTime" type='number' name="preparationTime"  required />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input id="comment" type='text' name="comment"   />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" required>
            <option value="">Select a category</option>
           <CategoryFetcher/>
          </select>
        </div>

        <div>
          <label htmlFor="dietary">Dietary</label>
          <select id="dietary" name="dietary" required>
            <option value="">Select a Dietary</option>
           <DietaryFetcher/>
          </select>
        </div>


        {/* Ingredients */}
        {localIngredients.map((ingredient, index) => (
          <div key={index} className={classes.inputRow}>
            <input
              type="text"
              name="name"
              value={ingredient.name}
              onChange={e => handleIngredientChange(index, e)}
              placeholder="Ingredient"
              required 
            />
            <input
              type="text"
              name="unit"
              value={ingredient.unit}
              onChange={e => handleIngredientChange(index, e)}
              placeholder="Unit of Measurement"
              required 
            />
            {localIngredients.length > 1 && (
              <button type="button" onClick={() => handleDeleteIngredient(index)}>Delete</button>
            )}
            {index === localIngredients.length - 1 && (
              <button type="button" onClick={handleAddIngredient}>+</button>
            )}
          </div>
        ))}

        {/* Steps */}
        {localSteps.map((step, index) => (
          <div key={index} className={classes.inputRow}>
            <textarea
              name={`step${index + 1}`} 
              value={step}
              onChange={e => handleStepChange(index, e)}
              placeholder={`Step ${index + 1}`}
              required 
            />
            {localSteps.length > 1 && (
              <button type="button" onClick={() => handleDeleteStep(index)}>Delete</button>
            )}
            {index === localSteps.length - 1 && (
              <button type="button" onClick={handleAddStep}>+</button>
            )}
          </div>
        ))}
        
        <div className={classes.actions}>
          <button type="submit">Save</button>
          <button type="reset">Cancel</button>
        </div>
        </div>
      </Form>
    </>
  );
}

export default AddRecipeFormPage;

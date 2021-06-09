import React, { useEffect,useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = 'c188e86d';
  const APP_KEY = '5bf73702bca9f154cb21bf4e55022356';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('Chicken');
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    getRecipes();

  }, [query]);


  const getRecipes = async () => {
    setLoading(true)
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    setLoading(false)
    console.log(data.hits);

  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <h1>Simple Kitchen Recipes</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      {loading ? 'Loading' : 
      <div className="recipes">
      {recipes.length === 0 ? <h1>No Data Found</h1> : recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredientLines}
        />
      ))}
      </div>
    }
    </div>
  );
}

export default App;

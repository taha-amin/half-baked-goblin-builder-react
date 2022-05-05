import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import GoblinForm from './GoblinForm';
import GoblinList from './GoblinList';
import Goblin from './Goblin';

function App() {
  /* 
    track: 
      allGoblins, an array of all goblins
      filteredGoblins, a second array of goblins: this one is the filtered version of the above allGoblins array
      goblinFormName, which is how we track the user input for the current name of the goblin in the form
      goblinFormHP, which is how we track the user input for the current HP of the goblin in the form
      goblinFormColor, which is how we track the user input for the current color of the goblin in the form
*/

  // track allGoblins, an array of all goblins
  const [allGoblins, setAllGoblins] = useState([]);

  // filteredGoblins, a second array of goblins: this one is the filtered version of the above allGoblins array
  const [filteredGoblins, setAllFilteredGoblins] = useState([]);

  // goblinFormName, which is how we track the user input for the current name of the goblin in the form
  const [goblinFormName, setGoblinFormName] = useState('');

  // goblinFormHP, which is how we track the user input for the current HP of the goblin in the form
  const [goblinFormHP, setGoblinFormHP] = useState('');

  //goblinFormColor, which is how we track the user input for the current color of the goblin in the form
  const [goblinFormColor, setGoblinFormColor] = useState('lightgreen');

  const [filterQuery, setFilterQuery] = useState('');

  // useEffect(()) that watches for all goblins to change and when it does, call handleFilterGoblins
  useEffect(() => handleFilterGoblins(filterQuery), [filterQuery]); //eslint-disable-line

  function submitGoblin(e) {
    e.preventDefault();

    // on submit, make a new goblin object with a name that comes from the form state, an hp that comes from the form state, and a color that comes from the form state
    const newGoblin = {
      name: goblinFormName,
      hp: goblinFormHP,
      color: goblinFormColor,
    };

    // update the allGoblins array. Add the new goblin to the allGoblins array immutably.
    setAllGoblins([...allGoblins, newGoblin]);

    // clear out the goblin form state items by setting them to empty strings. This will cause the form to reset in the UI.
    setGoblinFormName('');
    setGoblinFormHP('');
    setGoblinFormColor('lightgreen');
  }

  function handleDeleteGoblin(name) {
    // find the index of the goblin in allGoblins with this name
    const goblinIndex = allGoblins.findIndex((goblin) => goblin.name === name);

    // use splice to delete the goblin object at this index
    allGoblins.splice(goblinIndex, 1);

    // update the allGoblins array immutably to this new, smaller array
    //setAllGoblins([...allGoblins]);
    setAllFilteredGoblins([...allGoblins]);
  }

  function handleFilterGoblins(search) {
    // use the filter method to get an array of goblins whose name includes this search argument
    const searchGoblins = allGoblins.filter((goblin) => goblin.name.includes(search));

    // if there is a search argument, set the filtered goblins to the filtered goblins
    // if the search argument is undefined, set the filtered goblins in state to just be the array of all goblins
    search ? setAllFilteredGoblins(searchGoblins) : setAllFilteredGoblins(allGoblins);
  }

  return (
    <div className="App">
      <div className="current-goblin quarter">
        <Goblin
          goblin={{
            /* 
            use the goblin form state to make a goblin object and to display it. 
            This will let the user see the current form state
              */
            name: goblinFormName,
            hp: goblinFormHP,
            color: goblinFormColor,
          }}
        />
      </div>
      <div className="goblin-filter quarter">
        Filter Goblins
        {/* note that handleFilterGoblins is defined upstairs. This is where the allGoblins array gets filtered */}
        <input onChange={(e) => setFilterQuery(e.target.value)} />
      </div>
      <GoblinForm
        /*
        This component takes in a ton of props! 
        Here is the list of props to pass:
          submitGoblin,
          goblinFormName, 
          setGoblinFormName,
          goblinFormColor, 
          setGoblinFormColor,
          goblinFormHP, 
          setGoblinFormHP,
        */
        submitGoblin={submitGoblin}
        goblinFormName={goblinFormName}
        setGoblinFormName={setGoblinFormName}
        goblinFormColor={goblinFormColor}
        setGoblinFormColor={setGoblinFormColor}
        goblinFormHP={goblinFormHP}
        setGoblinFormHP={setGoblinFormHP}
      />
      <GoblinList
        goblins={filterQuery ? filteredGoblins : allGoblins} // this takes in an array of goblins. If the filteredGoblins has a length, use that array. Otherwise, use the allGoblins array
        handleDeleteGoblin={handleDeleteGoblin} // note that the goblin list has access to the ability to delete
      />
    </div>
  );
}

export default App;

import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import './App.css'
import {useEffect, useState} from "react";
import AddItem from "./components/AddItem.jsx";
import SearchItem from "./components/SearchItem.jsx";
import apiRequest from "./apiRequest.js";

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [search, setSearch] = useState('');
    const [fetchError, setFetchError] = useState(null);

    const API_URL = 'http://localhost:3500/items';

    useEffect(() => {
        const fetchItems = async () => {
            try{
                const response = await fetch(API_URL);
                if(!response.ok){
                    throw new Error("Could not find items.");
                }
                const listItems = await response.json();
                console.log(listItems)
                setItems(listItems);
                setFetchError(null);
            }catch(e){
                setFetchError(e.message);
            }
        }
        (async () => await fetchItems()) ()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newItem) return;
        const string = newItem.trim().toLowerCase();
        addItem(string.charAt(0).toUpperCase() + string.slice(1));
        setNewItem('');
    }

    const addItem = async (item) => {
        const id = items.length ? Number(items[items.length - 1].id) + 1 : 1;
        const myNewItem = {
            id: id.toString(),
            checked: false,
            item
        }
        const newListItems = [...items, myNewItem];
        setItems(newListItems);

        const postOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myNewItem)
        }

        const result = await apiRequest(API_URL, postOption);
        if(result) setFetchError(result);
    }

    const handleCheck = async (id) => {
        const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item)
        setItems(listItems)

        const myItem = listItems.filter((item) => item.id === id);

        const updateOption = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({checked: myItem[0].checked})
        }
        const requestUrl = `${API_URL}/${id}`;
        const result = await apiRequest(requestUrl, updateOption);
        if(result) setFetchError(result);
    }

    const handleDelete = async (id) => {
        const listItems = items.filter((item) => item.id !== id)
        setItems(listItems)

        const deleteOption = {method: "DELETE"};
        const requestUrl = `${API_URL}/${id}`;
        const result = await apiRequest(requestUrl, deleteOption);
        if(result) setFetchError(result);
    }

  return (
    <div className="App">
        <Header title="Groceries list"/>
        <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
        <SearchItem search={search} setSearch={setSearch} />
        {fetchError && <p style={{color: 'red'}}>{`Error: ${fetchError}`}</p>}
        <Content
            items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
        />
        <Footer length={items.length}/>
    </div>
  )
}

export default App
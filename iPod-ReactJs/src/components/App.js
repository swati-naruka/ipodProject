import { useEffect, useState } from "react";
import '../assets/css/App.css';
import Controller from './Controller';
import Display from './Display';
import ZingTouch from 'zingtouch';

// global variables
let index = 0,
  range = 0,
  visibility = true,
  selectItem;

function App() {
  //use state hooks
  const [list, setList] = useState([
    { listItem: "Playlist", flag: true, id: 0 },
    { listItem: "Songs", flag: false, id: 1 },
    { listItem: "Games", flag: false, id: 2 },
    { listItem: "Workout", flag: false, id: 3 },
    { listItem: "Spiritual", flag: false, id: 4 },
    { listItem: "Settings", flag: false, id: 5 },
  ]);

  // use state hooks for activeItem
  const [activeItem, setActiveItem] = useState([]);

  // use effect hooks
  useEffect(() => {
    // select circular button
    let circularButton = document.getElementById("circular-btn");
    let activeRegion = new ZingTouch.Region(circularButton); //create touch Region
    activeRegion.bind(circularButton, "rotate", function (event) {
      range += Math.floor(event.detail.distanceFromLast);

      if (range > 70) {
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, flag: true };
            } else {
              return { ...item, flag: false };
            }
          });
        });
        index++;
        range = 0;

        if (index === 6 ) {
          index = 0;
        }
      } else if (range < -100) {
        index--;

        if (index < 0) {
          index = 5;
        }
        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === index) {
              return { ...item, flag: true };
            } else {
              return { ...item, flag: false };
            }
          });
        });
        range = 0;
      }
    });
  }, []);

  //Handle selective listItem ok button position at center inside the circural button
  const handleSelect = () => {
    if(document.getElementsByClassName('hide').length===1){
      return;
    }
    selectItem = list.filter((item) => item.flag === true);
    const title = selectItem[0].listItem;

    if (title === "Songs") {
      setActiveItem({
        ...selectItem,
        src: "https://preview.redd.it/iil-spooky-sounds-or-themes-in-songs-like-ive-got-going-v0-q6md664imss91.jpg?width=640&crop=smart&auto=webp&s=4dcfc312656f367834198fc8ce40e1c58fc92f7c",
      });
    } else if (title === "Spiritual"){
      setActiveItem({
        ...selectItem,
        src: "https://www.softpaz.com/themescreenshots/spiritual/12.png",
      });
    } else if (title === "Workout") {
      setActiveItem({
        ...selectItem,
        src: "https://cdn.dribbble.com/users/2358228/screenshots/4711206/image.png",
      });
    } else if (title === "Games") {
      setActiveItem({
        ...selectItem,
        src: "https://www.brickfanatics.com/wp-content/uploads/LEGO-Games-new-logo-featured.jpg",
      });
    } else if (title === "Playlist") {
      setActiveItem({
        ...selectItem,
        src: "https://i.pinimg.com/736x/19/0a/09/190a09403d0b4144c6551c808258c838.jpg",
      });
    } else if (title === "Settings") {
      setActiveItem({
        ...selectItem,
        src: "https://cdn.icon-icons.com/icons2/1141/PNG/96/1486395874-settings_80622.png",
      });
    }

    visibility = false;
  };

  // handle menu button (it's uses for previous path)
  const handleMenu = () => {
    let sideMenu = document.getElementById("side-menu");
    if(visibility){
      sideMenu.classList.toggle('hide');
    }
    visibility = true;
    setActiveItem([]);
  };

  //Render Function
  return (
    <>
    <div className="App">
      {/* Display component */}
      <Display list={list} visibility={visibility} activeItem={activeItem}/>
      {/* Control Component */}
      <Controller handleSelect={handleSelect} handleMenu={handleMenu}/>
    </div>
    </>
  );
  
}

export default App;
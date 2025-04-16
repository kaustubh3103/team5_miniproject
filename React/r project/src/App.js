import React, { useState, useRef, useEffect } from 'react';
import {
  FaSearch,
  FaCaretDown,
  FaCalendarAlt,
  FaCommentDots,
  FaBell,
  FaUsers,
  FaUserCircle
} from "react-icons/fa";
import './App.css';

const App = () => {
  
  const [isDropdownVisible, setDropdownVisible] = useState({
    location: false,
    teamSize: false,
    stage: false,
    categories: false,
  });

  
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    location: [],
    teamSize: [],
    stage: [],
  });

 
  const dropdownRefs = {
    categories: useRef(null),
    location: useRef(null),
    teamSize: useRef(null),
    stage: useRef(null),
  };


  const toggleDropdown = (dropdown) => {
    console.log(`Toggling ${dropdown}`);
    setDropdownVisible((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

 
  const handleOutsideClick = (event) => {
    Object.keys(dropdownRefs).forEach((key) => {
      if (
        dropdownRefs[key].current &&
        !dropdownRefs[key].current.contains(event.target) &&
        isDropdownVisible[key] 
      ) {
        console.log(`Outside click: Closing ${key}`);
        setDropdownVisible((prev) => ({ ...prev, [key]: false }));
      }
    });
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isDropdownVisible]); 

 
  const handleCheckboxChange = (filterType, value) => {
    console.log(`Checkbox change: filterType=${filterType}, value=${value}`);
    setSelectedFilters((prev) => {
      const current = prev[filterType];
      if (current.includes(value)) {
        return {
          ...prev,
          [filterType]: current.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [filterType]: [...current, value],
        };
      }
    });
  };

return (
        <div>
          
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <img src="/images/projectoryLogo.png" alt="Projectory" />
                        <h1>Projectory</h1>
                    </div>

                    <ul className="nav-links">
                        <div className="explore-competition">
                            <li><a href="#" className="explore-btn">EXPLORE</a></li>
                            <li><a href="#" className="competition-btn">COMPETITION</a></li>
                        </div>
                        <li><a href="FaqsFeedback.html">FAQs & Feedback</a></li>
                        <li><a href="https://solvearn.net/blog" target="_blank" rel="noopener noreferrer">Blogs</a></li>
                    </ul>

                   
                    <div className="search-box">
                        <FaSearch />
                        <input type="text" placeholder="Search Profiles" />
                        <FaCaretDown />
                    </div>

                    <div className="right-buttons">
                        <button className="icon-btn" aria-label="Calendar"><FaCalendarAlt /></button>
                        <button className="icon-btn" aria-label="Comments"><FaCommentDots style={{ color: '#FFD43B' }} /></button>
                        <button className="icon-btn" aria-label="Notifications"><FaBell style={{ color: '#63E6BE' }} /></button>
                        <button className="icon-btn" aria-label="Users"><FaUsers style={{ color: '#B197FC' }} /></button>
                    </div>

                    <FaUserCircle aria-label="User Profile" />
                </nav>
            </header>

            
            <main>
                
                <nav id="navbar2">
                    <div id="projectSearch">
                        
                        <form>
                            <label htmlFor="project" className="sr-only">Search for a specific project</label>
                            <FaSearch id="searchicon" />
                            <input type="text" placeholder="Search for a specific project" id="project" />
                            <input type="reset" value="×" onClick={() => document.getElementById('project').value = ''} />
                        </form>

                        
                        <div id="filter-btn">
                            <h2>Filter By :</h2>
                          
                            <a href="projects.html" className="btn-filter" id="yourProject">My Project</a>

                           
                            <div ref={dropdownRefs.categories} className="dropdown">
                                <button
                                    className="btn-filter"
                                    onClick={() => toggleDropdown('categories')}
                                    aria-expanded={isDropdownVisible.categories}
                                    aria-controls="categories-dropdown"
                                >
                                    Categories <FaCaretDown />
                                </button>
                                {isDropdownVisible.categories && (
                                    <div className="dropdown-content" id="categories-dropdown">
                                        <div className="dropdown-header">
                                            <span>Categories</span>
                                            <span className="close-btn" onClick={() => toggleDropdown('categories')}>×</span>
                                        </div>
                                        <table>
                                            <tbody>
                                                {["Artificial Intelligence", "Cyber Security", "Education", "Fitness", "Marketing"].map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                id={`categories-${index}`}
                                                                checked={selectedFilters.categories.includes(item)}
                                                                onChange={() => handleCheckboxChange('categories', item)}
                                                            />
                                                            <label htmlFor={`categories-${index}`}>{item}</label>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            <div ref={dropdownRefs.location} className="dropdown">
                                <button
                                    className="btn-filter"
                                    onClick={() => toggleDropdown('location')}
                                    aria-expanded={isDropdownVisible.location}
                                    aria-controls="location-dropdown"
                                >
                                    Location <FaCaretDown />
                                </button>
                                {isDropdownVisible.location && (
                                    <div className="dropdown-content" id="location-dropdown">
                                        <div className="dropdown-header">
                                            <span>Location</span>
                                            <span className="close-btn" onClick={() => toggleDropdown('location')}>×</span>
                                        </div>
                                        <table>
                                            <tbody>
                                                {["Africa", "Asia", "Europe"].map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                id={`location-${index}`}
                                                                checked={selectedFilters.location.includes(item)}
                                                                onChange={() => handleCheckboxChange('location', item)}
                                                            />
                                                            <label htmlFor={`location-${index}`}>{item}</label>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            <div ref={dropdownRefs.teamSize} className="dropdown">
                                <button
                                    className="btn-filter"
                                    onClick={() => toggleDropdown('teamSize')}
                                    aria-expanded={isDropdownVisible.teamSize}
                                    aria-controls="teamSize-dropdown"
                                >
                                    Team Size <FaCaretDown />
                                </button>
                                {isDropdownVisible.teamSize && (
                                    <div className="dropdown-content" id="teamSize-dropdown">
                                        <div className="dropdown-header">
                                            <span>Team Size</span>
                                            <span className="close-btn" onClick={() => toggleDropdown('teamSize')}>×</span>
                                        </div>
                                        <table>
                                            <tbody>
                                                {["Team of One", "Team of Two", "Team of Three"].map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                id={`teamSize-${index}`}
                                                                checked={selectedFilters.teamSize.includes(item)}
                                                                onChange={() => handleCheckboxChange('teamSize', item)}
                                                            />
                                                            <label htmlFor={`teamSize-${index}`}>{item}</label>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            <div ref={dropdownRefs.stage} className="dropdown">
                                <button
                                    className="btn-filter"
                                    onClick={() => toggleDropdown('stage')}
                                    aria-expanded={isDropdownVisible.stage}
                                    aria-controls="stage-dropdown"
                                >
                                    Stage <FaCaretDown />
                                </button>
                                {isDropdownVisible.stage && (
                                    <div className="dropdown-content" id="stage-dropdown">
                                        <div className="dropdown-header">
                                            <span>Stage</span>
                                            <span className="close-btn" onClick={() => toggleDropdown('stage')}>×</span>
                                        </div>
                                        <table>
                                            <tbody>
                                                {["Idea Stage", "Building MVP", "MVP Stage"].map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                id={`stage-${index}`}
                                                                checked={selectedFilters.stage.includes(item)}
                                                                onChange={() => handleCheckboxChange('stage', item)}
                                                            />
                                                            <label htmlFor={`stage-${index}`}>{item}</label>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {}
                <section id="featuredProjects">
                    <div id="header">
                        <h3>Featured Projects</h3>
                        <button className="sideArrow" aria-label="Previous">&#60;</button>
                        <button className="sideArrow" aria-label="Next">&#62;</button>
                    </div>
                    <div className="card-container">
                        {[1, 2, 3, 4, 5, 6].map((card, index) => (
                            <div className="card" key={index}>
                                <div className="card-image">
                                    <img src="https://cdna.artstation.com/p/assets/images/images/006/730/614/large/matias-toloza-finalrender1.jpg" alt="project" />
                                </div>
                                <div className="cardHeader">
                                    <p><b>Description:</b> SkillForge is an AI-powered platform...</p>
                                    <p><b>Category:</b> Education</p>
                                    <p><b>Date Posted:</b> February 27th</p>
                                </div>
                                <div className="applySection">
                                    <a href="Applyform.html" className="applyNowBtn" target="_blank" rel="noopener noreferrer">Apply For This Project</a>
                                </div>
                                <div className="cardTab">
                                    <button className="tabBtn">Team Members</button>
                                    <button className="tabBtn">Details</button>
                                    <button className="tabBtn">Comments</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default App;

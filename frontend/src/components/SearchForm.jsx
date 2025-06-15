import React from 'react';
import group from '../assets/img/Group.png'
const SearchForm = ({ cat , align , search , setsearch , handleSearch }) => {

const handleSearchInput = (e) => {
  let {name , value} = e.target;
  setsearch({ ...search, [name]: value });
}

if(cat==''){
  cat='all'
}

console.log(cat)

  return (
    <>

      <form style={{ "border": "1px solid #fff", "boxShadow": "3px 2px 5px rgba(0, 0, 0, 0.25)" }} className={`projectSearchForm py-5 w-full  ${align ? 'd-flex flex-column justify-content-start align-items-start col-md-4 ' : ''} `}>
        
        <div className={` projectSearchFormInputs ${align ? 'd-flex flex-column ' : ''} `} >
          <div className="inputCon w-100">
            <input onChange={handleSearchInput} name="search" type="text" placeholder="Keyword" />
            <img src={group} alt="Search Icon" />
          </div>
          <div className="inputCon my-2 w-100">
            <select onChange={handleSearchInput} name="cat" id="">
              <option defaultValue value="all">all</option>
              <option { ...("Artificial Intelligence".includes(cat)) ? {"selected" : "true"} : {"" : ""}  } value="Artificial Intelligence">Artificial Intelligence</option>
              <option { ...("App & Web Developer".includes(cat)) ? {"selected" : "true"} : {"" : ""}  } value="App & Web Developer">App & Web Developer</option>
              <option { ...("UI/UX Graphic Designer".includes(cat)) ? {"selected" : "true"} : {"" : ""}  } value="UI/UX Graphic Designer">UI/UX Graphic Designer</option>
              <option { ...("Electronic".includes(cat)) ? {"selected" : "true"} : {"" : ""}  } value="Electronic">Electronic</option>
              <option { ...("Interior".includes(cat)) ? {"selected" : "true"} : {"" : ""}  } value="Interior">Interior</option>
              <option { ...("Architectural & Construction".includes(cat)) ? {"selected" : "true"} : {"" : ""}  } value="Architectural & Construction">Architectural & Construction</option>
              <option { ...("Interior Design".includes(cat)) ? {"selected" : "true"} : {"" : ""}  } value="Interior Design">Interior Design</option>
              <option { ...("Electrical".includes(cat)) ? {"selected" : "true"} : {"" : ""}  } value="Electrical">Electrical</option>
            </select>
          </div>
        </div>
        <input onClick={handleSearch} type="button" className="serchbtn" value="search" style={{ padding: '5px 45px' }} />
      </form>
    </>
  );
};

export default SearchForm;

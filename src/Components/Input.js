import React from "react";
import './styles.css'

const Input = ({ type = 'text' ,hint}) => {
    const inputType = type === 'password' ? 'password' : 'text';
  
    return (
      <div>
        <form>
          <input
            type={inputType} 
            placeholder={hint} 
            className="custom-input" 
          />
        </form>
      </div>
    );
  }
  
  export default Input;
  
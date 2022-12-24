function validateLength (txt){
    if(txt.length === 0){
        return false
    }
    return true
  }
  function validateNumber(txt){
    return Boolean(parseInt(txt))
  }

  function validateContactNumber(txt){
    if(txt.length === 10){
        return true
    }
    return false
  }
  function validateName(txt){
    let char_codes = txt.split('').map((items)=> items.charCodeAt())
    return char_codes.includes(32)
  }
  function validateEmail(txt){
    const regex_pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex_pattern.test(txt)
  }

export function validateInput(val, type){
    if(type=== "name"){
        return validateLength(val)&&validateName(val)
    }
    if(type === "mobile_number"){
        return validateLength(val) && validateNumber(val) && validateContactNumber(val)
    }
    if(type=== "email"){
        return validateLength(val)&&validateEmail(val)
    }
    if(type === "text"){
        return validateLength(val)
    }

  }
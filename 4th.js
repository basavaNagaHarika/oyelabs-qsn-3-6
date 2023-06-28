const person = {
    id : 1,
    gender : 'male'
    };
    const student = {
    name : "ravi" ,
    email :"ravi11@yopmail.com"
    };
    
    const details = {...person, ...student};
    
    console.log(details);
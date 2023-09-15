
export const getsender = (User,users) =>{
    let name =users[0].name
    console.log(name);
    return users[0]._id === User.id ? users[1]?.name : users[0]?.name;
}
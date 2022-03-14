const productList = [
    {price:1, quantity:3},
    {price:3, quantity:2},
    {price:2, quantity:3},

]

const sum =(t, p)=>{
    return t + p.price*p.quantity
}
const total = productList.reduce(sum, 0)

console.log(total)
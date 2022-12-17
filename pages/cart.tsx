
import { useState,useEffect } from 'react'

interface LineItem {
  id: string
  item: string,
  quantity: number,
  price: number

}


const shopItems: LineItem[] = [
    {
        id: '101',
        item: 'doll',
        quantity: 3,
        price: 3499
    },
    {
        id: '307',
        item: 'robot',
        quantity: 1,
        price: 199
    },
    {
        id: '299',
        item: 'cloth',
        quantity: 2,
        price: 150
    }
];


const core: React.FC = function () {
    const [cart, setCart] = useState<LineItem[]>([]);

      for(let i =0; i< shopItems.length; i++){
        setCart([...cart, { id: shopItems[i].id, item: shopItems[i].item, quantity: shopItems[i].quantity, price: shopItems[i].price}]);
      }
        


    function removeItem(index: number) {
        cart.splice(index, 1);
        setCart([...cart]);
    }

    function onQuanChange(index: number, value: number) {
        cart[index].quantity = value;
        setCart([...cart]);
    }

    function clearCart() {
        cart.splice(0, cart.length);
        setCart([...cart]);
    }

    const price = cart.reduce((a, c)=>a + c.price*c.quantity,0);

    return (
        <div>
        <h1>Shopping Cart</h1>
<body>
    <div className='row'>
        <div className="column">
            <h2 >Cart items: </h2>
            <button  onClick={clearCart}>Reset cart</button>
            <h2><p>The total amount is: {price}</p></h2>  
            {cart.map((item, index) =>
                <CartItem
                    key={item.item}
                    item={item}
                    onRemove={() => removeItem(index)}
                    onQuanChange={x => onQuanChange(index, x)}
                />)}

        </div>
    </div>
 </body>
 
        </div>
        
    )
}

const CartItem: React.FC<{
    item: LineItem;
    onRemove: () => void;
    onQuanChange: (x: number) => void;

}> = function ({
    item: lineitem,
    onRemove,
    onQuanChange
}) {
        const { item, quantity, price} = lineitem

            return (
                <div>
                    <p>Item: {item}</p>
                    <p>Price: {price}</p>
                    <p>Quantity: <input type='number' value={quantity} onChange={x => onQuanChange(parseInt(x.target.value))} /></p>
                    <button onClick={onRemove}>Remove item</button>
                    <button onClick={x => onQuanChange(0)}>Reset</button>                      
                </div>              
            )
            
            
        

    }

export default core;

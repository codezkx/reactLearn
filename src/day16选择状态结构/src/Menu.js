import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items , setItems] = useState(initialItems);
  // const [selectedItem, setSelectedItem] = useState(items[0]); // 重复的state   items[0]  是 items 子项
  
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item => selectedId === item.id);

  const handleItemChange = (id, e) => {
    // setSelectedId(id);  输入时没有点击按钮不需要改变底部文案
    setItems(() => {
      return items.map(item => {
        if (id === item.id) {
          item.title = e.target.value
        }
        return item
      })
    })
  } 

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {
          items.map(item => (
            <li key={item.id}>
               <input
                value={item.title}
                onChange={e => {
                  handleItemChange(item.id, e)
                }}
              />
              <button onClick={() => {
                // setSelectedItem(item);
                setSelectedId(item.id);
              }}>
                Choose
              </button>
            </li>  
          ))
        }
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  )
}
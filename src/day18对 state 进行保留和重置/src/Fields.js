import { useState } from 'react';

export default function Fields() {
  const [person, setPerson] = useState({
    name: '',
    dassler: ''
  });
  const [reverse, setReverse] = useState(false);
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      调换顺序
    </label>
  );
  // return (
  //   <>
  //     <Field key={reverse ? '名字' : '姓氏' } label={reverse ? '名字' : '姓氏' }/>
  //     <Field key={reverse ? '姓氏' : '名字' } label={reverse ? '姓氏' : '名字' }/>
  //     {checkbox}
  //   </>
  // );
  /* 
    组件位置变化了但是组件引用没有变，而且没有从UI树中移除对应组件，
    可以实现state保持， 注意当带有key的组件变换的时候，是按替换前的位置进行替换的。
    所以在切换的后元素的相对位置一定要与之间的保持一致。不然会渲染多个组件。
  */
  if (reverse) {
    return (
      <>
        <Field key="名字" label="名字"/> {/*切换时会保留，从而出现多个*/}
        <div key="名字">123</div>
        <Field key="姓氏" label="姓氏"/>
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field key="姓氏" label="姓氏"/>
        <Field key="名字" label="名字"/>
        {checkbox}
      </>
    )
  }
}


function Field({ label }) {
  const [text, setText] = useState('')
  return (
    <label>
      {label}：
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  )
}
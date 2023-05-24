import Commodity from './Commodity';

// 渲染列表
const commodityList = [
  {
    name: '宇航服',
    isPacked: false,
  },
  {
    name: '带金箔的头盔',
    isPacked: false,
  },
  {
    name: 'Tam 的照片',
    isPacked: true,
  },
];

function Other({name}) {
  return <del>{name}</del>
}

export default function PackingList() {
  const CommodityItems = commodityList.map((item, index) => {
    if (!item.isPacked) {
      return <Commodity
        key={index}
        isPacked={item.isPacked}
        name={item.name}
      />
    }
    return <Other
            key={index}
            name={item.name}
          /> 
  }).filter(val => val)
  console.log(CommodityItems)
  return (
    <section>
      { CommodityItems }
    </section>
  );
}
export default function Clock(props) {
  return (
    <div style={{color: props.color}}>
      { props.children }
    </div>
  );
}
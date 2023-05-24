
import DebouncedButton from './DebouncedButton';
import DashboardProvider from './DashboardContex';

export default function Dashboard() {
  return (
    <>
        <DashboardProvider text='宇宙飞船已发射！'>
          <DebouncedButton>
            发射宇宙飞船
          </DebouncedButton>  
        </DashboardProvider>
        <DashboardProvider text='汤煮好了！'>
          <DebouncedButton>
            煮点儿汤
          </DebouncedButton>  
        </DashboardProvider>
        <DashboardProvider text='摇篮曲唱完了！'>
          <DebouncedButton>
          唱首摇篮曲
          </DebouncedButton>  
        </DashboardProvider>
    </>
  )
}